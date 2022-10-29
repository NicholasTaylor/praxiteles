import traceback
from django.db.models import signals
from django.dispatch import receiver
import requests
from .models import Init_Img, Prompt, Diffusion_Model, Result_Img
from diffusers import StableDiffusionPipeline
from diffusers import StableDiffusionImg2ImgPipeline
from datetime import datetime
from django.utils import timezone
from .serializers import ResultImgSerializer
from torch.cuda.amp import autocast
from rest_framework import status
from rest_framework.response import Response
from PIL import Image
import torch
import credentials

@receiver(signals.post_save, sender=Prompt)
def generate_images(sender, instance, **kwargs):
    def dummy(images, **kwargs):
        return images, False

    def get_pipe(repo, revision, img=False):
        pipe_class = StableDiffusionImg2ImgPipeline if img else StableDiffusionPipeline
        pipe = pipe_class.from_pretrained(repo, revision=revision, torch_dtype=torch.float32, use_auth_token=credentials.auth_token)
        pipe.to('cuda')
        pipe.safety_checker = dummy
        return pipe
    
    def get_init_img():
        path = init_img.img
        img_raw = Image.open(path).convert('RGB')
        width, height = img_raw.size
        if width >= height:
            height = int(height * 512 / width)
            img_raw = img_raw.resize((512, height))
            top = int((512 - height) / 2)
            left = 0
        else:
            width = int(width * 512 / height)
            img_raw = img_raw.resize((width, 512))
            top = 0
            left = int((512 - width) / 2)
        img_new = Image.new(img_raw.mode, (512, 512))
        img_new.paste(img_raw, (left, top))
        return img_new

    def update_prompt_complete_time(id):
        Prompt.objects.filter(id=id).update(complete_date=timezone.now())

    def gen_result_img():
        init_img_processed = get_init_img() if init_img else None
        is_img = True if init_img_processed else False
        print('init_img: %s\ninit_img_processed: %s\nis_img: %s' % (str(init_img), str(init_img_processed), str(is_img)))
        pipe = get_pipe(repo, revision, True) if is_img else get_pipe(repo, revision)
        generator = torch.Generator(device='cuda').manual_seed(1024)
        guidance_range = range(11,15) if is_img else range(0,21)
        strength_range = range(10,21) if is_img else range(0,1)
        for g in guidance_range:
            for s in strength_range:
                r = requests.get('http://localhost:8000/api/prompt/%i' % prompt_id)
                prompt_status = r.json()
                is_canceled = prompt_status['is_canceled']
                if is_canceled:
                    print('User-initiated cancel detected. Ending image generation.')
                    update_prompt_complete_time(prompt_id)
                    data = {}
                    data['success'] = 'Image generation and prompt canceled by user.'
                    return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
                strength_val = round(s / 20, 2)
                strength_name = int(strength_val * 100)
                with autocast():
                    if is_img:
                        img = pipe(prompt = prompt_text, init_image = init_img_processed, strength = strength_val, guidance_scale = g, generator = generator).images[0]
                        title = '%s-guidance-%i-strength-%i' % (session, g, strength_name)
                    else:
                        img = pipe(prompt = prompt_text, guidance_scale=g)['sample'][0]
                        title = '%s-guidance-%i' % (session, g)
                    filepath = 'static/results/%s.jpeg' % title
                    img.save(filepath)
                    result_img = Result_Img()
                    data = {
                            'title': title,
                            'img_path': filepath,
                            'prompt': prompt_id,
                            'diff_model': model.id,
                            'init_img': init_img.id,
                            'strength': s,
                            'guidance_scale': g,
                            'create_date': datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
                    } if init_img else {
                        'title': title,
                        'img_path': filepath,
                        'prompt': prompt_id,
                        'diff_model': model.id,
                        'guidance_scale': g,
                        'create_date': datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
                    }
                    serializer = ResultImgSerializer(result_img, data=data)
                    if serializer.is_valid():
                        serializer.save()
                    else:
                        update_prompt_complete_time(prompt_id)
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        update_prompt_complete_time(prompt_id)

    """def txt2img():
        for i in range(0,21):
            with autocast():
                img = pipe(prompt = prompt_text, guidance_scale=i)['sample'][0]
                title = '%s-guidance-%i' % (session, i)
                filepath = 'static/results/%s.jpeg' % title
                img.save(filepath)
                result_img = Result_Img()
                data = {
                        'title': title,
                        'img_path': filepath,
                        'prompt': prompt_id,
                        'diff_model': model.id,
                        'guidance_scale': i,
                        'create_date': datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
                }
                serializer = ResultImgSerializer(result_img, data=data)
                if serializer.is_valid():
                    serializer.save()
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def img2img():
        generator = torch.Generator(device='cuda').manual_seed(1024)
        guidance_range = range(11,15)
        strength_range = range(10,21)
        init_img_processed = get_img()
        for g in guidance_range:
            for s in strength_range:
                strength_val = round(s / 20, 2)
                strength_name = int(strength_val * 100)
                with autocast():
                    img = pipe(prompt = prompt_text, init_image = init_img_processed, strength = strength_val, guidance_scale = g, generator = generator).images[0]
                    title = '%s-guidance-%i-strength-%i' % (session, g, strength_name)
                    filepath = 'static/results/%s.jpeg' % title
                    img.save(filepath)
                    result_img = Result_Img()
                    data = {
                            'title': title,
                            'img_path': filepath,
                            'prompt': prompt_id,
                            'diff_model': model.id,
                            'init_img': init_img.id,
                            'strength': s,
                            'guidance_scale': g,
                            'create_date': datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
                    }
                    serializer = ResultImgSerializer(result_img, data=data)
                    if serializer.is_valid():
                        serializer.save()
                    else:
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)"""
    
    session = datetime.utcnow().strftime('%Y%m%d%H%M%S')
    model = Diffusion_Model.objects.get(pk=instance.diff_model.id)
    try:
        init_img = Init_Img.objects.get(pk=instance.img.id)
    except Exception:
        traceback.print_exc()
        init_img = False
    repo = model.hf_repo_location
    revision = model.revision
    prompt_text = instance.prompt_text
    prompt_id = instance.id
    gen_result_img()
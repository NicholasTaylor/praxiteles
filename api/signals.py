from django.db.models import signals
from django.dispatch import receiver
from .models import Prompt, Diffusion_Model, Result_Img
from diffusers import StableDiffusionPipeline
from diffusers import StableDiffusionImg2ImgPipeline
from datetime import datetime
from .serializers import ResultImgSerializer
from torch.cuda.amp import autocast
from rest_framework import status
from rest_framework.response import Response
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
    
    session = datetime.utcnow().strftime('%Y%m%d%H%M%S')
    model = Diffusion_Model.objects.get(pk=instance.diff_model.id)
    repo = model.hf_repo_location
    revision = model.revision
    prompt_text = instance.prompt_text
    prompt_id = instance.id
    pipe = get_pipe(repo, revision)

    for i in range(0,21):
        with autocast():
            img = pipe(prompt = prompt_text, guidance_scale=i)['sample'][0]
            title = '%s-guidance-%i' % (session, i)
            filepath = 'results/%s.jpeg' % title
            img.save(filepath)
            result_img = Result_Img()
            data = {
                    'title': title,
                    'img_path': filepath,
                    'prompt': prompt_id,
                    'create_date': datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
            }
            serializer = ResultImgSerializer(result_img, data=data)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
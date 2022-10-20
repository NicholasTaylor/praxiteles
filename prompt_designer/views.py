from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import PromptSerializer, DiffusionModelSerializer, InitImgSerializer
from .models import Init_Img, Prompt, Diffusion_Model

def index(request):
    return HttpResponse('Hello world.')

def prompt_history(request):
    latest_prompts = Prompt.objects.order_by('-create_date')[:5]
    return render(request, 'prompts/index.html', {'latest_prompts': latest_prompts})

def prompt_detail(request, prompt_id):
    p = get_object_or_404(Prompt, id=prompt_id)
    return render(request, 'prompts/detail.html', {'p': p})

def image(request, init_img_id):
    response = 'Image %s:'
    return HttpResponse(response % init_img_id)

@api_view(['GET'])
def PromptView(request):
    prompts = Prompt.objects.all()
    serializer = PromptSerializer(prompts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def DiffusionModelView(request):
    diff_models = Diffusion_Model.objects.all()
    serializer = DiffusionModelSerializer(diff_models, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def InitImgView(request):
    init_imgs = Init_Img.objects.all()
    serializer = InitImgSerializer(init_imgs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/prompts/',
            'method': 'GET',
            'body': None,
            'description': 'Returns all prompts.'
        },
        {
            'Endpoint': '/diffusionmodels/',
            'method': 'GET',
            'body': None,
            'description': 'Returns all prompts.'
        },
        {
            'Endpoint': '/initimgs/',
            'method': 'GET',
            'body': None,
            'description': 'Returns all prompts.'
        },
    ]
    return Response(routes)
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from api.exceptions import DuplicateModel, InvalidModelIdentifer
from .serializers import PromptSerializer, DiffusionModelSerializer, InitImgSerializer, ResultImgSerializer
from .models import Init_Img, Prompt, Diffusion_Model, Result_Img
from diffusers import StableDiffusionPipeline
from diffusers import StableDiffusionImg2ImgPipeline
import torch
import credentials
import random
from torch.cuda.amp import autocast
from datetime import datetime

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
    
@api_view(['GET'])
def PromptView(request):
    if request.method == 'GET':
        prompts = Prompt.objects.all()
        serializer = PromptSerializer(prompts, many=True)
        return Response(serializer.data)    

@api_view(['GET', 'PUT', 'DELETE'])
def PromptDetailView(request, pk):
    try:
        prompt = Prompt.objects.get(pk=pk)
    except Prompt.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = PromptSerializer(prompt)
        return Response(serializer.data)
    if request.method == 'PUT':
        serializer = PromptSerializer(prompt, data=request.data)
        data = {}
        if serializer.is_valid():
            serializer.save()
            data['success'] = 'Success message'
            return Response(data=data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'DELETE':
        operation = prompt.delete()
        data = {}
        if operation:
            data['success'] = 'Success message'
        else:
            data['failure'] = 'Failure message'
        return Response(data=data)

@api_view(['POST'])
def PromptCreateView(request):
    if request.method == 'POST':
        prompt = Prompt()
        serializer = PromptSerializer(prompt, data=request.data)
        print('Request Data:\n%s' % str(request.data))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def DiffusionModelView(request):
    diff_models = Diffusion_Model.objects.all()
    serializer = DiffusionModelSerializer(diff_models, many=True)
    return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def DiffusionModelDetailView(request, pk):
    try:
        diff_model = Diffusion_Model.objects.get(pk=pk)
    except Diffusion_Model.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = DiffusionModelSerializer(diff_model)
        return Response(serializer.data)
    if request.method == 'PUT':
        serializer = DiffusionModelSerializer(diff_model, data=request.data)
        data = {}
        if serializer.is_valid():
            serializer.save()
            data['success'] = 'Success message'
            return Response(data=data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'DELETE':
        operation = diff_model.delete()
        data = {}
        if operation:
            data['success'] = 'Success message'
        else:
            data['failure'] = 'Failure message'
        return Response(data=data)

@api_view(['POST'])
def DiffusionModelCreateView(request):
    if request.method == 'POST':
        diff_model = Diffusion_Model()
        serializer = DiffusionModelSerializer(diff_model, data=request.data)
        if serializer.is_valid():
            repo = request.data['hf_repo_location']
            revision = request.data['revision']
            duplicate_check = Diffusion_Model.objects.filter(hf_repo_location=repo, revision=revision)
            if duplicate_check.count() > 0:
                raise DuplicateModel
            try:
                download = StableDiffusionPipeline.from_pretrained(repo, revision=revision, torch_dtype=torch.float32, use_auth_token=credentials.auth_token)
            except OSError:
                raise InvalidModelIdentifer()
            serializer.save()
            if download:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def InitImgView(request):
    init_imgs = Init_Img.objects.all()
    serializer = InitImgSerializer(init_imgs, many=True)
    return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def ResultImgDetailView(request, pk):
    try:
        result_img = Result_Img.objects.get(pk=pk)
    except Result_Img.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = ResultImgSerializer(result_img)
        return Response(serializer.data)
    if request.method == 'PUT':
        serializer = ResultImgSerializer(result_img, data=request.data)
        data = {}
        if serializer.is_valid():
            serializer.save()
            data['success'] = 'Success message'
            return Response(data=data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'DELETE':
        operation = result_img.delete()
        data = {}
        if operation:
            data['success'] = 'Success message'
        else:
            data['failure'] = 'Failure message'
        return Response(data=data)

@api_view(['GET'])
def ResultImgsView(request):
    if request.method == 'GET':
        result_imgs = Result_Img.objects.all().order_by('-create_date')[:200]
        serializer = ResultImgSerializer(result_imgs, many=True)
        return Response(serializer.data)
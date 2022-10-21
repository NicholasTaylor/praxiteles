from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from yaml import serialize
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
    if request.method == 'CREATE':
        pass
        """serializer = PromptSerializer(prompt, data=request.data)
        data = {}
        if serializer.is_valid():
            serializer.save()
            data['success'] = 'Success message'
            return Response(data=data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)"""
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
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
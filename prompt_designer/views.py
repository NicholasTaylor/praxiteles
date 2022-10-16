from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from .serializers import PromptSerializer
from .models import Prompt

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

class PromptView(viewsets.ModelViewSet):
    serializer_class = PromptSerializer
    queryset = Prompt.objects.all()
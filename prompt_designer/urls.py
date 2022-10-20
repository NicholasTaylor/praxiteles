from django.urls import path

from . import views

app_name = 'prompt_designer'
urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('prompts/', views.PromptView, name='prompts'),
    path('diffusionmodels/', views.DiffusionModelView, name='diffusionmodels'),
    path('initimgs/', views.InitImgView, name='initimgs'),
]
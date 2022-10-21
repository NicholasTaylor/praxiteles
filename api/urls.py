from django.urls import path
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import AllowAny

from . import views

app_name = 'api'
urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('prompts/', views.PromptView, name='prompts'),
    path('prompt/create', views.PromptCreateView, name='promptCreate'),
    path('prompt/<int:pk>', views.PromptDetailView, name='prompt'),
    path('diffusionmodels/', views.DiffusionModelView, name='diffusionmodels'),
    path('diffusionmodel/create', views.DiffusionModelCreateView, name='diffusionModelCreate'),
    path('diffusionmodel/<int:pk>', views.DiffusionModelDetailView, name='diffusionModel'),
    path('initimgs/', views.InitImgView, name='initimgs'),
]
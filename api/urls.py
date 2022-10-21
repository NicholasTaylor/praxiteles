from django.urls import path

from . import views

app_name = 'api'
urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('prompts/', views.PromptView, name='prompts'),
    path('prompt/create', views.PromptCreateView, name='promptCreate'),
    path('prompt/<int:pk>', views.PromptDetailView, name='prompt'),
    path('diffusionmodels/', views.DiffusionModelView, name='diffusionmodels'),
    path('initimgs/', views.InitImgView, name='initimgs'),
]
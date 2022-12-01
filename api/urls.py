from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

app_name = 'api'
urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('prompts/', views.PromptView, name='prompts'),
    path('prompt/create', views.PromptCreateView, name='promptCreate'),
    path('prompt/cancel/<int:pk>', views.PromptCancelView, name='promptCancel'),
    path('prompt/<int:pk>', views.PromptDetailView, name='prompt'),
    path('initimg/create', views.InitImgCreateView, name='initImgCreate'),
    path('initimg/<int:pk>', views.InitImgDetailView, name='initImgDetail'),
    path('diffusionmodels/', views.DiffusionModelView, name='diffusionmodels'),
    path('diffusionmodel/create', views.DiffusionModelCreateView, name='diffusionModelCreate'),
    path('diffusionmodel/<int:pk>', views.DiffusionModelDetailView, name='diffusionModel'),
    path('initimgs/', views.InitImgView, name='initimgs'),
    path('resultimg/<int:pk>', views.ResultImgDetailView, name='resultimg'),
    path('resultimgs/', views.ResultImgsView, name='resultimgs'),
]
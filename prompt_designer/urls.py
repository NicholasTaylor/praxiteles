from django.urls import path

from . import views

app_name = 'prompt_designer'
urlpatterns = [
    path('', views.prompt_history, name='prompt_history'),
    path('/<int:prompt_id>/', views.prompt_detail, name='prompt_detail'),
]
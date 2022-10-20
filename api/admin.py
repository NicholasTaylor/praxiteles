from django.contrib import admin
from .models import Prompt, Init_Img

my_models = [Prompt, Init_Img]

admin.site.register(my_models)
from rest_framework import serializers
from .models import Diffusion_Model, Prompt, Init_Img

class PromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prompt
        fields = ('id', 'prompt_text', 'img', 'diff_model', 'create_date')

class DiffusionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diffusion_Model
        fields = ('display_name', 'hf_repo_location', 'revision')

class InitImgSerializer(serializers.ModelSerializer):
    class Meta:
        model = Init_Img
        fields = ('title', 'img', 'create_date')
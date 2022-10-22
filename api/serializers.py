from rest_framework import serializers
from .models import Diffusion_Model, Prompt, Init_Img, Result_Img

class PromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prompt
        fields = '__all__'

class DiffusionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diffusion_Model
        fields = '__all__'

class InitImgSerializer(serializers.ModelSerializer):
    class Meta:
        model = Init_Img
        fields = '__all__'

class ResultImgSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result_Img
        fields = '__all__'
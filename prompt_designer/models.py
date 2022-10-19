from django.db import models

class Init_Img(models.Model):
    title = models.CharField(max_length=50)
    img = models.FileField(upload_to='uploads/')
    create_date = models.DateTimeField('date created')
    def __str__(self):
        return self.img

class Diffusion_Model(models.Model):
    display_name = models.CharField(max_length=256)
    hf_repo_location = models.CharField(max_length=512)
    revision = models.CharField(max_length=256)
    def __str__(self):
        return self.display_name

class Prompt(models.Model):
    prompt_text = models.CharField(max_length=1900)
    img = models.ForeignKey(Init_Img, blank=True, null=True, on_delete=models.PROTECT)
    diff_model = models.ForeignKey(Diffusion_Model, on_delete=models.PROTECT)
    create_date = models.DateTimeField('date created')
    def __str__(self):
        return self.prompt_text
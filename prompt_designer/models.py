from django.db import models

class Init_Img(models.Model):
    title = models.CharField(max_length=50)
    img = models.FileField(upload_to='uploads/')
    create_date = models.DateTimeField('date created')
    def __str__(self):
        return self.img

class Prompt(models.Model):
    prompt_text = models.CharField(max_length=1900)
    is_img_search = models.BooleanField()
    img = models.ForeignKey(Init_Img, blank=True, null=True, on_delete=models.PROTECT)
    create_date = models.DateTimeField('date created')
    def __str__(self):
        return self.prompt_text
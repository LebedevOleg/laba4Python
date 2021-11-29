from enum import unique
from django.db import models
import datetime
from rest_framework import serializers

class Programs(models.Model):
    name = models.CharField('Название программы', max_length=250)
    date = models.DateField('Дата',default=datetime.date.today)
    time_start = models.CharField('Время начала', max_length=6)
    time_end = models.CharField('Время конца', null=True, max_length=6)
    chanel = models.CharField('Название канала', max_length=100, null=True)
    image = models.CharField('Картинка',max_length=500,null = True)

    def __str__(self):
        return self.date + " "+ self.time_start +" to "+self.time_end + " : " + self.name


class ProgImages(models.Model):
    id_Program = models.ForeignKey(Programs, on_delete=models.CASCADE, related_name='images')
    images = models.CharField('Картинка',max_length=500)


class ImagesSerializator(serializers.Serializer):
    class Meta:
        model = ProgImages
        fields = '__all__'
        

class TVProgramsSerializer(serializers.ModelSerializer):    

    class Meta:
        model = Programs
        fields = ['name', 'date', 'time_start', 'time_end', 'image']
        
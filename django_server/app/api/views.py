import json
from rest_framework.views import APIView
from rest_framework.response import Response
from .scrapPython import getDays, mailScrap, uploadDB, yaScrap
from ..models import ImagesSerializator, Programs, ProgImages, TVProgramsSerializer
import datetime
from django.core import serializers



class ProgramYAAPIView(APIView):    
    def post(self, request,*args, **kwargs):                
        adress = request.data.get("adress")
        prog = request.data.get("prog")
        data = yaScrap(adress, prog)        
        for prog in data["programs"]:
            if not Programs.objects.filter(name = prog["name"], date = datetime.date.today().strftime('%Y-%m-%d'), time_start = prog["timeStart"], chanel = request.data.get("chnl")).exists():
                TVProg = Programs()
                TVProg.name =  prog["name"]
                TVProg.time_start = prog["timeStart"]
                if "timeEnd" in prog:
                    TVProg.time_end = prog["timeEnd"]
                TVProg.chanel = request.data.get("chnl")
                TVProg.image = prog["image"]
                TVProg.save()                                                
        
        return Response(data)  

class UpdateDB(APIView):
    def post(self, request,*args, **kwargs):
        adress = request.data.get("adress")
        prog = request.data.get("prog")
        data = getDays(adress,prog) 
        return Response(data)

class DataBasePrograms(APIView):
    def post(self, request,*args, **kwargs):        
        channel = request.data.get("chnl")
        date = request.data.get("date")
        if not Programs.objects.filter(date = datetime.date.fromisoformat(date) ,chanel = channel).exists():
            adress = request.data.get("adress")
            prog = request.data.get("prog")
            data = yaScrap(adress, prog)
            for prog in data["programs"]:               
                TVProg = Programs()
                TVProg.name =  prog["name"]
                TVProg.date = datetime.date.fromisoformat(date)
                TVProg.time_start = prog["timeStart"]
                if "timeEnd" in prog:
                    TVProg.time_end = prog["timeEnd"]
                TVProg.chanel = request.data.get("chnl")
                TVProg.image = prog["image"]
                TVProg.save()   
            return Response(data)
        else:
            TVprog = Programs.objects.filter(date = datetime.date.fromisoformat(date) ,chanel = channel)
            data = TVProgramsSerializer(TVprog,many=True)
            res = {'programs': data.data}
            return Response(res)
    
class Getmail(APIView):
    def post(self, request,*args, **kwargs):
        adress = request.data.get("adress")
        prog = request.data.get("prog") 
        url = adress + prog
        data = mailScrap(url)
        return Response(data)
    
            

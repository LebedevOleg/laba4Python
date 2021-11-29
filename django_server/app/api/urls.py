from django.urls import path
from .views import Getmail, UpdateDB, ProgramYAAPIView, DataBasePrograms

urlpatterns = [
    path('YaApi/',ProgramYAAPIView.as_view()),
    path('UPDB/',UpdateDB.as_view()),
    path('DBproramm/', DataBasePrograms.as_view()),
    path('Getmail/',Getmail.as_view())
]


import sys
sys.path.append("..") # Adds higher directory to python modules path.
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status, generics, filters
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from Authentication.models import UserProfile
from Authentication.serializers import UserSerializer
from .models import Course
from .serializers import CourseSerializers
class ProfessorsView():
    pass

class addCourse(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = CourseSerializers

class myCourse(APIView):
    permission_classes = (IsAuthenticated,)

class taCourse(APIView):
    def get(self, request):
        try:
            serializer = UserSerializer(request.user, many=False)
            courses = Course.objects.filter(Ta__in = [serializer.data['id']])
        except courses.DoesNotExist:
            courses = []

        courseSerialize = CourseSerializers(courses, many = True)    
        return Response({'classes' : courseSerialize.data})
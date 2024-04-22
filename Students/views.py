import sys
sys.path.append("..") # Adds higher directory to python modules path.
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status, generics, filters
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from Authentication.models import UserProfile
from Authentication.serializers import UserSerializer
from Courses.models import Course
from Courses.serializers import CourseSerializers

from .models import StudentCourses
from .serializers import StdCourseSerializers, StdExerciseSerializers, myCourseSerializers

class myClass(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        try:
            serializer = UserSerializer(request.user, many=False)
            user_class = StudentCourses.objects.filter(user_id = serializer.data['id'])
        except:
            user_class = []
        std_class = StdCourseSerializers(user_class, many = True)
        serializer_class = myCourseSerializers(user_class, many = True)
        my_course_id = [value for ordered_dict in serializer_class.data for value in ordered_dict.values()] 
        class_data = Course.objects.filter(id__in = my_course_id)
        course_serializer = CourseSerializers(class_data, many=True)

        return Response({'classes' : std_class.data, 'course_data': course_serializer.data})

class addNewClass(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = StudentCourses.objects.all()
    serializer_class = StdCourseSerializers
    
class uploadExerciseAns(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = StudentCourses.objects.all()
    serializer_class = StdExerciseSerializers
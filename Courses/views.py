import sys
sys.path.append("..") # Adds higher directory to python modules path.
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status, generics, filters
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from Authentication.models import UserProfile
from Authentication.serializers import UserSerializer
from .models import Course, Exercise
from .serializers import CourseSerializers, ExerciseSerializers, ExerciseDataSerializers

from Students.models import StudentCourses
from Students.serializers import StdCourseSerializers

class ProfessorsView():
    pass

class addCourse(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = CourseSerializers
    
class addExercise(generics.ListCreateAPIView):
    queryset = Exercise.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ExerciseSerializers

class courseExercise(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, id):
        try:
            exercise = Exercise.objects.filter(courseExercise = id)
        except:
            exercise = []
        exerciseSerialize = ExerciseSerializers(exercise, many = True)
        return Response({'course_exercises' : exerciseSerialize.data})
    
class ExerciseData(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, id):
        try:
            exercise = Exercise.objects.filter(id = id)
        except:
            exercise = ''
        exerciseSerialize = ExerciseDataSerializers(exercise, many = True)  
        return Response({'exercise_data' : exerciseSerialize.data})
    
class CourseData(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, id):
        try:
            course = Course.objects.filter(id = id)
        except:
            course = ''
        courseSerialize = CourseSerializers(course, many = True)  
        return Response({'course_data' : courseSerialize.data})

# courses where the user is a teacher's assistant
class taCourse(APIView):
    def get(self, request):
        try:
            serializer = UserSerializer(request.user, many=False)
            courses = Course.objects.filter(Ta__in = [serializer.data['id']])
        except:
            courses = []

        courseSerialize = CourseSerializers(courses, many = True)    
        return Response({'classes' : courseSerialize.data})
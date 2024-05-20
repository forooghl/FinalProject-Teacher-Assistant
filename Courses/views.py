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
from .serializers import CourseSerializers, CourseDataSerializers, ExerciseSerializers, ExerciseDataSerializers
from django.db.models import Q
import urllib.parse

from Students.models import StudentCourses
from Students.serializers import StdCourseSerializers

class ProfessorsView():
    pass

class addCourse(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        courses = Course.objects.all()
        serializer_class = CourseDataSerializers(courses, many = True)
        return Response(serializer_class.data, status=status.HTTP_201_CREATED)

    def post(self, request):
        professor = list(UserProfile.objects.filter(email = request.data.get("professor")).values('id'))
        if professor == []:
            return Response({"error":"email is not exist"}, status=status.HTTP_400_BAD_REQUEST)
        
        Ta = []
        try: # if more than one TA
            for taEmail in request.data.get('Ta'):
                item = list(UserProfile.objects.filter(email = taEmail).values('id'))
                Ta.append(item[0]['id'])
            
        except: # if just have one TA
            item = list(UserProfile.objects.filter(email = request.data.get('Ta')).values('id'))
            Ta.append(item[0]['id'])
        
        data = {
            'courseName' : request.data.get("courseName"),
            'date' : request.data.get("date"),
            'professor' : professor[0]['id'],
            'Ta' : Ta  
        }
        serializer = CourseSerializers(data = data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
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
        serializer = UserSerializer(request.user, many=False)
        user_class = StudentCourses.objects.filter(user_id = serializer.data['id'], course_id = exerciseSerialize.data[0]['courseExercise'])
        std_class_data = StdCourseSerializers(user_class, many = True)
        return Response({'exercise_data' : exerciseSerialize.data, "std_course" : std_class_data.data})
    
class CourseData(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, id):
        try:
            course = Course.objects.filter(id = id)
        except:
            course = ''
        courseSerialize = CourseDataSerializers(course, many = True)  
        return Response({'course_data' : courseSerialize.data})

# courses where the user is a teacher's assistant
class taCourse(APIView):
    def get(self, request):
        try:
            serializer = UserSerializer(request.user, many=False)
            courses = Course.objects.filter(Ta__in = [serializer.data['id']])
        except:
            courses = []

        courseSerialize = CourseDataSerializers(courses, many = True)    
        return Response({'classes' : courseSerialize.data})
    
class professorCourse(APIView):
    def get(self, request):
        try:
            serializer = UserSerializer(request.user, many=False)
            courses = Course.objects.filter(professor = serializer.data['id'])
        except:
            courses = []

        courseSerialize = CourseDataSerializers(courses, many = True)    
        return Response({'classes' : courseSerialize.data})
    
class Search(generics.ListAPIView):
    search_fields = ['courseName']
    permission_classes = [AllowAny]
    filter_backends = (filters.SearchFilter,)
    queryset = Course.objects.all()
    serializer_class = CourseDataSerializers
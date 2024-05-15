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
from Courses.serializers import CourseDataSerializers

from .models import StudentCourses
from .serializers import StdCourseSerializers, StdExerciseSerializers, myCourseSerializers


class joinOrNot(APIView):
    # permission_classes = (IsAuthenticated,)
    def get(self, request, id):
        serializer = UserSerializer(request.user, many=False)
        std_class = StudentCourses.objects.filter(user_id = serializer.data['id'], course_id = id).exists()

        ta_class = Course.objects.filter(Ta__in = [serializer.data['id']], id = id).exists()
        professor_class = Course.objects.filter(professor = serializer.data['id'], id = id).exists()
        
        return Response({'isStudent': std_class, 'isTA' : ta_class, 'isProfessor': professor_class, 'user_id' : serializer.data['id']}) 
    
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
        course_serializer = CourseDataSerializers(class_data, many=True)

        return Response({'classes' : std_class.data, 'course_data': course_serializer.data})

class studentCourseID(APIView):
    permission_classes =  (IsAuthenticated,)
    def get(self, request, id):
        try: 
            serializer = UserSerializer(request.user, many=False)
            user_class = StudentCourses.objects.filter(user_id = serializer.data['id'], course_id = id)
            std_class_data = StdCourseSerializers(user_class, many = True)
            return Response({"data" : std_class_data.data})
        except:
            return Response({"msg" : "user id not exist ..."},status=status.HTTP_400_BAD_REQUEST)
        
class addNewClass(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = StudentCourses.objects.all()
    serializer_class = StdCourseSerializers
    
class uploadExerciseAns(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = StudentCourses.objects.all()
    serializer_class = StdExerciseSerializers
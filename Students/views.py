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

from .models import StudentCourses, StdExercise, Evaluation
from .serializers import StdCourseSerializers, StdExerciseSerializers, myCourseSerializers, uploadExerciseSerializers, taEvaluationSerializers, CourseStudentsSerializers

class taEvaluation(APIView):
    def get(self, request):
        evaluation = Evaluation.objects.all()
        serializer_class = taEvaluationSerializers(evaluation, many = True)
        return Response(serializer_class.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        try :
            ta = UserProfile.objects.get(fullName = request.data.get("Ta"))
        except:
            ta = UserProfile.objects.get(username = request.data.get("Ta"))
        
        user_serializer = UserSerializer(request.user, many=False)
        TA_user_serializer = UserSerializer(ta, many=False)
        data = {
                "user_id" : user_serializer.data['id'],
                "ta_id" : TA_user_serializer.data["id"],
                "course_id" : request.data.get("course_id"),
                "teaching_skill" : request.data.get("teaching_skill"),
                "mastery_skill" : request.data.get("mastery_skill"),
                "manner_skill" : request.data.get("manner_skill"),
                "answeringQuestion_skill" : request.data.get("answeringQuestion_skill"),
            }
        serializer = taEvaluationSerializers(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
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
        
class addNewClass(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = StudentCourses.objects.all()
    serializer_class = StdCourseSerializers
    
class uploadExerciseAns(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        courses = StudentCourses.objects.all()
        serializer_class = StdExerciseSerializers(courses, many = True)
        return Response(serializer_class.data, status=status.HTTP_200_OK)

    def post(self,request):
        try:
            StdExercise.objects.filter(exercise_id = request.data.get("exercise_id") , std_course_id = request.data.get("std_course_id")).update(is_active = False)
        except:
            pass
        try:
            data = {
                "exercise_id" : request.data.get("exercise_id"),
                "std_course_id" : request.data.get("std_course_id"),
                "file" : request.data.get("file"),
                "is_active" : True,
                "grade" : 0
            }
            serializer = uploadExerciseSerializers(data = data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
        
    def put(self,request):
        try:
            stdObj = StdExercise.objects.get(exercise_id = request.data['id'], std_course_id = request.data['std_course_id'], is_active = True)
            stdObj.grade = request.data['grade']
            stdObj.save()
            return Response({'message': 'student grade updated successfully'}, status=status.HTTP_200_OK)
        except:
            return Response( status=status.HTTP_400_BAD_REQUEST)
        
class myAns(APIView):
    permission_classes =  (IsAuthenticated,)
    def get(self, request):
        try:
            userAns = StdExercise.objects.filter(exercise_id = request.query_params['exercise_id'] , std_course_id = request.query_params["stdCourse_id"])
            serializer = StdExerciseSerializers(userAns, many = True)
            return Response({"my_answer" : serializer.data}, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
class courseStudents(APIView):
    def get(self, request, id):
        allStudent = StudentCourses.objects.filter(course_id = id)
        serializer = CourseStudentsSerializers(allStudent, many= True)
        return Response({"allStudent" : serializer.data}, status=status.HTTP_200_OK)
        # try:
            
        # except:
        #     return Response(status=status.HTTP_400_BAD_REQUEST)
           
class studentAns(APIView):
    permission_classes =  (IsAuthenticated,)
    def get(self, request):
        try:
            userAns = StdExercise.objects.filter(exercise_id = request.query_params["exercise_id"] , is_active = True )
            serializer = StdExerciseSerializers(userAns, many = True)
            return Response({"student_answer" : serializer.data}, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
class updateFinalAns(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        try:
            StdExercise.objects.filter(exercise_id = request.query_params['exercise_id'] , 
                                                 std_course_id = request.query_params["std_course_id"]).update(is_active = False)
            StdExercise.objects.filter(id = request.query_params['id']).update(is_active = True)
            userAns = StdExercise.objects.filter(exercise_id = request.query_params['exercise_id'] , std_course_id = request.query_params["std_course_id"])
            serializer = StdExerciseSerializers(userAns, many = True)
            return Response({"my_answer" : serializer.data}, status=status.HTTP_200_OK) 
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
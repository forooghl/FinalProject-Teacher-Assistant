from rest_framework import serializers
from .models import StudentCourses, StdExercise, Evaluation

class taEvaluationSerializers(serializers.ModelSerializer):
    class Meta:
        model = Evaluation
        fields = "__all__"
        
class StdCourseSerializers(serializers.ModelSerializer):
    class Meta:
        model = StudentCourses
        fields = '__all__'
        
class myCourseSerializers(serializers.ModelSerializer):
    class Meta:
        model = StudentCourses
        fields = ['course_id']
        
class uploadExerciseSerializers(serializers.ModelSerializer):
    class Meta:
        model = StdExercise
        fields = "__all__"
        
class StdExerciseSerializers(serializers.ModelSerializer):
    std_course_id = StdCourseSerializers(read_only=True)
    class Meta:
        model = StdExercise
        fields = ['id', 'exercise_id', 'std_course_id', 'file', 'is_active', 'grade']
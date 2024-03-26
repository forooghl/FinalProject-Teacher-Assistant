from rest_framework import serializers
from .models import StudentCourses, StdExercise


class StdCourseSerializers(serializers.ModelSerializer):
    class Meta:
        model = StudentCourses
        fields = '__all__'
        
class StdExerciseSerializers(serializers.ModelSerializer):
    class Meta:
        model = StdExercise
        fields = '__all__'
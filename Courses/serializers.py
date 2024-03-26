from rest_framework import serializers
from .models import Course, Exercise


class CourseSerializers(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
        
class ExerciseSerializers(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'
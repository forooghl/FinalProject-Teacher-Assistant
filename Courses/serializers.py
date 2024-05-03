from rest_framework import serializers
from .models import Course, Exercise


class CourseSerializers(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
        
class CourseDataSerializers(serializers.ModelSerializer):
    professor = serializers.SlugRelatedField(slug_field='username', read_only = True)
    Ta = serializers.StringRelatedField(many=True)
    class Meta:
        model = Course
        fields = '__all__'
        
class ExerciseSerializers(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'exerciseName', 'endDate']
        
class ExerciseDataSerializers(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'
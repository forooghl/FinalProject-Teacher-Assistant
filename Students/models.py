import sys
from django.db import models
from django.db.models import Q
sys.path.append("..")

from Authentication.models import UserProfile
from Courses.models import Course, Exercise

class StudentCourses(models.Model):
    std_number = models.IntegerField(unique=True)
    user_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE, unique=True)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user_id', 'std_number'], name='unique_std')
        ]

class StdExercise(models.Model):
    exercise_id = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    user_id = models.ForeignKey(StudentCourses, to_field='user_id', on_delete=models.CASCADE, related_name='exercises_submitted')
    std_id = models.ForeignKey(StudentCourses, to_field='std_number', on_delete=models.CASCADE, related_name='student_exercises')
    file = models.FileField(upload_to='ExerciseAns')

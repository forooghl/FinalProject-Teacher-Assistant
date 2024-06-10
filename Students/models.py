import sys
from django.db import models
from django.db.models import Q
sys.path.append("..")

from Authentication.models import UserProfile
from Courses.models import Course, Exercise

class StudentCourses(models.Model):
    std_number = models.IntegerField()
    grade = models.IntegerField(default=0, blank=True)
    user_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)


class StdExercise(models.Model):
    exercise_id = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    std_course_id = models.ForeignKey(StudentCourses, on_delete=models.CASCADE, related_name='exercises_submitted')
    file = models.FileField(upload_to='ExerciseAns')
    is_active = models.BooleanField(default=True, blank=True)
    grade = models.IntegerField(default=0, blank=True)

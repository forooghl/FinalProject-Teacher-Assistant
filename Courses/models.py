import sys
from django.db import models
sys.path.append("..") # Adds higher directory to python modules path.

from Authentication.models import UserProfile

# Create your models here.   
class Course(models.Model):
    courseName = models.CharField(max_length = 50)
    date = models.DateField()
    professor = models.ForeignKey(UserProfile, related_name ='professor_ID', on_delete = models.CASCADE)
    Ta = models.ManyToManyField(UserProfile)

class Exercise(models.Model):
    exerciseName = models.CharField(max_length = 50)
    body = models.TextField()
    file = models.FileField(upload_to = 'ExerciseFile', blank = True)
    courseExercise = models.ForeignKey(Course, on_delete = models.CASCADE)
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()
    
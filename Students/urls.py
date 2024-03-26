from django.urls import path
from .views import addNewClass, uploadExerciseAns
urlpatterns = [
    path('addNewClass/', addNewClass.as_view()),
    path('uploadExercise/', uploadExerciseAns.as_view())
]
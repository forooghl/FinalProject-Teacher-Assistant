from django.urls import path
from .views import addNewClass, uploadExerciseAns, myClass
urlpatterns = [
    path('addNewClass/', addNewClass.as_view()),
    path('uploadExercise/', uploadExerciseAns.as_view()),
    path('myClasses/', myClass.as_view())
]
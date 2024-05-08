from django.urls import path
from .views import addNewClass, uploadExerciseAns, myClass, joinOrNot
urlpatterns = [
    path('addNewClass/', addNewClass.as_view()),
    path('uploadExercise/', uploadExerciseAns.as_view()),
    path('myClasses/', myClass.as_view()),
    path('joinOrNot/<id>', joinOrNot.as_view())
]
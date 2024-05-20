from django.urls import path
from .views import addNewClass, uploadExerciseAns, myAns, updateFinalAns, studentAns, myClass, joinOrNot
urlpatterns = [
    path('addNewClass/', addNewClass.as_view()),
    path('uploadExercise/', uploadExerciseAns.as_view()),
    path('myAnswer/', myAns.as_view()),
    path('updateFinalAnswer/', updateFinalAns.as_view()),
    path('studentAnswer/', studentAns.as_view()),
    path('myClasses/', myClass.as_view()),
    path('joinOrNot/<id>', joinOrNot.as_view()),
]
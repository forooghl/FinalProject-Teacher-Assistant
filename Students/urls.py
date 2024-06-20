from django.urls import path
from .views import addNewClass, uploadExerciseAns, myAns, updateFinalAns, studentAns, myClass, joinOrNot, taEvaluation, recommenderSystem, courseStudents
urlpatterns = [
    path('addNewClass/', addNewClass.as_view()),
    path('uploadExercise/', uploadExerciseAns.as_view()),
    path('myAnswer/', myAns.as_view()),
    path('updateFinalAnswer/', updateFinalAns.as_view()),
    path('studentAnswer/', studentAns.as_view()),
    path('myClasses/', myClass.as_view()),
    path('joinOrNot/<id>', joinOrNot.as_view()),
    path('evaluation/', taEvaluation.as_view()),
    path('TaRS/', recommenderSystem.as_view()),
    path('courseStudents/<id>', courseStudents.as_view()),
]
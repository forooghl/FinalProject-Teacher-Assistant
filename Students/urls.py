from django.urls import path
from .views import addNewClass, uploadExerciseAns, myAns, studentAns, myClass, joinOrNot, studentCourseID
urlpatterns = [
    path('addNewClass/', addNewClass.as_view()),
    path('uploadExercise/', uploadExerciseAns.as_view()),
    path('myAnswer/', myAns.as_view()),
    path('studentAnswer/', studentAns.as_view()),
    path('myClasses/', myClass.as_view()),
    path('joinOrNot/<id>', joinOrNot.as_view()),
    path('stdCourseID/<id>', studentCourseID.as_view())
]
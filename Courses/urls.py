from django.urls import path
from .views import addCourse, taCourse, addExercise
urlpatterns = [
    path('addCourse/', addCourse.as_view()),
    path('addExercise/', addExercise.as_view()),
    path('taCourse/', taCourse.as_view()),
]
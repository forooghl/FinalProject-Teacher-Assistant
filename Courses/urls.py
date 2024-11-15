from django.urls import path
from .views import addCourse, updateCourse, taCourse, addExercise, updateExercise, CourseData, ExerciseData, courseExercise, Search, professorCourse
urlpatterns = [
    path('addCourse/', addCourse.as_view()),
    path('updateCourse/<id>', updateCourse.as_view()),
    path('addExercise/', addExercise.as_view()),
    path('updateExercise/<id>', updateExercise.as_view()),
    path('taCourse/', taCourse.as_view()),
    path('professorCourse/', professorCourse.as_view()),
    path('courseData/<id>', CourseData.as_view()),
    path('exerciseData/<id>', ExerciseData.as_view()),
    path('courseExercise/<id>', courseExercise.as_view()),
    path('search/', Search.as_view())
]
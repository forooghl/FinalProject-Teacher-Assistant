from django.urls import path
from .views import addCourse, taCourse
urlpatterns = [
    path('addCourse/', addCourse.as_view()),
    path('taCourse/', taCourse.as_view()),
]
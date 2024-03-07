from django.urls import path
from .views import RegisterView, UserView, LogoutAPIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('profile/', UserView.as_view()),
    path('register/', RegisterView.as_view()),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout/', LogoutAPIView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
# from . import views
# from django.urls import path
# from rest_framework_simplejwt.views import (
#     TokenRefreshView,
# )
# app_name = 'authentication'
# urlpatterns = [
#     path('register/',views.RegisterView.as_view(),name="register"),
#     path('login/',views.LoginAPIView.as_view(),name="login"),
#     path('logout/', views.LogoutAPIView.as_view(), name="logout"),
#     path('authentication/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
# ]
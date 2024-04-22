from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework import status,generics
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile
from .serializers import RegisterSerializer,LogoutSerializer, UserSerializer

class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    def post(self,request):
        user=request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        return Response(user_data, status=status.HTTP_201_CREATED)

class UserView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        serializer = UserSerializer(request.user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # update user profile image
    def put(self, request):
        user = UserProfile.objects.get(email=request.user.email)
        
        if 'avatar' in request.data and 'fullName' in request.data:
            user.avatar = request.data['avatar']
            user.fullName = request.data['fullName']
            user.save()
            return Response({'message': 'profile and fullName updated successfully'}, status=status.HTTP_200_OK)
        elif 'avatar' in request.data : 
            user.avatar = request.data['avatar']
            user.save()
            return Response({'message': 'profile updated successfully'}, status=status.HTTP_200_OK)
        elif 'fullName' in request.data : 
            user.fullName = request.data['fullName']
            user.save()
            return Response({'message': 'your name updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'nothing updated'}, status=status.HTTP_200_OK)

class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
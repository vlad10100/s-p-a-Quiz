from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status 


from auth_user.models import User

from quiz.models import Category, Quiz, Answer, Question
from quiz.serializers import CategorySerializer, QuizSerializer, QuestionSerializer, QuizQuestionSerializer


class CategoryView(APIView):
    serializer_class = CategorySerializer

    def get(self, request):
        data = Category.objects.all()
        serializer = self.serializer_class(instance=data, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK) 



class QuizView(APIView):
    serializer_class = QuizSerializer

    def get(self, request):
        data = Quiz.objects.all()
        serializer = self.serializer_class(instance=data, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class UserQuizzes(APIView):
    serializer_class = QuizSerializer
    permission_classes= [IsAuthenticated]


    def get(self, request):
        user = request.user
        data = user.quiz_set.all()
        serializer = self.serializer_class(instance=data, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)



class QuizQuestionView(APIView):
    serializer_class = QuizQuestionSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, **kwargs):
        quiz = Quiz.objects.get(id=kwargs['pk'])
        serializer = self.serializer_class(instance=quiz)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


# Quiz(id) >> Question >> Answers
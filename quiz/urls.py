from django.urls import path 
from quiz.views import CategoryView, QuizView, UserQuizzes, QuizQuestionView

app_name = 'quiz'

urlpatterns = [
    path('c/', CategoryView.as_view()),
    path('q/', QuizView.as_view()),
    path('', UserQuizzes.as_view()),
    path('take_quiz/<int:pk>/', QuizQuestionView.as_view())
]

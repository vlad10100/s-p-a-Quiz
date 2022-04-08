from rest_framework import serializers 

from quiz.models import Category, Quiz, Question, Answer



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz 
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    answer = AnswerSerializer(many=True, read_only=True, source='answer_set')
    class Meta:
        model = Question 
        fields = ['quiz', 'question', 'answer']


class QuizQuestionSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True, source='question_set')
    class Meta:
        model = Quiz 
        fields = ['user', 'title', 'questions']



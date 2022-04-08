from django.db import models

from auth_user.models import User 



class Category(models.Model):
    category = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.category


class Quiz(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    
    class Meta:
        verbose_name = 'Quiz'
        verbose_name_plural = 'Quizzes'

    def __str__(self):
        output = f"{self.title} -{self.user}"
        return output

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    question = models.CharField(max_length=200)

    class Meta:
        verbose_name = 'Question'
        verbose_name_plural= 'Questions'
    
    def __str__(self):
        return self.question


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.CharField(max_length=200)
    is_right = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Answer'
        verbose_name_plural= 'Answers'
        ordering = ['id']

    def __str__(self):
        return self.answer
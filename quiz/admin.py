from django.contrib import admin
from quiz.models import Category, Quiz, Question, Answer



admin.site.register(Category)

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display= ['id','title']


class AnswerInlineModel(admin.TabularInline):
    model = Answer
    fields= ['answer', 'is_right', ]

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    fields = ['question', 'quiz',]
    list_display = ['question', 'quiz']
    inlines = [AnswerInlineModel, ]

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ['answer', 'is_right', 'question']
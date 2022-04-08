from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('auth_user.api.urls')),
    path('quiz/', include('quiz.urls', namespace='quiz'))
]

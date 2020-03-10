from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.UserViewSet.as_view({'get': 'list'})),
    path('users', views.UserList.as_view()),
    path('users/<str:username>/', views.UserDetail.as_view()),
]

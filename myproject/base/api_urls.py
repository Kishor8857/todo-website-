from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import TaskViewSet, CompleteViewSet, TrashViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'completed', CompleteViewSet)
router.register(r'trash', TrashViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

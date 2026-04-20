from rest_framework import serializers
from .models import TaskModel, CompleteModel, TrashModel


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskModel
        fields = ['id', 'title', 'desc']


class CompleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompleteModel
        fields = ['id', 'title', 'desc']


class TrashSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrashModel
        fields = ['id', 'title', 'desc']

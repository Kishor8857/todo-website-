from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import TaskModel, CompleteModel, TrashModel
from .serializers import TaskSerializer, CompleteSerializer, TrashSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = TaskModel.objects.all()
    serializer_class = TaskSerializer

    @action(detail=False, methods=['post'])
    def complete_all(self, request):
        """Mark all tasks as complete"""
        tasks = TaskModel.objects.all()
        for task in tasks:
            CompleteModel.objects.create(title=task.title, desc=task.desc)
        tasks.delete()
        return Response({'status': 'All tasks completed'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def complete_task(self, request, pk=None):
        """Mark single task as complete"""
        task = self.get_object()
        CompleteModel.objects.create(title=task.title, desc=task.desc)
        task.delete()
        return Response({'status': 'Task completed'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def delete_task(self, request, pk=None):
        """Move task to trash"""
        task = self.get_object()
        TrashModel.objects.create(title=task.title, desc=task.desc)
        task.delete()
        return Response({'status': 'Task moved to trash'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def create_task(self, request):
        """Create new task"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['put', 'patch'])
    def update_task(self, request, pk=None):
        """Update task"""
        task = self.get_object()
        serializer = self.get_serializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CompleteViewSet(viewsets.ModelViewSet):
    queryset = CompleteModel.objects.all()
    serializer_class = CompleteSerializer

    @action(detail=False, methods=['post'])
    def delete_all(self, request):
        """Move all completed tasks to trash"""
        completes = CompleteModel.objects.all()
        for complete in completes:
            TrashModel.objects.create(title=complete.title, desc=complete.desc)
        completes.delete()
        return Response({'status': 'All completed tasks moved to trash'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def delete_task(self, request, pk=None):
        """Move completed task to trash"""
        complete = self.get_object()
        TrashModel.objects.create(title=complete.title, desc=complete.desc)
        complete.delete()
        return Response({'status': 'Task moved to trash'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def restore_task(self, request, pk=None):
        """Restore completed task to active"""
        complete = self.get_object()
        TaskModel.objects.create(title=complete.title, desc=complete.desc)
        complete.delete()
        return Response({'status': 'Task restored'}, status=status.HTTP_200_OK)


class TrashViewSet(viewsets.ModelViewSet):
    queryset = TrashModel.objects.all()
    serializer_class = TrashSerializer

    @action(detail=False, methods=['post'])
    def delete_all(self, request):
        """Permanently delete all trash tasks"""
        TrashModel.objects.all().delete()
        return Response({'status': 'Trash emptied'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def restore_all(self, request):
        """Restore all trash tasks to active"""
        trashes = TrashModel.objects.all()
        for trash in trashes:
            TaskModel.objects.create(title=trash.title, desc=trash.desc)
        trashes.delete()
        return Response({'status': 'All tasks restored'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def delete_task(self, request, pk=None):
        """Permanently delete single task"""
        trash = self.get_object()
        trash.delete()
        return Response({'status': 'Task permanently deleted'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def restore_task(self, request, pk=None):
        """Restore single task from trash"""
        trash = self.get_object()
        TaskModel.objects.create(title=trash.title, desc=trash.desc)
        trash.delete()
        return Response({'status': 'Task restored'}, status=status.HTTP_200_OK)

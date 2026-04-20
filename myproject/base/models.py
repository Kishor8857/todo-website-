from django.db import models

# Create your models here.
#contains the records which to the user has to perform
class TaskModel(models.Model):
    title = models.CharField(max_length=100)
    desc = models.TextField(max_length=200)

#to store the tasks which the user as completed
class CompleteModel(models.Model):
    title = models.CharField(max_length=100)
    desc = models.TextField(max_length=200)

#to store the deleted task 
class TrashModel(models.Model):
    title = models.CharField(max_length=100)
    desc = models.TextField(max_length=200)


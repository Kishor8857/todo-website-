from django.shortcuts import render,redirect
from .models import *
# Create your views here.
def home(request):
    data = TaskModel.objects.all()
    return render(request,'home.html',{'data':data})

def add(request):
    print(request.method)#GET #POST
    print(request.GET)#<QueryDict: {}>
    print(request.POST)#<QueryDict: {}> #<QueryDict: {'csrfmiddlewaretoken': ['cAcJBhLkTKbk1cS8dqi5fat59ucCdIc4ApE9xa11a5MGQaHGqgogMkQvEIy5PnEd'], 'title': ['django'], 'desc': ['need to work on model']}>
    if request.method == 'POST':
        a = request.POST['title']
        b = request.POST['desc']
        print(a,b)#django need to work on model
        TaskModel.objects.create(
            title = a,
            desc = b
        )
        return redirect('home')
    return render(request,'add.html')

def complete(request):
    data = CompleteModel.objects.all()
    return render(request,'complete.html',{'data':data})

def trash(request):
    data = TrashModel.objects.all()
    return render(request,'trash.html',{'data':data})

def about(request):
    return render(request,'about.html')

#home page complete button
def complete_h(request,id):
    '''
    1. fetch the particular record from TaskModel
    2. Create this record in CompleteModel
    3. Delete this record from TaskModel
    '''
    data = TaskModel.objects.get(id=id)#object instance 
    print(data)#TaskModel object (1)
    print(data.title,data.desc)#django need to work on model
    CompleteModel.objects.create(
        title = data.title,
        desc = data.desc
    )
    data.delete()
    return redirect('complete')

#home page complete all button
def complete_allh(request):
    '''
    1. fetch all the records which are present in the taskmodel
    2. create then in complete model
    3. delete it from taskmodel
    '''
    data = TaskModel.objects.all()
    print(data)#<QuerySet [<TaskModel: TaskModel object (2)>, <TaskModel: TaskModel object (4)>, <TaskModel: TaskModel object (5)>, <TaskModel: TaskModel object (7)>, <TaskModel: TaskModel object (8)>]>
    for i in data:
        print(i)
        print(i.title,i.desc)
        CompleteModel.objects.create(
            title = i.title,
            desc = i.desc
        )
        # i.delete()#delete each record after create
    data.delete()#delete all records once all records have been created
    return redirect('complete')

#home page delete button
def delete_h(request,id):
    '''
    1. fetch the particular record from TaskModel
    2. Create this record in TrashModel
    3. Delete this record from TaskModel
    '''
    data = TaskModel.objects.get(id=id)
    TrashModel.objects.create(
        title = data.title,
        desc = data.desc
    )
    data.delete()
    return redirect('trash')

#complete page delete button
def delete_c(request,id):
    '''
    1.fetch the record from the completemodel
    2.create it in trashmodel
    3.delete it from completemodel
    4. navigate to trash page
    '''
    data = CompleteModel.objects.get(id=id)
    TrashModel.objects.create(
        title = data.title,
        desc = data.desc
    )
    data.delete()
    return redirect('trash')

def delete_allc(request):
    data = CompleteModel.objects.all()
    for i in data:
        TrashModel.objects.create(
            title = i.title,
            desc = i.desc
        )
    data.delete()
    return redirect('trash')

#trash page delete
def delete_t(request,id):
    '''
    1. fetch the record from trashmodel
    2. delete it
    '''
    data = TrashModel.objects.get(id=id)
    data.delete()
    return redirect('trash')

#trash page delete all
def delete_allt(request):
    data = TrashModel.objects.all()
    data.delete()
    return redirect('trash')

#complete page restore button
def restore_c(request,id):
    '''
    1.fetch the record from completemodel
    2.create it in task model
    3. delete it from completemodel
    '''
    data = CompleteModel.objects.get(id=id)
    TaskModel.objects.create(
        title = data.title,
        desc = data.desc
    )
    data.delete()
    return redirect('home')

#compelete page restore all - assignment

#trash page restore all button
def restore_allt(request):
    '''
    1.fetch all the records from trashmodel
    2. create it in taskmodel one after the other
    3. delete them from trashmodel
    '''
    data = TrashModel.objects.all()
    for i in data:
        TaskModel.objects.create(
            title = i.title,
            desc = i.desc
        )
    data.delete()
    return redirect('home')

def restore_t(request,id):
    data = TrashModel.objects.get(id=id)
    TaskModel.objects.create(
        title = data.title,
        desc = data.desc
    )
    data.delete()
    return redirect('home')

def update(request,id):
    data = TaskModel.objects.get(id=id)
    print(data.title,data.desc)
    print(request.method)#GET #POST
    print(request.POST)#<QueryDict: {'csrfmiddlewaretoken': ['gdVZVEjfMNswG2LFO6zKmA9Y8NKHVsTG8YM57YKYV9rasbham6Uwyv0qRfYl6cti'], 'title': ['python'], 'desc': ['need to work on oops']}>
    if request.method == 'POST':
        a = request.POST['title']
        b = request.POST['desc']
        print(a,b)#python need to work on oops
        data.title = a
        data.desc = b
        data.save()
        return redirect('home')
    return render(request,'update.html',{'data':data})
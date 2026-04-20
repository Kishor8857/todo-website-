from django.urls import path
from .views import *

urlpatterns = [
    path('',home,name='home'),
    path('add/',add,name='add'),
    path('complete/',complete,name='complete'),
    path('trash/',trash,name='trash'),
    path('about/',about,name='about'),
    path('complete_h/<int:id>',complete_h,name='complete_h'),
    path('complete_allh/',complete_allh,name='complete_allh'),
    path('delete_h/<int:id>',delete_h,name='delete_h'),
    path('delete_c/<int:id>',delete_c,name='delete_c'),
    path('delete_allc/',delete_allc,name='delete_allc'),
    path('delete_t/<int:id>',delete_t,name='delete_t'),
    path('delete_allt/',delete_allt,name='delete_allt'),
    path('restore_c/<int:id>',restore_c,name='restore_c'),
    path('restore_allt/',restore_allt,name='restore_allt'),
    path('restore_t/<int:id>',restore_t,name='restore_t'),
    path('update/<int:id>',update,name='update')
]
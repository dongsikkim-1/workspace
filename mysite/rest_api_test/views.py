#from django.shortcuts import render

# Create your views here.

from django.views import View
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.db.models import F
from django.db import models
from rest_api_test.models import Employees

@method_decorator(csrf_exempt,name='dispatch')
class IndexView(View):
    def get(self, request):

        emps = employees.objects.filter(scoops_ordered__gt=F('store_visits'))
        
        # dummy_data = {
        #     'name': '죠르디',
        #     'type': '공룡',
        #     'job': '편의점알바생',
        #     'age': 5
        # }
        # return JsonResponse(dummy_data)
        return JsonResponse(emps)
    
    def post(self, request):
        return HttpResponse("Post 요청을 잘받았다")
   
    def put(self, request):
        return HttpResponse("Put 요청을 잘받았다")

    def delete(self, request):
        return HttpResponse("Delete 요청을 잘받았다")
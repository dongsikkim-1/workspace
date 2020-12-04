#from django.shortcuts import render

# Create your views here.

from django.views import View
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.db.models import F
from django.db import models
from .models import employees
# from django.shortcuts import render
from django.core.serializers import serialize
# from django.core import serializers

from django.core.serializers import serialize
import json
from urllib.request import urlopen , Request



@method_decorator(csrf_exempt,name='dispatch')
class IndexView(View):
    def get(self, request):
    #    if not request.is_ajax():
        #   raise Http404
       sveti_all = list(employees.objects.all())
       return HttpResponse(serialize('json', sveti_all))        
        
        # result = []
        # models = (employees) # 이전대상 모델들
        # for model in models:
            # result.extend(model.objects.all())
        # print serializers.serialize('json', result)
        # print serialize('json', result)

        # emps = employees.
        
        # dummy_data = {
        #     'name': '죠르디',
        #     'type': '공룡',
        #     'job': '편의점알바생',
        #     'age': 5
        # }
        # return JsonResponse(dummy_data)
        # return JsonResponse(emps)
        # return JsonResponse(emps)


    def post(self, request):
        # response_body = urlopen(request).read()
        # getJson = json.loads(response_body)["response"]["body"]       
        # employees(employee_id=getJson["fields"]["employee_id"], first_name=getJson["fields"]["first_name"], last_name=getJson["fields"]["last_name"], email=getJson["fields"]["email"]).save()
        # employees(employee_id=employee_id, first_name=first_name, last_name=last_name, email=email).save()
        cond_json = json.loads(request.body.decode('utf-8'))
        print(cond_json)
        fields = cond_json[0]["fields"]
        employees(employee_id=fields["employee_id"],first_name=fields["first_name"], last_name=fields["last_name"], email=fields["email"]).save()
        # print(cond)
        return HttpResponse("Post 요청을 잘받았다")

 

    # def post(self, request):
        # if request.method == 'POST': 
        #     note_data = request.POST 
        #     login_user = request.user
        #     data = employees(draft_user=login_user
        #     ,note_data=note_data.get('note_data')
        #     ,created_at=datetime.datetime.now(),updated_at=datetime.datetime.now()) 
        #     data.save() 
        # return HttpResponse("Post 요청을 잘받았다")

        # return HttpResponse("Post 요청을 잘받았다")
   
    def put(self, request):
        return HttpResponse("Put 요청을 잘받았다")

    def delete(self, request):
        return HttpResponse("Delete 요청을 잘받았다")
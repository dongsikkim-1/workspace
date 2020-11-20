# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse, JsonResponse

from django.shortcuts import render

# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

class IndexView(View):
    def get(self, request):
        dummy_data = {
            'name': '죠르디',
            'type': '공룡',
            'job': '편의점알바생',
            'age': 5
        }
        return JsonResponse(dummy_data)

    def post(self, request):
        return HttpResponse("Post 요청을 잘받았다")

    def put(self, request):
        return HttpResponse("Put 요청을 잘받았다")

    def delete(self, request):
        return HttpResponse("Delete 요청을 잘받았다")

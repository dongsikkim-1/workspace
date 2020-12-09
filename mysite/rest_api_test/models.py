from django.db import models

# Create your models here.
                 
class employees(models.Model):
    employee_id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=200, null = True)
    last_name = models.CharField(max_length=25)
    email = models.CharField(max_length=50)
    class Meta:
         db_table = "employees"


class departments(models.Model):
    department_id = models.IntegerField(primary_key=True)
    department_name = models.CharField(max_length=30)
    #manager = models.ForeignKey(employees, null = True)
    class Meta:
         db_table = "departments"


#manager = models.ForeignKey(employees, db_column = 'manager_id', null = True)

# python3 manage.py makemigrations  
# python3 manage.py migrate
# python3 manage.py migrate --run-syncdb

#python3 manage.py makemigrations;python3 manage.py migrate;python3 manage.py migrate --run-syncdb
#windows 10 python manage.py makemigrations;python manage.py migrate;python manage.py migrate --run-syncdb

# create table employees(
#     employee_id number,
#     first_name  varchar2(20),
#     last_name varchar2(25),
#     email varchar2(25)
# );
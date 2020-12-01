from django.db import models

# Create your models here.
                 
class employees(models.Model):
    employee_id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=20, null = True)
    last_name = models.CharField(max_length=25)
    email = models.CharField(max_length=25)
    class Meta:
         db_table = "employees"

# class departments(models.Model):
#     department_id = models.IntegerField(primary_key=True)
#     department_name = models.CharField(max_length=30)
#     manager = models.ForeignKey(employees, null = True)
#     class Meta:
#          db_table = "departments"


# manager = models.ForeignKey(employees, db_column = 'manager_id', null = True)
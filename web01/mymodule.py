import sys

class Foo:
	def func1():
		print("function 1")

	def func2(self):
		print(id(self))
		print("function 2")

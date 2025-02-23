from django import forms
from .models import Food, HealthGoal

# class GoalForm(forms.Form):
#     carbs = forms.IntegerField(label='Carbs (gm)', min_value=0)
#     proteins = forms.IntegerField(label='Proteins (gm)', min_value=0)
#     fats = forms.IntegerField(label='Fats (gm)', min_value=0)
#     calories = forms.IntegerField(label='Calories (Kcal)', min_value=0)

class HealthGoalForm(forms.ModelForm): 

    class Meta: 

        model = HealthGoal 

        fields = ['daily_calorie_goal', 'carb_goal', 'protein_goal', 'fat_goal'] 

class FoodForm(forms.ModelForm): 

    class Meta: 

        model = Food 

        fields = ["name", "carbs", "proteins", "fats", "calories"] 
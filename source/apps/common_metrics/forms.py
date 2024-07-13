from django import forms

from .models import CommonMetricVisualization
from apps.visualizations.models import Sankey, BarChart, StackedBarChart, VisualizationModel


class CommonMetricVisualizationForm(forms.ModelForm):
    """ visualization inline
    """

    def __init__(self,*args,**kwargs):
        super (CommonMetricVisualizationForm,self ).__init__(*args,**kwargs) # populates the post
        self.fields['bar_chart'].queryset = BarChart.objects.all()
        self.fields['sankey'].queryset = Sankey.objects.all()

    def clean(self):
        dual_axis = self.cleaned_data.get('dual_axis_line_and_column')
        bar_chart = self.cleaned_data.get('bar_chart')
        stacked_bar_chart = self.cleaned_data.get('stacked_bar_chart')
        sankey = self.cleaned_data.get('sankey')
        line_chart = self.cleaned_data.get('line_chart')
        # scatter_chart = self.cleaned_data.get('scatter_chart')
        # boxplot = self.cleaned_data.get('boxplot')
        count = 0
        if bar_chart:
            count+=1
        if sankey:
            count+=1
        if stacked_bar_chart:
            count+=1
        if line_chart:
            count+=1
        # if scatter_chart:
        #     count+=1
        # if boxplot:
        #     count+=1
        if dual_axis:
            count+=1

        if count > 1:
            raise forms.ValidationError("Please select only one chart per spot")

        if count == 0:
            raise forms.ValidationError("Please select one chart per spot")

        return self.cleaned_data

    class Meta:
        model = CommonMetricVisualization
        fields = ['order', 'line_chart', 'bar_chart', 'stacked_bar_chart', 'sankey', 'map_chart', 'dual_axis_line_and_column',] # 'scatter_chart', 'boxplot', 


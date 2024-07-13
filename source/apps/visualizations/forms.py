from django import forms

from .models import Coordinate, DataStoryBarChartDataSet, DataStorySankeyDataSet, DataStoryDualAxisLineAndColumnDataSet, DataStoryStackedBarChartDataSet, DataStoryLineChartDataSet, DataStoryScatterChartDataSet, DataStoryBoxplotDataSet


class CoordinateForm(forms.ModelForm):
    """ coordinate inline
    """
    class Meta:
        model = Coordinate
        fields = ['latitude', 'longitude', 'title', 'tooltip_content']


class DataStoryBarChartDataSetForm(forms.ModelForm):
    """ bar chart data set inline
    """
    class Meta:
        model = DataStoryBarChartDataSet
        fields = '__all__'

class DataStoryLineChartDataSetForm(forms.ModelForm):
    """ bar chart data set inline
    """
    class Meta:
        model = DataStoryLineChartDataSet
        fields = '__all__'

class DataStoryScatterChartDataSetForm(forms.ModelForm):
    """ scatter chart data set inline
    """
    class Meta:
        model = DataStoryScatterChartDataSet
        fields = '__all__'

class DataStoryBoxplotDataSetForm(forms.ModelForm):
    """ boxplot data set inline
    """
    class Meta:
        model = DataStoryBoxplotDataSet
        fields = '__all__'

class DataStoryStackedBarChartDataSetForm(forms.ModelForm):
    """ bar chart data set inline
    """
    class Meta:
        model = DataStoryStackedBarChartDataSet
        fields = '__all__'


class DataStorySankeyDataSetForm(forms.ModelForm):
    """ sankey data set inline
    """
    class Meta:
        model = DataStorySankeyDataSet
        fields = '__all__'


class DataStoryDualAxisLineAndColumnDataSetForm(forms.ModelForm):
    """ dual axis data set inline
    """
    class Meta:
        model = DataStoryDualAxisLineAndColumnDataSet
        fields = '__all__'

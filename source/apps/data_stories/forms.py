from django import forms

from .models import NarrativeSection


class NarrativeSectionForm(forms.ModelForm):
    """ narrative section inline
    """
    class Meta:
        model = NarrativeSection
        fields = ['sankey', 'bar_chart', 'stacked_bar_chart', 'map_chart', 'dual_axis_line_and_column', 'line_chart', 'scatter_chart', 'boxplot']

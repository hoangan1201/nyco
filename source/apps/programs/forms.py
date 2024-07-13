from django import forms

from .models import Contact, Location, ProgramLink


class ContactForm(forms.ModelForm):
    """ contact inline
    """
    class Meta:
        model = Contact
        fields = ['order', 'name', 'email', 'phone']


class ProgramLinkForm(forms.ModelForm):
    """ contact inline
    """
    class Meta:
        model = ProgramLink
        fields = ['url', 'label']


class LocationForm(forms.ModelForm):
    """ Locations, no limit
    """
    class Meta:
        model = Location
        fields = '__all__'

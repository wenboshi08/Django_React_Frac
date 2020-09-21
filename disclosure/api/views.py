from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import DisclosureSerializer
from disclosure.models import Disclosure

class DisclosureViewSet(viewsets.ModelViewSet):
    queryset = Disclosure.objects.all()
    serializer_class = DisclosureSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['cas_number_corrected', 'state_name', 'api_number', 'operator_name']




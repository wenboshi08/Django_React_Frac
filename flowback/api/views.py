from rest_framework import viewsets

from .serializers import FlowbackMeasurementSerializer
from flowback.models import FlowbackMeasurement

class FlowbackMeasurementViewSet(viewsets.ModelViewSet):
    queryset = FlowbackMeasurement.objects.all()
    serializer_class = FlowbackMeasurementSerializer
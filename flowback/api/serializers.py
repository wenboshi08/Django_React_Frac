from rest_framework import serializers

from flowback.models import FlowbackMeasurement

class FlowbackMeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlowbackMeasurement
        fields = '__all__'
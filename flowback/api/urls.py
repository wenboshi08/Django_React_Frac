from rest_framework import routers

from .views import FlowbackMeasurementViewSet

router = routers.DefaultRouter()
router.register('flowback', FlowbackMeasurementViewSet, 'flowback')

urlpatterns = router.urls
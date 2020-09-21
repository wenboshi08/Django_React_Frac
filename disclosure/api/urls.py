from rest_framework import routers

from .views import DisclosureViewSet

router = routers.DefaultRouter()
router.register('disclosure', DisclosureViewSet, 'disclosure')

urlpatterns = router.urls

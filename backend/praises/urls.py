from rest_framework.routers import DefaultRouter
from .views import PraiseViewSet

router = DefaultRouter()
router.register(r'', PraiseViewSet, basename='praise')

urlpatterns = router.urls

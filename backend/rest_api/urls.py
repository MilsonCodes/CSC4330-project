from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

# The default router will include all CRUD routes for associated view sets
# The CRUD methods will be accessed using GET, POST, PUT, PATCH, and DELETE requests
router = DefaultRouter()
router.register('users', views.UserViewSet)
router.register('address', views.LocationViewSet)
router.register('company', views.CompanyViewSet)
router.register('association', views.AssociationViewSet)
router.register('committee', views.CommitteeViewSet)
router.register('listings', views.ListingViewSet)
router.register('applications', views.ApplicationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

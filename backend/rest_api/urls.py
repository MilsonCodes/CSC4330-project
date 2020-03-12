from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

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

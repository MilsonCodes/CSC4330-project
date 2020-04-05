from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

# Method used for registering users
register = views.AuthViewSet.as_view({'post': 'create'})
# Logout
logout = views.AuthViewSet.as_view({'post': 'sign_out'})
# Company Read only
companyList = views.CompanyList().as_view()
# Listings by company
companyListings = views.CompanyViewSet.as_view({'get': 'listings'})

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
router.register('auth', views.AuthViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register', register),
    path('login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout', logout),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('companies', companyList),
    path('listings/company/<int:company_id>', companyListings, name='company_listings')
]

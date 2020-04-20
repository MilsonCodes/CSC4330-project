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
# Stakeholder report
report = views.StakeHolderView().as_view()
# Applications by user
user_app = views.UserAppsView
# Applications by listing
list_app = views.ListingAppsView
# User Resume
user_res = views.UserResumeView
# Update application
update_app = views.ApplicationViewSet.as_view({'post': 'update_app'})
# Upload resume
res_up = views.UserResumeView

# The default router will include all CRUD routes for associated view sets
# The CRUD methods will be accessed using GET, POST, PUT, PATCH, and DELETE requests
# Documentation: https://www.django-rest-framework.org/api-guide/routers/#defaultrouter
router = DefaultRouter() # Automatically creates a set of routes for CRUD methods
router.register('users', views.UserViewSet) # User profile routes
router.register('address', views.LocationViewSet) # Address routes
router.register('company', views.CompanyViewSet) # Company routes
router.register('association', views.AssociationViewSet) # Association routes
router.register('committee', views.CommitteeViewSet) # Committe routes
router.register('listings', views.ListingViewSet) # Listing routes
router.register('applications', views.ApplicationViewSet) # Application routes
router.register('auth', views.AuthViewSet) # Authorization routes (uers/login/token)

# Accessible URL routes
urlpatterns = [
    path('', include(router.urls)), # Include above default routes
    path('register', register), # User registration route
    path('login', TokenObtainPairView.as_view(), name='token_obtain_pair'), # Login route (obtain tokens)
    path('logout', logout), # Logout route (blacklist tokens)
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # Refresh access token
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'), # Verify token is valid
    path('companies', companyList), # Route for listing Companies [unauthorized; read only]
    path('listings/company/<int:company_id>', companyListings, name='company_listings'), # Route for showing Company and Listings
    path('report', report),
    path('users/<int:id>/applications', user_app.as_view(), name='user_applications'),
    path('listings/<int:id>/applications', list_app.as_view(), name='listing_applications'),
    path('users/<int:id>/resume/<filename>', user_res.as_view()),
    path('application/<int:id>', update_app),
]

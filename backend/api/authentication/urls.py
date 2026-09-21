from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import DevLoginView, LoginView, SignupView

urlpatterns = [
    path("signup/", SignupView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path("dev-login/", DevLoginView.as_view(), name="dev-login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
]

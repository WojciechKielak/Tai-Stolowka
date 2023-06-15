from django.urls import path
from rest_framework import routers
from app.settings import MEDIA_ROOT, MEDIA_URL
from django.conf.urls.static import static 


router = routers.DefaultRouter()
urlpatterns = router.urls + static(MEDIA_URL, document_root=MEDIA_ROOT)

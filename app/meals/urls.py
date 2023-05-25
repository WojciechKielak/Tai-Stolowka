# w sumie po nic to jest : D
from django.urls import path
from rest_framework import routers
from app.settings import MEDIA_ROOT, MEDIA_URL
from django.conf.urls.static import static 

router = routers.DefaultRouter()
#router.register(r'articles', ArticleViewSet, basename='articles')
#router.register(r'trade', TradeViewSet, basename='trade')
#router.register(r'users', UserDataViewSet, basename='users')
urlpatterns = router.urls + static(MEDIA_URL, document_root=MEDIA_ROOT)

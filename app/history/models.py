from django.db import models
from account.models import User
from meals.models import Meal

class History(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_amt = models.IntegerField(default=0)
    # paid_status = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {', '.join(str(product) for product in self.cart_items.all())}"

    class Meta:
        verbose_name_plural = "Histories"

class CartItem(models.Model):
    order = models.ForeignKey(History, on_delete=models.CASCADE, related_name='cart_items')
    item = models.ForeignKey(Meal, on_delete=models.CASCADE)
    qty = models.IntegerField()

    class Meta:
        verbose_name_plural = "CartItems"
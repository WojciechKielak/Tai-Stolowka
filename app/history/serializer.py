from rest_framework import serializers
from .models import History, CartItem
from meals.models import Meal


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['item', 'qty']

class HistorySerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(many=True, required=False)

    class Meta:
        model = History
        fields = '__all__'

    def create(self, validated_data):
        cart_items_data = validated_data.pop('cart_items', [])
        history = History.objects.create(**validated_data)
        for cart_item_data in cart_items_data:
            CartItem.objects.create(order=history, **cart_item_data)
        return history
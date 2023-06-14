from rest_framework.views import APIView

from rest_framework.response import Response

from .serializer import HistorySerializer, CartItemSerializer

from .models import History, CartItem




class HistoryCreateView(APIView):

    def get(self, request):

        histories = History.objects.all()

        history_serializer = HistorySerializer(histories, many=True)




        response_data = {

            'histories': history_serializer.data

        }

        return Response(response_data)




    def post(self, request):

        serializer = HistorySerializer(data=request.data)

        if serializer.is_valid():

            history = serializer.save()

            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)




class UserHistoryView(APIView):

    def get(self, request, user_id):

        histories = History.objects.filter(user_id=user_id)

        history_serializer = HistorySerializer(histories, many=True)




        cart_items = CartItem.objects.filter(order__in=histories)

        cart_items_serializer = CartItemSerializer(cart_items, many=True)




        response_data = {

            'histories': history_serializer.data,

            'cart_items': cart_items_serializer.data

        }

        return Response(response_data)
from rest_framework.views import APIView

from rest_framework.response import Response

from .serializer import HistorySerializer, CartItemSerializer

from .models import History, CartItem

from rest_framework import status

from rest_framework.decorators import api_view





@api_view(['POST'])

def post(request):

    print(request.data)

    serializer = HistorySerializer(data=request.data)

    if serializer.is_valid():

        history = serializer.save()

        return Response(serializer.data, status=201)

    print(serializer.errors)

    return Response(serializer.errors, status=400)





@api_view(['GET', 'PUT'])

def history(request, id=None):

    if request.method == 'GET':

        if id:

            histories = History.objects.filter(user_id=id)

        else:

            histories = History.objects.all()

        history_serializer = HistorySerializer(histories, many=True)

        cart_items = CartItem.objects.filter(order__in=histories)

        cart_items_serializer = CartItemSerializer(cart_items, many=True)




        response_data = {

            'histories': history_serializer.data

        }

        return Response(response_data)

    elif request.method == 'PUT':

        try:

            history = History.objects.get(id=id)

            history.status = True

            history.save()

            serializer = HistorySerializer(history)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except History.DoesNotExist:

            return Response("History not found.", status=status.HTTP_404_NOT_FOUND)
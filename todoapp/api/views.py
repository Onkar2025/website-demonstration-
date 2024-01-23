from django.shortcuts import render

# from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Note
from .serilizers import Noteserilizer


# Create your views here
@api_view(["GET"])
def getRoute(request):
    routes = [
        {
            "Endpoint": "/notes/",
            "method": "GET",
            "body": None,
            "description": "Returns an array of notes",
        },
        {
            "Endpoint": "/notes/id",
            "method": "GET",
            "body": None,
            "description": "Returns a single note object",
        },
        {
            "Endpoint": "/notes/create/",
            "method": "POST",
            "body": {"body": ""},
            "description": "Creates new note with data sent in post request",
        },
        {
            "Endpoint": "/notes/id/update/",
            "method": "PUT",
            "body": {"body": ""},
            "description": "Creates an existing note with data sent in post request",
        },
        {
            "Endpoint": "/notes/id/delete/",
            "method": "DELETE",
            "body": None,
            "description": "Deletes and exiting note",
        },
    ]
    return Response(routes)


@api_view(["GET"])
def getnotes(request):
    note = Note.objects.all().order_by("-updated")
    serilizer = Noteserilizer(note, many=True)
    return Response(serilizer.data)


@api_view(["GET"])
def getNote(request, pk):
    pram = request.GET.get("id")
    note = Note.objects.get(id=pk)
    serilizer = Noteserilizer(note, many=False)
    return Response(serilizer.data)


@api_view(["PUT"])
def updatenote(request, pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = Noteserilizer(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response({"error": "Invalid data", "details": serializer.errors})


@api_view(["DELETE"])
def deletenote(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response("note was deleted ")


@api_view(["POST"])
def createnote(request):
    data = request.data
    note = Note.objects.create(body=data["body"])
    serializer = Noteserilizer(note, many=False)  # Correct the serializer instantiation

    return Response(serializer.data)

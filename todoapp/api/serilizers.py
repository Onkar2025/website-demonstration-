from rest_framework.serializers import ModelSerializer
from .models import Note


class Noteserilizer(ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "body", "updated"]

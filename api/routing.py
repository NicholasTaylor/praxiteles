from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    #re_path(r'ws/ResultImg/[0-9]*$', consumers.PromptConsumer.as_asgi()),
    re_path(r'ws/OngoingPrompt/[A-Za-z\-0-9]*$', consumers.PromptConsumer.as_asgi()),
]
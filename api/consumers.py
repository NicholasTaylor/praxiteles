import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

class PromptConsumer(WebsocketConsumer):
    def connect(self):
        self.result_img_id = ''.join(self.scope['path'].split('/')[-1:])
        self.result_img_group_name = 'result_img_id_%s' % str(self.result_img_id)
        async_to_sync(self.channel_layer.group_add)(
            self.result_img_group_name, self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.result_img_group_name, self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        result_img_id = text_data_json['result_img_id']
        async_to_sync(self.channel_layer.group_send)(
            self.result_img_group_name, 
            {
                'type': 'send_result_img', 
                'result_img_id': result_img_id
            }
        )
        self.disconnect(0)
    
    def send_result_img(self, event):
        result_img_id = event['result_img_id']
        self.send(text_data=json.dumps({'result_img_id': result_img_id}))
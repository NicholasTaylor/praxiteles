from rest_framework.exceptions import APIException

class InvalidModelIdentifer(APIException):
    status_code = 404
    default_detail = "This is not a local folder and is not a valid model identifier listed on 'https://huggingface.co/models' If this is a private repository, make sure your api key is properly configured in settings.py."
    default_code = "invalid_model_identifier"

class DuplicateModel(APIException):
    status_code = 409
    default_detail = "The model and revision you specified already exists in the system. There is no need to add it again."
    default_code = "duplicate_model"

class PromptAlreadyComplete(APIException):
    status_code = 418
    default_detail = "The prompt you're trying to cancel has already completed."
    default_code = "prompt_already_complete"

class PromptAlreadyCanceled(APIException):
    status_code = 418
    default_detail = "The prompt you're trying to cancel is already canceled."
    default_code = "prompt_already_canceled"
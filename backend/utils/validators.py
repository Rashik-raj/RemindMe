from django.core.validators import RegexValidator

phone_regex = RegexValidator(
    regex=r"^98\d{8}$",
    message="Phone number must be of 10 digit 98XXXXXXXX",
)

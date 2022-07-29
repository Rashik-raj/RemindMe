from django.contrib.auth.models import User
from django.db import models
from nepali_address.models import Province, District, Municipality

from utils.validators import phone_regex


class Profile(models.Model):
    class Meta:
        db_table = 'profile'
        verbose_name = 'Profile'
        verbose_name_plural = 'Profiles'

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile = models.ImageField(upload_to='profile/', blank=True, null=True)
    dob = models.DateField(null=True, blank=True)
    province = models.ForeignKey(Province, on_delete=models.CASCADE, null=True, blank=True)
    district = models.ForeignKey(District, on_delete=models.CASCADE, null=True, blank=True)
    municipality = models.ForeignKey(Municipality, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=50, null=True, blank=True)
    phone = models.CharField(max_length=10, null=True, blank=True, validators=[phone_regex])

    def __str__(self):
        return self.user.get_full_name()

    def get_phone(self):
        return f"+977-{self.phone}"

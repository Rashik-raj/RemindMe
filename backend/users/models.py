from django.contrib.auth.models import AbstractUser
from django.db import models
from nepali_address.models import Province, District, Municipality

from users.managers.user import UserManager
from utils.validators import phone_regex


class User(AbstractUser):
    USERNAME_FIELD = 'email'
    email = models.EmailField(unique=True)
    REQUIRED_FIELDS = []  # removes email from REQUIRED_FIELDS

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self.email.split("@")[0]
        super().save(*args, **kwargs)

    objects = UserManager()

    @property
    def full_name(self):
        return self.get_full_name()

    def is_owner(self, user):
        return self == user

    def create_profile(self):
        return Profile.objects.get_or_create(user=self)


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

    def is_owner(self, user):
        return self.user == user

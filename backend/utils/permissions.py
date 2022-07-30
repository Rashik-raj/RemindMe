from rest_framework.permissions import BasePermission


class ReminMePermission(BasePermission):
    def has_permission(self, request, view):
        return True

    def has_object_permission(self, request, view, obj):
        return True if request.user.is_superuser else obj.is_owner(request.user)


class ProfilePermission(ReminMePermission):
    def has_permission(self, request, view):
        if view.action == "create":
            return False
        if request.user.is_superuser:
            return True
        if view.action == "list":
            return False
        return request.user.is_authenticated


class UserPermission(ReminMePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        if view.action == "create":
            return True
        return request.user.is_authenticated

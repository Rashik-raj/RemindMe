from rest_framework.permissions import BasePermission


class RemindMePermission(BasePermission):
    def has_permission(self, request, view):
        return True

    def has_object_permission(self, request, view, obj):
        return True if request.user.is_superuser else obj.is_owner(request.user)


class ProfilePermission(RemindMePermission):
    def has_permission(self, request, view):
        if view.action in ("create", "destroy"):
            return False
        if request.user.is_superuser:
            return True
        if view.action == "list":
            return False
        return request.user.is_authenticated


class UserPermission(RemindMePermission):
    def has_permission(self, request, view):
        if view.action == "destroy":
            return False
        if request.user.is_superuser:
            return True
        if view.action == "create":
            return True
        return request.user.is_authenticated


class SchedulePermission(RemindMePermission):
    def has_permission(self, request, view):
        if view.action == "list" and request.query_params.get('all', None):
            return request.user.is_superuser
        return request.user.is_authenticated

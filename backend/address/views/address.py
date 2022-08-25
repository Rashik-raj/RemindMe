from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema
from nepali_address.models import Province, District, Municipality
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from address.serializers.address import ProvinceSerializer, DistrictSerializer, MunicipalitySerializer


class AddressViewSet(ViewSet):
    permission_classes = (IsAuthenticated,)

    @extend_schema(responses=ProvinceSerializer(many=True))
    @action(detail=False, methods=["GET"])
    def provinces(self, request):
        qs = Province.objects.all()
        serializer = ProvinceSerializer(qs, many=True)
        return Response(serializer.data)

    @extend_schema(responses=ProvinceSerializer)
    @action(detail=False, methods=["GET"], url_path=r"provinces/(?P<pk>[0-9]+)")
    def province_detail(self, request, pk):
        qs = get_object_or_404(Province, pk=pk)
        serializer = ProvinceSerializer(qs)
        return Response(serializer.data)

    @extend_schema(responses=DistrictSerializer(many=True))
    @action(detail=False, methods=["GET"])
    def districts(self, request):
        qs = District.objects.all()
        serializer = DistrictSerializer(qs, many=True)
        return Response(serializer.data)

    @extend_schema(responses=DistrictSerializer)
    @action(detail=False, methods=["GET"], url_path=r"districts/(?P<pk>[0-9]+)")
    def district_detail(self, request, pk):
        qs = get_object_or_404(District, pk=pk)
        serializer = DistrictSerializer(qs)
        return Response(serializer.data)

    @extend_schema(responses=MunicipalitySerializer(many=True))
    @action(detail=False, methods=["GET"])
    def municipalities(self, request):
        qs = Municipality.objects.all()
        serializer = MunicipalitySerializer(qs, many=True)
        return Response(serializer.data)

    @extend_schema(responses=MunicipalitySerializer)
    @action(detail=False, methods=["GET"], url_path=r"municipalities/(?P<pk>[0-9]+)")
    def municipality_detail(self, request, pk):
        qs = get_object_or_404(Municipality, pk=pk)
        serializer = MunicipalitySerializer(qs)
        return Response(serializer.data)

    @extend_schema(responses=DistrictSerializer(many=True))
    @action(detail=False, methods=["GET"], url_path=r"provinces/(?P<pk>[0-9]+)/districts")
    def province_districts(self, request, pk):
        qs = get_object_or_404(Province, pk=pk).district_set.all()
        serializer = DistrictSerializer(qs, many=True)
        return Response(serializer.data)

    @extend_schema(responses=MunicipalitySerializer(many=True))
    @action(detail=False, methods=["GET"], url_path=r"districts/(?P<pk>[0-9]+)/municipalities")
    def district_municipalities(self, request, pk):
        qs = get_object_or_404(District, pk=pk).municipality_set.all()
        serializer = MunicipalitySerializer(qs, many=True)
        return Response(serializer.data)

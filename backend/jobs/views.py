from rest_framework import generics, permissions, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count, Q
from .models import JobApplication
from .serializers import JobApplicationSerializer


class JobApplicationListCreateView(generics.ListCreateAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["company", "role", "location", "status"]
    ordering_fields = ["created_at", "applied_date", "company"]

    def get_queryset(self):
        qs = JobApplication.objects.filter(user=self.request.user)
        status = self.request.query_params.get("status")
        if status:
            qs = qs.filter(status=status)
        return qs

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class JobApplicationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return JobApplication.objects.filter(user=self.request.user)


class JobStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        qs = JobApplication.objects.filter(user=request.user)
        total = qs.count()
        by_status = qs.values("status").annotate(count=Count("id"))
        status_map = {item["status"]: item["count"] for item in by_status}

        return Response({
            "total": total,
            "applied": status_map.get("applied", 0),
            "screening": status_map.get("screening", 0),
            "interview": status_map.get("interview", 0),
            "offer": status_map.get("offer", 0),
            "rejected": status_map.get("rejected", 0),
            "wishlist": status_map.get("wishlist", 0),
            "withdrawn": status_map.get("withdrawn", 0),
            "response_rate": round((status_map.get("screening", 0) + status_map.get("interview", 0) + status_map.get("offer", 0)) / total * 100, 1) if total else 0,
        })

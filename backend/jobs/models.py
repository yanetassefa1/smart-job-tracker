from django.db import models
from django.conf import settings


class JobApplication(models.Model):
    STATUS_CHOICES = [
        ("wishlist", "Wishlist"),
        ("applied", "Applied"),
        ("screening", "Screening"),
        ("interview", "Interview"),
        ("offer", "Offer"),
        ("rejected", "Rejected"),
        ("withdrawn", "Withdrawn"),
    ]

    WORK_TYPE_CHOICES = [
        ("remote", "Remote"),
        ("hybrid", "Hybrid"),
        ("onsite", "On-site"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="applications",
    )
    company = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="applied")
    work_type = models.CharField(max_length=20, choices=WORK_TYPE_CHOICES, default="hybrid")
    location = models.CharField(max_length=200, blank=True)
    job_url = models.URLField(blank=True)
    salary_min = models.PositiveIntegerField(null=True, blank=True)
    salary_max = models.PositiveIntegerField(null=True, blank=True)
    applied_date = models.DateField(null=True, blank=True)
    follow_up_date = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True)
    contact_name = models.CharField(max_length=200, blank=True)
    contact_email = models.EmailField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.role} @ {self.company} ({self.status})"

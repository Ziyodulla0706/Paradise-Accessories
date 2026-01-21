"""
Management command to cleanup old analytics events.
"""
from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from analytics.models import AnalyticsEvent


class Command(BaseCommand):
    help = 'Delete analytics events older than specified days'

    def add_arguments(self, parser):
        parser.add_argument(
            '--days',
            type=int,
            default=90,
            help='Delete events older than N days (default: 90)'
        )
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Show what would be deleted without actually deleting'
        )

    def handle(self, *args, **options):
        days = options['days']
        dry_run = options.get('dry_run', False)

        cutoff_date = timezone.now() - timedelta(days=days)
        
        # Count events to be deleted
        events_to_delete = AnalyticsEvent.objects.filter(timestamp__lt=cutoff_date)
        count = events_to_delete.count()

        self.stdout.write(
            f'Found {count} analytics events older than {days} days '
            f'(before {cutoff_date.strftime("%Y-%m-%d %H:%M:%S")})'
        )

        if count == 0:
            self.stdout.write(self.style.SUCCESS('No events to delete.'))
            return

        if dry_run:
            self.stdout.write(
                self.style.WARNING(
                    f'DRY RUN: Would delete {count} events. '
                    'Run without --dry-run to actually delete.'
                )
            )
        else:
            # Delete events
            deleted_count, _ = events_to_delete.delete()
            self.stdout.write(
                self.style.SUCCESS(
                    f'Successfully deleted {deleted_count} analytics events.'
                )
            )

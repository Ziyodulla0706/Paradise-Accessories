"""
Management command to export leads to CSV file.
"""
from django.core.management.base import BaseCommand
from django.utils import timezone
from leads.models import Lead
import csv
import os
from pathlib import Path


class Command(BaseCommand):
    help = 'Export leads to CSV file'

    def add_arguments(self, parser):
        parser.add_argument(
            '--output',
            type=str,
            default='leads_export.csv',
            help='Output CSV file path (default: leads_export.csv)'
        )
        parser.add_argument(
            '--status',
            type=str,
            help='Filter by status (new, contacted, qualified, closed, rejected)'
        )
        parser.add_argument(
            '--start-date',
            type=str,
            help='Filter from date (YYYY-MM-DD)'
        )
        parser.add_argument(
            '--end-date',
            type=str,
            help='Filter to date (YYYY-MM-DD)'
        )
        parser.add_argument(
            '--all',
            action='store_true',
            help='Export all leads (default: last 30 days)'
        )

    def handle(self, *args, **options):
        output_path = options['output']
        status_filter = options.get('status')
        start_date = options.get('start_date')
        end_date = options.get('end_date')
        export_all = options.get('all', False)

        # Build queryset
        queryset = Lead.objects.all()

        # Apply filters
        if status_filter:
            queryset = queryset.filter(status=status_filter)

        if not export_all:
            # Default: last 30 days
            if not start_date:
                start_date = (timezone.now() - timezone.timedelta(days=30)).date()
            else:
                from datetime import datetime
                start_date = datetime.strptime(start_date, '%Y-%m-%d').date()

        if start_date:
            queryset = queryset.filter(created_at__date__gte=start_date)

        if end_date:
            from datetime import datetime
            end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
            queryset = queryset.filter(created_at__date__lte=end_date)

        # Count leads
        total_leads = queryset.count()
        self.stdout.write(f'Exporting {total_leads} leads...')

        if total_leads == 0:
            self.stdout.write(self.style.WARNING('No leads found to export.'))
            return

        # Create output directory if needed
        output_dir = os.path.dirname(output_path) if os.path.dirname(output_path) else '.'
        if output_dir and not os.path.exists(output_dir):
            os.makedirs(output_dir, exist_ok=True)

        # Write CSV
        with open(output_path, 'w', newline='', encoding='utf-8-sig') as csvfile:
            writer = csv.writer(csvfile)
            
            # Header
            writer.writerow([
                'ID', 'Дата создания', 'Имя', 'Компания', 'Телефон', 'Email',
                'Тип продукта', 'Количество', 'Сообщение', 'Статус',
                'Язык', 'Источник', 'IP адрес', 'Файл'
            ])
            
            # Data
            for lead in queryset:
                writer.writerow([
                    lead.id,
                    lead.created_at.strftime('%d.%m.%Y %H:%M'),
                    lead.name,
                    lead.company,
                    lead.phone,
                    lead.email or '',
                    lead.get_product_type_display(),
                    lead.quantity or '',
                    lead.message,
                    lead.get_status_display(),
                    lead.language,
                    lead.source or '',
                    str(lead.ip_address) if lead.ip_address else '',
                    'Да' if lead.file else 'Нет',
                ])

        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully exported {total_leads} leads to {output_path}'
            )
        )

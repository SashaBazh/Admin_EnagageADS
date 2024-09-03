import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { ServiceAssignmentsService } from '../../services/service-assignments/service-assignments.service';

declare var bootstrap: any;

@Component({
  selector: 'app-service-assignments',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, HeaderComponent],
  templateUrl: './service-assignments.component.html',
  styleUrl: './service-assignments.component.css'
})
export class ServiceAssignmentsComponent implements OnInit, OnDestroy{
  isDarkTheme: boolean = false;
  private themeSubscription: Subscription | null = null;

  orders: any[] = [];
  selectedOrderId: number | null = null;
  newStatus: string = '';

  orderStatuses = [
    'created',
    'in_agreement',
    'on_placement',
    'in_process',
    'finished',
    'cancelled'
  ];

  constructor(private assignmentsService: ServiceAssignmentsService, private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeSubscription = this.themeService.getThemeObservable().subscribe(
      isDark => {
        this.isDarkTheme = isDark;
      }
    );

    this.fetchOrders();
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  fetchOrders(): void {
    this.assignmentsService.getOrders().subscribe(
      data => this.orders = data,
      error => console.error('Failed to fetch orders', error)
    );
  }

  updateStatus(): void {
    if (this.selectedOrderId && this.newStatus) {
      const payload = {
        order_id: this.selectedOrderId,
        status: this.newStatus
      };
      this.assignmentsService.updateOrderStatus(payload).subscribe(
        (response) => {
          console.log('Order status updated successfully', response);
          this.fetchOrders();
        },
        (error) => console.error('Failed to update order status', error)
      );
    }
  }

  openModal(orderId: number) {
    this.selectedOrderId = orderId;
    const modalElement = document.getElementById('updateStatusModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  closeModal() {
    this.selectedOrderId = null;
    this.newStatus = '';
  }
}

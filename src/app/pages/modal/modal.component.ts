import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  @Input() message: string = '';
  private modalInstance: any;

  ngOnInit() {
    const modalElement = document.getElementById('resultModal');
    if (modalElement) {
      this.modalInstance = new (window as any).bootstrap.Modal(modalElement, {
        backdrop: 'static',
        keyboard: false
      });
    }
  }

  show() {
    if (this.modalInstance) {
      this.modalInstance.show();
    } else {
      console.error('Modal instance not found');
    }
  }

  hide() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }
}



import { Injectable, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class IonicToastService {
  private readonly toastController = inject(ToastController);
  constructor() {}

  showToast(message: string, duration: number = 2000) {
    this.toastController.create({
      message,
      duration,
    });
  }
}

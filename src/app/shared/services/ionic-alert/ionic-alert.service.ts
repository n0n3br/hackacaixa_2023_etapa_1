import { Injectable, inject } from '@angular/core';
import { AlertController, IonicSafeString } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class IonicAlertService {
  private readonly alertController = inject(AlertController);
  constructor() {}

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'alertCustomClass',
      header,
      message: new IonicSafeString(message),
      buttons: ['OK'],
    });

    await alert.present();
  }
}

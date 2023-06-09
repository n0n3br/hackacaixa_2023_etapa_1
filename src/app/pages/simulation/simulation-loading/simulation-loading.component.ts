import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { IonicModule, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-simulation-loading',
  standalone: true,
  template: '',
  imports: [IonicModule],
})
export class SimulationLoadingComponent implements OnInit, OnChanges {
  private readonly loadinController = inject(LoadingController);
  private loadingElement?: HTMLIonLoadingElement;

  @Input() loading = false;
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loading']) {
      const loading = changes['loading'].currentValue;
      if (loading) {
        this.showLoading();
        return;
      }
      this.hideLoading();
    }
  }

  async createLoading() {
    this.loadingElement = await this.loadinController.create({
      message: 'Carregando ...',
    });
  }

  async showLoading() {
    if (!this.loadingElement) {
      await this.createLoading();
    }
    this.loadingElement?.present();
  }

  hideLoading() {
    this.loadingElement?.dismiss();
  }
}

import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AppService } from './app.service';
import { LoadingComponent } from './shared/components/loading/loading.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, LoadingComponent, CommonModule],
})
export class AppComponent {
  private readonly appService = inject(AppService);
  loading$ = this.appService.loading$;
  constructor() {}
}

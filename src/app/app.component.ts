import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { StoreService } from './shared/store/store.service';
import { LoadingComponent } from './shared/components/loading/loading.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, LoadingComponent, CommonModule],
})
export class AppComponent {
  private readonly store = inject(StoreService);
  loading$ = this.store.loading$;
  constructor() {}
}

import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StoreService } from 'src/app/shared/store/store.service';
import { SimulationSelectorComponent } from './simulation-selector/simulation-selector.component';
import { SimulationListComponent } from './simulation-list/simulation-list.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    SimulationSelectorComponent,
    SimulationListComponent,
    HeaderComponent,
  ],
})
export class SimulationComponent implements OnInit {
  private readonly store = inject(StoreService);

  constructor() {}

  ngOnInit() {
    this.store.getSimulacao();
  }
}

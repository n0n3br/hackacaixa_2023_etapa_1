import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { combineLatest, map } from 'rxjs';
import { AppService } from 'src/app/app.service';
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
  appService = inject(AppService);
  name$ = this.appService.name$;
  loading$ = this.appService.loading$;
  results$ = this.appService.results$;
  currentResult$ = this.appService.currentResult$;
  loading?: any;

  vm$ = combineLatest([
    this.name$,
    this.loading$,
    this.results$,
    this.currentResult$,
  ]).pipe(
    map(([name, loading, results, currentResult]) => ({
      name,
      loading,
      results,
      currentResult,
    }))
  );

  constructor() {}

  ngOnInit() {
    this.appService.getSimulacao();
  }
}

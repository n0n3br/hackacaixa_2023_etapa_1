import { CommonModule, Location } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { combineLatest, map } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-simulation-list',
  standalone: true,
  templateUrl: './simulation-list.component.html',
  styleUrls: ['./simulation-list.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class SimulationListComponent implements OnInit {
  appService = inject(AppService);
  destroyRef = inject(DestroyRef);
  location = inject(Location);
  currentResult$ = this.appService.currentResult$;
  name$ = this.appService.name$;
  installments$ = this.appService.selectedInstallments$;
  type$ = this.appService.selectedType$;

  vm$ = combineLatest([
    this.name$,
    this.installments$,
    this.currentResult$,
    this.type$,
  ]).pipe(
    map(([name, installments, result, type]) => ({
      name,
      installments,
      result,
      type,
    }))
  );

  constructor() {}

  ngOnInit() {}
  goBack() {
    this.location.back();
  }
}

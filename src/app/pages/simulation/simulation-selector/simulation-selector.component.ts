import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AppService } from 'src/app/app.service';
import { SimulationLoadingComponent } from '../simulation-loading/simulation-loading.component';
import { combineLatest, map } from 'rxjs';
import { ResultadoSimulacao } from 'src/app/shared/model/ResultadoSimulacao';
import { Router } from '@angular/router';
import { Total } from 'src/app/shared/model/Total';

@Component({
  selector: 'app-simulation-selector',
  standalone: true,
  templateUrl: './simulation-selector.component.html',
  styleUrls: ['./simulation-selector.component.scss'],
  imports: [IonicModule, CommonModule, SimulationLoadingComponent],
})
export class SimulationSelectorComponent implements OnInit {
  appService = inject(AppService);
  router = inject(Router);
  location = inject(Location);
  name$ = this.appService.name$;
  currentResult$ = this.appService.currentResult$;
  loading$ = this.appService.loading$;

  vm$ = combineLatest([this.name$, this.currentResult$, this.loading$]).pipe(
    map(([name, result, loading]) => ({
      name,
      result,
      loading,
      total: result?.resultadoSimulacao.map((result) => ({
        tipo: result.tipo,
        valorTotal: result.parcelas.reduce(
          (memo, installment) => memo + installment.valorPrestacao,
          0
        ),
        valorAmortizacao: result.parcelas.reduce(
          (memo, installment) => memo + installment.valorAmortizacao,
          0
        ),
        valorJuros: result.parcelas.reduce(
          (memo, installment) => memo + installment.valorJuros,
          0
        ),
      })),
    }))
  );

  constructor() {}

  ngOnInit() {}

  redirect(result: Total) {
    this.appService.setSelectedType(result.tipo);
    this.router.navigate(['/', 'simulation', 'list']);
  }
  goBack() {
    this.location.back();
  }
}

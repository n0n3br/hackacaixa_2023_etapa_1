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
  private readonly appService = inject(AppService);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  readonly name$ = this.appService.name$;
  readonly currentResult$ = this.appService.currentResult$;
  readonly loading$ = this.appService.loading$;

  readonly vm$ = combineLatest([
    this.name$,
    this.currentResult$,
    this.loading$,
  ]).pipe(
    map(([name, result, loading]) => ({
      name,
      result,
      loading,
      types: result?.resultadoSimulacao.map((result) => ({
        title: result.tipo.toUpperCase(),
        subtitle: result.parcelas.every(
          (installment) =>
            installment.valorPrestacao === result.parcelas[0].valorPrestacao
        )
          ? 'Parcelas com mesmo valor'
          : 'Parcelas com valor decrescente',
      })),
    }))
  );

  constructor() {}

  ngOnInit() {}

  redirect(type: string) {
    this.appService.setSelectedType(type);
    this.router.navigate(['/', 'simulation', 'list']);
  }
  goBack() {
    this.location.back();
  }
}

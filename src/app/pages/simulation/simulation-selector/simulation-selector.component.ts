import { CommonModule, CurrencyPipe, Location } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StoreService } from 'src/app/shared/store/store.service';
import { combineLatest, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simulation-selector',
  standalone: true,
  templateUrl: './simulation-selector.component.html',
  styleUrls: ['./simulation-selector.component.scss'],
  imports: [IonicModule, CommonModule],
  providers: [CurrencyPipe],
})
export class SimulationSelectorComponent implements OnInit {
  private readonly store = inject(StoreService);
  private readonly currencyPipe = inject(CurrencyPipe);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  readonly name$ = this.store.name$;
  readonly currentResult$ = this.store.currentResult$;
  readonly loading$ = this.store.loading$;

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
          ? `Parcelas com mesmo valor`
          : `Parcelas com valor decrescente`,
        values: [
          result.parcelas.at(0)?.valorPrestacao ?? 0,
          result.parcelas.at(-1)?.valorPrestacao ?? 0,
        ],
      })),
    }))
  );

  constructor() {}

  ngOnInit() {}

  redirect(type: string) {
    this.store.setSelectedType(type);
    this.router.navigate(['/', 'simulation', 'list']);
  }
}

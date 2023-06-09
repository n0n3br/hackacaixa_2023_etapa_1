import {
  CommonModule,
  CurrencyPipe,
  DecimalPipe,
  Location,
} from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { combineLatest, map } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Parcela } from 'src/app/shared/model/Parcela';
import { IonicAlertService } from 'src/app/shared/services/ionic-alert/ionic-alert.service';

@Component({
  selector: 'app-simulation-list',
  standalone: true,
  templateUrl: './simulation-list.component.html',
  styleUrls: ['./simulation-list.component.scss'],
  imports: [IonicModule, CommonModule],
  providers: [DecimalPipe, CurrencyPipe],
})
export class SimulationListComponent implements OnInit {
  private readonly appService = inject(AppService);
  private readonly ionicAlertService = inject(IonicAlertService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly location = inject(Location);
  readonly currentResult$ = this.appService.currentResult$;
  readonly name$ = this.appService.name$;
  readonly installments$ = this.appService.selectedInstallments$;
  readonly type$ = this.appService.selectedType$;
  readonly decimalPipe = inject(DecimalPipe);
  readonly currencyPipe = inject(CurrencyPipe);

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

  showDetail(installment: Parcela) {
    this.ionicAlertService.showAlert(
      `Parcela n.º ${this.decimalPipe.transform(installment.numero, '1.0-0')}`,
      `<table style='border 1px solid #004075; width: 100%'>
        <thead>
          <tr>
            <th style='background: #004075; color: white; padding: .5rem'>Composição</th>
            <th style='background: #004075; color: white; padding: .5rem'>Valor</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td style='padding: .5rem; color: #004075'>Amoritzação</td>
          <td style='padding: .5rem; text-align: right; color: #004075'>${this.currencyPipe.transform(
            installment.valorAmortizacao
          )}</td>
        </tr>
        <tr>
          <td style='padding: .5rem; color: #004075'>Juros</td>
          <td style='padding: .5rem; text-align: right; color: #004075'>${this.currencyPipe.transform(
            installment.valorJuros
          )}</td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td style='background: #004075; color: white; font-weight: bold; padding: .5rem'>Total</td>
          <td style='background: #004075; color: white; font-weight: bold; padding: .5rem; text-align: right'>${this.currencyPipe.transform(
            installment.valorPrestacao
          )}</td>
        </tr>
        </tfoot>
      </table>`
    );
  }
}

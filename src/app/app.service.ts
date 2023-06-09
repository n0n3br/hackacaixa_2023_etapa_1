import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  delay,
  map,
  of,
} from 'rxjs';
import { IonicToastService } from './shared/services/ionic-toast/ionic-toast.service';
import { Router } from '@angular/router';
import { Simulacao } from './shared/model/Simulacao';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly _name$ = new BehaviorSubject('');
  private readonly _value$ = new BehaviorSubject(0);
  private readonly _installments$ = new BehaviorSubject(0);
  private readonly _results$ = new BehaviorSubject<Simulacao[]>([]);
  private readonly _currentResult$ = new BehaviorSubject<Simulacao | undefined>(
    undefined
  );
  private readonly _loading$ = new BehaviorSubject(false);
  private readonly _selectedType = new BehaviorSubject('');
  private readonly _simulationError$ = new BehaviorSubject('');

  readonly name$ = this._name$.asObservable().pipe(debounceTime(100));
  readonly value$ = this._value$.asObservable();
  readonly installments$ = this._installments$.asObservable();
  readonly results$ = this._results$.asObservable();
  readonly currentResult$ = this._currentResult$.asObservable();
  readonly loading$ = this._loading$.asObservable();
  readonly selectedType$ = this._selectedType.asObservable();
  readonly simulationError$ = this._simulationError$.asObservable();
  readonly selectedInstallments$ = combineLatest([
    this.currentResult$,
    this.selectedType$,
  ]).pipe(
    map(
      ([result, type]) =>
        result?.resultadoSimulacao.find((result) => result.tipo === type)
          ?.parcelas
    )
  );

  constructor() {}

  private get value() {
    return this._value$.getValue();
  }
  private get installments() {
    return this._installments$.getValue();
  }

  private get results() {
    return this._results$.getValue();
  }

  setName(name: string) {
    this._name$.next(name);
  }
  setValue(value: number | undefined) {
    this._value$.next(value ?? 0);
  }
  setInstallments(value: number | undefined) {
    this._installments$.next(value ?? 0);
  }

  setSelectedType(type: string) {
    this._selectedType.next(type);
  }

  getSimulacao(): void {
    if (this.value <= 0 || this.installments <= 0) {
      return;
    }
    this._simulationError$.next('');
    const resultExists = this.results.find(
      (result) =>
        result.valor === this.value && result.qtdParcelas === this.installments
    );
    if (resultExists) {
      this._currentResult$.next(resultExists);
      return;
    }
    this._loading$.next(true);
    this.http
      .post<Simulacao>(
        'https://apphackaixades.azurewebsites.net/api/Simulacao',
        { valorDesejado: this.value, prazo: this.installments }
      )
      .pipe(
        map((result) => ({
          ...result,
          valor: this.value,
          qtdParcelas: this.installments,
        })),
        delay(500)
      )
      .subscribe({
        next: (result) => {
          this._results$.next([...this.results, result]);
          this._currentResult$.next(result);
          this._loading$.next(false);
        },
        error: (e) => {
          this._simulationError$.next(e.error.Mensagem);
          this._loading$.next(false);
          this.router.navigate(['/', 'simulation', 'error']);
        },
      });
  }
}

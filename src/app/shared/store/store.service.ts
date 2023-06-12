import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  delay,
  map,
  tap,
} from 'rxjs';
import { Router } from '@angular/router';
import { Simulacao } from '../model/Simulacao';
import { ApiService } from '../services/api/api.service';
import { ContactFormParams } from '../model/ContactFormParams';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly apiService = inject(ApiService);
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
  private readonly _showBackButton$ = new BehaviorSubject(false);

  readonly name$ = this._name$.asObservable().pipe(debounceTime(100));
  readonly value$ = this._value$.asObservable();
  readonly installments$ = this._installments$.asObservable();
  readonly results$ = this._results$.asObservable();
  readonly currentResult$ = this._currentResult$.asObservable();
  readonly loading$ = this._loading$.asObservable();
  readonly selectedType$ = this._selectedType.asObservable();
  readonly simulationError$ = this._simulationError$.asObservable();
  readonly showBackButton = this._showBackButton$.asObservable();
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
  setShowBackButton(value: boolean) {
    this._showBackButton$.next(value);
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
    this.apiService
      .getSimulacao(this.value, this.installments)
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

  postContactForm(params: ContactFormParams) {
    this._loading$.next(true);
    return this.apiService
      .postContactForm(params)
      .pipe(tap(() => this._loading$.next(false)));
  }
}

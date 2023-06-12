import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Simulacao } from '../../model/Simulacao';
import { delay, map, of, timer } from 'rxjs';
import { ContactFormParams } from '../../model/ContactFormParams';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  constructor() {}

  getSimulacao(value: number, installments: number) {
    return this.http.post<Simulacao>(
      'https://apphackaixades.azurewebsites.net/api/Simulacao',
      { valorDesejado: value, prazo: installments }
    );
  }

  postContactForm(params: ContactFormParams) {
    console.log({ postParams: params });
    return of('').pipe(map(() => true));
  }
}

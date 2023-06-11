import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

interface ViaCepResponse {
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
  erro?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ZipcodeCheckService {
  private readonly http = inject(HttpClient);

  constructor() {}

  get(zipcode: number) {
    return this.http.get<ViaCepResponse>(
      `https://viacep.com.br/ws/${zipcode}/json/`
    );
  }
}

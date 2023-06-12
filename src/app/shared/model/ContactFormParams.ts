import { Simulacao } from './Simulacao';

export interface ContactFormParams {
  name: string;
  cpf: string;
  phone: string;
  contactBy: string;
  contactOn: string;
  type: string;
  simulation: Simulacao;
}

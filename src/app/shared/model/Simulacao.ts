import { ResultadoSimulacao } from './ResultadoSimulacao';

export interface Simulacao {
  codigoProduto: number;
  descricaoProduto: string;
  taxaJuros: number;
  valor: number;
  qtdParcelas: number;
  resultadoSimulacao: ResultadoSimulacao[];
}

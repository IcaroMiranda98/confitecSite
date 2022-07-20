export class Usuario {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  dataNascimento: string;
  escolaridadeId: number = 1;
  escolaridade?: Escolaridade;
  historicoEscolar?: HistoricoEscolar = new HistoricoEscolar();
}

export class Escolaridade {
  id?: number;
  Descricao: string;
}

export class HistoricoEscolar {
  id?: number;
  Formato: string;
  nome?: string;
  Arquivo: string;
}

export const msg = {
  /** Sucessos */
  S001: 'Registro salvo com sucesso!',
  S002: 'Registro removido com sucesso!',
  S003: 'Caixa fechado com sucesso!',

  /** Alertas */
  A001: 'O desconto não pode ser maior que o valor da venda/serviço!',
  /** Erros */
  E001: 'Erro ao tentar se conectar com o servidor!',
  E002: 'Usuário e/ou senha incorreta!',
  E003: 'O nome é obrigatório!',
  E004: 'Valor não permitido',
  E005: 'Selecione um produto!',
  E006: 'O campo $$ é obrigatório!',
  E007: 'Valor $$ não permitido.',
  E400: 'Requisição inválida',
  E401: 'Recurso não autorizado',
  E403: 'Recurso não autorizado',
  E404: 'Recurso não encontrado',

  custom: function(msg, valor) {
    return msg.replace("$$", valor);
  }
};

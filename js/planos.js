// Planos
const planos = [
  { id: 1, nome: "8º ano", valor: 150, vencimentoDia: 10, descontoPercent: 0, jurosPercent: 0 },
  { id: 2, nome: "Curso Inglês", valor: 200, vencimentoDia: 15, descontoPercent: 5, jurosPercent: 0 }
];

// Alunos
const alunos = [
  { id: 1, nome: "João Silva", planoId: 1 },
  { id: 2, nome: "Maria Oliveira", planoId: 2 }
];

// Função para gerar mensalidade para o próximo mês
function gerarMensalidadeParaAluno(aluno) {
  const plano = planos.find(p => p.id === aluno.planoId);
  if (!plano) return null;

  // Data de vencimento no próximo mês
  const hoje = new Date();
  const mes = hoje.getMonth() + 1; // próximo mês (0-based)
  const ano = hoje.getFullYear() + (mes > 11 ? 1 : 0);
  const mesCorrigido = mes % 12;

  const dataVencimento = new Date(ano, mesCorrigido, plano.vencimentoDia);

  // Calcular valor com desconto e juros
  let valorFinal = plano.valor;
  valorFinal -= (valorFinal * (plano.descontoPercent / 100));
  valorFinal += (valorFinal * (plano.jurosPercent / 100));

  return {
    aluno: aluno.nome,
    plano: plano.nome,
    valor: valorFinal.toFixed(2),
    vencimento: dataVencimento.toLocaleDateString('pt-BR'),
    status: "pendente"
  };
}

console.log(gerarMensalidadeParaAluno(alunos[0]));

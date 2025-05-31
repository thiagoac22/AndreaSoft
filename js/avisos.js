function gerarDeclaracao() {
  const nomeAluno = document.getElementById("nomeAluno").value;
  const serieAluno = document.getElementById("serieAluno").value;
  const responsavel = document.getElementById("responsavel").value;
  const motivo = document.getElementById("motivo").value;
  const dataSaida = document.getElementById("dataSaida").value;

  const declaracaoHTML = `
    <div id="modeloDeclaracao">
      <h2>Declaração de Saída Antecipada</h2>
      <p>Declaramos, para os devidos fins, que o(a) aluno(a) <strong>${nomeAluno}</strong>, da turma <strong>${serieAluno}</strong>, saiu antecipadamente da escola no dia <strong>${dataSaida}</strong>.</p>
      <p>O responsável <strong>${responsavel}</strong> relatou como motivo da saída: <em>"${motivo}"</em>.</p>
      <p>Assinatura do Responsável: ____________________________</p>
      <p>Data: ${dataSaida}</p>
      <button onclick="window.print()">Imprimir</button>
    </div>
  `;

  const container = document.getElementById("declaracao");
  container.innerHTML = declaracaoHTML;
  container.style.display = "block";
}

const tabela = document.getElementById('tabelaProfessores');
let professores = JSON.parse(localStorage.getItem('professores')) || [];

function renderizarTabela() {
  tabela.innerHTML = ''; // Limpa a tabela antes de renderizar

  professores.forEach((prof, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${prof.nome}</td>
      <td>${prof.email}</td>
      <td>${prof.disciplina}</td>
      <td><button class="btn-excluir" data-index="${index}">Excluir</button></td>
    `;
    tabela.appendChild(tr);
  });

  // Adiciona evento de clique para cada botão de excluir
  document.querySelectorAll('.btn-excluir').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      professores.splice(index, 1); // Remove do array
      localStorage.setItem('professores', JSON.stringify(professores)); // Atualiza localStorage
      renderizarTabela(); // Atualiza a tabela na tela
    });
  });
}

// Chamada inicial
renderizarTabela();

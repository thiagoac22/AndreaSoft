const tabela = document.querySelector('#tabelaAlunos');

function carregarAlunos() {
    const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    tabela.innerHTML = '';

    if (alunos.length === 0) {
        tabela.innerHTML = '<tr><td colspan="5">Nenhum aluno matriculado.</td></tr>';
        return;
    }

    alunos.forEach((aluno, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.cpf}</td>
            <td>${aluno.dataNascimento}</td>
            <td>${aluno.curso}</td>
            <td><button class="btn-excluir" onclick="excluirAluno(${index})">Excluir</button></td>
        `;

        tabela.appendChild(tr);
    });
}

function excluirAluno(index) {
    const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    if (confirm(`Deseja excluir a matrícula de ${alunos[index].nome}?`)) {
        alunos.splice(index, 1);
        localStorage.setItem('alunos', JSON.stringify(alunos));
        carregarAlunos();
    }
}

// Carrega a lista ao abrir a página
window.onload = carregarAlunos;

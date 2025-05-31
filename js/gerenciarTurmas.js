        const form = document.getElementById('formMatricula');
        const tabela = document.querySelector('#tabelaAlunos tbody');

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
          <td><button class="delete-btn" onclick="excluirAluno(${index})">Excluir</button></td>
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

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const nome = document.getElementById('nomeAluno').value.trim();
            const cpf = document.getElementById('cpfAluno').value.trim();
            const dataNascimento = document.getElementById('dataNascimento').value;
            const curso = document.getElementById('cursoAluno').value;

            if (!nome || !cpf || !dataNascimento || !curso) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            const novoAluno = { nome, cpf, dataNascimento, curso };
            const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
            alunos.push(novoAluno);
            localStorage.setItem('alunos', JSON.stringify(alunos));

            form.reset();
            carregarAlunos();
            alert('Aluno matriculado com sucesso!');
        });

        window.onload = carregarAlunos;
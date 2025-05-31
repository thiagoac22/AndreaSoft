const planos = [];
        const alunos = [];
        const mensalidades = [];

        function atualizarListaPlanos() {
            const lista = document.getElementById('listaPlanos');
            lista.innerHTML = '';
            planos.forEach((plano, i) => {
                const li = document.createElement('li');
                li.textContent = `${plano.nome} - R$ ${plano.valor.toFixed(2)} - Vence dia ${plano.vencimentoDia} - Desc: ${plano.descontoPercent}% - Juros: ${plano.jurosPercent}%`;
                lista.appendChild(li);
            });

            const selectPlano = document.getElementById('planoAluno');
            selectPlano.innerHTML = '<option value="">-- Escolha um plano --</option>';
            planos.forEach((plano, i) => {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = plano.nome;
                selectPlano.appendChild(option);
            });
        }

        function atualizarListaAlunos() {
            const lista = document.getElementById('listaAlunos');
            lista.innerHTML = '';
            alunos.forEach(aluno => {
                const li = document.createElement('li');
                li.textContent = `${aluno.nome} (Plano: ${planos[aluno.planoIndex]?.nome || 'Nenhum'})`;
                lista.appendChild(li);
            });
        }

        document.getElementById('formPlano').addEventListener('submit', e => {
            e.preventDefault();
            const nome = document.getElementById('nomePlano').value.trim();
            const valor = parseFloat(document.getElementById('valorPlano').value);
            const vencimentoDia = parseInt(document.getElementById('vencimentoPlano').value);
            const descontoPercent = parseFloat(document.getElementById('descontoPlano').value);
            const jurosPercent = parseFloat(document.getElementById('jurosPlano').value);
            planos.push({ nome, valor, vencimentoDia, descontoPercent, jurosPercent });
            atualizarListaPlanos();
            e.target.reset();
        });

        document.getElementById('formAluno').addEventListener('submit', e => {
            e.preventDefault();
            const nome = document.getElementById('nomeAluno').value.trim();
            const planoIndex = parseInt(document.getElementById('planoAluno').value);
            if (isNaN(planoIndex)) {
                alert('Selecione um plano válido.');
                return;
            }
            alunos.push({ nome, planoIndex });
            atualizarListaAlunos();
            e.target.reset();
        });

        function gerarMensalidadeParaAluno(aluno) {
            const plano = planos[aluno.planoIndex];
            if (!plano) return null;
            const hoje = new Date();
            let mes = hoje.getMonth();
            let ano = hoje.getFullYear();
            if (mes > 11) {
                mes = 0;
                ano++;
            }
            const dataVencimento = new Date(ano, mes, plano.vencimentoDia);
            let valorFinal = plano.valor;
            valorFinal -= valorFinal * (plano.descontoPercent / 100);
            valorFinal += valorFinal * (plano.jurosPercent / 100);
            return {
                aluno: aluno.nome,
                plano: plano.nome,
                valor: valorFinal.toFixed(2),
                vencimento: dataVencimento.toLocaleDateString('pt-BR'),
                status: 'pendente'
            };
        }

        document.getElementById('btnGerarMensalidades').addEventListener('click', () => {
            mensalidades.length = 0;
            alunos.forEach(aluno => {
                const m = gerarMensalidadeParaAluno(aluno);
                if (m) mensalidades.push(m);
            });
            atualizarTabelaMensalidades();
        });

        function atualizarTabelaMensalidades() {
            const tbody = document.querySelector('#tabelaMensalidades tbody');
            tbody.innerHTML = '';
            mensalidades.forEach(m => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
        <td>${m.aluno}</td>
        <td>${m.plano}</td>
        <td>R$ ${m.valor}</td>
        <td>${m.vencimento}</td>
        <td>${m.status}</td>
      `;
                tbody.appendChild(tr);
            });
        }
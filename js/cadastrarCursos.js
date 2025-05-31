const formCurso = document.getElementById('formCurso');
const tabelaCursosBody = document.querySelector('#tabelaCursos tbody');

let cursos = JSON.parse(localStorage.getItem('cursos')) || [];
let cursoEditandoId = null;

function mostrarCursos() {
  tabelaCursosBody.innerHTML = '';

  if (cursos.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="3" style="text-align:center;">Nenhum curso cadastrado</td>`;
    tabelaCursosBody.appendChild(tr);
    return;
  }

  cursos.forEach((curso) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${curso.nome}</td>
      <td>${curso.duracao}</td>
      <td>
        <button onclick="editarCurso(${curso.id})">Editar</button>
        <button onclick="excluirCurso(${curso.id})">Excluir</button>
      </td>
    `;
    tabelaCursosBody.appendChild(tr);
  });
}

function salvarCursos() {
  localStorage.setItem('cursos', JSON.stringify(cursos));
}

function editarCurso(id) {
  const curso = cursos.find(c => c.id === id);
  if (!curso) return;

  document.getElementById('nomeCurso').value = curso.nome;
  document.getElementById('duracaoCurso').value = curso.duracao;
  cursoEditandoId = id;
}

function excluirCurso(id) {
  if (!confirm('Deseja realmente excluir este curso?')) return;

  cursos = cursos.filter(c => c.id !== id);
  salvarCursos();
  mostrarCursos();
}

formCurso.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nomeCurso').value.trim();
  const duracao = document.getElementById('duracaoCurso').value.trim();

  if (!nome || !duracao) {
    alert('Preencha todos os campos!');
    return;
  }

  if (cursoEditandoId) {
    cursos = cursos.map(c =>
      c.id === cursoEditandoId ? { ...c, nome, duracao } : c
    );
    cursoEditandoId = null;
  } else {
    cursos.push({ id: Date.now(), nome, duracao });
  }

  salvarCursos();
  formCurso.reset();
  mostrarCursos();
});

mostrarCursos();

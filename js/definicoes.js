const form = document.getElementById('formUsuario');
const lista = document.getElementById('listaUsuarios');

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

function atualizarTabela() {
  lista.innerHTML = '';
  usuarios.forEach((user, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.nome}</td>
      <td>${user.email}</td>
      <td>${user.permissao}</td>
      <td><button class="excluir" onclick="excluirUsuario(${index})">Excluir</button></td>
    `;
    lista.appendChild(tr);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const permissao = document.getElementById('permissao').value;

  usuarios.push({ nome, email, senha, permissao });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  form.reset();
  atualizarTabela();
});

function excluirUsuario(index) {
  if (confirm("Deseja excluir este usuário?")) {
    usuarios.splice(index, 1);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    atualizarTabela();
  }
}

atualizarTabela();

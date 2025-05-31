const form = document.getElementById('vt-form');
const tabela = document.querySelector('#tabela-funcionarios tbody');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const cargo = document.getElementById('cargo').value;
  const transporte = document.getElementById('tipoTransporte').value;
  const passagensPorDia = Number(document.getElementById('passagensPorDia').value);
  const salario = Number(document.getElementById('salario').value);

  const diasUteis = 22;
  const valorPassagem = 4.40;
  const valorMensal = diasUteis * passagensPorDia * valorPassagem;
  const desconto = Math.min(valorMensal, salario * 0.06).toFixed(2);

  const novaLinha = `
        <tr>
          <td>${nome}</td>
          <td>${cargo}</td>
          <td>${transporte}</td>
          <td>${passagensPorDia}</td>
          <td>R$ ${valorMensal.toFixed(2)}</td>
          <td>R$ ${desconto}</td>
        </tr>
      `;

  tabela.innerHTML += novaLinha;
  form.reset();
});
const form = document.getElementById('professorForm');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const disciplina = document.getElementById('disciplina').value;

      const novoProf = { nome, email, disciplina };

      const professores = JSON.parse(localStorage.getItem('professores')) || [];
      professores.push(novoProf);

      localStorage.setItem('professores', JSON.stringify(professores));

      alert('Professor cadastrado com sucesso!');
      form.reset();
    });
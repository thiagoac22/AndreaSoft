let startIndex = 0;
const maxResults = 12;
let termoAtual = ''; // Armazena o termo de busca atual

async function buscarLivros(termo = '') {
  try {
    const query = termo ? encodeURIComponent(termo) : 'subject:fiction';
    const resposta = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}`);
    const dados = await resposta.json();

    const lista = document.getElementById('ListaLivros');

    // Se for uma nova pesquisa, limpa a lista
    if (startIndex === 0) {
      lista.innerHTML = '';
    }

    if (!dados.items || dados.items.length === 0) {
      lista.innerHTML = '<li>Nenhum livro encontrado.</li>';
      return;
    }

    dados.items.forEach(item => {
      const livro = item.volumeInfo;

      const li = document.createElement('li');
      li.classList.add('livro-card');

      li.innerHTML = `
        <img src="${livro.imageLinks?.thumbnail || ''}" alt="Capa do livro" />
        <h3>${livro.title}</h3>
        <p><strong>Autor:</strong> ${livro.authors?.join(', ') || 'Desconhecido'}</p>
        <p><strong>Ano:</strong> ${livro.publishedDate?.substring(0, 4) || 'N/A'}</p>
      `;

      lista.appendChild(li);
    });

  } catch (erro) {
    console.error('Erro ao buscar livros:', erro);
  }
}

document.getElementById('verMais').addEventListener('click', () => {
  startIndex += maxResults;
  buscarLivros(termoAtual);
});

document.getElementById('btnPesquisar').addEventListener('click', () => {
  const termo = document.getElementById('pesquisaLivro').value.trim();
  startIndex = 0;
  termoAtual = termo;
  buscarLivros(termo);
});

// Carrega livros iniciais ao abrir a página
buscarLivros();

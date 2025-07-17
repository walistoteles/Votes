const opcoes = [
  {
    id: "game1",
    titulo: "The Witcher 3",
    imagem: "media/witcher.png"
  },
  {
    id: "game2",
    titulo: "Hogwarts Legacy",
    imagem: "media/hogwarts.png"
  },
  {
    id: "game3",
    titulo: "The Legend Of Zelda Link's Awakening",
    imagem: "media/zelda.png"
  }
];

const container = document.getElementById('opcoes');
const vencedorDiv = document.getElementById('vencedor');
const jaVotou = localStorage.getItem('votoRealizado');

function atualizarVencedor() {
  fetch('votos.php')
    .then(res => res.json())
    .then(votos => {
      let maior = -1;
      let ganhador = "Nenhum voto ainda";

      for (let opcao of opcoes) {
        const votosAtual = votos[opcao.id] || 0;
        if (votosAtual > maior) {
          maior = votosAtual;
          ganhador = `${opcao.titulo} (${votosAtual} voto${votosAtual !== 1 ? 's' : ''})`;
        }
      }

      vencedorDiv.textContent = `Mais votado: ${ganhador}`;
    })
    .catch(() => {
      vencedorDiv.textContent = "Erro ao carregar votos";
    });
}

opcoes.forEach(opcao => {
  const card = document.createElement('div');
  card.className = 'card';

  const img = document.createElement('img');
  img.src = opcao.imagem;

  const titulo = document.createElement('h2');
  titulo.textContent = opcao.titulo;

  const btn = document.createElement('button');
  btn.textContent = jaVotou ? "Voto registrado" : "Votar";
  btn.disabled = !!jaVotou;

  btn.onclick = () => {
    fetch('salvar_voto.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ opcao: opcao.id })
    })
      .then(res => res.text())
      .then(() => {
        localStorage.setItem('votoRealizado', true);
        btn.textContent = "Voto registrado";
        btn.disabled = true;
        document.querySelectorAll("button").forEach(b => b.disabled = true);
        alert("Voto registrado com sucesso!");
        atualizarVencedor();
      });
  };

  card.appendChild(img);
  card.appendChild(titulo);
  card.appendChild(btn);
  container.appendChild(card);
});

atualizarVencedor(); // Mostrar vencedor ao carregar

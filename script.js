const containerVideos = document.querySelector('.videos__container');

async function buscarMostrarVideos () {
   try {
      const buscaApi = await fetch("http://localhost:3000/videos");
      const videos = await buscaApi.json();

         videos.forEach((video) => {
            containerVideos.innerHTML += `
               <li class="videos__item">
                  <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                  <div class="descricao-video">
                     <img class="img-canal" src="${video.imagem}" alt="Logo do canal">
                     <h3 class="titulo-video">${video.titulo}</h3>
                     <p class="titulo-canal">${video.descricao}</p> 
                     <p class="categoria" hidden>${video.categoria}</p> 
                  </div>
               </li>
            `;
         })
   } catch(erro) {
      containerVideos.innerHTML = `<p>Houve um erro ao carregar os videos: ${{erro}}</p>`
   }
}

buscarMostrarVideos();

const barraPesquisa = document.querySelector('.pesquisar__input');
barraPesquisa.addEventListener('input', () => {
   const videos = document.querySelectorAll('.videos__item');

   if (barraPesquisa.value != "") {
      for (let video of videos) {
         let titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
         let valorFiltro = barraPesquisa.value.toLowerCase();

         if (!titulo.includes(valorFiltro)) {
            video.style.display = "none";
         } else {
            video.style.display = "block";
         }
      }
   } else {
      video.style.display = "block";
   }
})

const botaoCategoria = document.querySelectorAll('.superior__item').forEach((botao) => {
   let nomeCategoria = botao.getAttribute('name')
   botao.addEventListener('click', () => filtrarCategoria(nomeCategoria));
})

function filtrarCategoria(filtro) {
   const videos = document.querySelectorAll('.videos__item');
   for (let video of videos) {
      let categoria = video.querySelector('.categoria').textContent.toLowerCase();
      let valorFiltro = filtro.toLowerCase();

      if (!categoria.includes(valorFiltro) && valorFiltro != 'tudo') {
         video.style.display = "none";
      } else {
         video.style.display = "block";
      }
   }
}
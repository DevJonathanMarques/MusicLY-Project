//PESQUISANDO MÚSICA COM A API
function getMusica(artista, musica) {
	return fetch(`https://api.vagalume.com.br/search.php?art=${artista}&mus=${musica}`).then(response => response.json())
}

//RECUPERANDO A MÚSICA PESQUISADA E EXIBINDO NA PAG
function pesquisar() {
	let artista = document.getElementById('artista').value
	artista = artista.replace(' ', '%20')
	let musica = document.getElementById('musica').value
	musica = musica.replace(' ', '%20')

	getMusica(artista, musica).then(dados => {

		console.log(dados)

		if (dados['type'] == 'notfound' || dados['type'] == "song_notfound") {
			alert('Música não encontrada')
		}

		document.getElementById('conteudo').className = 'mt-2 p-4'

		let titulo = dados['mus'][0]['name']
		document.getElementById('titulo').innerHTML = titulo

		let artista = dados['art']['name']
		document.getElementById('artista').innerHTML = artista

		let letra = dados['mus'][0]['text']
		document.getElementById('letra').innerHTML = nl2br(letra)

		if (dados['mus'][0]['translate']) {
			let traducao = dados['mus'][0]['translate'][0]['text']
			document.getElementById('traducao').innerHTML = nl2br(traducao)
			document.getElementById('titulo_traducao').className = 'col-6'
		} else {
			document.getElementById('titulo_traducao').className = 'd-none'
		}

	})
}

//FUNÇÃO PARA IDENTAR TEXTO
function nl2br (str, replaceMode, isXhtml) {
  var breakTag = (isXhtml) ? '<br />' : '<br>';
  var replaceStr = (replaceMode) ? '$1'+ breakTag : '$1'+ breakTag +'$2';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr);
}
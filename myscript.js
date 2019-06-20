// Recupera os dados do Local Storage
var db = JSON.parse(localStorage.getItem('db'));
// Se estiver vazio
if (!db) {
	// DB é igual aos dados fakes
  db = fakeDB;
	// Salva o DB no Local Storage
  localStorage.setItem('db', JSON.stringify(db));
};

// Calcula novo Id a partir do último código existente no array
function insertPost (title, author, img, text, date) {
	let month = date.getMonth()+1;
	// Se o mês for de 1 dígito, colocar o 0 na frente
	if (month < 10)
		month = `0${month}`

	let post = {
		titulo: title,
		autor: author,
		imagem: img,
		texto: text,
		comentarios: [],
		likes: '0',
		data: `${date.getDate()}/${month}/${date.getFullYear()}`
	};

	// Insere o novo objeto no array
  db.posts.push(post);

	// Atualiza os dados no Local Storage
  localStorage.setItem('db', JSON.stringify(db));
}

//Carrega os posts na página
function carregaPosts() {
	// Carrega o banco do Local Storage
	let db = JSON.parse(localStorage.getItem('db'));

	// Cria o HTML pra cada post do banco
	let html = '';
	// Novo pro mais velho
	for(i = db.posts.length - 1; i >= 0; i--){
		html += `
			<div class="postou" id="post-${i}">
				<h2> ${ db.posts[i].titulo }</h2> <br>
				<p> Autor: ${ db.posts[i].autor } <br>
						Postado em: ${ db.posts[i].data}
				</p>
				<a href="${ db.posts[i].link }">
					<img src="${ db.posts[i].imagem }" />
				</a>
				<p> ${ db.posts[i].texto} </p>
				<button type="button" class="btn btn-warning" onclick="addCurtida(this,${i})">
					${db.posts[i].likes}
					&#9825; Curtir
				</button>
				<div class="form-group">
					<label for="exampleFormControlTextarea1">Digite seu comentario...</label>
					<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
					<button id="comentar" type="submit" class="btn btn-success btn-block" onclick="addComentario(${i})">Comentar</button>
				</div>
				<div class="comentarios">
			`;

		// Adiciona cada comentário no HTML
		for (j = 0; j < db.posts[i].comentarios.length; j++) {
			html += `<p>${db.posts[i].comentarios[j]}</p>`
		}

		// Fecha a DIV dos comentários e do post
		html += "</div></div>";
	}

	// Insere o HTML
	document.getElementById('principal').innerHTML = html;
}

// Adiciona uma curtida no post
function addCurtida (button, index) {
	// Aumenta 1 like
	db.posts[index].likes++;
	// Salva no Local Storage
	localStorage.setItem('db', JSON.stringify(db));

	// Atualiza o botão com o nº novo de likes
	$(button).html(`
		${db.posts[index].likes}
		&#9825; Curtir
	`)
}

// Adiciona um comentário no post
function addComentario (index) {
	// Pega o comentário
	let text = $(`#post-${index} textarea`).val();
	// Adiciona o comentário
	db.posts[index].comentarios.push(text)

	// Salva no Local Storage
	localStorage.setItem('db', JSON.stringify(db));

	// Atualiza a seção de comentarios
	let html = "";
	for (var i = 0; i < db.posts[index].comentarios.length; i++) {
		html += `<p>${db.posts[index].comentarios[i]}</p>`
	}

	$(`#post-${index} .comentarios`).html(html);
}

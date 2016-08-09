$(document).ready(function() {
	$.get({
		url: "http://10.100.254.2:1337/like",
		type: 'get',
		success:function(data) {
			like(data);

		},
		error:function(e) {
			alert('Echec lors de la connexion au serveur');
		}
	});
});

function like(data) {
	for (var i = 0; i < data.length; i++) {
		$('<div id="like-info">').prependTo('#like-user');
		$('<span id="like-name">'+data[i].pseudo+'</span>').prependTo('#like-info');
		$('<img id="like-img" src='+data[i].image+' alt="test">').prependTo('#like-info');
		if (data[i].sexe === 'femelle') {
			$('<img id="like-sexe" src="" alt="sexe" />').prependTo('#like-info');
			document.getElementById('like-sexe').setAttribute('src', 'img/female.png');
		} else {
			$('<img id="like-sexe" src="" alt="sexe" />').prependTo('#like-info');
			document.getElementById('like-sexe').setAttribute('src', 'img/male.png');
		}
	}
}
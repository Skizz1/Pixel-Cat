$(document).ready(function() {
	$.get({
		url: "http://10.100.254.2:1337/dislike",
		type: 'get',
		success:function(data) {
			dislike(data);

		},
		error:function(e) {
			alert('Echec lors de la connexion au serveur');
		}
	});
});

function dislike(data) {
	for (var i = 0; i < data.length; i++) {
		$('<div id="dislike-info">').prependTo('#dislike-user');
		$('<span id="dislike-name">'+data[i].pseudo+'</span>').prependTo('#dislike-info');
		$('<img id="dislike-img" src='+data[i].image+' alt="test">').prependTo('#dislike-info');
		if (data[i].sexe === 'femelle') {
			$('<img id="dislike-sexe" src="" alt="sexe" />').prependTo('#dislike-info');
			document.getElementById('dislike-sexe').setAttribute('src', 'img/female.png');
		} else {
			$('<img id="dislike-sexe" src="" alt="sexe" />').prependTo('#dislike-info');
			document.getElementById('dislike-sexe').setAttribute('src', 'img/male.png');
		}
	}
}
var data;

$(document).ready(function() {
	$.get({
		url: "http://10.100.254.2:1337/user",
		type: 'get',
		success:function(data) {
			user(data);

		},
		error:function(e) {
			alert('Echec lors de la connexion au serveur');
		}
	});
});

function user(data) {
	var local = localStorage.getItem("id");
	var name = [];
	var img = [];
	var sex = [];	
	var id = [];
	var test = 0;
	for (var i = 0; i < data.length; i++) {
		name.push(data[i].pseudo);
		img.push(data[i].image);
		sex.push(data[i].sexe);
		id.push(data[i].id);
	}
	image(img[test],name[test],sex[test]);

	$(document).on('click', '#yeah', function(e) {
		e.preventDefault();

		test++;
		if(name.length <= test){
			test = 0;
		}
		image(img[test],name[test],sex[test]);

		$.post({
			url: "http://10.100.254.2:1337/like/create",
			type : 'post',
			dataType : 'json',
			data: 
			{
				id_like: id[test],
				id_user: local,
				image: img[test],
				pseudo : name[test],
				sexe: sex[test]
			},
			success:function(data) {
				
			}, 
			error:function(e) {
				
			}
		});

	});

	$(document).on('click', "#nope", function(e) {
		e.preventDefault();

		test++;
		if(name.length <= test){
			test = 0;
		}
		image(img[test],name[test],sex[test]);

		$.post({
			url: "http://10.100.254.2:1337/dislike/create",
			type : 'post',
			dataType : 'json',
			data: 
			{
				id_like: id[test],
				id_user: local,
				image: img[test],
				pseudo : name[test],
				sexe: sex[test]
			},
			success:function(data) {
				
			}, 
			error:function(e) {
				
			}
		});
		
	});
}
function image(img,name,sex){
	document.getElementById('user-img').setAttribute('src', img);
	$('#test').html(name);

	if (sex === 'femelle') {
		document.getElementById('genre').setAttribute('src', 'img/female.png');
	} else {
		document.getElementById('genre').setAttribute('src', 'img/male.png');
	}
}

$('#menu-hide').hide();
$(document).on('click', "#menu-cat", function(e) {
	e.preventDefault();

	$('#menu-hide').css({
		"animation": 'move 0.3s ease-in-out'
	});
	$('#menu-hide').show();
});

$(document).on('click', "#round", function(e) {
	e.preventDefault();

	$('#menu-hide').css({
		"animation": 'down 0.3s ease-in-out'
	});
	$('#menu-hide').hide();
});

$(document).on('click', "#like", function(e) {
	e.preventDefault();

	window.location.href = "like.html";
});

$(document).on('click', "#dislike", function(e) {
	e.preventDefault();

	window.location.href = "dislike.html";
});

$(document).on('click', "#messagerie", function(e) {
	e.preventDefault();


});

$(document).on('click', "#deco", function(e) {
	e.preventDefault();

	window.localStorage.clear();
	window.location.href = "index.html";
});

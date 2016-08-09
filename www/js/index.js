/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();


$(document).ready(function() {

    function previewImageBeforeUpload() {
        var element = $('.preview-img-upload');
        var reader;

        function readURL(input, selector) {
            if (input.files && input.files[0]) {
                reader = new FileReader();
                reader.onload = function(e) {
                    selector
                    .parents('.preview-img-upload')
                    .addClass('active')
                    .find('.preview-img')
                    .attr('src', e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }

        function removeImage() {
            element
            .find('.remove-image')
            .click(function() {
                $(this)
                .parents('.preview-img-upload').removeClass('active').find('.preview-img').attr('src', '');
                $(this).parents('.preview-img-upload').find('input').val('');
            });
        }
        removeImage();

        $(document.body).on('change', '.preview-img-upload input', function() {
            readURL(this, $(this));
        });

    }
    previewImageBeforeUpload();

});

var pseudo;
var email;
var pass;
var img;
var input;
var reader;
var dataURL;
var output;
var sexe;

$(document).on('click','#log',function(e){
    e.preventDefault();
    $.ajax({
        url:"inscription.html",
        success:function(data){
            $('body').html(data);
        }
    })
});

$(document).on('click','#ins',function(e){
    e.preventDefault();
    $.ajax({
        url:"login.html",
        success:function(data){
            $('body').html(data);
        }

    })

});

$(document).on('click', '.with-gap', function() {
    sexe = $(this).val();
});

$(document).on('click', '#enregistrer', function(e) {
    e.preventDefault();

    pseudo = $('#pseudo').val();
    email = $('#email').val();
    pass = $('#password').val();
    img = dataURL;
    sex = sexe;

    if(pseudo === '' || email === '' || pass === '' || img === undefined || sex === '') {
        alert('Certains champs ne sont pas remplis');
    } else {
        $.post({
            url: "http://10.100.254.2:1337/user/create",
            type : 'post',
            dataType : 'json',
            data: 
            {
                pseudo : pseudo,
                email : email,
                password : pass,
                image: img,
                sexe: sex
            },
            success:function(data) {
                alert('Votre inscription à bien été validé');
                window.localStorage.setItem("pseudo", pseudo);
                window.localStorage.setItem("email", email);
                window.localStorage.setItem("pass", pass);
                window.localStorage.setItem("img", img);
                window.localStorage.setItem("sex", sex);
                window.localStorage.setItem("id", data.id);
                
                window.location.href = "pixelcat.html";
            }, 
            error:function(e) {
                alert('Echec lors de votre inscription');
            }
        });
    }
});


$(document).on("change","#file",function(event)
{
    input = event.target;   
    reader = new FileReader();
    reader.onload = function()
    {
        dataURL = reader.result;
        output = $('#file')[0];
        output.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
});

$(document).on('click', '#login', function(e) {
    e.preventDefault();

    email = $('#email').val();
    pass = $('#password').val(); 

    if (email === '' || pass === '') {
        alert('Certains champs ne sont pas remplis');
    } else {
        $.post({
            url: "http://10.100.254.2:1337/login",
            type: 'post',
            dataType: 'json',
            // data: 
            // {
            //     email: email,
            //     password: pass
            // },
            success:function(data) {
                // alert('Vous êtes maintenant connecté');
                window.localStorage.setItem("email", email);
                window.localStorage.setItem("pass", pass);
                window.localStorage.setItem("id", data.user.id);
                window.location.href = "pixelcat.html";
            },
            error:function(e) {
                alert('Echec lors de la connexion');
            }
        });
    }
});
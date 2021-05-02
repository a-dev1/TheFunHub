const clientId = '476024c0b95545deb0d097ab56589691';
const clientSecret = '083861cb6d8b49abb3e394fd5e4a4266';

var token = '';

function getToken(){
    const header = {
        'Content-Type' : 'application/x-www-form-urlencoded', 
        'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
    }
    $.ajax({
        type: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: header,
        data: 'grant_type=client_credentials',
        success: function(data){
            token = data.access_token
        },
        async: false
    })
}

function displayGenres(data){
    var html = '';
    for(var i=0; i<data.categories.items.length; i++){
        var card = `<span class="genres inline-block bg-gray-200 hover:bg-gray-300 hover:text-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2" onclick="genreClicked(this, '`+data.categories.items[i].id+`')">#`+data.categories.items[i].name+`</span>`;
        html = html + card;
    }
    $("#genres").html(html);
}

function displayGames(data){
    var html = '';
    for(var i=0; i<data.playlists.items.length; i++){
        var back_image = '';
        if(data.playlists.items[i].images.length > 0){
            back_image = data.playlists.items[i].images[0].url
          }
        // console.log(data.results[i])
        var card = `<div class="p-1">
        <div class="md:mx-auto w-100 md:max-w-sm rounded overflow-hidden shadow bg-white">
        <img class="w-full" src="`+back_image+`" alt="">
        <div class="px-6 py-4">
        <div class="font-bold text-black text-xl mb-2">`+data.playlists.items[i].name+`</div>
        <p class="text-gray-700 text-base">
        <span class="font-semibold">Description:</span> `+data.playlists.items[i].description+` <br>
        <span class="font-semibold">No. of Tracks:</span> `+data.playlists.items[i].tracks.total+` <br>
        </p>
        </div>
        </div>
        </div>`;
        html = html + card;
    }
    $("#games").html(html)
}

function getGenres(){
    $.get({
        url: 'https://api.spotify.com/v1/browse/categories?locale=sv_US',
        headers: { 'Authorization' : 'Bearer ' + token},
        success: function(data){
            displayGenres(data);
        }
    })
}

function getGames(params){
    var url = 'https://api.spotify.com/v1/browse/featured-playlists'
    if(params.genre){
        url = 'https://api.spotify.com/v1/browse/categories/'+params.genre+'/playlists'
    }
    $.get({
        url: url,
        headers: { 'Authorization' : 'Bearer ' + token},
        data: params,
        success: function(data){
            console.log("getting games")
            console.log(data)
            displayGames(data)
        },
        error: function(err){
            console.log(err)
        }
    })
    // displayGames(games);
}

function genreClicked(ele, genre){
    var was_active = $(ele).hasClass('bg-gray-400');
    $(".genres.bg-gray-400").removeClass('bg-gray-400');
    $(".genres.text-white").addClass('text-gray-800');
    $(".genres.text-white").removeClass('text-white');
    if(!was_active){
        $(ele).addClass('bg-gray-400');
        $(ele).removeClass('text-gray-800');
        $(ele).addClass('text-white');
    }


    // $(ele).toggleClass('bg-gray-400');

    if($(ele).hasClass('bg-gray-400')){
        var params = {
            genre: genre
        }
        getGames(params);
    }else{
        getGames({});
    }

}

getToken();
getGenres();
getGames({});

var base_url = 'https://api.rawg.io/api/games?key=';
var api_key = '1ca4a75338014017a4a42ccaaf1320fe';

function displayGenres(data){
    var html = '';
    for(var i=0; i<data.results.length; i++){
        var card = `<span class="genres inline-block bg-gray-200 hover:bg-gray-300 hover:text-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2" onclick="genreClicked(this, '`+data.results[i].id+`')">#`+data.results[i].name+`</span>`;
        html = html + card;
    }
    $("#genres").html(html);
}

function displayGames(data){
    var html = '';
    for(var i=0; i<data.results.length; i++){
        // console.log(data.results[i])
        var card = `<div class="p-1">
        <div class="md:mx-auto w-100 md:max-w-sm rounded overflow-hidden shadow bg-white">
        <img class="w-full" src="`+data.results[i].background_image+`" alt="">
        <div class="px-6 py-4">
        <div class="font-bold text-black text-xl mb-2">`+data.results[i].name+`</div>
        <p class="text-gray-700 text-base">
        <span class="font-semibold">Ratings:</span> `+data.results[i].rating+` &#9733;<br>
        <span class="font-semibold">Metacritic:</span> `+data.results[i].metacritic+`<br>
        <span class="font-semibold">Available on:</span>
        `;
        for(var j=0; j < data.results[i].stores.length - 1; j++){
            card = card + data.results[i].stores[j].store.name+", "
        }
        card = card + data.results[i].stores[data.results[i].stores.length - 1].store.name
        card = card + `
        </p>
        </div>
        <div class="px-6 pt-4 pb-2">
        `;
        for(var j=0; j < data.results[i].genres.length; j++){
            card = card + `<span class="genres inline-block bg-gray-200 hover:bg-gray-300 hover:text-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2" onclick="genreClicked(this, '`+data.results[i].genres[j].id+`')">#`+data.results[i].genres[j].name+`</span>`;
        }
        card = card + `
        </div>
        </div>
        </div>`;
        html = html + card;
    }
    $("#games").html(html)
}

function getGenres(){
    $.get({
        url: 'https://api.rawg.io/api/genres',
        data: { key : api_key, page_size: 100},
        success: function(data){
            displayGenres(data);
        }
    })
    // displayGenres({
    //     "count": 0,
    //     "next": "http://example.com",
    //     "previous": "http://example.com",
    //     "results": [
    //         {"id": 0,"name": "action", "slug": "string","games_count": 0,"image_background": "http://example.com"},
    //         {"id": 0,"name": "adventure", "slug": "string","games_count": 0,"image_background": "http://example.com"}
    //     ]
    // })
}

function getGames(params){
    $.get({
        url: 'https://api.rawg.io/api/games',
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
            genres: genre,
            key: api_key
        }
        getGames(params);
    }else{
        getGames({key: api_key});
    }

}

getGenres();
getGames({key: api_key});

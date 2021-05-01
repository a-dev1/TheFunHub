var base_url = '';
var api_key = 'f990df780dfb08d187684c0afb71c1cf';
var genres = [];

function idToGenre(id){
    for (var i =0;i<genres.length;i++)
    {
        if (genres[i].id==id)
        {
            return genres[i].name
        }
    }
}

function displayGenres(data){
    var html = '';
    for(var i=0; i<data.genres.length; i++){
        var card = `<span class="genres inline-block bg-gray-200 hover:bg-gray-300 hover:text-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2" onclick="genreClicked(this, '`+data.genres[i].id+`')">#`+data.genres[i].name+`</span>`;
        html = html + card;
    }
    $("#genres").html(html);
}

function displayGames(data){
    var html = '';
    console.log(data.results)
    for(var i=0; i<data.results.length; i++){
        // console.log(data.results[i])
        var card = `<div class="p-1">
        <div class="md:mx-auto w-100 md:max-w-sm rounded overflow-hidden shadow bg-white">
        <img class="w-full" src="https://image.tmdb.org/t/p/original`+data.results[i].poster_path+`" alt="">
        <div class="px-6 py-4">
        <div class="font-bold text-black text-xl mb-2">`+data.results[i].title+`</div>
        <p class="text-gray-700 text-base">
        <span class="font-semibold">Rating:</span> `+data.results[i].vote_average+` &#9733;<br>
        <span class="font-semibold">Popularity:</span> `+data.results[i].popularity+`<br>
        <span class="font-semibold">Release Date:</span> `+data.results[i].release_date+`<br>
        <span class="font-semibold">Description:</span> `+data.results[i].overview+`<br>
        </p>
        </div>
        <div class="px-6 pt-4 pb-2">
        `;
        for(var j=0; j < data.results[i].genre_ids.length; j++){
            card = card + `<span class="genres inline-block bg-gray-200 hover:bg-gray-300 hover:text-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2" onclick="genreClicked(this, '`+data.results[i].genre_ids[j]+`')">#`+idToGenre(data.results[i].genre_ids[j])+`</span>`;
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
        url: 'https://api.themoviedb.org/3/genre/movie/list',
        data: { api_key : api_key},
        success: function(data){
            genres=data.genres;
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
        url: 'https://api.themoviedb.org/3/discover/movie',
        data: params,
        success: function(data){
            console.log("getting games")
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
            with_genres: genre,
            api_key: api_key
        }
        getGames(params);
    }else{
        getGames({api_key: api_key});
    }

}

getGenres();
getGames({api_key: api_key});

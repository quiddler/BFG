var model = {
    movies: [],
    books: []
};

$("#clearMovieButton").click(e => {
    model.movies = [];
    saveModel()
        .then(mod => {
            $("#movies").empty();
            model = mod;
        });
});

$("#clearBookButton").click(e => {
    model.books = [];
    saveModel()
        .then(mod => {
            $("#books").empty();
            model = mod;
        });
});

$("#movieButton").click( e => {
    const title = $("#movieName").val();
    const director = $("#movieDirector").val();

    if (!title || !director) return;

    addMovie(title, director);
});

$("#bookButton").click( e => {
    const title = $("#bookName").val();
    const author = $("#bookAuthor").val();

    if (!title || !author) return;

    addBook(title, author);
});

function addMovie(title, director) {
    model.movies.push({
        title,
        director
    });
    $("#movies").append(`<li class="list-group-item"><b>${title.toUpperCase()}</b>, directed by: <b>${director.toUpperCase()}</b></li>`);
    saveModel()
        .then(mod => model = mod)
}

function addBook(title, author) {
    model.books.push({
        title,
        author
    });
    $("#books").append(`<li class="list-group-item"><b>${title.toUpperCase()}</b>, written by: <b>${author.toUpperCase()}</b></li>`);
    saveModel()
        .then(mod => model = mod)
}

function retrieveModel() {
    return new Promise((resolve, reject) => {
        $.ajax("/home/get")
            .done( json => resolve(json) )
            .fail( err => reject(err) )
    });
}

function saveModel() {
    return new Promise((resolve, reject) => {

        const result = JSON.stringify(model)
            
        $.ajax({
            url: "/home/save?json=" + result,
            method: "POST"
        })
        .done((json) => {
            const mod = JSON.parse(json)
            if (!mod) reject()
            resolve(mod)
        })
        .fail((err) => reject(err) )
    });
}

retrieveModel()
    .then(json => {
        const mod = JSON.parse(json);
        model = mod
        model.books.forEach(x => $("#books").append(`<li class="list-group-item"><b>${x.title.toUpperCase()}</b>, written by: <b>${x.author.toUpperCase()}</b></li>`));
        model.movies.forEach(x => $("#movies").append(`<li class="list-group-item"><b>${x.title.toUpperCase()}</b>, directed by: <b>${x.director.toUpperCase()}</b></li>`) );
    });
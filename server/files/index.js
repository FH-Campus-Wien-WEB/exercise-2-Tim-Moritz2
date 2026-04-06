 window.onload = function () {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
        const bodyElement = document.querySelector("body")
        if (xhr.status == 200) {
            const movies = JSON.parse(xhr.responseText);

            movies.forEach(movie => {
                
              const article = document.createElement("article");
              article.id = movie.imdbID;

              const title = document.createElement("h1");
              title.textContent = movie.title;

              const img = document.createElement("img");
              img.src = movie.poster;

              const plot = document.createElement("p");
              plot.textContent = movie.plot;

              const genresDiv = document.createElement("div");
              movie.genres.forEach(g => {
                  const span = document.createElement("span");
                  span.textContent = g;
                  span.classList.add("genre");
                  genresDiv.append(span);
              });

              const info = document.createElement("p");
              info.textContent =
                  "Released: " + movie.released +
                  " | Runtime: " + movie.runtime + " min" +
                  " | IMDb: " + movie.imdbRating +
                  " | Metascore: " + movie.metascore;

              const crew = document.createElement("p");
              crew.textContent =
                  "Director: " + movie.directors.join(", ") +
                  " | Writer: " + movie.writers.join(", ");

              const actors = document.createElement("p");
              actors.textContent = "Actors: " + movie.actors.join(", ");

              const editButton = document.createElement("button");
              editButton.textContent = "Edit";

              editButton.onclick = function () {
                location.href = "edit.html?imdbID=" + movie.imdbID;
              };

              article.append(title, img, plot, genresDiv, info, crew, actors, editButton);
              bodyElement.append(article);
            })

        } else {
            bodyElement.append("Daten konnten nicht geladen werden, Status " + xhr.status + " - " + xhr.statusText)
        }
    }
    xhr.open("GET", "/movies")
    xhr.send()
}

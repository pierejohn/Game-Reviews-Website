let desiredElement = JSON.parse(localStorage.getItem("desiredElement"));
if (!desiredElement) {
    window.location.href = "./index.html";
}

getDetalis(desiredElement.id);

let detalis = "";

async function getDetalis(itemId) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'YOUR_KEY',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    try {
        let api = await fetch(
            `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${itemId}`,
            options
        );

        detalis = await api.json();

        fillItem();

    } catch (err) {
        console.log(err);
    }
}
function fillItem() {

    $('#gameInfo').html(`
        <div class="col-lg-4">
            <img class="w-100" src="${desiredElement.thumbnail}">
        </div>

        <div class="col-lg-8 text-white">
            <h1>Title: ${desiredElement.title}</h1>

            <h6>Category: ${desiredElement.genre}</h6>
            <h6>Platform: ${desiredElement.platform}</h6>
            <h6>Status: Live</h6>

            <p>${detalis.description}</p>

            <a class="btn btn-info" target="_blank" href="${desiredElement.game_url}">
                Play Game
            </a>
        </div>
    `);
}
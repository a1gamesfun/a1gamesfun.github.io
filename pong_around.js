
var gameObj = {};

async function loadPongAround() {
    // fetch the json game info file
    fetch(`https://a1games.fun/games/pong_around/gameinfo.json`)
        .then((response) => response.json())
        .then((jsonresponse) =>  {

            gameObj = jsonresponse;

            localStorage.setItem("SelectedGame", JSON.stringify(gameObj));

            window.location.replace("https://a1games.fun/pong_around");

        });

}

var gameinfo = JSON.parse(localStorage.getItem("SelectedGame"));

var container = document.getElementById("load-container");






async function loadAndAdd() {
    // fetch the json game info file
    fetch(`https://a1games.fun/games/${gameinfo.gamename}/${gameinfo.gamename}.html`)
        .then((response) => response.text())
        .then((htmlresponse) =>  {
            container.innerHTML = htmlresponse;
        });

}


loadAndAdd();

document.title = gameinfo.gamename;



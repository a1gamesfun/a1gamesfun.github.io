var gameinfo = JSON.parse(localStorage.getItem("SelectedGame"));

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

async function LoadDecorations () {
    // fetch the game information first
    /*await fetch(`https://a1games.fun/json/games/${localStorage.getItem("SelectedGame")}.json`)
    .then((response) => response.json())
    .then((jsonresponse) =>  {
        gameinfo = jsonresponse;
    });*/
    
    // ---- WEB PLAYER: ----

    // replace ugly logo with game logo
    document.getElementById("game-logo").src = `games/${gameinfo["gamename"]}/icon.png`;
    
    // replace loading logo with game logo
    document.getElementById("unity-logo").src = `games/${gameinfo["gamename"]}/icon.png`;

    // set game title
    document.getElementById("game-title").innerHTML = gameinfo["title"];


    // ---- DESCRIPTION: ----

    var ssContainer = document.getElementById("screenshot-container");
    var tmpl = document.getElementById("screenshot-template");

    for (let i = 0; i < gameinfo["screenshot-count"]; i++) {
          
        let clone = tmpl.cloneNode(true);

        clone.src = `games/${gameinfo["gamename"]}/screenshots/${i+1}.png`;
        clone.classList.add("screenshot");

        clone.removeAttribute("hidden");
        clone.removeAttribute("id");

        ssContainer.append(clone);

    }

    tmpl.remove();

    // set the description
    document.getElementById("game-description").innerHTML = gameinfo["description"];

    // set the developer logo
    document.getElementById("dev-logo").src = `files/img/devIcons/${gameinfo["developer"]}.png`;

    // set "developed by _" text
    document.getElementById("developed-by").innerHTML = `Developed by ${gameinfo["developer"]}`;

}

LoadDecorations();

//console.log(localStorage.getItem("SelectedGame"))
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

    // DEVELOPER CREDITS
    // set the developer logo
    var devlogoContainer = document.getElementById("dev-logo-container");
    var develogotmpl = document.getElementById("dev-logo-template");
    
    for (let i = 0; i < gameinfo["developers"].length; i++) {
          
        let clone = develogotmpl.cloneNode(true);

        clone.src = `files/img/devIcons/${gameinfo["developers"][i]}.png`;
        clone.classList.add("dev-logo");

        clone.removeAttribute("hidden");
        clone.removeAttribute("id");

        devlogoContainer.append(clone);

    }
    develogotmpl.remove();

    // set "developed by _" text
    var devByString = `Developed by ${gameinfo["developers"][0]}`;
    if (gameinfo["developers"].length > 1)
    {
        // add "& [developername]" for each other developer
        for (let i = 1; i < gameinfo["developers"].length; i++) {
              devByString += ` & ${gameinfo["developers"][i]}`;
        }
    }
    document.getElementById("developed-by").innerHTML = devByString;

    

}

LoadDecorations();

//console.log(localStorage.getItem("SelectedGame"))
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
    document.getElementById("game-logo").src = `files/img/gameIcons/${gameinfo["gamename"]}.png`;
    
    // replace loading logo with game logo
    document.getElementById("unity-logo").src = `files/img/gameIcons/${gameinfo["gamename"]}.png`;


    // set game title
    let name = gameinfo["gamename"].replace("_", " ");
    let indexes = [];
    for(var i = 0; i < name.length; i++) {
        
        if (name[i] === " ") indexes.push(i);
    }

    // always start with first chat uppercase
    name = setCharAt(name, 0, name[0].toUpperCase());
    // set all words after spaces uppercase
    for (let i = 0; i < indexes.length; i++) {
        name = setCharAt(name, indexes[i]+1, name[indexes[i]+1].toUpperCase());
    }

    // override it in html
    document.getElementById("unity-build-title").innerHTML = name;


    // ---- DESCRIPTION: ----

    var ssContainer = document.getElementById("screenshot-container");
    var tmpl = document.getElementById("screenshot-template");
    let clone = tmpl.cloneNode(true);

    clone.src = `files/img/screenshots/${gameinfo["gamename"]}/1.png`
    clone.classList.add("screenshot"); 
    
    clone.removeAttribute("hidden");
    clone.removeAttribute("id");
    
    ssContainer.append(clone);
    tmpl.remove();

    // set the description
    document.getElementById("game-description").innerHTML = gameinfo["description"];
}

LoadDecorations();

console.log(localStorage.getItem("SelectedGame"))
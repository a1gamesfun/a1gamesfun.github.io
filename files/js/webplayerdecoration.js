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
    // -- Title --
    // replace ugly logo with game logo
    document.title.innerText = `${gameinfo["title"]}`;
    
    // ---- WEB PLAYER: ----

    // replace ugly logo with game logo
    document.getElementById("game-logo").src = `games/${gameinfo["gamename"]}/icon.png`;
    
    // replace loading logo with game logo
    document.getElementById("unity-logo").src = `games/${gameinfo["gamename"]}/icon.png`;

    // set game title
    document.getElementById("game-title").innerHTML = gameinfo["title"];
    
    // set volume slider
    if (gameinfo["has_sound"].includes("alse")) // if game has_sound == "false" or "False":
    {
        document.getElementById("volumeSlider").value = 0;
        document.getElementById("volumeSlider").setAttribute("disabled", "true");
    }


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
    document.getElementById("game-description").innerText = gameinfo["description"];

    // DEVELOPER CREDITS
    // set the developer logo
    var devlogoContainer = document.getElementById("dev-logo-container");
    var develogotmpl = document.getElementById("dev-logo-template");
    
    // spawn developers[0] since at least 1 is required
    let clone = develogotmpl.cloneNode(true);
    
    clone.src = `files/img/devIcons/${gameinfo["developers"][0]}.png`;
    clone.classList.add("dev-logo");
    
    clone.removeAttribute("hidden");
    clone.removeAttribute("id");
    
    devlogoContainer.append(clone);
        
    // ADD "developer_name" <h3>
    var devbytmpl = document.getElementById("developed-by");
    
    clone = devbytmpl.cloneNode(true);
    clone.removeAttribute("id");
    
    clone.innerText = `${gameinfo["developers"][0]}`
    devlogoContainer.append(clone);
    
    
    
    

    
    // set "Developed by _" text
    if (gameinfo["developers"].length > 1)
    {
        // add "& [developername]" for each other developer
        for (let i = 1; i < gameinfo["developers"].length; i++) {
            
            // ADD "&" <h3>
            clone = devbytmpl.cloneNode(true);
            clone.removeAttribute("id");
            
            clone.innerText = "&"
            devlogoContainer.append(clone);

            // ADD developer icon
            clone = develogotmpl.cloneNode(true);
    
            clone.src = `files/img/devIcons/${gameinfo["developers"][i]}.png`;
            clone.classList.add("dev-logo");
            
            clone.removeAttribute("hidden");
            clone.removeAttribute("id");
            
            devlogoContainer.append(clone);
            
            // ADD "developer_name" <h3>
            clone = devbytmpl.cloneNode(true);
            clone.removeAttribute("id");
            
            clone.innerText = `${gameinfo["developers"][i]}`
            devlogoContainer.append(clone);
        }
        
        
    }
    
    
    
    develogotmpl.remove();
}

LoadDecorations();

//console.log(localStorage.getItem("SelectedGame"))
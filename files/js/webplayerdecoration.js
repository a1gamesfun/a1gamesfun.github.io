var gameinfo = JSON.parse(localStorage.getItem("SelectedGame"));

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

async function LoadDecorations () {
    
    // -- Title --
    document.title = gameinfo.title;
    
    // ---- WEB PLAYER: ----

    // -- Ask to load Unity game --
    if (gameinfo.href.includes("unity"))
    {
        let gamesize = 0;
        let link = `https://api.github.com/repos/a1gamesfun/a1gamesfun.github.io/contents/games/${gameinfo.gamename}/Build/${gameinfo.gamename}.data${gameinfo.compression == undefined ? "" : gameinfo.compression}`;
    
        await fetch(link)
                .then((response) => { return response.json(); })
                .then((response) => {
                    gamesize = Math.floor(response.size / 1024 / 1024);
                });
                
        if (gamesize >= 30)
        {
            var frame = document.getElementById("canvas-frame");
            var question = document.createElement("button");
            //question.innerText = "This game is large.\nPlay anyway?";
            question.innerText = `This game is ${gamesize} MB.\nClick to continue.`;
            question.id = "lfs-question";
            frame.append(question);
        }

            
        // -- LOADING ICON --
        document.getElementById("unity-logo").src = `games/${gameinfo.gamename}/icon.png`;

            
        // Custom Screensize:
        // width is always 960 so we just take the game's native res and scale it according to the fixed x value
        document.getElementById("unity-canvas").width = 960;
        let aspect_X = gameinfo.y / gameinfo.x; 
        let y = 960 * aspect_X;
        document.getElementById("unity-canvas").height = y;
        // Fit Loading Icon to screen
        document.getElementById("canvas-frame").style.height = y;
        console.log(`set screensize to ${960} by ${y}`)
    }


    // -- BANNER --
    document.getElementById("game-banner").src = `games/${gameinfo.gamename}/banner.png`;
    
    

    
    // -- VOLUME SLIDER --
    if (gameinfo.has_sound.includes("alse")) // if game has_sound == "false" or "False":
    {
        // Disable slider if the game has no volume
        document.getElementById("volumeSlider").value = 0;
        document.getElementById("volumeSlider").setAttribute("disabled", "true");
    }
    else
    {
        // If we have a saved game volume, use that on load. If not, use 0.25
        let vol = localStorage.getItem("gamevolume")
        document.getElementById("volumeSlider").value = vol == null ? 0.25 : vol;
    }


    // ---- DESCRIPTION: ----

    var ssContainer = document.getElementById("screenshot-container");

    for (let i = 0; i < gameinfo["screenshot-count"]; i++) {
          
        let clone = document.createElement("img");

        clone.src = `games/${gameinfo.gamename}/screenshots/${i+1}.png`;
        clone.classList.add("screenshot");

        ssContainer.append(clone);

    }

    // set the description
    document.getElementById("game-description").innerText = gameinfo.description;

    // DEVELOPER CREDITS
    // set the developer logo
    var devlogoContainer = document.getElementById("dev-logo-container");
    
    // spawn developers[0] since at least 1 is required
    // ADD developer icon
    let linkElement = document.createElement("a");
    fetch(`https://a1games.fun/files/developers/${gameinfo.developers[0]}.href`)
        .then((response) => { return response.text(); })
            .then((response) => {
                linkElement.href = response;
            })
    linkElement.target = "_blank";
    linkElement.classList.add("dev-logo");
    
    clone = document.createElement("img");
    clone.src = `files/developers/${gameinfo.developers[0]}.png`;
    clone.classList.add("dev-logo");
    
    linkElement.append(clone);
    devlogoContainer.append(linkElement);
    
    // ADD "developer_name" <h3>
    clone = document.createElement("h3");
    clone.innerText = `${gameinfo.developers[0]}`
    clone.classList.add("developed-by");
    devlogoContainer.append(clone);
    
    
    // set "Developed by _" text
    if (gameinfo.developers.length > 1)
    {
        // add "& [developername]" for each other developer
        for (let i = 1; i < gameinfo.developers.length; i++) {
            
            // ADD "&" <h3>
            clone = document.createElement("h3");
            clone.innerText = "&"
            clone.classList.add("developed-by");
            devlogoContainer.append(clone);
            
            // ADD developer icon
            let linkElement = document.createElement("a");
            fetch(`https://a1games.fun/files/developers/${gameinfo.developers[i]}.href`)
                .then((response) => { return response.text(); })
                    .then((response) => {
                        linkElement.href = response;
                    })
            linkElement.target = "_blank";
            linkElement.classList.add("dev-logo");
            
            clone = document.createElement("img");
            clone.src = `files/developers/${gameinfo.developers[i]}.png`;
            clone.classList.add("dev-logo");
            s
            linkElement.append(clone);
            devlogoContainer.append(linkElement);
            
            // ADD "developer_name" <h3>
            clone = document.createElement("h3");
            clone.innerText = `${gameinfo.developers[i]}`
            clone.classList.add("developed-by");
            devlogoContainer.append(clone);
        }

    }
    
    // set share link copy button onclick
    document.getElementById("copy-game-link").onclick = () => {
        navigator.clipboard.writeText(`https://a1games.fun/${gameinfo.gamename}`);
        document.getElementById("copy-game-link").innerText = "Link Copied!";
    };
    
    
}

LoadDecorations();

//console.log(localStorage.getItem("SelectedGame"))
var gameinfo = JSON.parse(localStorage.getItem("SelectedGame"));

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

async function LoadDecorations () {
    
    // -- Title --
    document.title = gameinfo.title;
    
    // ---- WEB PLAYER: ----

    // -- Ask to load game --
    if (gameinfo.LFS_data)
    {
        var frame = document.getElementById("canvas-frame");
        var question = document.createElement("button");
        question.innerText = "This game is large.\nPlay anyway?";
        frame.append(question);
    }


    // set game banner
    document.getElementById("game-banner").src = `games/${gameinfo.gamename}/banner.png`;
    
    
    // replace loading logo with game logo
    document.getElementById("unity-logo").src = `games/${gameinfo.gamename}/icon.png`;

    
    // set volume slider
    if (gameinfo.has_sound.includes("alse")) // if game has_sound == "false" or "False":
    {
        document.getElementById("volumeSlider").value = 0;
        document.getElementById("volumeSlider").setAttribute("disabled", "true");
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
    linkElement = document.createElement("a");

    linkElement.href = fetch(`https://a1games.fun/files/developers/${gameinfo.developers[0]}.href`)
                .then((response) => {
                    if (!response.ok)
                    {
                        return "";
                    }
                    response.text();
                    //console.log(response);
                    return response;
                })
                
    linkElement.target = "_blank";

    let clone = document.createElement("img");
    
    clone.src = `files/developers/${gameinfo.developers[0]}.png`;
    clone.classList.add("dev-logo");
    
    linkElement.append(clone);
    devlogoContainer.append(linkElement);
        
    // ADD "developer_name" <h3>
    var devbytmpl = document.getElementById("developed-by");
    
    clone = devbytmpl.cloneNode(true);
    clone.removeAttribute("id");
    
    clone.innerText = `${gameinfo.developers[0]}`
    devlogoContainer.append(clone);
    
    
    
    

    
    // set "Developed by _" text
    if (gameinfo.developers.length > 1)
    {
        // add "& [developername]" for each other developer
        for (let i = 1; i < gameinfo.developers.length; i++) {
            
            // ADD "&" <h3>
            clone = devbytmpl.cloneNode(true);
            clone.removeAttribute("id");
            
            clone.innerText = "&"
            devlogoContainer.append(clone);

            // ADD developer icon
            linkElement = document.createElement("a");
            link.href = fetch(`https://a1games.fun/files/developers/${gameinfo.developers[i]}.href`)
                        .then((response) => {
                            if (!response.ok)
                            {
                                return "";
                            }
                            response.text();
                            //console.log(response);
                            return response;
                        })

            link.target = "_blank";
            clone = document.createElement("img");
    
            clone.src = `files/developers/${gameinfo.developers[i]}.png`;
            clone.classList.add("dev-logo");
            
            clone.removeAttribute("hidden");
            clone.removeAttribute("id");
            
            devlogoContainer.append(clone);
            
            // ADD "developer_name" <h3>
            clone = devbytmpl.cloneNode(true);
            clone.removeAttribute("id");
            
            clone.innerText = `${gameinfo.developers[i]}`
            
            linkElement.append(clone);
            devlogoContainer.append(linkElement);
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
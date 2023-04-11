var gameinfo = JSON.parse(localStorage.getItem("SelectedGame"));




async function ColorizePage()
{
    var style;
    // get the styling from json
    await fetch(`https://a1games.fun/games/${gameinfo["gamename"]}/style.json`)
        .then((response) => response.json())
        .then((jsonresponse) =>  {

            // return generated json object
            style = jsonresponse;
            
        });



    // Background:
    document.getElementById("background").style.background = style["background"];
    
    // Fonts:
    // Plain Text
    document.getElementById("game-description").style.fontFamily = style["p-font"];
    // \/ 'Developed by' text font is set further down \/

    // Text Color:
    document.getElementById("game-description").style.color = style["text-color"];
    let devbys = document.getElementById("dev-logo-container").getElementsByClassName("developed-by");
    for (let i = 0; i < devbys.length; i++) {
        devbys[i].style.fontFamily = style["p-font"];
        devbys[i].style.color = style["text-color"];
    }


    // Primary Color:
    document.getElementById("unity-footer").style.backgroundColor = style["primary-color"];
    
    
    // Secondary Color:
    document.getElementById("volumeSlider").style.color = style["secondary-color"];
    document.getElementById("volumeSlider").innerHTML = style["secondary-color"];

    document.getElementById("screenshot-container").style.color = style["secondary-color"];

    document.getElementById("unity-fullscreen-button").style.backgroundColor = style["secondary-color"];
    
    
    // Custom Screensize:
    var aspect_X = 960 / style["x"]; // width is always 960 so we just take the game's native res and scale it according to the fixed x value

    document.getElementById("unity-canvas").height = style["y"] * aspect_X;
    
    
    // Tertiary Color:
    document.getElementById("description-container").style.backgroundColor = style["tertiary-color"];
    document.getElementById("footerbackground").style.backgroundColor = style["tertiary-color"];

}

ColorizePage()
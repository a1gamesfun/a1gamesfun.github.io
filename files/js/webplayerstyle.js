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
    document.getElementById("copy-game-link").style.backgroundColor = style["primary-color"];
    
    document.getElementById("screenshot-container").style.color = style["primary-color"];

    var screenshots = document.getElementById("screenshot-container").getElementsByClassName("screenshot");
    for (let i = 0; i < screenshots.length; i++) {
        
        screenshots[i].style.outlineColor = style["primary-color"];
    }
    //document.getElementById("screenshot-container").style.outlineColor
    // Secondary Color:
    document.getElementById("volumeSlider").style.color = style["secondary-color"];
    document.getElementById("volumeSlider").innerHTML = style["secondary-color"];
    
    document.getElementById("unity-fullscreen-button").style.backgroundColor = style["secondary-color"];
    
    document.getElementById("unity-background").style.backgroundColor = style["secondary-color"];
    
    document.getElementById("copy-game-link").style.color = style["secondary-color"];
    
    
    // Custom Screensize:
    // width is always 960 so we just take the game's native res and scale it according to the fixed x value
    document.getElementById("unity-canvas").width = 960;
    var aspect_X = style["y"] / style["x"]; 
    document.getElementById("unity-canvas").height = 960 * aspect_X;
    // Fit Loading Icon to screen
    document.getElementById("canvas-frame").style.height = y;

    
    
    // Tertiary Color:
    document.getElementById("description-container").style.backgroundColor = style["tertiary-color"];

}

ColorizePage()
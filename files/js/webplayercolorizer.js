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



    // Primary Color:
    document.getElementById("unity-footer").style.backgroundColor = style["primary-color"];
    document.getElementById("unity-header").style.backgroundColor = style["primary-color"];
    
    // Secondary Color:
    document.getElementById("unity-build-title").style.color = style["secondary-color"];
    document.getElementById("game-description").style.color = style["secondary-color"];
    document.getElementById("developed-by").style.color = style["secondary-color"];
    
    document.getElementById("volumeSlider").style.color = style["secondary-color"];
    
    // Tertiary Color:
    document.getElementById("description-container").style.backgroundColor = style["tertiary-color"];

    // Background:
    document.getElementById("background").style.background = style["background"];
    
    // Fonts:
    // Header
    document.getElementById("game-title").style.fontFamily = style["header-font"];
    // Plain Text
    document.getElementById("game-description").style.fontFamily = style["p-font"];
    document.getElementById("developed-by").style.fontFamily = style["p-font"];

    document.body.style.scrollbar = "yellow"

}

ColorizePage()
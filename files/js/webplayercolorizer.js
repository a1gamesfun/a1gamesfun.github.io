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
    // Header
    document.getElementById("game-title").style.fontFamily = style["header-font"];
    // Plain Text
    document.getElementById("game-description").style.fontFamily = style["p-font"];
    document.getElementById("developed-by").style.fontFamily = style["p-font"];

    // Primary Color:
    document.getElementById("unity-footer").style.backgroundColor = style["primary-color"];
    document.getElementById("unity-header").style.backgroundColor = style["primary-color"];
    
    // Secondary Color:
    document.getElementById("game-title").style.color = style["secondary-color"];
    document.getElementById("game-description").style.color = style["secondary-color"];
    document.getElementById("developed-by").style.color = style["secondary-color"];
    
    document.getElementById("volumeSlider").style.color = style["secondary-color"];
    document.getElementById("volumeSlider").innerHTML = style["secondary-color"];

    //document.querySelector('screenshot-container::-webkit-slider-thumb').style.color = style["secondary-color"];

    document.getElementById("screenshot-container").style.color = style["secondary-color"];
    
    // Tertiary Color:
    document.getElementById("description-container").style.backgroundColor = style["tertiary-color"];
    document.getElementById("footerbackground").style.backgroundColor = style["tertiary-color"];



}

ColorizePage()
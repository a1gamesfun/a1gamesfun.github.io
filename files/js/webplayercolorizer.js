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
    
    document.getElementById("unity-footer").backgroundColor = style["primary-color"];
    document.getElementById("unity-header").backgroundColor = style["primary-color"];
}

ColorizePage()
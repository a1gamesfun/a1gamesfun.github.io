const gamename = "crab_island"

function LoadDecorations () {
    console.log(gamename);
    document.getElementById("unity-webgl-logo").style.backgroundImage = `url('../files/img/gameIcons/${gamename}.png') no-repeat center;`
    console.log(document.getElementById("unity-webgl-logo").style.background)
    document.getElementById("unity-logo").style.backgroundImage = `url('../files/img/gameIcons/${gamename}.png') no-repeat center;`


    document.getElementById("unity-build-title").innerHTML = `${gamename} THIS IS A TEST`
}

LoadDecorations();
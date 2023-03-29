const gamename = "crab_island"

function LoadDecorations () {
    console.log(gamename);
    document.getElementById("unity-webgl-logo").style.background = `float:left; width: 204px; height: 38px; url('../files/img/gameIcons/${gamename}.png') no-repeat center;`
    console.log(document.getElementById("unity-webgl-logo").style.background)
    document.getElementById("unity-logo").style.background = `width: 154px; height: 130px; url('../files/img/gameIcons/${gamename}.png') no-repeat center;`
}

LoadDecorations();
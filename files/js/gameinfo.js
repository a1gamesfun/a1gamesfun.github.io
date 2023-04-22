var supporticon_pc = document.getElementById("support-icon-pc");
var supporticon_controller = document.getElementById("support-icon-controller");
var supporticon_mobile = document.getElementById("support-icon-mobile");
var shortdescription = document.getElementById("gameinfo-resume");
var gameinfobox = document.getElementById("gameinfobox");
var singleplayer = document.getElementById("icon-singleplayer");
var multiplayer = document.getElementById("icon-multiplayer");
var playerAmount = document.getElementById("player-amount");


function loadGameInfoBox(GAMES)
{

    let gamebuttons = document.getElementById("gamegrid").getElementsByClassName("game-thumbnail");

    
    for (let i = 0; i < gamebuttons.length; i++) {
        gamebuttons[i].addEventListener("pointerenter", (event) => {
            gameinfobox.removeAttribute("hidden");
            onHoverGame(GAMES[i]);
        });
        gamebuttons[i].addEventListener("pointerleave", (event) => {
            gameinfobox.hidden = true;
        });
    }
}


function onHoverGame(gameinfo)
{
    let parent = document.getElementById(gameinfo.gamename);
    
    parent.append(gameinfobox);
    
    shortdescription.innerText = `${gameinfo.description}`;

    showHideSupportIcons(gameinfo);

    if (gameinfo.maxplayers === 1)
    {
        singleplayer.removeAttribute("hidden");
        multiplayer.hidden = true;
        playerAmount.innerText = "1";
    }
    else
    {
        multiplayer.removeAttribute("hidden");
        singleplayer.hidden = true;
        playerAmount.innerText = `${gameinfo.minplayers}-${gameinfo.maxplayers}`;
    }
}

function showHideSupportIcons(gameinfo)
{
    if (gameinfo.support_pc.includes("rue"))
        supporticon_pc.style.display = "inline-block";
    else
        supporticon_pc.style.display = "none";
    
    if (gameinfo.support_controller.includes("rue"))
        supporticon_controller.style.display = "inline-block";
    else
        supporticon_controller.style.display = "none";

    if (gameinfo.support_mobile.includes("rue"))
        supporticon_mobile.style.display = "inline-block";
    else
        supporticon_mobile.style.display = "none";
}
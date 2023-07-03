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
        let button = gamebuttons[i].getElementsByClassName("game-button")[0];
        button.addEventListener("pointerenter", (event) => {
            gameinfobox.removeAttribute("hidden");
            onHoverGame(GAMES[i]);
        });
        button.addEventListener("pointerleave", (event) => {
            gameinfobox.hidden = true;
        });
    }
}


function onHoverGame(gameinfo)
{
    let parent = document.getElementById(gameinfo.gamename);
    
    parent.append(gameinfobox);
    
    shortdescription.innerText = `${gameinfo.shortdescription}`;

    showHideSupportIcons(gameinfo);

    setPlayerAmount(gameinfo.minplayers, gameinfo.maxplayers);
}

function setPlayerAmount(min, max)
{
    singleplayer.style.display = "block";

    if (max == 1)
    {
        playerAmount.innerText = `${max}`;    
        multiplayer.style.display = "none";
        playerAmount.style.left = "1.6rem";
    }
    else
    {
        playerAmount.innerText = `${min}-${max}`;
        multiplayer.style.display = "block";
        playerAmount.style.left = "2.2rem";
    }

    // Only show one number if they are the same anyway
    if (min == max)
        playerAmount.innerText = `${max}`;
    
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
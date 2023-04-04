
// define games array
var GAMES = [];

// get the array of gamenames
// Example: [
// "space_voyage", 
// "crab_island", 
// "example_name"
// ]
async function setGAMES()
{
    await fetch("https://a1games.fun/files/gamelist.json")
        .then((response) => response.json())
        .then((jsonresponse) =>  {
            // [...] makes a copy instead of a reference
            var list = [...jsonresponse.gamelist];
            //console.log(list);
            let l = list.length;

            for (let i = 0; i < l; i++) {
                // get rnd index
                let rnd = _.random(list.length - 1);
                
                GAMES.push(list[rnd]);
                list.splice(rnd, 1);

            }
            //console.log(GAMES);
        });
}

async function loadGame(i) {
    
    // fetch the json game info file
    return await fetch(`https://a1games.fun/games/${GAMES[i]}/gameinfo.json`)
        .then((response) => response.json())
        .then((jsonresponse) =>  {

            // return generated json object
            return jsonresponse;
            
        });

}

var container = document.getElementById("gamegrid");
//var tmpl = document.getElementById("game_template");
var tmpl = document.body.getElementsByClassName("game-thumbnail")[0];

async function addItem(i) 
{
    var gameObj = await loadGame(i);

    var gamename = gameObj["gamename"];
    var href = gameObj["href"];
    var classes = gameObj["support_controller"].includes("t") ? "support_controller" : "" + " " + gameObj["support_mobile"].includes("t") ? "support_mobile" : "" + " " + gameObj["support_pc"].includes("t") ? "support_pc" : "";
    
    let clone = tmpl.cloneNode(true);
    
    //console.log(clone)

    clone.onclick = function() { 
        localStorage.setItem("SelectedGame", JSON.stringify(gameObj));
        window.location.href = href; 
    };

    clone.id = gamename;
    
    clone.getElementsByClassName("game-thumbnail-image")[0].src = `games/${gamename}/thumbnail.png`

    clone.removeAttribute("hidden");

    container.append(clone);
}





async function spawnHTML()
{
    await setGAMES();
    //console.log(GAMES);
    // spawn the games as html

    for (let i = 0; i < GAMES.length; i++)
    {
        addItem(i);
    }
    //console.log(container);
}
  

spawnHTML();
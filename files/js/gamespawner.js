
// define games array
var GAMES = [];
var SORTED_GAMES = [];


// add jsonObject to GAMES
async function loadAndAddGame(gamename) {
    // fetch the json game info file
    await fetch(`https://a1games.fun/games/${gamename}/gameinfo.json`)
        .then((response) => response.json())
        .then((jsonresponse) =>  {

            // return generated json object
            GAMES.push(jsonresponse);
            
        });

}
// get the array of gamenames
// Example: [
// "space_voyage", 
// "crab_island", 
// "example_name"
// ]
async function setGAMES()
{
    var list;
    await fetch("https://a1games.fun/files/gamelist.json")
        .then((response) => response.json())
        .then((jsonresponse) =>  {
            // [...] makes a copy instead of a reference
            list = [...jsonresponse.gamelist];
        });
    let l = list.length;

    for (let i = 0; i < l; i++) {
        // get rnd index
        let rnd = _.random(list.length - 1);
        await loadAndAddGame(list[rnd]);
        list.splice(rnd, 1);
    }
}


var container = document.getElementById("gamegrid");
//var tmpl = document.getElementById("game_template");
var tmpl = document.body.getElementsByClassName("game-thumbnail")[0];

async function addItem(gameObj) 
{
    var gamename = gameObj["gamename"];
    var href = gameObj["href"];
    
    let clone = tmpl.cloneNode(true);
    
    console.log(clone)

    clone.onclick = function() { 
        localStorage.setItem("SelectedGame", JSON.stringify(gameObj));
        window.location.href = href; 
    };

    clone.id = gamename;
    
    clone.getElementsByClassName("game-thumbnail-image")[0].src = `games/${gamename}/thumbnail.png`

    clone.removeAttribute("hidden");

    console.log(clone)
    container.append(clone);
}

async function clearthumbnails()
{
    var items = clone.getElementsByClassName("game-thumbnail-image");

    for (let i = 0; i < items.length; i++) {
        items[i].remove();
    }
}

async function sortBySupported(s_pc, s_controller, s_mobile)
{
    SORTED_GAMES = [];
    
    GAMES.forEach(gameObj => {
        let pc = gameObj["support_pc"].includes("rue") ? true : false;
        let controller = gameObj["support_mobile"].includes("rue") ? true : false;
        let mobile = gameObj["support_controller"].includes("rue") ? true : false;

        let valid = true;

        if (s_pc == true)
        {
            if (!pc)
            {
                valid = false;
            }
        }

        if (s_controller == true)
        {
            if (!controller)
            {
                valid = false;
            }
        }

        if (s_mobile == true)
        {
            if (!mobile)
            {
                valid = false;
            }
        }

        if (valid)
        {
            SORTED_GAMES.push(gameObj);
        }
    });
    
}

async function sortGameGrid(s_pc, s_controller, s_mobile)
{
    clearthumbnails();
    sortBySupported(s_pc, s_controller, s_mobile);

    for (let i = 0; i < SORTED_GAMES.length; i++)
    {
        addItem(SORTED_GAMES[i]);
    }
}




async function spawnHTML()
{
    await setGAMES();
    //console.log(GAMES);
    // spawn the games as html

    for (let i = 0; i < GAMES.length; i++)
    {
        addItem(GAMES[i]);
    }
    //console.log(container);
}

// do on load
spawnHTML();
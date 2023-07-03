
// define games array
var GAMES = [];
var SORTED_GAMES = [];

var gamesAdded = 0;
var gamesCount = 0;

// add jsonObject to GAMES
async function loadAndAddGame(gamename) {
    // fetch the json game info file
    fetch(`https://a1games.fun/games/${gamename}/gameinfo.json`)
        .then((response) => response.json())
        .then((jsonresponse) =>  {

            // return generated json object
            GAMES.push(jsonresponse);
            addItem(jsonresponse, GAMES);
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
    fetch("https://a1games.fun/files/gamelist.json")
        .then((response) => response.json())
        .then((jsonresponse) =>  {
            // [...] makes a copy instead of a reference
            list = [...jsonresponse.gamelist];
            gamesCount = list.length;

            for (let i = 0; i < gamesCount; i++) {
                // get rnd index
                let rnd = Math.floor(Math.random() * list.length);
                loadAndAddGame(list[rnd]);
                list.splice(rnd, 1);
            }
        });
    
}


var container = document.getElementById("gamegrid");
//var tmpl = document.getElementById("game_template");
var tmpl = document.body.getElementsByClassName("game-thumbnail")[0];

async function addItem(gameObj, games) 
{
    var gamename = gameObj["gamename"];
    var href = gameObj["href"];
    
    let clone = tmpl.cloneNode(true);
    clone.style.zIndex = 1000 - gamesAdded;
    
    let button = clone.getElementsByClassName("game-button")[0];
    // -- Button Onclick --
    
    button.onclick = function() { 
        localStorage.setItem("SelectedGame", JSON.stringify(gameObj));
        window.location.href = href; 
    };
    
    clone.id = gamename;
    
    // -- Image Source --
    button.getElementsByClassName("game-thumbnail-image")[0].src = `games/${gamename}/thumbnail.png`

    clone.removeAttribute("hidden");

    // -- LFS Warning --
    if (gameObj.LFS_data)
    {
        let lfs_warning = document.createElement("p");
        lfs_warning.className = "lfs-warning";
        lfs_warning.innerText = "100 MB+";
    
        clone.append(lfs_warning);
    }


    container.append(clone);

    
    gamesAdded += 1;
    checkLoadGameInfoBox(games);
}

async function clearthumbnails()
{
    let items = document.getElementById("gamegrid").getElementsByClassName("game-thumbnail");
    
    for (let i = items.length-1; i >= 0; i--) {
        items[i].remove();
    }
}

async function sortBySupported(s_pc, s_controller, s_mobile, s_multiplayer)
{
    // clear sortedgames
    SORTED_GAMES = [];
    
    GAMES.forEach(gameObj => {

        let pc = gameObj["support_pc"].includes("rue") ? true : false;
        let mobile = gameObj["support_mobile"].includes("rue") ? true : false;
        let controller = gameObj["support_controller"].includes("rue") ? true : false;
        let multiplayer = gameObj["maxplayers"] > 1 ? true : false;

        let valid = false;

        if (s_pc && pc)
        {
            valid = true;
        }
        if (s_controller && controller)
        {
            valid = true;
        }
        if (s_mobile && mobile)
        {
            //valid = true;
        }
        if (s_multiplayer && multiplayer)
        {
            valid = true;
        }
        if (valid)
        {
            SORTED_GAMES.push(gameObj);
        }
    });
    
    gamesCount = SORTED_GAMES.length;
    gamesAdded = 0;
}

async function sortGameGrid(s_pc, s_controller, s_mobile, s_multiplayer)
{
    await clearthumbnails();
    await sortBySupported(s_pc, s_controller, s_mobile, s_multiplayer);

    for (let i = 0; i < SORTED_GAMES.length; i++)
    {
        addItem(SORTED_GAMES[i], SORTED_GAMES);
    }
}

async function applySortingOnClicks()
{
    let toggles = document.getElementsByClassName("sorting-option");

    localStorage.setItem("PC", "true");
    localStorage.setItem("Controller", "true");
    localStorage.setItem("Mobile", "true");
    localStorage.setItem("Multiplayer", "true");


    for (let i = 0; i < toggles.length; i++) {
        toggles[i].onclick = () => { toggleSortingElement(toggles[i].value) };
        if (localStorage.getItem(toggles[i].value).includes("rue"))
        {
            toggles[i].checked = "true";
        }
    }
}

async function toggleSortingElement(key)
{
    let item = localStorage.getItem(key);
    if (item.includes("rue"))
    {
        localStorage.setItem(key, "false");
    }
    else
    {
        localStorage.setItem(key, "true");
    }
    
    
    let pc = localStorage.getItem("PC").includes("rue");
    let controller = localStorage.getItem("Controller").includes("rue");
    let mobile = localStorage.getItem("Mobile").includes("rue");
    let multiplayer = localStorage.getItem("Multiplayer").includes("rue");

    sortGameGrid(pc, controller, mobile, multiplayer);
}


// set GAMES array and spawn the initial games
setGAMES();

// apply sorting functionality
applySortingOnClicks();


function checkLoadGameInfoBox(games)
{
    if (gamesAdded >= gamesCount)
    {
        // set on hover show game info
        loadGameInfoBox(games);
    }
}


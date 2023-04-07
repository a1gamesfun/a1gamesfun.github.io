
// define games array
var GAMES = [];
var SORTED_GAMES = [];


// add jsonObject to GAMES
async function loadAndAddGame(gamename) {
    // fetch the json game info file
    fetch(`https://a1games.fun/games/${gamename}/gameinfo.json`)
        .then((response) => response.json())
        .then((jsonresponse) =>  {

            // return generated json object
            GAMES.push(jsonresponse);
            addItem(jsonresponse);
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
            let l = list.length;

            for (let i = 0; i < l; i++) {
                // get rnd index
                let rnd = _.random(list.length - 1);
                loadAndAddGame(list[rnd]);
                list.splice(rnd, 1);
            }
        });
    
}


var container = document.getElementById("gamegrid");
//var tmpl = document.getElementById("game_template");
var tmpl = document.body.getElementsByClassName("game-thumbnail")[0];

async function addItem(gameObj) 
{
    var gamename = gameObj["gamename"];
    var href = gameObj["href"];
    
    let clone = tmpl.cloneNode(true);
    
    //console.log(clone)

    clone.onclick = function() { 
        localStorage.setItem("SelectedGame", JSON.stringify(gameObj));
        window.location.href = href; 
    };

    clone.id = gamename;
    
    clone.getElementsByClassName("game-thumbnail-image")[0].src = `games/${gamename}/thumbnail.png`

    clone.removeAttribute("hidden");

    //console.log(clone)
    container.append(clone);
}

async function clearthumbnails()
{
    let items = document.getElementById("gamegrid").getElementsByClassName("game-thumbnail");
    
    for (let i = 0; i < items.length; i++) {
        items[i].remove();
        i--;
    }
}

async function sortBySupported(s_pc, s_controller, s_mobile)
{
    // clear sortedgames
    SORTED_GAMES = [];
    
    GAMES.forEach(gameObj => {
        
        //console.log(gameObj)
        console.log(gameObj["title"])
        //console.log(gameObj["title"] + ": " + valid)

        let pc = gameObj["support_pc"].includes("rue") ? true : false;
        let mobile = gameObj["support_mobile"].includes("rue") ? true : false;
        let controller = gameObj["support_controller"].includes("rue") ? true : false;


        let valid = true;

        if (s_pc && !pc)
        {
            console.log("s_pc: " + s_pc + "| pc: " + pc)
            valid = false;
        }
        
        if (s_controller && !controller)
        {
            console.log("s_contr: " + s_controller + "| contr: " + controller)
            valid = false;
        }
        
        if (s_mobile && !mobile)
        {
            console.log("s_mobil: " + s_mobile + "| mobi: " + mobile)
            valid = false;
        }

        if (valid)
        {
            SORTED_GAMES.push(gameObj);
        }
        console.log('------------------------')
    });
    
}

async function sortGameGrid(s_pc, s_controller, s_mobile)
{
    await clearthumbnails();
    await sortBySupported(s_pc, s_controller, s_mobile);

    for (let i = 0; i < SORTED_GAMES.length; i++)
    {
        addItem(SORTED_GAMES[i]);
    }
}

async function applySortingOnClicks()
{
    let toggles = document.getElementsByClassName("sorting-option");

    localStorage.setItem("PC", "true");
    localStorage.setItem("Controller", "false");
    localStorage.setItem("Mobile", "false");


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

    sortGameGrid(pc, controller, mobile);
}


// set GAMES array and spawn the initial games
setGAMES();
// apply sorting functionality
applySortingOnClicks();
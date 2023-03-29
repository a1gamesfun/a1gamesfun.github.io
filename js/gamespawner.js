




// define games array
var GAMES = []

// get the array of gamenames
// Example: [
// "space_voyage", 
// "crab_island", 
// "example_name"
// ]
async function setGAMES()
{
    await fetch("https://a1games.fun/json/gamelist.json")
        .then((response) => response.json())
        .then((jsonresponse) =>  {
    
            GAMES = jsonresponse.gamelist;
            
        });
}







async function loadGame() {

    // get json string
    let rnd = _.random(GAMES.length - 1);
    let gamename = GAMES[rnd];
    
    // fetch the json game info file
    await fetch(`https://a1games.fun/json/games/${gamename}.json`)
        .then((response) => response.json())
        .then((jsonresponse) =>  {
    
            // remove one item at given index
            GAMES.splice(gamename, 1);

            // return generated json object
            return jsonresponse;
            
        });


}




async function addItem(container, template) {

    var gameObj = await loadGame();

    var imagename = gameObj.imagename;
    var href = gameObj.href;

    container.append(Mustache.render(template, { imagename, href }));
}

async function spawnHTML()
{
    await setGAMES();
    // spawn the games as html
    const tmpl = $('#item_template').html();
        const container = $('#app');
    
        for (let i = 0; i < GAMES.length; i++)
        {
            addItem(container, tmpl);
        }
}

spawnHTML();
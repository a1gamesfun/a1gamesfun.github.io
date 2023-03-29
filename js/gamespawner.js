




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
    
            var list = jsonresponse.gamelist;
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

    // get json string
    let gamename = GAMES[i];
    
    // fetch the json game info file
    return await fetch(`https://a1games.fun/json/games/${gamename}.json`)
        .then((response) => response.json())
        .then((jsonresponse) =>  {

            // return generated json object
            return jsonresponse;
            
        });


}




async function addItem(i, container, template) {

    var gameObj = await loadGame(i);

    var imagename = gameObj["imagename"];
    var href = gameObj["href"];
    var classes = gameObj["support_controller"].includes("t") ? "support_controller" : "" + " " + gameObj["support_mobile"].includes("t") ? "support_mobile" : "" + " " + gameObj["support_pc"].includes("t") ? "support_pc" : "";
    //console.log(classes);


    container.append(Mustache.render(template, { imagename, href }));
}

async function spawnHTML()
{
    await setGAMES();
    //console.log(GAMES);
    // spawn the games as html
    const tmpl = $('#game_template').html();
        const container = $('#gamegrid');
    
        for (let i = 0; i < GAMES.length; i++)
        {
            addItem(i, container, tmpl);
        }
}

spawnHTML();
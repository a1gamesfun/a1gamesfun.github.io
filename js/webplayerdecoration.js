const gamename = GAMES;


function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

async function LoadDecorations () {

    // set ugly logo to game logo
    document.getElementById("game-logo").src = `files/img/gameIcons/${gamename}.png`;
    
    // set loading logo to game logo
    document.getElementById("unity-logo").src = `files/img/gameIcons/${gamename}.png`;


    // set game title
    let name = gamename.replace("_", " ");
    let indexes = [];
    for(var i = 0; i < name.length; i++) {
        
        if (name[i] === " ") indexes.push(i);
    }

    // always start with first chat uppercase
    name = setCharAt(name, 0, name[0].toUpperCase());
    // set all words after spaces uppercase
    for (let i = 0; i < indexes.length; i++) {
        name = setCharAt(name, indexes[i]+1, name[indexes[i]+1].toUpperCase());
    }

    // override it in html
    document.getElementById("unity-build-title").innerHTML = name;

    // set the description
    document.getElementById("game-description").innerHTML = "test description asjoisajoijoaij";
}

LoadDecorations();


const fontObjects_Google = [
    // color fonts:
    { name: "Bungee Spice", fallback: "cursive", local:false, },
    { name: "Nabla", fallback: "cursive", local:false, },
    { name: "Foldit", fallback: "cursive", local:false, },
    { name: "MarioPixel", fallback: "cursive", local:true, filetype:"ttf", },
    // these ones dont work atm
    { name: "PeasBlocks", fallback: "cursive", local:true, filetype:"ttf", },
    //{ name: "Agreloyc", fallback: "cursive", local:true, filetype:"ttf", },
    //{ name: "BroshkPlum", fallback: "cursive", local:true, filetype:"ttf", },
    //{ name: "Cimero", fallback: "cursive", local:true, filetype:"otf", },
    //{ name: "Colortube", fallback: "cursive", local:true, filetype:"otf", },
    //{ name: "Digitalts", fallback: "cursive", local:true, filetype:"ttf", },
    //{ name: "Fattern", fallback: "cursive", local:true, filetype:"otf", },
    //{ name: "Freizer", fallback: "cursive", local:true, filetype:"ttf", },
    //{ name: "Multicolore", fallback: "cursive", local:true, filetype:"otf", },
    //{ name: "Gilbert", fallback: "cursive", local:true, filetype:"otf", },
    //{ name: "Namskow", fallback: "cursive", local:true, filetype:"ttf", },
    { name: "QuantumUkraine", fallback: "cursive", local:true, filetype:"ttf", },
    //{ name: "UseYourImagination", fallback: "cursive", local:true, filetype:"ttf", },
    // standard fonts:
    { name: "Creepster", fallback: "cursive", local:false, }, // halloween only
];

const fontObjects_Local = [
    // color fonts:
];

var fontObjectsToLoad = [];

function setRandomFontReferences()
{
    for (let i = 0; i < 3; i++) {
        // get rnd index
        let rnd = Math.floor(Math.random() * fontObjects_Google.length);
        
        // append to use later
        fontObjectsToLoad.push(fontObjects_Google[rnd]);
        
        // get the api font getter name
        let fontObj = fontObjects_Google[rnd];
        let name = fontObj.name;
        
        // delete so we dont get the same one twice
        fontObjects_Google.splice(rnd, 1);

        var chars = name.split('');
        
        for (let i = 0; i < name.length; i++) {
            if (name.charAt(i) == ' ')
            {
                chars[i] = '+';
            }
        }
        name = chars.join('');
        
        // console.log(name)
        // create a <link/> element and append it
        var node = document.createElement("link");
        if (fontObj.local)
            node.href = `files/z_fonts/${name}.${fontObj.filetype}`;
        else
            node.href = `https://fonts.googleapis.com/css2?family=${name}&display=swap`;
        node.rel = `stylesheet`;
        document.head.append(node);
    }
}

setRandomFontReferences();

async function setFonts()
{
    let free = document.getElementById("free");
    free.style.fontFamily = `${fontObjectsToLoad[0].name}, ${fontObjectsToLoad[0].fallback}`;

    let browser = document.getElementById("browser");
    browser.style.fontFamily = `${fontObjectsToLoad[1].name}, ${fontObjectsToLoad[1].fallback}`;

    let games = document.getElementById("games");
    games.style.fontFamily = `${fontObjectsToLoad[2].name}, ${fontObjectsToLoad[2].fallback}`;
}

setFonts();


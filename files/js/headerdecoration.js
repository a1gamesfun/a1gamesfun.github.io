

const fontObjects = [
    { name: "Indie Flower", fallback: "cursive", }, 
   // { name: "Inspiration", fallback: "cursive", }, 
    { name: "Righteous", fallback: "cursive", }, 
    { name: "Audiowide", fallback: "cursive", },
    { name: "Bangers", fallback: "cursive", },
    { name: "Bungee Shade", fallback: "cursive", },
    { name: "Bangers", fallback: "cursive", },
    { name: "Creepster", fallback: "cursive", },
    { name: "Blaka Ink", fallback: "cursive", },
    { name: "Foldit", fallback: "cursive", },
    { name: "Major Mono Display", fallback: "cursive", },
    { name: "Megrim", fallback: "cursive", },
    { name: "Mr Dafoe", fallback: "cursive", },
    { name: "MuseoModerno", fallback: "cursive", },
    { name: "Nabla", fallback: "cursive", },
    { name: "Kablammo", fallback: "cursive", },
    { name: "Press Start 2P", fallback: "cursive", },
    { name: "Bungee Spice", fallback: "cursive", },
    //{ name: "Redacted Script", fallback: "cursive", },
    { name: "Rubik Pixels", fallback: "cursive", },
    { name: "Rubik Vinyl", fallback: "cursive", },
   // { name: "Ruslan Display", fallback: "cursive", },
    { name: "Rye", fallback: "cursive", },
   // { name: "Sacramento", fallback: "cursive", },
    { name: "Sedgwick Ave Display", fallback: "cursive", },
    { name: "Silkscreen", fallback: "cursive", },
    { name: "Tilt Prism", fallback: "cursive", },
    { name: "Titan One", fallback: "cursive", },
];

var fontObjectsToLoad = [];

function setRandomFontReferences()
{
    for (let i = 0; i < 3; i++) {
        // get rnd index
        let rnd = Math.floor(Math.random() * fontObjects.length);
        
        // append to use later
        fontObjectsToLoad.push(fontObjects[rnd]);
        
        // get the api font getter name
        let name = fontObjects[rnd].name;
        
        // delete so we dont get the same one twice
        fontObjects.splice(rnd, 1);

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


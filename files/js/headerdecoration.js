

const fonts = [
    "'Roboto', sans-serif;",
    "'Indie Flower', cursive;",
    "'Crimson Text', serif",
    "'Inspiration', cursive",
    "'Righteous', cursive;",
    "'Audiowide', cursive;",
    "'Bangers', cursive;",
    "'Bungee Shade', cursive;",
    "'Creepster', cursive;",
    "'Dancing Script', cursive;",
    "'Delicious Handrawn', cursive;",
    "'Major Mono Display', monospace;",
    "'Megrim', cursive;",
    "'Monoton', cursive;",
    "'Mr Dafoe', cursive;",
    "'MuseoModerno', cursive;",
    "'Nabla', cursive;",
    "'Pacifico', cursive;",
    "'Press Start 2P', cursive;",
    "'Redacted Script', cursive;",
    "'Rubik 80s Fade', cursive;",
    "'Rubik Moonrocks', cursive;",
    "'Rubik Pixels', cursive;",
    "'Rubik Vinyl', cursive;",
    "'Ruslan Display', cursive;",
    "'Rye', cursive;",
    "'Sacramento', cursive;",
    "'Sedgwick Ave Display', cursive;",
    "'Silkscreen', cursive;",
    "'Tilt Prism', cursive;",
    "'Titan One', cursive;",
    "'Tourney', cursive;",
];

async function randomizeFont(element)
{

    let rnd = _.random(fonts.length - 1);

    element.style.fontFamily = fonts[rnd];
    console.log(fonts[rnd])
}

async function randomizeHeaderFonts()
{
    let elements = [];
    elements.push(document.getElementById("free").getElementsByClassName("header-h1")[0]);
    elements.push(document.getElementById("browsergames").getElementsByClassName("header-h1")[0]);

    for (let i = 0; i < elements.length; i++) {
        randomizeFont(elements[i]);
    }
}

randomizeHeaderFonts();
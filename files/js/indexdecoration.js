

const fonts = [
    "font-family: 'Roboto', sans-serif;",
    "font-family: 'Indie Flower', cursive;",
    "font-family: 'Crimson Text', serif",
    "font-family: 'Inspiration', cursive",
    "font-family: 'Righteous', cursive;"
];

async function randomizeFont(element)
{

    let rnd = _.random(fonts.length - 1);

    element.style.fontFamily = fonts[rnd];
    
}

async function randomizeHeaderFonts()
{
    let elements = document.getElementById("header-title-row").getElementsByClassName("header-h1");
    for (let i = 0; i < elements.length; i++) {
        randomizeFont(elements[i]);
    }
}


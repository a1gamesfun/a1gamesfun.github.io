/*
import fs from "fs";
import path from "path";

//const fs = require('fs');
//const path = require('path')

const jsonsInDir = fs.readdirSync('../json/games').filter(file => path.extname(file) === '.json');

jsonsInDir.forEach(file => {
    let fileData = fs.readFileSync(path.join('../json/games', file));
    let json = JSON.parse(fileData.toString());
    //set the string into our list of games
    GAMES.push(json);
});

*/

/*
$(() => {

    var filepath = 'https://a1games.fun/json/games'
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", filepath, false);

    var imagenames = new Array()

    for (var i = 0; i < length; i++) {

    }



});*/
const GAMES = [ ];

$(() => {

    $.getJSON('json/games.json', function (data) {
        $.each(data, () => {
            GAMES.push(data)
            print("pushed data: " + data);
        });
    });
    /*
    $.each(data, function (i, f) {
        var tblRow = "<tr>" + "<td>" + f.firstName + "</td>" +
            "<td>" + f.lastName + "</td>" + "<td>" + f.job + "</td>" + "<td>" + f.roll + "</td>" + "</tr>"
        $(tblRow).appendTo("#userdata tbody");
    });
    */
});


function loadGame() {

    // get json string
    let rnd = _.random(GAMES.length - 1);
    let jsonstring = GAMES[rnd];

    // remove one item at given index
    GAMES.splice(rnd, 1);

    // return generated json object
    return JSON.parse(jsonstring);
}




function addItem(container, template) {

    var gameObj = loadGame();

    var imagename = gameObj.imagename;
    var href = gameObj.href;

    container.append(Mustache.render(template, { imagename, href }));
}

$(() => {
    const tmpl = $('#item_template').html();
    const container = $('#app');

    for (let i = 0; i < 5; i++)
    {
        addItem(container, tmpl);
    }

});
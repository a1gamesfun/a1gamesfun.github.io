

class House {
    constructor(height, width, length) {
        this.height = height;
        this.width = width;
        this.length = length;
    }

    measure() {
        return `H: ${this.height}, W: ${this.width}, L: ${this.length}`
    }
}

class Shed extends House {
    constructor(height, width, length, tools) {
        super(height, width, length);
        this.tools = tools;
    }
}


writeHouse = () => {
    let h = new House("8 Meters", "12 Meters", "22 Meters");
    console.log(h.measure());
};

writeHouse();

const myObject = {
    position: (0, 0),
    Health: 100,
    Inventory: ["sword", "helmet", 45, ["cider", "bread", "apple", "banana"]],
    isDead: function () { return this.Health <= 0; },
    hasItem: function (item) { return this.Inventory.includes(item); },
}

test = () => {
    for (var i = 0; i < myObject.Inventory.length; i++) {
        console.log(myObject.Inventory[i]);
    }
};

test();
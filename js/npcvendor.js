

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

test()
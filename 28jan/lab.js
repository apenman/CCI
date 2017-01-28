//var say = require('say');

const food = {
  meat: ['spicy chicken arepas', 'chupe soup', 'pulled pork pernil arepa', 'crispy chicken plato', 'shredded beef arepa'],
  veg: ['Plato Vegetariana', 'yuca fries', 'garlic yuca fries', 'sweet yellow shuli arepa', 'vegetariana arepas', 'garlic coconut rice', 'classic Shuli arepas']
};


var sayFood = function(food) {
  //say.speak(food)
  var div = document.getElementById("textDiv");
  div.textContent = food;
  var text = div.textContent;
}

function forEach(array, action) {
  var allThings = "";
  for (var i = 0; i < array.length; i++) {
    allThings = allThings + ", " + array[i];
  }
  action(allThings);
}

var meatButton = function() {
  forEach(food.meat, sayFood);
}

var vegButton = function() {
  forEach(food.veg, sayFood);
}

var baudio = require('baudio');
 
var n = 5;
var b = baudio(function (t) {
    var x = Math.cos(t * 1075 + Math.cos(n));
    n += Math.cos(t);
    return x;
});
b.play();


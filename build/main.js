'use strict';

window.onload = function () {};

var CONTAINER = document.getElementById('container');
var SQUARE = [].slice.call(document.querySelectorAll('.square'));
var SQUARE_LENGTH = SQUARE.length;

// set original array
var originalArr = [];
for (var i = 0; i < SQUARE_LENGTH; i++) {
    originalArr[i] = i;
} // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

// define shuffle function in array prototype
Array.prototype.shuffle = function () {
    return this.sort(function () {
        return .5 - Math.random();
    });
};

// get shuffled array
function shuffledArr() {

    var posArr = originalArr.slice().shuffle();
    var imgArr = originalArr.slice().shuffle();

    return { posArr: posArr, imgArr: imgArr };
}

// get random position and img number pairs
function getRandomPairs() {
    var _shuffledArr = shuffledArr();

    var posArr = _shuffledArr.posArr;
    var imgArr = _shuffledArr.imgArr;

    var randomPairs = [];

    posArr.forEach(function (item, i) {
        randomPairs[i] = {};
        randomPairs[i]['posId'] = posArr[i];
        randomPairs[i]['imgId'] = imgArr[i];
    });

    return randomPairs;
}

// creat image
function creatImg(id) {

    var img = new Image();
    img.src = './img/' + id + '.png';
    img.classList.add('squareImg');

    return img;
}

console.log(getRandomPairs());

// insert image node into square
function insertImg() {

    var randomPairs = getRandomPairs();

    randomPairs.forEach(function (item, i) {

        var squareNode = document.getElementById(item.posId);
        var imageNode = creatImg(item.imgId);

        squareNode.appendChild(imageNode);

        console.log(squareNode, imageNode);
    });
}
console.log(insertImg());
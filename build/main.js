'use strict';

window.onload = function () {
    insertImg();
    // showImg();
};

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

var _shuffledArr = shuffledArr();

var posArr = _shuffledArr.posArr;
var imgArr = _shuffledArr.imgArr;

// get shuffled array

function shuffledArr() {

    var posArr = originalArr.slice().shuffle();
    var imgArr = originalArr.slice().shuffle();

    return {
        posArr: posArr,
        imgArr: imgArr
    };
}

// get random position and img number pairs
function getRandomPairs() {

    // let {posArr, imgArr} = shuffledArr();
    var randomPairs = [];

    posArr.forEach(function (item, i) {
        randomPairs[i] = {};
        randomPairs[i]['posId'] = posArr[i];
        randomPairs[i]['imgId'] = imgArr[i];
    });

    return randomPairs;
}

// insert image node into square
function insertImg() {

    var randomPairs = getRandomPairs();

    randomPairs.forEach(function (item, i) {

        var squareNode = document.getElementById('square' + item.posId);
        squareNode.querySelector('.squareImg').setAttribute('src', './img/' + item.imgId + '.png');
    });
}

// show image gradually
function showImg() {
    posArr.forEach(function (item, i) {
        var shouldShowPosNode = document.getElementById('square' + item);
        setTimeout(function () {
            shouldShowPosNode.querySelector('.squareImg').classList.add('show');
        }, 1000 * i);
    });
}

/* drag and drop */

var squareImgs = document.querySelectorAll('.squareImg');
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var squareWidth = screenWidth * 0.2;
var coordinateCompensation = {
    x: screenWidth * 0.1,
    y: screenHeight * 0.5 - screenWidth * 0.3
};

Array.prototype.forEach.call(squareImgs, function (squareImg, i) {

    squareImg.addEventListener('touchstart', function (event) {
        event.preventDefault();

        this.style.zIndex = 2;
    }, false);

    squareImg.addEventListener('touchmove', function (event) {
        event.preventDefault();
        this.classList.add('dragging');
        this.style.top = event.changedTouches[0].pageY - (screenHeight * 0.5 - screenWidth * 0.3) + 'px';
        this.style.left = event.changedTouches[0].pageX - screenWidth * 0.1 + 'px';
        console.log(this.style.top, this.style.left);
        console.log(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
    }, false);

    squareImg.addEventListener('touchend', function (event) {
        event.preventDefault();

        var desPosCoor = {
            x: event.changedTouches[0].pageX - coordinateCompensation.x,
            y: event.changedTouches[0].pageY - coordinateCompensation.y
        };

        var correspondingNum = {
            x: Math.floor(desPosCoor.x / (screenWidth * 0.2)),
            y: Math.floor(desPosCoor.y / (screenWidth * 0.2))
        };

        // from 0 to 11
        var desPosSquareNum = correspondingNum.y * 4 + correspondingNum.x;

        var targetImg = event.target;
        var targetPos = targetImg.getBoundingClientRect();
        var targetImgSrc = targetImg.getAttribute('src');
        var desPosSquare = document.getElementById('square' + desPosSquareNum);
        var desPosImg = desPosSquare.querySelector('.squareImg');
        var desImgSrc = desPosImg.getAttribute('src');

        targetImg.classList.remove('dragging');
        targetImg.style.left = squareWidth / 2 + 'px';
        targetImg.style.top = squareWidth / 2 + 'px';
        targetImg.style.zIndex = 1;

        setTimeout(function () {
            targetImg.setAttribute('src', desImgSrc);
            desPosImg.setAttribute('src', targetImgSrc);
        }, 100);
    }, false);
});
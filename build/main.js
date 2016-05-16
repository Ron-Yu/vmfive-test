'use strict';

window.onload = function () {
    insertImg();
    showImg();
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

        document.querySelector('#square' + item.posId + ' .squareImg').setAttribute('src', './img/' + item.imgId + '.png');
    });
}

// show image gradually
function showImg() {

    var firstImgDelay = 2000;
    var duration = 1000;

    posArr.forEach(function (item, i) {

        if (i === 0) {
            setTimeout(function () {
                document.querySelector('#square' + item + ' .squareImg').classList.add('show');
            }, firstImgDelay);
        } else {
            setTimeout(function () {
                document.querySelector('#square' + item + ' .squareImg').classList.add('show');
            }, duration * i + firstImgDelay);
        }
    });
}

/* drag and drop */

var squareImgs = document.querySelectorAll('.squareImg');

var _getDimensionConfig = getDimensionConfig();

var screenWidth = _getDimensionConfig.screenWidth;
var screenHeight = _getDimensionConfig.screenHeight;
var squareWidth = _getDimensionConfig.squareWidth;
var coordinateCompensation = _getDimensionConfig.coordinateCompensation;


function getDimensionConfig() {
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    var squareWidth = screenWidth * 0.2;

    // relative diatance between screen (0, 0) and #container (0, 0)
    var coordinateCompensation = {
        x: screenWidth * 0.1,
        y: screenHeight * 0.5 - screenWidth * 0.3
    };

    return { screenWidth: screenWidth, screenHeight: screenHeight, squareWidth: squareWidth, coordinateCompensation: coordinateCompensation };
};

window.addEventListener('orientationchange', getDimensionConfig);

// get destination position coordinate, convert finger position cooidinate to
function getDesPosCoor() {

    console.log(coordinateCompensation);

    var desPosCoor = {
        x: event.changedTouches[0].pageX - coordinateCompensation.x,
        y: event.changedTouches[0].pageY - coordinateCompensation.y
    };

    return desPosCoor;
}

Array.prototype.forEach.call(squareImgs, function (squareImg, i) {

    squareImg.addEventListener('touchstart', function (event) {

        event.preventDefault();

        this.classList.add('touchstart');
    }, false);

    squareImg.addEventListener('touchmove', function (event) {

        event.preventDefault();

        this.classList.add('dragging');

        var _getDesPosCoor = getDesPosCoor();

        var x = _getDesPosCoor.x;
        var y = _getDesPosCoor.y;

        // set img coordinate equaling to finger coordinate

        this.style.top = y + 'px';
        this.style.left = x + 'px';
    }, false);

    squareImg.addEventListener('touchend', function (event) {

        event.preventDefault();

        var _getDesPosCoor2 = getDesPosCoor();

        var x = _getDesPosCoor2.x;
        var y = _getDesPosCoor2.y;

        // set coordinating object like {x: 1, y: 2}

        var correspondingNum = {
            x: Math.floor(x / (screenWidth * 0.2)),
            y: Math.floor(y / (screenWidth * 0.2))
        };

        // convert correspondingNum to coordinating number from 0 to 11
        var desPosSquareNum = correspondingNum.y * 4 + correspondingNum.x;

        var targetImg = event.target;
        var targetPos = targetImg.getBoundingClientRect();
        var targetImgSrc = targetImg.getAttribute('src');
        var desPosSquare = document.getElementById('square' + desPosSquareNum);
        var desPosImg = desPosSquare.querySelector('.squareImg');
        var desImgSrc = desPosImg.getAttribute('src');

        targetImg.classList.remove('touchstart');
        targetImg.classList.remove('dragging');

        targetImg.style.display = 'none';
        targetImg.style.left = '';
        targetImg.style.top = '';

        setTimeout(function () {
            targetImg.setAttribute('src', desImgSrc);
            desPosImg.setAttribute('src', targetImgSrc);
            targetImg.style.display = '';
        }, 100);
    }, false);
});
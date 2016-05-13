window.onload = function() {
    insertImg();
    showImg();
};

const CONTAINER = document.getElementById('container');
const SQUARE = [].slice.call(document.querySelectorAll('.square'));
const SQUARE_LENGTH = SQUARE.length;

// set original array
let originalArr = [];
for (let i = 0; i < SQUARE_LENGTH; i++) {
    originalArr[i] = i;
} // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]


// define shuffle function in array prototype
Array.prototype.shuffle = function() {
    return this.sort(function() {
        return .5 - Math.random();
    });
}

let {posArr, imgArr} = shuffledArr();


// get shuffled array
function shuffledArr() {

    let posArr = originalArr.slice().shuffle();
    let imgArr = originalArr.slice().shuffle();

    return {posArr, imgArr}
}


// get random position and img number pairs
function getRandomPairs() {

    // let {posArr, imgArr} = shuffledArr();
    let randomPairs = [];

    posArr.forEach(function(item, i) {
        randomPairs[i] = {};
        randomPairs[i]['posId'] = posArr[i];
        randomPairs[i]['imgId'] = imgArr[i];
    });

    return randomPairs;
}


// creat image
function creatImg(id) {

    let img = new Image();
    img.src = `./img/${id}.png`;
    img.classList.add('squareImg');

    return img;
}


// insert image node into square
function insertImg() {

    let randomPairs = getRandomPairs();

    randomPairs.forEach(function(item , i) {

        let squareNode = document.getElementById(item.posId);
        let imageNode = creatImg(item.imgId);

        squareNode.appendChild(imageNode);

    })
}

function showImg() {

    posArr.forEach(function(item, i) {

        let shouldShowPosNode = document.getElementById(posArr[i]);

        setTimeout(function() {
            shouldShowPosNode.querySelector('.squareImg').classList.add('show');
        }, 1000 * i)
    })


}

window.onload = function() {
    insertImg();
    // showImg();
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

let {
    posArr,
    imgArr
} = shuffledArr();


// get shuffled array
function shuffledArr() {

    let posArr = originalArr.slice().shuffle();
    let imgArr = originalArr.slice().shuffle();

    return {
        posArr,
        imgArr
    }
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


// insert image node into square
function insertImg() {

    let randomPairs = getRandomPairs();

    randomPairs.forEach(function(item, i) {

        let squareNode = document.getElementById(`square${item.posId}`);
        squareNode.querySelector('.squareImg').setAttribute('src', `./img/${item.imgId}.png`);

    })
}


// show image gradually
function showImg() {
    posArr.forEach(function(item, i) {
        let shouldShowPosNode = document.getElementById(`square${item}`);
        setTimeout(function() {
            shouldShowPosNode.querySelector('.squareImg').classList.add('show');
        }, 1000 * i)
    })

}


/* drag and drop */

let squareImgs =  document.querySelectorAll('.squareImg');
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let squareWidth = screenWidth * 0.2;
let coordinateCompensation = {
    x: screenWidth * 0.1,
    y: screenHeight * 0.5 - screenWidth * 0.3
}

Array.prototype.forEach.call(squareImgs ,function(squareImg, i) {

    squareImg.addEventListener('touchstart', function(event) {
        event.preventDefault();
        console.log(event.changedTouches[0].pageX)
        console.log(event.changedTouches[0].pageY)
        console.log(squareImg.scrollTop)
        // squareImg.style.position = 'fixed'
        console.log(squareImg.style)
        console.log(squareImg.getBoundingClientRect().left, squareImg.getBoundingClientRect().top)
        // this.style.left = `${event.changedTouches[0].pageX}px`
        // this.style.top = `${event.changedTouches[0].pageY}px`
        this.style.zIndex = 2;

    }, false);

    squareImg.addEventListener('touchmove', function(event) {
        event.preventDefault();
        console.log(event.changedTouches[0].pageX)
        console.log(event.changedTouches[0].pageY)
        // console.log(squareImg.getBoundingClientRect().top, squareImg.getBoundingClientRect().left)
        // this.style.left = `${event.changedTouches[0].pageX}px`
        // this.style.top = `${event.changedTouches[0].pageY}px`
        this.style.zIndex = 2;

    }, false);

    squareImg.addEventListener('touchend', function(event) {
        event.preventDefault();

        let desPosCoor = {
            x: event.changedTouches[0].pageX - coordinateCompensation.x,
            y: event.changedTouches[0].pageY - coordinateCompensation.y
        };

        let correspondingNum = {
            x: Math.floor(desPosCoor.x / (screenWidth * 0.2)),
            y: Math.floor(desPosCoor.y / (screenWidth * 0.2))
        }

        // from 0 to 11
        let desPosSquareNum = correspondingNum.y * 4 + correspondingNum.x;

        let targetImg = event.target;
        let targetPos = targetImg.getBoundingClientRect();
        // console.log(targetPos)
        let targetImgSrc = targetImg.getAttribute('src');
        let desPosSquare = document.getElementById(`square${desPosSquareNum}`);
        let desPosImg = desPosSquare.querySelector('.squareImg')
        let desImgSrc = desPosImg.getAttribute('src');


        targetImg.style.left = squareWidth/2 + 'px';
        targetImg.style.top = squareWidth/2 + 'px';
        targetImg.style.zIndex = 1;


        setTimeout(function() {
            targetImg.setAttribute('src', desImgSrc);
            desPosImg.setAttribute('src', targetImgSrc);
        }, 100)


    }, false);
});

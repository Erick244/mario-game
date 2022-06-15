const pipe = document.querySelector('.pipe');
const mario = document.querySelector('.mario');
const menu = document.querySelector('.menu');

const css = (elem, prop, valor) => elem.style[prop] = valor;

const play = document.querySelector('.play').onclick = () => {
    css(menu, 'display', 'none');
    resetGame();
    startGame();
}

function jump() {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500)
}

function startGame() {

    mario.classList.add('mario-animation');

    setTimeout(() => {
        pipe.classList.add('pipe-animation');
        mario.classList.remove('mario-animation');
        css(pipe, 'display', 'block')

        addEventListener('keydown', jump);

    }, 3000)

    marioIsHit(pipe, mario);
}

function getPositions(elem) {
    const top = +document.defaultView.getComputedStyle(elem).top
        .replace('px', '');
    const bottom = +document.defaultView.getComputedStyle(elem).bottom
        .replace('px', '');
    const right = +document.defaultView.getComputedStyle(elem).right
        .replace('px', '');
    const left = +document.defaultView.getComputedStyle(elem).left
        .replace('px', '');

    return {
        top: top.toFixed(0),
        bottom: bottom.toFixed(0),
        right: right.toFixed(0),
        left: left.toFixed(0)
    }
}

let points = 0;
let record = points;

const scorer = (points) => {
    const recordMenu = document.querySelector('.record > span');

    if (points > record) {
        record = points;
    }

    recordMenu.innerHTML = record;

    const scorerMenu = document.querySelector('.scorer_menu > span');
    scorerMenu.innerHTML = points;
    const scorer = document.querySelector('.scorer');
    scorer.innerHTML = points;
}

let marioIsLife = true;

function marioIsHit(pipe, mario) {
    const loop = setInterval(() => {
        const pipeLeft = getPositions(pipe).left;
        const marioBottom = getPositions(mario).bottom;

        if (pipeLeft <= 147 && marioBottom <= 100 && pipeLeft >= -20) {
            clearInterval(loop);

            mario.src = 'images/game-over.png';
            css(mario, 'width', '100px');
            css(mario, 'bottom', `${marioBottom}px`);
            css(mario, 'marginLeft', '23px');


            pipe.classList.remove('pipe-animation');
            css(pipe, 'left', `${pipeLeft}px`);

            removeEventListener('keydown', jump);

            setTimeout(() => {
                css(menu, 'display', 'flex');
            }, 1500)
        } else if (pipeLeft == 0) {
            points++;
            scorer(points);
        }
    }, 13)
}

function resetGame() {
    points = 0;
    scorer(points);
    mario.src = 'images/mario.gif';
    css(mario, 'width', '120px');
    css(mario, 'bottom', '0px');
    css(mario, 'marginLeft', '0px');

    css(pipe, 'left', '110%');
}

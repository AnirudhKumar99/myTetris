let cellSize = 40;

let left, right, down, up, canvas;


let shapeMatrices
let game;
let shape;
let fCounter = 30;
let score;

function setup() {

    shapeMatrices = {
        I: {
            // matrix: [ [1, 1, 1, 1]],
            matrix: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1]],
            clr: color(1, 240, 241)
        },
        O: {
            matrix: [[1, 1], [1, 1]],
            clr: color(239, 241, 3)
        },
        T: {
            matrix: [[0, 0, 0], [0, 1, 0], [1, 1, 1]],
            clr: color(151, 1, 222)
        },
        S: {
            matrix: [[0, 0, 0], [0, 1, 1], [1, 1, 0]],
            clr: color(0, 219, 0)
        },
        Z: {
            matrix: [[0, 0, 0], [1, 1, 0], [0, 1, 1]],
            clr: color(214, 0, 0)
        },
        J: {
            matrix: [[0, 0, 0], [0, 0, 1], [1, 1, 1]],
            clr: color(218, 143, 0)
        },
        L: {
            matrix: [[0, 0, 0], [1, 0, 0], [1, 1, 1]],
            clr: color(0, 0, 227)
        }
    }
    canvas = createCanvas(480, 900);
    canvas.position((windowWidth/2)-240  , 0)
    background(200);
    game = new Game(10, 20, shapeMatrices);
    console.log(frameRate);
    left = createButton('←')
    left.position(windowWidth / 2, height + left.height);
    left.mouseClicked(() => game.update('ArrowLeft'))

    right = createButton('→')
    right.position(windowWidth / 2 + 2 * left.width, height + left.height);
    right.mouseClicked(() => game.update('ArrowRight'))

    down = createButton('↓')
    down.position(windowWidth / 2 + left.width, height + 2 * left.height);
    down.mouseClicked(() => game.update('ArrowDown'))


    up = createButton('↑')
    up.position(windowWidth / 2 + left.width, height);
    up.mouseClicked(() => game.update('ArrowUp'))

}

let first, second;
function keyPressed() {

    game.update(key);
    // console.log(key);
    fCounter = 30;

}



function draw() {
    // frameRate(80);
    background(200);
    fCounter = 30;
    if (keyIsDown(DOWN_ARROW)) fCounter = 5;
    if (frameCount % fCounter == 0)
        game.update("ArrowDown");
    game.show();

    textSize(40);
    textAlign(CENTER, CENTER);
    text(`SCORE:${game.score}`, 240, 870);

}
let cellSize = 40;

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
    createCanvas(480, 900);
    background(200);
    game = new Game(10, 20, shapeMatrices);
    console.log(frameRate)
}

let first, second;
function keyPressed() {

    game.update(key);
    // console.log(key);
    fCounter = 30;

}
function mouseClicked() {
    first = [mouseX, mouseY];
}
function mouseReleased(){
    second = [mouseX, mouseY];
    let key;
    if ((second[0] - first[0]) > cellSize)
        key = 'ArrowRight'
    game.update(key)
    console.log(first, second);
    first=[];
    second=[];
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
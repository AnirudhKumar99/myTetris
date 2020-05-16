

class Game {
    constructor(width, height, shapeMatrices) {
        this.width = width + 2;
        this.height = height + 1;
        this.size = cellSize;
        this.clr = color(200);
        this.score=0;

        this.board = []
        for (let i = 0; i < this.width; i++) {
            let col = [];
            for (let j = 0; j < this.height; j++) {
                col.push(new Cell((i + 0.5) * this.size, (j + 0.5) * this.size, this.clr, 0))
            }
            this.board.push(col);
        }
        for (let i = 0; i < this.width; i++) {
            this.board[i][this.height - 1].active = 1;
            this.board[i][this.height - 1].clr = color(0);
        } for (let i = 0; i < this.height; i++) {
            this.board[0][i].active = 1;
            this.board[0][i].clr = color(0);
            this.board[this.width - 1][i].active = 1;
            this.board[this.width - 1][i].clr = color(0);
        }
        // this.shapes = [];
        // for (let shape of Object.keys(shapeMatrices)) {
        //     let S = shapeMatrices[shape];
        //     let [w, h] = [this.width, this.height]
        //     this.shapes.push(new Shape(S.matrix, S.clr, [((w - 4) / 2) * cellSize, -3 * cellSize]));
        // }
        this.shapes = shapeMatrices;
        this.activeShape = this.getRandomShape();

    }
    drawGrid() {
        for (let i = 0; i < this.width * cellSize; i += cellSize) {
            for (let j = 0; j < this.height * cellSize; j += cellSize) {
                stroke(200, 100, 100);
                // line(0, 0, 400, 800)
                line(i, 0, i, height);
                line(0, j, width, j);
            }
        }

    }
    getRandomShape() {
        let shape = random(Object.keys(this.shapes));
        let S = this.shapes[shape];
        let [w, h] = [this.width, this.height];
        return new Shape(S.matrix, S.clr, [((w - 4) / 2) * cellSize, -cellSize])
    };
    show() {
        for (let col of this.board) {
            for (let cell of col) {
                cell.show();
            }
        }
        this.activeShape.show();
        // this.drawGrid();
    }
    // getDepth(){
    //     for(let i=)
    // }

    update(key) {
        if (!this.activeShape.update(this, key)) {
            let actCells = this.activeShape.allActiveCells();
            for (let cell of actCells) {
                let cellCopy = this.getCellByPos(cell.x, cell.y)
                cellCopy.active = 1;
                cellCopy.clr = cell.clr;
            }
            this.activeShape = this.getRandomShape();
        }
        this.deleteRowsIfAny();
        console.log(`SCORE:${this.score}`)
        // console.table(this.board[0][0].active)
        if(this.isGameOver()){
            console.log("Gameover")
            noLoop();
        }
    }
    getCellByPos(x, y) {

        let xIndex = int(x / 40);
        let yIndex = int(y / 40);
        return this.board[xIndex][yIndex];
    }
    setActivePieceToBoard() {
        let shape = this.activeShape.cellMatrix;
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[0].length; j++) {
                let [x, y] = [shape[i][j].x, shape[i][j].y];
                let cell = this.getCellByPos(x, y);
                cell.active = 1;
                cell.clr = shape[i][j].clr;
            }
        }
    }
    deleteRowsIfAny() {
        // console.log("deleter")
        let su = 0;
        for (let j = 0; j < this.height - 1; j++) {
            su = 0;
            // let temI=-1;
            for (let i = 1; i < this.width - 1; i++) {
                su += this.board[i][j].active;
            }

            if (su == 10) {
                this.score+=100;
                console.log('deletable', j);
                for (let k = 1; k < this.width - 1; k++) {
                    for (let l = j; l > 0; l--) {
                        // console.log(l);
                        this.board[k][l].clr = this.board[k][l - 1].clr;
                        this.board[k][l].active = this.board[k][l - 1].active;
                        // console.log(k,l);
                    }
                    this.board[k][0].clr=this.clr;
                }
            };
        }
        // console.log("su", su);
    }
    isGameOver() {
        for(let i=1;i<game.width-1;i++){
            if(this.board[i][0].active===1){
                return true;
            }
        }
    }
}
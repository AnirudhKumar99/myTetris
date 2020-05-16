// all shapes 
// # #   # #      # #  # # #  # # #   # # #  # # # #
// # #     # #  # #    #          #     #

// yellow red   green  orange  blue  violet light blue 


class Shape {
    constructor(matrix, clr, pos) {
        this.matrix = matrix;
        this.clr = clr;
        this.cellMatrix = [];
        this.pos = pos;
        for (let i = 0; i < this.matrix.length; i++) {
            let [x, y] = [pos[0], pos[1]];
            let col = [];
            for (let j = 0; j < this.matrix[0].length; j++) {
                col.push(new Cell(x + (i + 0.5) * cellSize, y + (j + 0.5) * cellSize, this.clr, matrix[j][i], i, j));
            }
            this.cellMatrix.push(col);
        }
    }
    update(game, key) {
        if (!this.isPossible(game)) {
            // console.log('here')
            // noLoop();
            return false;
        }
        // console.log(key);
        let [xD, yD] = [0, 0];
        if (key == "ArrowDown") [xD, yD] = [0, 1];
        else if (key == "ArrowRight") [xD, yD] = [1, 0];
        else if (key == "ArrowLeft") [xD, yD] = [-1, 0];
        else if (key == "ArrowUp") this.rotate();




        if (xD == -1) {
            let lac = this.leftActiveCells();

            let leastX = 500, leastPosX = 5;
            for (let i in lac) {
                let cell = lac[i];
                if (cell.x < leastX) {
                    leastX = cell.x;
                    leastPosX = i
                }
            }
            for (let cell of lac) {
                // cell.clr = color(100, 200, 150)
                if (game.getCellByPos(cell.x - cellSize, cell.y).active == 1)
                    xD = 0;
                else if (lac[leastPosX].x < 20)
                    xD = 0;
            }
        }

        else if (xD == 1) {
            let rac = this.rightActiveCells();

            let largeX = -200, largePosX = -1;
            for (let i in rac) {
                let cell = rac[i];
                if (cell.x > largeX) {
                    largeX = cell.x;
                    largePosX = i
                }
            }
            for (let cell of rac) {
                // cell.clr = color(100, 200, 150)
                if (game.getCellByPos(cell.x + cellSize, cell.y).active == 1)
                    xD = 0;
                else if (rac[largePosX].x > width) {
                    xD = 0;
                }
            }
        }
        // console.log(xD)
        this.pos[0] += xD * cellSize;


        // if (this.pos[0] < 20) this.pos[0] = 0;
        // else if (this.pos[0] + (this.matrix.length * cellSize) > width - 40) this.pos[0] = this.pos[0] - cellSize;
        this.pos[1] += yD * cellSize;
        this.cellMatrixUpdate();
        return true;
        // console.log(this.pos)
        // console.table(this.matrix);
    }
    allActiveCells() {
        let cells = []
        for (let i = 0; i < this.cellMatrix.length; i++) {
            for (let j = 0; j < this.cellMatrix[0].length; j++) {
                if (this.cellMatrix[i][j].active == 1)
                    cells.push(this.cellMatrix[i][j]);
            }
        }
        return cells;
    }
    leftActiveCells() {
        let cells = [];
        for (let i = 0; i < this.cellMatrix.length; i++) {
            let temCell = null;
            for (let j = 0; j < this.cellMatrix.length; j++) {
                if (this.cellMatrix[j][i].active == 1) {
                    temCell = this.cellMatrix[j][i];
                    break;
                }
            }
            if (temCell !== null)
                cells.push(temCell);
        }
        return cells;
    }
    rightActiveCells() {
        let cells = [];
        for (let i = this.cellMatrix.length - 1; i >= 0; i--) {
            let temCell = null;
            for (let j = this.cellMatrix.length - 1; j >= 0; j--) {
                if (this.cellMatrix[j][i].active == 1) {
                    temCell = this.cellMatrix[j][i];
                    break;
                }
            }
            if (temCell !== null)
                cells.push(temCell);
        }
        return cells;
    }
    lastActiveCells() {
        let cells = []
        for (let i = 0; i < this.cellMatrix.length; i++) {
            let temCell = null;
            for (let j = 0; j < this.cellMatrix[0].length; j++) {
                if (this.cellMatrix[i][j].active == 1) temCell = this.cellMatrix[i][j];
            }
            if (temCell !== null) {
                // console.log(temCell)
                cells.push(temCell);
            }
        }
        return cells;
    }
    isPossible(game) {
        let pos = this.lastActiveCells();
        // for (let cl of pos) console.log(cl.i, cl.j)
        let su = 0;
        for (let cell of pos) {
            let [x, y] = [cell.x, cell.y];
            su += game.getCellByPos(x, y + cellSize).active;
        }
        // console.log(su);
        if (su > 0) return false;
        return true;

    }


    rotate() {
        let n = this.matrix.length;
        for (let i = 0; i < n / 2; i++) {
            for (let j = i; j < n - i - 1; j++) {
                let tmp = this.matrix[i][j];
                this.matrix[i][j] = this.matrix[j][n - i - 1];
                this.matrix[j][n - i - 1] = this.matrix[n - i - 1][n - j - 1];
                this.matrix[n - i - 1][n - j - 1] = this.matrix[n - j - 1][i];
                this.matrix[n - j - 1][i] = tmp;
            }
        }
        if (this.pos[0] < 20) this.pos[0] = 40;
        else if (this.pos[0] + (this.matrix.length * cellSize) > (width - cellSize)) this.pos[0] = this.pos[0] - cellSize;
        this.cellMatrixUpdate();

    }
    cellMatrixUpdate() {
        this.cellMatrix = [];


        for (let i = 0; i < this.matrix.length; i++) {

            // console.log(this.pos[0], this.pos[0] + (this.matrix.length * cellSize))
            let [x, y] = [this.pos[0], this.pos[1]];

            let col = [];
            for (let j = 0; j < this.matrix[0].length; j++) {
                col.push(new Cell(x + (i + 0.5) * cellSize, y + (j + 0.5) * cellSize, this.clr, this.matrix[j][i], i, j));
            }
            this.cellMatrix.push(col);
        }
    }
    show() {
        for (let row of this.cellMatrix) {
            for (let cell of row) {
                if (cell.active)
                    cell.show();
            }
        }
    }
}
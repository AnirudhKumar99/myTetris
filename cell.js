class Cell {
    constructor(x, y, clr, active, i = 0, j = 0) {
        this.x = x;
        this.y = y;
        this.size = cellSize;
        this.active = active;
        this.clr = this.active ? clr : color(200);
        this.i = i; this.j = j
    }
    show() {
        push();
        // if (this.active) {
        rectMode(CENTER);
        noStroke();
        // stroke(100);
        fill(this.clr);
        rect(this.x, this.y, this.size - 2, this.size - 2);

        // Show state
        textAlign(CENTER, CENTER);
        textSize(20);
        stroke(0);
        // text(`${this.i}${this.j}`,this.x,this.y)
        // text(`${this.active}`,this.x,this.y)
        // }
        pop();
    }
    copy() {
        let cl = new Cell(this.x, this.y, this.size, this.active);
        cl.clr = this.clr;
        return cl;
    }
    isOfIJ(i, j) {
        return this.i == i && this.j == j;
    }

}
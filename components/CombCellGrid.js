/*
collection of cells into a grid (protype for a key).
The central lower cluster cell is the initial draw point for the grid.
Is polite enough to return the draw point to where it was before the shape was

CAN:
-display a grid of cells to represent a key

CAN'T:
-do anything useful yet

DEPENDS ON: CombCell.js
*/

class CellGrid{
  constructor(x,y,cellSize){
    this.x = x;
    this.y = y;
    this.SPACING = 1.75;
    this.cellSize = cellSize;
    this.cells = this.makeCells();
  }
  
  makeCells(startX, startY){
    let tempArray = [];   
    const SIDES = 6;

    tempArray.push(new Cell(0,0,this.cellSize,'WHITE'));//center poly
    //lower cluster
    for(var i = 7/6; i <= 13/6; i += 1/3){
      tempArray.push(new Cell((this.SPACING*this.cellSize)*cos( -(i) * PI),
                              (this.SPACING*this.cellSize)*sin( -(i) * PI),
                               this.cellSize,
                               'WHITE'));
    }
    //"translate" variables for upper cluster
    let transX = (this.SPACING*this.cellSize)*cos(11/6 * PI);
    let transY = (this.SPACING*this.cellSize)*sin(11/6 * PI);
    //upper cluster
    for(var i = 5/6; i > 1/6; i -= 1/3){
      tempArray.push(new Cell((this.SPACING*this.cellSize)*cos( -(i) * PI)+transX,
                              (this.SPACING*this.cellSize)*sin( -(i) * PI)+transY,
                               this.cellSize,
                               'WHITE'));
    }
    return tempArray;
  }

  display(){
    push();
    translate(this.x,this.y);//put the grid where it's at
    this.cells.map(cell => cell.display());
    pop();
  }
}
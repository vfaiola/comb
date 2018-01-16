/*
collection of cells into a grid (protype for a key).
The central lower cluster cell is the initial draw point for the grid.
Is polite enough to return the draw point to where it was before the shape was

CAN:
-display a grid of cells to represent a key
-assign chords to cells (currently just strings rather than actual chord objects)

CAN'T:
-do anything useful yet

DEPENDS ON: CombCell.js
*/

class CellGrid{
  constructor(x,y,cellSize,key){
    this.x = x;
    this.y = y;
    this.SPACING = 1.75;
    this.key = key;
    this.cellSize = cellSize;
    this.cells = this.makeCells();
  }
  
  

  makeCells(startX, startY){
    let tempArray = [];   
    const SIDES = 6;

    //these variables are used to assign chords to cells based on key
    let keys = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
    let keyIndex = keys.findIndex(x => x == this.key);
    let offsets = [11,2,5,4,9,0,11,7];//intervals in reverse order
    let quals   = ['m','m','','m','m','','m','']; // empties used to represent major chords 
                                                  //FIRST & 2ND TO LAST SHOULD BE DIM, but dim isn't implimented yet
    
    _buildCell(cellX, cellY){
    return new Cell(
      cellX,
      cellY,
      this.cellSize,
      new Chord(
        keys[(keyIndex + offsets.pop()) % keys.length], //assign a chord to the cell
        quals.pop(),
        (new Synth())));
  }


<<<<<<< HEAD
    function buildCell(o,cellX,cellY){
      return new Cell(
                  cellX,
                  cellY,
                  o.cellSize,
                  'WHITE',
                  null,
                  new Chord(keys[(keyIndex + offsets.pop()) % keys.length], //assign a chord to the cell
                                       quals.pop(),
                                       new Synth() ));
    }

    tempArray.push(buildCell(this,0,0));

=======
    //center poly
    tempArray.push(this._buildCell(0,0));
    
>>>>>>> master
    //lower cluster
    for(var i = 7/6; i <= 13/6; i += 1/3){
      tempArray.push(buildCell(
        this,
        (this.SPACING*this.cellSize)*cos( -(i) * PI),
        (this.SPACING*this.cellSize)*sin( -(i) * PI)));
    }
    
    //"translate" variables for upper cluster
<<<<<<< HEAD
    let transX = (this.SPACING*this.cellSize)*Math.cos(11/6 * PI);
    let transY = (this.SPACING*this.cellSize)*Math.sin(11/6 * PI); 
=======
    let transX = (this.SPACING*this.cellSize)*cos(11/6 * PI);
    let transY = (this.SPACING*this.cellSize)*sin(11/6 * PI); 
    
>>>>>>> master
    //upper cluster
    
    for(var i = 5/6; i > 1/6; i -= 1/3){ 
      tempArray.push(buildCell(
        this,
        (this.SPACING*this.cellSize)*Math.cos( -(i) * PI)+transX,
        (this.SPACING*this.cellSize)*Math.sin( -(i) * PI)+transY));
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
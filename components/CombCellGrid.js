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
    print(keyIndex);
    let offsets = [11,2,5,4,9,0,11,7];//intervals in reverse order
    
    //center poly
    tempArray.push(new Cell(
                            0,                                                 // x coord
                            0,                                                 //y coord
                            this.cellSize,
                            'WHITE',                                           // display color
                            null,                                              //map color
                            new Chord(keys[(keyIndex + offsets.pop()) % keys.length ]))); //assign a chord to the cell
    
    //lower cluster
    for(var i = 7/6; i <= 13/6; i += 1/3){
      tempArray.push(new Cell(
                              (this.SPACING*this.cellSize)*Math.cos( -(i) * PI),
                              (this.SPACING*this.cellSize)*Math.sin( -(i) * PI),
                              this.cellSize,
                              'WHITE',
                              null,
                              new Chord(keys[(keyIndex + offsets.pop()) % keys.length]))) ;
    }
    //"translate" variables for upper cluster
    let transX = (this.SPACING*this.cellSize)*cos(11/6 * PI);
    let transY = (this.SPACING*this.cellSize)*sin(11/6 * PI); 
    //upper cluster
    for(var i = 5/6; i > 1/6; i -= 1/3){
      tempArray.push(new Cell(
                              (this.SPACING*this.cellSize)*Math.cos( -(i) * PI)+transX,
                              (this.SPACING*this.cellSize)*Math.sin( -(i) * PI)+transY,
                               this.cellSize,
                               'WHITE',
                               null,
                              new Chord(keys[(keyIndex + offsets.pop() ) % keys.length  ])  ));
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
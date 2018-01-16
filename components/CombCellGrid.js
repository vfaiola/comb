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
    this.x = x;//x and y positions of the center (V chord) cell
    this.y = y;
    this.SPACING = 1.75; //space between cells in grid
    this.key = key;
    this.cellSize = cellSize;
    this.cells = this.makeCells();
  }
  
  //builds a grid of displayable cells starting from the middle of the grid
  makeCells(startX, startY){
    let tempArray = []; //stored array of new cells   
    const SIDES = 6; //# of sides in a cell

    //these variables are used to assign chords to cells based on key
    let keys = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
    let keyIndex = keys.findIndex(x => x == this.key);//search keys array for index of grid key
    let offsets = [11,2,5,4,9,0,11,7];//intervals in reverse order (so that pop() can be used)
    let quals   = ['m','m','','m','m','','m','']; //empties used to represent major chords 
                                                  //FIRST & 2ND TO LAST SHOULD BE DIM, but dim isn't implimented yet
    
    //nested function to generate a Cell object, complete with a chord from the grid's key.
    //a nested function used in this way can't automatically access "this" for class elements.
    //to bring the class into scope, it must be passed a reference to "this" explicitly.
    //"this" is a reserved keyword, so we need some other name. Here "thisObject" is the name
    //for that reference. The point is: calling this function requires the first argument to
    //be: "this"
    function buildCell(thisObject,cellX,cellY){
      return new Cell(
                  cellX,
                  cellY,
                  thisObject.cellSize,
                  'WHITE',
                  null,
                  new Chord(keys[(keyIndex + offsets.pop()) % keys.length], //assign a chord to the cell
                                       quals.pop(),
                                       new Synth()));
    }

    tempArray.push(buildCell(this,0,0)); //center cell
    
    //lower cluster. fancy fractions are for the internal trig junk
    for(var i = 7/6; i <= 13/6; i += 1/3){
      tempArray.push(buildCell(
        this,
        (this.SPACING*this.cellSize)*cos( -(i) * PI),
        (this.SPACING*this.cellSize)*sin( -(i) * PI)));
    }
    
    //"translate" variables for upper cluster by adding these variables to the coords
    let transX = (this.SPACING*this.cellSize)*Math.cos(11/6 * PI);
    let transY = (this.SPACING*this.cellSize)*Math.sin(11/6 * PI);  
    
    //upper cluster. fancy fractions are for the internal trig junk    
    for(var i = 5/6; i > 1/6; i -= 1/3){ 
      tempArray.push(buildCell(
        this,
        (this.SPACING*this.cellSize)*Math.cos( -(i) * PI)+transX,
        (this.SPACING*this.cellSize)*Math.sin( -(i) * PI)+transY));
    }

    return tempArray;
  }

  //are push()/pop() needed here?
  display(){
    //push();
    translate(this.x,this.y);//put the grid where it's at
    this.cells.map(cell => cell.display());
    //pop();
  }
}
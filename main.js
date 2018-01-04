class CellView{
  constructor(x,y,r,c,mapCol){
    this.x = x;//coords
    this.y = y;
    this.r = r;//radius
    this.mapColor = mapCol;//this is the hit map color to detect mouseover events
    this.displayColor = c;//this is the color that the user sees. 
    this.SIDES = 6;
  }
  
  //draw mouseover detection map layer
  displayMap(){
    fill(this.mapColor);
    polygon(this.x,this.y,this.r,this.SIDES); 
  }

  //draw user viewable layer
  display(){
    fill(this.displayColor);
    polygon(this.x,this.y,this.r,this.SIDES);
  }
}

class CellController{
  constructor(v,m){
    this.cellView = v;
    this.cellModel = m; 
  }

  eventClickedMouseOver(){
    if(mouseIsPressed && red(get(mouseX,mouseY)) == red(this.cellView.mapColor)){
      this.cellView.displayColor = 'BLACK';
    }else{
      this.cellView.displayColor = 'WHITE';
    }
  }
}

class CellModel{
}

//wrapper class for cell components
//view: responsible for displayable tasks ie drawing to the canvas
//model: responsible for knowing the name of the chord, notes of the chord, calling out 
//       to audio engine to play appropriate notes. 
//       ?? appropriate display colors for the chord ??
//controller: monitors button for events and updates appropriately
//            eg: when a button is pressed it must both notify the view to alter display
//                and model to signal the audio engine 
class Cell{
  constructor(x,y,r,c,mapCol){
    this.cellView = new CellView(x,y,r,c,(mapCol == null ? 'WHITE' : mapCol));
    this.cellModel = new CellModel();
    this.cellController = new CellController(this.cellView,this.cellModel);
  }

  display(){
    this.cellView.displayMap();
    this.cellController.eventClickedMouseOver();
    this.cellView.display();
  }
}

//collection of cells into a grid (protype for a key)
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
    translate(this.x,this.y);//put the grid where it's at
    this.cells.map(cell => cell.display());
  }
}


/***  processing functions ***/

let mouseWasClicked = false; //event switch

let grid;

function setup() {
  createCanvas(720,480);
  grid = new CellGrid(width/2,height/2,30);
}

function draw() {
  background(128);
  grid.display();
}

function mouseClicked(){
  mouseWasClicked = true;
}

/*** ^ processing functions ^ ***/



//draw function for scale grid, relies on polygon() defined below.
function makeScaleGrid(x,y,r){
  const SIDES = 6;
  const SPACING = 1.75;

  push(); //preserve OG draw state

  translate(x,y);
  fill(255);
  polygon(0,0,r,SIDES); //first poly used as ref point
  
  //colors for each cell
  hexColor = [];
  for(var i = 0; i < 8; i++){
    hexColor.push((i*10) + 100);
  }
  
  //lower cluster
  for(var i = 7/6; i <= 13/6; i += 1/3){
    push();
    fill(hexColor.pop());//color the cell 
    translate((SPACING*r)*cos( -(i) * PI),
              (SPACING*r)*sin( -(i) * PI));
    polygon(0,0,r,SIDES);
    if(i < 13/6){ //keep draw point here for second cluster
      pop();
    }
  }
  //upper cluster
  for(var i = 5/6; i > 1/6; i -= 1/3){
    push();
    fill(hexColor.pop());//color the cell 
    translate((SPACING*r)*cos( -(i) * PI),
              (SPACING*r)*sin( -(i) * PI));
    polygon(0,0,r,SIDES);
    pop();
  }

  pop();//restore draw state from first loop (last pop() in loop isn't called)
  pop();//restore function draw state
}

//https://p5js.org/examples/form-regular-polygon.html
function polygon(x, y, radius, npoints){
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
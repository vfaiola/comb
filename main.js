let numberOfCells = 0;

class CellView{
  constructor(x,y,r,c,mapCol){
    this.x = x;//coords
    this.y = y;
    this.r = r;//radius
    this.mapColor = mapCol;//this is the hit map color to detect mouseover events
    this.displayColor = c;//this is the color that the user sees. 
    this.SIDES = 6;
  }
  
  //https://p5js.org/examples/form-regular-polygon.html
  polygon(x, y, radius, npoints){
    var angle = TWO_PI / npoints;
    beginShape();
    for(var a = 0; a < TWO_PI; a += angle){
      var sx = x + cos(a) * radius;
      var sy = y + sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  } 

  //draw mouseover detection map layer
  displayMap(){
    fill(this.mapColor);
    this.polygon(this.x,this.y,this.r,this.SIDES); 
  }

  //draw user viewable layer
  display(){
    fill(this.displayColor);
    this.polygon(this.x,this.y,this.r,this.SIDES);
  }
}

class CellController{
  constructor(v,m){
    this.cellView = v;
    this.cellModel = m;
    this.cellNumber = numberOfCells;
    numberOfCells++; 
  }

  eventClickedMouseOver(){
    if(mouseIsPressed && red(get(mouseX,mouseY)) == red(this.cellView.mapColor)){
      this.cellView.displayColor = 'BLACK';
      print(this.cellNumber);
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
    push();
    translate(this.x,this.y);//put the grid where it's at
    this.cells.map(cell => cell.display());
    pop();
  }
}


/***  processing functions ***/

let mouseWasClicked = false; //event switch

let grid;

function setup() {
  createCanvas(720,480);
  grid = new CellGrid(width/2,height/2,30);
  textSize(30);
}

function draw() {
  background(128);
  grid.display();
  fill(0);
  text(frameCount, mouseX,mouseY);
}

function mouseClicked(){
  mouseWasClicked = true;
}

/*** ^ processing functions ^ ***/
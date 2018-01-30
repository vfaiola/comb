/*
Class for Comb hex cells
meant to function as the basic button class, particularly for the main chord grid.

NOTE: this mouseover detection is ULTRA SLOW PERFORMANCE and needs to be replaced.
HOW MOUSEOVER DETECTION WORKS:
this class detects mouseovers with a "map" color on each shape, which is displayed before the
user viewable display color. This color is checked against the color under the mouse when the 
mouse is pressed (mouseIsPressed boolean check). The acutal map color doesn't matter, as long as
it a) isn't the same color as the background, and b) the display color of the clicked button changes
when it is clicked. This is because the event checking is done during the Cell's display stage, 
between the mapDisplay and the user display. Effectivly a "Just In Time" event check. Cells drawn earlier
see the mouse as hovering over the background color. Cells drawn later see the mouse as hovering over the 
user displayable color. In this way, each button can detect mouse-over without having to be assigned 
unique map colors, nor some elaborite coordinate range/distance formula system. I've started calling this the
"Duckhunt" pattern.

CAN:
-display basic shape with fill color
-detect mouseIsPressed over individual Cells, and respond accordingly. Changes color atm
-keep track of how many cells their are, and each cell is numbered in draw order currently
-be used publicly without exposing implementation
CAN'T:
-model components are mostly unimplemented
-play chords yet

DEPENDS ON:
p5.js

*/


let numberOfCells = 0;

//view: responsible for displayable tasks ie drawing to the canvas
//displayable tasks include user-viewable and non-user-viewable (mouseover map display)
class CellView{
  constructor(x,y,r,displayColor,mapCol){
    this.x = x;//coords
    this.y = y;
    this.r = r;//radius
    this.cellText = '';//text to display in a cell
    this.mapColor = mapCol;//this is the hit map color to detect mouseover events
    this.displayColor = displayColor;//this is the color that the user sees. 
    this.SIDES = 6;
  }
  
  //https://p5js.org/examples/form-regular-polygon.html
  polygon(x, y, radius, npoints){
    var angle = TWO_PI / npoints;
    beginShape();
    for(var a = 0; a < TWO_PI; a += angle){
      var sx = x + Math.cos(a) * radius;
      var sy = y + Math.sin(a) * radius;
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
    fill(0);
    textFont('Verdana');
    textSize(this.r / 2.5);
    textAlign(CENTER);
    text(this.cellText,this.x,this.y + (this.r / 7));
  }
}


//controller: monitors button for events and updates appropriately
//eg: when a button is pressed it must both notify the view to alter display
//and model to signal the audio engine
class CellController{
  constructor(v,m){
    this.cellView = v;
    this.cellModel = m;
    this.cellData = this.cellModel.data;
    this.cellView.cellText = this.cellModel.chord.root + this.cellModel.chord.qual;//text to display in a cell
    this.cellNumber = numberOfCells;//cellNumber is a global variable to keep # of cells
    numberOfCells++; 
  }

  eventClickedMouseOver(){
    if(mouseIsPressed && red(get(mouseX,mouseY)) == red(this.cellView.mapColor)){
      this.cellView.displayColor = 'BLACK';
      console.log(this.cellNumber);//print the current cell number
    }else{
      this.cellView.displayColor = 'WHITE';
    }
  }
}


//model: currently responsible for holding a chord object to interface the cell
//with the back end. Chords have letters, qualities, and currently hold synth objects.
//in the future, they will have to carry a reference to a global synth object. 
class CellModel{
  constructor(chord){
    this.chord = chord;
  }
}


//wrapper class for cell components
//functions as a public API object in order to hide MVC implimentation
class Cell{
  constructor(x,y,r,displayColor,mapCol,chord){
    this.cellView = new CellView(x,y,r,displayColor,(mapCol == null ? 'WHITE' : mapCol));
    this.cellModel = new CellModel(chord);
    this.cellController = new CellController(this.cellView,this.cellModel);
  }

  display(){
    this.cellView.displayMap();//non-user-viewable mouseover detection layer
    this.cellController.eventClickedMouseOver();//controller event check
    this.cellView.display();//user-viewable
  }
}

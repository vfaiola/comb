/*
Class for Comb hex cells
meant to function as the basic button class, particularly for the main chord grid.

HOW MOUSEOVER DETECTION WORKS:
this class detects mouseovers with a "map" color on each shape, which is displayed before the
user viewable display color. This color is checked against the color under the mouse when the 
mouse is pressed (mouseIsPressed boolean check). Because of the way the drawing/event checking is ordered,  
the map color doesn't actually matter, or need to be unique to individual cells. In the code's current state
it's just white. Currently this will NOT WORK if the background also happens to be the same color as the map.

It's worth noting that I didn't expect the behavior in the class' current state. It works accidentally,
and I'm not 100% sure how at the moment. I thought that map should have to be unique for each cell,
but that is apperantly not so. A clue may lie in setting the background the same as the map color.
doing so results in something like the behavior I expected. It may have to do with the background drawing
before anything else? 

CAN:
-display basic shape with fill color
-detect mouseIsPressed over individual Cells, and respond accordingly. Changes color atm
-keep track of how many cells their are, and each cell is numbered in draw order currently
-be used publicly without exposing implementation
CAN'T:
-do anything outside of itself
-model components are totally unimplemented
-display anything other than a shape with a fill color

DEPENDS ON:
p5.js

*/


let numberOfCells = 0;

//view: responsible for displayable tasks ie drawing to the canvas
//displayable tasks include user-viewable and non-user-viewable (mouseover map display)
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

//controller: monitors button for events and updates appropriately
//            eg: when a button is pressed it must both notify the view to alter display
//                and model to signal the audio engine
class CellController{
  constructor(v,m){
    this.cellView = v;
    this.cellModel = m;
    this.cellNumber = numberOfCells;//cellNumber is a global variable to keep # of cells
    numberOfCells++; 
  }

  eventClickedMouseOver(){
    if(mouseIsPressed && red(get(mouseX,mouseY)) == red(this.cellView.mapColor)){
      this.cellView.displayColor = 'BLACK';
      print(this.cellNumber /*,": ", red(get(mouseX,mouseY))*/);//print the current cell number
      //print(red(get(mouseX,mouseY)));//print the color the mouse is sampling
    }else{
      this.cellView.displayColor = 'WHITE';
    }
  }
}

//model: responsible for knowing the name of the chord, notes of the chord, calling out 
//       to audio engine to play appropriate notes. 
//       ?? appropriate display colors for the chord ??
class CellModel{ //currently not implemented!
}

//wrapper class for cell components
//functions as a public API object in order to hide MVC implimentation
class Cell{
  constructor(x,y,r,c,mapCol){
    this.cellView = new CellView(x,y,r,c,(mapCol == null ? 'WHITE' : mapCol));
    this.cellModel = new CellModel();
    this.cellController = new CellController(this.cellView,this.cellModel);
  }

  display(){
    this.cellView.displayMap();//non-user-viewable mouseover detection layer
    this.cellController.eventClickedMouseOver();//controller event check
    this.cellView.display();//user-viewable
  }
}
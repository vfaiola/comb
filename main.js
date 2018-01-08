p5.disableFriendlyErrors = true;


//non displayable. holds data about chord. part of cell model.
//interface this with audio engine?
class Chord{
  constructor(rootN, quality, extension){
    this.rootN = rootN;//A,B,C...
    this.quality = quality;//Maj/min/aug/dim
    this.extension = extension;//7th, 9th...
    this.name = this.rootN + this.quality + this.extension;
  }

  play(){}//use audio engine somehow to play chord?
}


/*
main for Comb project.
*/

/***  processing functions ***/

let mouseWasClicked = false; //event switch
let currentScreen = 0;
let screens = [];

function setup() {
  frameRate(30);
  createCanvas(720,480);
  screens[0] = new Screen(128, [(new CellGrid(width/2,height/2,30)), (new CellGrid(width/6,height/6,30)) ]); //main grid
  //screens[1] = new Screen(128, [(new Cell(width/2,height/2,100,255,255,(new Chord("D", "min", "7"))))]); //playin' around screen
}

function draw() {
  screens[(screens[1] ? 1 : 0)].display();
}

function mouseClicked(){
  mouseWasClicked = true;
}
/*** ^ processing functions ^ ***/
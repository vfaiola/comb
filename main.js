//non displayable. holds data about chord. part of cell model.
//interface this with audio engine?
class Chord{
  constructor(rootN, type, extension){
    this.rootN = rootN;//A,B,C...
    this.type = type;//minor/Major...
    this.extension = extension;//7th, 9th...
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
  //screens[0] = new Screen(128, [(new CellGrid(width/2,height/2,30))]); //main grid
  screens[1] = new Screen(128, [(new Cell(width/2,height/2,100,255))]); //playin' around screen
}

function draw() {
  screens[1].display();
}

function mouseClicked(){
  mouseWasClicked = true;
}
/*** ^ processing functions ^ ***/
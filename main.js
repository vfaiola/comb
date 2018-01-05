/*
main class for Comb project.
*/

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
}

function mouseClicked(){
  mouseWasClicked = true;
}
/*** ^ processing functions ^ ***/
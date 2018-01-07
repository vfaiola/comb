/*
main for Comb project.
*/

/***  processing functions ***/

let mouseWasClicked = false; //event switch

//let grid;//a cellGrid
let screen1;

function setup() {
  createCanvas(720,480);
  screen1 = new Screen(128, [(new CellGrid(width/2,height/2,30))]);
}

function draw() {
  screen1.display();
}

function mouseClicked(){
  mouseWasClicked = true;
}
/*** ^ processing functions ^ ***/
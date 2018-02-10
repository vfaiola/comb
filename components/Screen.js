/*
Screen class fucntions as a container for displayable objects. 
Facilitates screen transitions. pass an array of objects to displayableObjects
to use.

it's required that all displayableObjects have to have a display() method

example:

let screen1 = new Screen(128, [(new CellGrid(width/2,height/2,30))]);
screen1.display();

*/
class Screen{
  constructor(background, displayableObjects){
    this.BACKGROUND = background;
    this.displayableObjects = displayableObjects;
  }

  displayMap(){
    background(this.BACKGROUND);
    this.displayableObjects.map(o => o.displayMap());
  }

  display(){
    background(this.BACKGROUND);
    this.displayableObjects.map(o => o.display());
  }
}
p5.disableFriendlyErrors = true;

/* early prototypes for chord/synth objects   */

//used by chord to look up midi values
let octave = {
  'C':60,'C#':61,'D':62,'D#':63,'E':64,'F':65,'F#':66,'G':67,'G#':68,'A':69,'A#':70,'B':71};

/*
a chord object containing data about which notes are to be played
root: root note of chord
qual: "quality of chord" eg: maj/min/dim etc
synth: Synth object which will actually play the notes

future: more qualitys, extensions, various methods. This class is intended to be part of the
Cell model class.  
*/ 
class Chord{
  constructor(root,qual,synth){
    this.root = octave[root];
    this.qual = qual;
    this.third = (this.qual == "min" ? this.root + 3 : this.root + 4);
    this.fifth = this.root + 7;
    this.synth = synth;    
  }
  
  play(){
    this.synth.play(this.root,this.third,this.fifth);
  }

  stop(){
    this.synth.stop();
  }
}

/*
Synth object will play the notes. global and persistant so that all chords can share the synth
currently set up with only 3 voices for simplicity
future: add an amp envelope, this will need a gui at some point to edit it's attributes
(another screen for this) 
*/
class Synth{
  constructor(){
    this.voices = [
      (new p5.SinOsc()),
      (new p5.SinOsc()),
      (new p5.SinOsc())
    ]; 
  }

  play(root,third,fifth){ 
    this.voices[0].freq(midiToFreq(root));
    this.voices[1].freq(midiToFreq(third));
    this.voices[2].freq(midiToFreq(fifth));
    
    this.voices.map(v => v.start())
  }

  stop(){
    this.voices.map(v => v.stop());
  }
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
  createCanvas(1440,900);
  screens[0] = new Screen(128, [(new CellGrid(width/2,height/2,30,'G# ')), /*(new CellGrid(width/6,height/6,30))*/ ]); //main grid
  //screens[1] = new Screen(128, [(new Cell(width/2,height/2,100,255,255,(new Chord("D", "min", "7"))))]); //playin' around screen
}

function draw() {
  screens[(screens[1] ? 1 : 0)].display();
}

function mouseClicked(){
  mouseWasClicked = true;
}
/*** ^ processing functions ^ ***/
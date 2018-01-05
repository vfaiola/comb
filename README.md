# comb

Comb is meant to be a web application for composing chord progressions.   

Plan:
SCREENS:
-MAIN
-CHORD EDITOR
-SONG PALLET (?? thinking a list of progressions built from the main screen ??)
-SAVE/EXPORT (no clue how this is going to work)


<b>MAIN SCREEN</b>:
  -a grid of hex cells drawn across the screen, each representing a chord
  -a memory buffer of chords played on that screen 
  -chords in the memory buffer should have a subscreen (accessable how?) <b>CHORD EDITOR</b>.
    -editing chords:
      The chord editor should allow the individual notes of the chord to be edited by adding/subtracting notes, sharping/flatting,
      and transposing by octave.
    -justification for the memory buffer:
      -Just jumping around the grid it can be difficult to remember recently played progressions
      -The main chord grid will already be big without adding the chord variations/extensions etc. The buffer will serve as a place to
       edit individual chords seperate from the main grid.
      -editing the main grid for chord variations isn't likely to be a good option. It would be difficult to go back and forth between,
       for example, a maj and maj7.
      -the buffer should allow a quick way to try out new progressions without having to remember where you were on the grid.
   -memory buffer should have some way to "lock in" chords/progressions so that they do not fall off the buffer.
   -chords should be playable from the memory buffer.
   -locked in chords/progressions should be transferable to a "song pallet" screen (or something?)
   
   <b>CHORD EDITOR</b>
   -subscreen accessed through the chords in the memory buffer
   -defaults to the notes of the chord from the big grid
   -notes can be added or removed (for 7ths, ommits etc)
   -notes can be sharped or flatted
   -notes can be transposed by octave
   -if possible: additional octave notes can be added for extra voicing options

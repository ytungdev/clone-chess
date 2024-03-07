# clone-chess
For practice purposes. Inspired by n-knights and n-queen problem.

## Technologies
- **Language** : TypeScript
- **Framework** : Angular

## Usage
```
ng serve -o
```

## Terminology

- [Ranks](https://en.wikipedia.org/wiki/Glossary_of_chess#rank) : A row of the chessboard. ["1" ... "8"]
- [Files](https://en.wikipedia.org/wiki/Glossary_of_chess#file) : A column of the chessboard. ["a" ... "h"]
- Character : ['King', 'Queen', 'Rook', 'Bishop', 'Knight', 'Pawn']


## Functions

- Select : click on any non-highlighted sqaure on the board
  - selected square will be highlighted in red.
  - If occupier exist on selected square, sqaures of possible move will be highlighted in yellow.
    - only Pawn and Knight can move in initial setting (not blocked by allies)  
- Deselect : click on any red-highlighted sqaure on the board
    - Deselect a selectedsquare
- Move : click on any yellow-highlighted sqaure on the board
  - Move the chess from previously selected sqaure to target square
  - Capture enemy if landing on chess with oppoiste color
  - Win if capturing enemy King
  - When a pawn advances to its eighth rank, it is promoted


## To-do

- Add custom starting board
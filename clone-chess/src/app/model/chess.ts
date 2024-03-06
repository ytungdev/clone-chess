export interface Character {
    moveSet: any[];
    initialMoveSet: Move[];
    captureMoveSet: Move[];
    symbols: string[];
    qty: number;
}

export type Position = { rank: string, file: string }
export type Move = { rank: number, file: number, range: number }

export type CharacterIndex = { [key: string]: Character }
export const characterIndex: CharacterIndex = {
    'King': {
        moveSet: [
            { rank: 0, file: 1, range: 1 },
            { rank: 1, file: 1, range: 1 },
            { rank: 1, file: 0, range: 1 },
            { rank: 1, file: -1, range: 1 },
            { rank: 0, file: -1, range: 1 },
            { rank: -1, file: -1, range: 1 },
            { rank: -1, file: 0, range: 1 },
            { rank: -1, file: 1, range: 1 }
        ],
        initialMoveSet: [],
        captureMoveSet: [],
        symbols: ['♔', '♚', 'K'],
        qty: 1
    },
    'Queen': {
        moveSet: [
            { rank: 0, file: 1, range: 7 },
            { rank: 1, file: 1, range: 7 },
            { rank: 1, file: 0, range: 7 },
            { rank: 1, file: -1, range: 7 },
            { rank: 0, file: -1, range: 7 },
            { rank: -1, file: -1, range: 7 },
            { rank: -1, file: 0, range: 7 },
            { rank: -1, file: 1, range: 7 },
        ],
        initialMoveSet: [],
        captureMoveSet: [],
        symbols: ['♕', '♛', 'Q'],
        qty: 1
    },
    'Rook': {
        moveSet: [
            { rank: 0, file: 1, range: 7 },
            { rank: 1, file: 0, range: 7 },
            { rank: 0, file: -1, range: 7 },
            { rank: -1, file: 0, range: 7 },
        ],
        initialMoveSet: [],
        captureMoveSet: [],
        symbols: ['♖', '♜', 'R'],
        qty: 2
    },
    'Bishop': {
        moveSet: [
            { rank: 1, file: 1, range: 7 },
            { rank: 1, file: -1, range: 7 },
            { rank: -1, file: -1, range: 7 },
            { rank: -1, file: 1, range: 7 },
        ],
        initialMoveSet: [],
        captureMoveSet: [],
        symbols: ['♗', '♝', 'B'],
        qty: 2
    },
    'Knight': {
        moveSet: [
            { rank: 1, file: 2, range: 1 },
            { rank: 2, file: 1, range: 1 },
            { rank: 2, file: -1, range: 1 },
            { rank: 1, file: -2, range: 1 },
            { rank: -1, file: -2, range: 1 },
            { rank: -2, file: -1, range: 1 },
            { rank: -2, file: 1, range: 1 },
            { rank: -1, file: 2, range: 1 },
        ],
        initialMoveSet: [],
        captureMoveSet: [],
        symbols: ['♘', '♞', 'N'],
        qty: 2
    },
    'Pawn': {
        //base on light
        moveSet: [
            { rank: -1, file: 0, range: 1 },
        ],
        initialMoveSet: [
            { rank: -1, file: 0, range: 1 },
            { rank: -2, file: 0, range: 1 }
        ],
        captureMoveSet: [
            { rank: -1, file: 1, range: 1 },
            { rank: -1, file: -1, range: 1 }
        ],
        symbols: ['♙', '♟︎', 'P'],
        qty: 8
    }
}

export type PieceIndex = { [key: string]: { rank: string, file: string, color: string, character: string }}
export const pieceIndex: PieceIndex = {
    wK0: { rank: '1', file: 'e', color: 'light', character: 'King' },
    wQ0: { rank: '1', file: 'd', color: 'light', character: 'Queen' },
    wR0: { rank: '1', file: 'a', color: 'light', character: 'Rook' },
    wR1: { rank: '1', file: 'h', color: 'light', character: 'Rook' },
    wB0: { rank: '1', file: 'c', color: 'light', character: 'Bishop' },
    wB1: { rank: '1', file: 'f', color: 'light', character: 'Bishop' },
    wN0: { rank: '1', file: 'b', color: 'light', character: 'Knight' },
    wN1: { rank: '1', file: 'g', color: 'light', character: 'Knight' },
    wP0: { rank: '2', file: 'a', color: 'light', character: 'Pawn' },
    wP1: { rank: '2', file: 'b', color: 'light', character: 'Pawn' },
    wP2: { rank: '2', file: 'c', color: 'light', character: 'Pawn' },
    wP3: { rank: '2', file: 'd', color: 'light', character: 'Pawn' },
    wP4: { rank: '2', file: 'e', color: 'light', character: 'Pawn' },
    wP5: { rank: '2', file: 'f', color: 'light', character: 'Pawn' },
    wP6: { rank: '2', file: 'g', color: 'light', character: 'Pawn' },
    wP7: { rank: '2', file: 'h', color: 'light', character: 'Pawn' },

    bK0: { rank: '8', file: 'e', color: 'dark', character: 'King' },
    bQ0: { rank: '8', file: 'd', color: 'dark', character: 'Queen' },
    bR0: { rank: '8', file: 'a', color: 'dark', character: 'Rook' },
    bR1: { rank: '8', file: 'h', color: 'dark', character: 'Rook' },
    bB0: { rank: '8', file: 'c', color: 'dark', character: 'Bishop' },
    bB1: { rank: '8', file: 'f', color: 'dark', character: 'Bishop' },
    bN0: { rank: '8', file: 'b', color: 'dark', character: 'Knight' },
    bN1: { rank: '8', file: 'g', color: 'dark', character: 'Knight' },
    bP0: { rank: '7', file: 'a', color: 'dark', character: 'Pawn' },
    bP1: { rank: '7', file: 'b', color: 'dark', character: 'Pawn' },
    bP2: { rank: '7', file: 'c', color: 'dark', character: 'Pawn' },
    bP3: { rank: '7', file: 'd', color: 'dark', character: 'Pawn' },
    bP4: { rank: '7', file: 'e', color: 'dark', character: 'Pawn' },
    bP5: { rank: '7', file: 'f', color: 'dark', character: 'Pawn' },
    bP6: { rank: '7', file: 'g', color: 'dark', character: 'Pawn' },
    bP7: { rank: '7', file: 'h', color: 'dark', character: 'Pawn' },
}

export interface ChessPiece {
    id: string
    color: string;
    character: string;
    initialPosition: Position;
    currentPosition: Position;
    direction: number;
    moveSet: any[];
    initialMoveSet: Move[];
    captureMoveSet: Move[];
    symbol: string;
}

export class ChessPiece implements ChessPiece{
    id: string
    color: string;
    character: string;
    initialPosition: Position;
    currentPosition: Position;
    direction: number;
    moveSet: any[];
    initialMoveSet: Move[];
    captureMoveSet: Move[];
    symbol: string;
    constructor(id: string) {
        this.id = id
        this.color = pieceIndex[id].color;
        this.character = pieceIndex[id].character;
        let pos = {
            rank:pieceIndex[id].rank,
            file:pieceIndex[id].file
        }
        this.initialPosition = pos
        this.currentPosition = pos
        this.moveSet = characterIndex[this.character].moveSet;
        this.initialMoveSet = characterIndex[this.character].initialMoveSet;
        this.captureMoveSet = characterIndex[this.character].captureMoveSet;
        this.symbol = this.color == 'light' ? characterIndex[this.character].symbols[0] : characterIndex[this.character].symbols[1]
        this.direction = this.color == 'light' ? 1 : -1;
    }
}
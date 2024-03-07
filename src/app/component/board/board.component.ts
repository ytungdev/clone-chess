import { Component } from '@angular/core';
import * as Chess from '../../model/chess'


interface Square {
    color: 'light' | 'dark';
    occupier: (null | Chess.ChessPiece);
}

class Board {
    static readonly ranks: string[] = ['8', '7', '6', '5', '4', '3', '2', '1']
    static readonly files: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    static readonly pieces: Chess.PieceIndex = Chess.pieceIndex
    current: { [rank: string]: { [file: string]: Square } } = {}
    constructor() {
        for (let i = 0; i < 8; i++) {
            const r = Board.ranks[i];
            this.current[r] = {};
            for (let j = 0; j < 8; j++) {
                const f = Board.files[j];
                const c = (i + j) % 2 == 0 ? 'light' : 'dark';
                this.current[r][f] = { color: c, occupier: null };
            }
        }
        this.putChess()

    }

    putChess(): void {
        console.log(this.current)
        for (let chessId in Board.pieces) {
            let info = Board.pieces[chessId]
            let chess = new Chess.ChessPiece(chessId)
            this.current[info.rank][info.file].occupier = chess
        }
    }

    static readonly rankMovement = (current: string, step: number) => {
        // '8' + 1 = '7'
        const curInt = parseInt(current)
        const newInt = curInt - step
        if (1 <= newInt && newInt <= 8) {
            const newStr = newInt.toString()
            return newStr
        }
        return false
    }

    static readonly fileMovement = (current: string, step: number) => {
        // 'a' + 1 = 'b'
        // 'a'->97, 'h'->104
        const curInt = current.charCodeAt(0)
        const newInt = curInt + step
        if (97 <= newInt && newInt <= 104) {
            return String.fromCharCode(newInt)
        }
        return false
    }
}

@Component({
    selector: 'app-board',
    // template: `
    //   <p>
    //     board works!
    //   </p>
    // `,
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})

export class BoardComponent {
    board: any = {};
    ranks: string[] = Board.ranks;
    files: string[] = Board.files;

    highlx: string[] = []
    promote: string[] = []
    selected: string = ''

    winner: string = ''
    promotion:boolean = false;

    superPawn:any = null;

    reset() {
        this.selected = '';
        this.highlx = [];
        this.promote = []
    }

    select(r: string, f: string): void {
        console.log(this.board[r][f].occupier)
        if (r + f == this.selected) {
            //deselect
            this.reset()
            return
        }
        if (this.highlx.includes(r + f)) {
            //move
            this.move(this.selected.substring(0, 1), this.selected.substring(1, 2), r, f)
        } else {
            //select and check moves
            this.selected = r + f;
            this.highlx = this.possibleMove(r, f)
            console.log(this.highlx)
        }
    }

    possibleMove(r: string, f: string): string[] {
        const chess = this.board[r][f].occupier
        if (chess == null) {
            return []
        }

        const char = chess.character
        const color = chess.color

        let moveSet = chess.moveSet
        let moves = []
        if (char == 'Pawn') {
            const direction = chess.direction;
            if (r == chess.initialPosition.rank && f == chess.initialPosition.file) {
                moveSet = chess.initialMoveSet;
            }

            // Move
            for (let m in moveSet) {
                const action = moveSet[m]
                for (let i = 1; i < action.range + 1; i++) {
                    const newR = Board.rankMovement(r, action.rank * i * direction)
                    const newF = Board.fileMovement(f, action.file * i)
                    if (newR && newF) {
                        const sq = this.board[newR][newF]
                        const occupier = sq.occupier
                        const id = newR + newF;
                        if (occupier == null) {
                            moves.push(id)
                        }
                    }
                }
            }

            // Capture
            for (let c in chess.captureMoveSet) {
                const action = chess.captureMoveSet[c]
                for (let i = 1; i < action.range + 1; i++) {
                    const newR = Board.rankMovement(r, action.rank * i * direction)
                    const newF = Board.fileMovement(f, action.file * i)
                    if (newR && newF) {
                        const sq = this.board[newR][newF]
                        const occupier = sq.occupier
                        const id = newR + newF;
                        if (occupier != null) {
                            if (occupier.color != color) {
                                moves.push(id)
                            }
                            break
                        }
                    }
                }
            }

            // Promotion
            let enemyBase: string;
            if (color == 'dark') {
                enemyBase = '1'
            } else {
                enemyBase = '8'
            }
            moves.forEach(loc => {
                if (loc.substring(0,1) == enemyBase) {
                    this.promote.push(loc)
                    console.log('promote',this.promote)
                }
            })
        } else {
            for (let m in moveSet) {
                const action = moveSet[m]
                for (let i = 1; i < action.range + 1; i++) {
                    const newR = Board.rankMovement(r, action.rank * i)
                    const newF = Board.fileMovement(f, action.file * i)
                    if (newR && newF) {
                        const sq = this.board[newR][newF]
                        const occupier = sq.occupier
                        const id = newR + newF;
                        if (occupier != null) {
                            if (occupier.color != color) {
                                moves.push(id)
                            }
                            break
                        }
                        if (occupier == null) {
                            moves.push(id)
                        }
                    }
                }
            }
        }
        return moves
    }

    move(fr: string, ff: string, tr: string, tf: string): void {
        let fsq = this.board[fr][ff]
        let tsq = this.board[tr][tf]
        let chess: (Chess.ChessPiece | null) = null;
        const moveTo = () => {
            fsq.occupier = null;
            tsq.occupier = chess
            if (this.promote.includes(tr + tf)) {
                alert('PROMOTION!!')
                this.promotion = true
                this.superPawn = tsq.occupier
                console.log(this.promotion)
            }
            this.reset()
        }

        if (fsq == null) {
            //no chess to move
            console.log(`${ff}${fr} > ${tf}${tr} : no chess`)
        } else {
            chess = fsq.occupier;
        }

        if (tsq.occupier == null) {
            //move chess to empty sq
            moveTo()
            console.log(`${ff}${fr} > ${tf}${tr} : to empty`)
        } else {
            if (tsq.occupier.color != chess?.color) {
                console.log(`${ff}${fr} > ${tf}${tr} : capture`)
                if (tsq.occupier.character == 'King') {
                    this.winner = chess?.color || ''
                }
                moveTo()
            } else {
                console.log(`${ff}${fr} > ${tf}${tr} : block`)
            }
        }
    }

    doPromote(char:string):void{
        let chess = this.promotion
        // Update data
        this.superPawn.character = char
        this.superPawn.moveSet = Chess.characterIndex[char].moveSet;
        this.superPawn.symbol = this.superPawn.color == 'light' ? 
            Chess.characterIndex[char].symbols[0] : 
            Chess.characterIndex[char].symbols[1]
        // Reset
        this.promotion = false
        this.superPawn = null
    }

    ngOnInit(): void {
        this.board = new Board().current
    }
}

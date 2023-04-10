import { ITiledMapObject } from '@jonbell/tiled-map-type-guard';
import Player from '../lib/Player';
import {
  Interactable,
  CheckerArea as CheckerAreaModel,
  CheckerSquare as CheckerSquareModel,
  CheckerPiece as CheckerPieceModel,
  BoundingBox,
  TownEmitter,
  CheckerLeaderboardItem,
  CheckerType,
  CheckerColor,
} from '../types/CoveyTownSocket.d';
import InteractableArea from './InteractableArea';

export default class CheckerArea extends InteractableArea {
  private _squares: CheckerSquareModel[] = [];

  private _leaderboard: CheckerLeaderboardItem[] = [];

  public get squares(): CheckerSquareModel[] {
    return this._squares;
  }

  public set squares(squares: CheckerSquareModel[]) {
    this._squares = squares;
  }

  public get leaderboard(): CheckerLeaderboardItem[] {
    return this._leaderboard;
  }

  /**
   * Creates a new checker area
   *
   * @param checkerArea model containing the areas starting state
   * @param coordinates the bounding box that defines this viewing area
   * @param townEmitter a broadcast emitter that can be used to emit updates to players
   */
  public constructor(
    { id, squares, leaderboard }: CheckerAreaModel,
    coordinates: BoundingBox,
    townEmitter: TownEmitter,
  ) {
    super(id, coordinates, townEmitter);

    this.squares = squares;
    this._leaderboard = leaderboard;
  }

  /**
   * initializes the board with all of its base values, including checker pieces.
   */
  public initializeBoard() {
    const newSquares = [];
    const checkers: CheckerPieceModel[] = this._createCheckerPieces();
    let pieces = 0;
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        if ((x === 0 || x === 2 || x === 6) && y % 2 !== 0) {
          newSquares.push({
            id: `${x}${y}`,
            x,
            y,
            checker: checkers.at(pieces),
          } as CheckerSquareModel);
          pieces += 1;
        } else if ((x === 1 || x === 5 || x === 7) && y % 2 === 0) {
          newSquares.push({
            id: `${x}${y}`,
            x,
            y,
            checker: checkers.at(pieces),
          } as CheckerSquareModel);
          pieces += 1;
        } else {
          newSquares.push({
            id: `${x}${y}`,
            x,
            y,
            checker: { type: 'empty', color: 'empty' },
          } as CheckerSquareModel);
        }
      }
    }

    this.squares = newSquares;
  }

  /**
   * Helper method that creates all of the checker pieces with their corresponding colors. Starting with the 12 red
   * then the 12 black
   */
  private _createCheckerPieces(): CheckerPieceModel[] {
    const checkers: CheckerPieceModel[] = [];
    for (let i = 0; i < 24; i++) {
      if (i < 12) {
        checkers.push({
          type: 'pawn',
          color: 'red',
        } as CheckerPieceModel);
      } else {
        checkers.push({
          type: 'pawn',
          color: 'black',
        } as CheckerPieceModel);
      }
    }
    return checkers;
  }

  /**
   * Removes a player from this poster session area.
   *
   * When the last player leaves, this method resets the board and emits this update to all players in the Town.
   *
   * @param player
   */
  public remove(player: Player): void {
    super.remove(player);
    if (this._occupants.length === 0) {
      this.squares = [];
      this._leaderboard = [];
    }
    this._emitAreaChanged();
  }

  updateModel(checkerArea: CheckerAreaModel) {
    this.squares = checkerArea.squares;
    this._leaderboard = checkerArea.leaderboard;
  }

  public toModel(): Interactable {
    return {
      id: this.id,
      squares: this.squares,
      leaderboard: this._leaderboard,
    };
  }

  /**
   * This method goes through each square on the board
   * using for each and calls this._setSquareMoves so that each
   * squares moves will be updated in real time.
   */
  public updateMoveablePieces() {
    this.squares.forEach(square => this._setSquareMoves(square));
  }

  /**
   * This method is called from the front end every time a move is being attempted.
   * First it calls updateMoveablePieces to set the valid moves that are attributed
   * to each square at this point in time. Next it then verifies that the checker
   * that wants to be moved to is a valid move for the moveFrom checker. If the move
   * is not valid no change will occur. If the move is valid the square are then
   * updated accordingly and the frontend will then update the model.
   *
   * @param moveFrom The square that the checker is in currently.
   * @param moveTo The square that the checker wants to be moved to.
   */
  public makeMove(moveFrom: string, moveTo: string) {
    this.updateMoveablePieces();
    const moveFromSquare = this.squares.find(square => square.id === moveFrom);
    const moveToSquare = this.squares.find(square => square.id === moveTo);
    // If the move is a general move.
    if (
      moveFromSquare &&
      moveToSquare &&
      this._generalMoves(moveFromSquare).includes(moveToSquare.id)
    ) {
      moveToSquare.checker.type = moveFromSquare.checker.type;
      moveToSquare.checker.color = moveFromSquare.checker.color;
      moveFromSquare.checker.type = 'empty' as CheckerType;
      moveFromSquare.checker.color = 'empty' as CheckerColor;

      this._crownKing(moveToSquare);
    }
    // If the move is an attacking move.
    if (
      moveFromSquare &&
      moveToSquare &&
      this._attackingMoves(moveFromSquare).includes(moveToSquare.id)
    ) {
      moveToSquare.checker.type = moveFromSquare.checker.type;
      moveToSquare.checker.color = moveFromSquare.checker.color;
      // The below snipped calculate where the piece being jumped is and then removes the checker that
      // was in that position.
      const jumpedXCoordinate = (moveFromSquare.x - moveToSquare.x) / 2;
      const jumpedYCoordinate = (moveFromSquare.y - moveToSquare.y) / 2;
      const jumpedSquare = this.squares.find(
        square =>
          square.id ===
          `${moveToSquare.x + jumpedXCoordinate}${moveToSquare.y + jumpedYCoordinate}`,
      );
      if (jumpedSquare) {
        jumpedSquare.checker.type = 'empty' as CheckerType;
        jumpedSquare.checker.color = 'empty' as CheckerColor;
        moveFromSquare.checker.type = 'empty' as CheckerType;
        moveFromSquare.checker.color = 'empty' as CheckerColor;
        this._crownKing(moveToSquare);
      }
    }
  }

  private _crownKing(moveToSquare: CheckerSquareModel) {
    if (moveToSquare.checker.type !== 'king') {
      if (moveToSquare.checker.color === 'black') {
        if (moveToSquare.x === 0) {
          moveToSquare.checker.type = 'king' as CheckerType;
        }
      } else if (moveToSquare.x === 7) {
        moveToSquare.checker.type = 'king' as CheckerType;
      }
    }
  }

  /**
   * This method serves to set the valid moves for a checker within a particular square
   * on the board. This helper method is called by update moveable pieces for each
   * square on the board. Once this method is called it then takes a square as input
   * gets the general moves and attacking moves from the accompanying helper methods below.
   * Once the lists for valid moves are calculated by the helper methods they are combined into
   * an array and the moves for the square is set.
   *
   * @param square The square which is having its moves updated
   */
  private _setSquareMoves(square: CheckerSquareModel) {
    square.moves = this._generalMoves(square).concat(this._attackingMoves(square));
  }

  /**
   * This method serves to determine the valid general (non-attacking) moves in a
   * checkers game. The function then returns then returns the array of ids, attributed
   * the squares that the checker piece within the square being looked at can move to, without
   * attacking.
   *
   * @param square This variable is the square's movement that is being looked into.
   * @returns the array of ids that are attributed to squares that can be moved to.
   */
  private _generalMoves(square: CheckerSquareModel): string[] {
    const generalMoves = [];
    if (square.checker.color === 'red' || square.checker.type === 'king') {
      if (
        square.x + 1 < 8 &&
        square.y + 1 < 8 &&
        this.squares.at((square.x + 1) * 8 + (square.y + 1))?.checker.color === 'empty'
      ) {
        const validMove = this.squares.at((square.x + 1) * 8 + (square.y + 1))?.id;
        if (validMove !== undefined) {
          generalMoves.push(validMove);
        }
      }
      if (
        square.x + 1 < 8 &&
        square.y - 1 >= 0 &&
        this.squares.at((square.x + 1) * 8 + (square.y - 1))?.checker.color === 'empty'
      ) {
        const validMove = this.squares.at((square.x + 1) * 8 + (square.y - 1))?.id;
        if (validMove !== undefined) {
          generalMoves.push(validMove);
        }
      }
    }
    if (square.checker.color === 'black' || square.checker.type === 'king') {
      if (
        square.x - 1 >= 0 &&
        square.y + 1 < 8 &&
        this.squares.at((square.x - 1) * 8 + (square.y + 1))?.checker.color === 'empty'
      ) {
        const validMove = this.squares.at((square.x - 1) * 8 + (square.y + 1))?.id;
        if (validMove !== undefined) {
          generalMoves.push(validMove);
        }
      }
      if (
        square.x - 1 >= 0 &&
        square.y - 1 >= 0 &&
        this.squares.at((square.x - 1) * 8 + (square.y - 1))?.checker.color === 'empty'
      ) {
        const validMove = this.squares.at((square.x - 1) * 8 + (square.y - 1))?.id;
        if (validMove !== undefined) {
          generalMoves.push(validMove);
        }
      }
    }
    return generalMoves;
  }

  /**
   * This method serves to determine the valid attacking moves in a
   * checkers game. The function then returns then returns the array of ids, attributed to
   * the squares that the checker piece within the square being looked at can move to, while
   * attacking.
   *
   * @param square This variable is the square's movement that is being looked into.
   * @returns the array of ids that are attributed to squares that can be moved to as well
   * as the squares that are being jumped.
   */
  private _attackingMoves(square: CheckerSquareModel): string[] {
    const attackingMoves: string[] = [];
    switch (square.checker.type) {
      case 'king':
        this._kingMoves(square, attackingMoves);
        this._pawnMoves(square, attackingMoves);
        return attackingMoves;
      case 'pawn':
        this._pawnMoves(square, attackingMoves);
        return attackingMoves;
      default: {
        return [];
      }
    }
  }

  private _pawnMoves(square: CheckerSquareModel, attackingMoves: string[]) {
    if (square.checker.color === 'red') {
      if (
        square.x + 2 < 8 &&
        square.y + 2 < 8 &&
        this.squares.at((square.x + 2) * 8 + (square.y + 2))?.checker.color === 'empty' &&
        this.squares.at((square.x + 1) * 8 + (square.y + 1))?.checker.color === 'black'
      ) {
        const validMove = this.squares.at((square.x + 2) * 8 + (square.y + 2))?.id;
        if (validMove !== undefined) {
          attackingMoves.push(validMove);
        }
      }
      if (
        square.x + 2 < 8 &&
        square.y - 2 >= 0 &&
        this.squares.at((square.x + 2) * 8 + (square.y - 2))?.checker.color === 'empty' &&
        this.squares.at((square.x + 1) * 8 + (square.y - 1))?.checker.color === 'black'
      ) {
        const validMove = this.squares.at((square.x + 2) * 8 + (square.y - 2))?.id;
        if (validMove !== undefined) {
          attackingMoves.push(validMove);
        }
      }
    }
    if (square.checker.color === 'black') {
      if (
        square.x - 2 >= 0 &&
        square.y + 2 < 8 &&
        this.squares.at((square.x - 2) * 8 + (square.y + 2))?.checker.color === 'empty' &&
        this.squares.at((square.x - 1) * 8 + (square.y + 1))?.checker.color === 'red'
      ) {
        const validMove = this.squares.at((square.x - 2) * 8 + (square.y + 2))?.id;
        if (validMove !== undefined) {
          attackingMoves.push(validMove);
        }
      }
      if (
        square.x - 2 >= 0 &&
        square.y - 2 >= 0 &&
        this.squares.at((square.x - 2) * 8 + (square.y - 2))?.checker.color === 'empty' &&
        this.squares.at((square.x - 1) * 8 + (square.y - 1))?.checker.color === 'red'
      ) {
        const validMove = this.squares.at((square.x - 2) * 8 + (square.y - 2))?.id;
        if (validMove !== undefined) {
          attackingMoves.push(validMove);
        }
      }
    }
  }

  private _kingMoves(square: CheckerSquareModel, attackingMoves: string[]) {
    if (square.checker.color === 'black') {
      if (
        square.x + 2 < 8 &&
        square.y + 2 < 8 &&
        this.squares.at((square.x + 2) * 8 + (square.y + 2))?.checker.color === 'empty' &&
        this.squares.at((square.x + 1) * 8 + (square.y + 1))?.checker.color === 'red'
      ) {
        const validMove = this.squares.at((square.x + 2) * 8 + (square.y + 2))?.id;
        if (validMove !== undefined) {
          attackingMoves.push(validMove);
        }
      }
      if (
        square.x + 2 < 8 &&
        square.y - 2 >= 0 &&
        this.squares.at((square.x + 2) * 8 + (square.y - 2))?.checker.color === 'empty' &&
        this.squares.at((square.x + 1) * 8 + (square.y - 1))?.checker.color === 'red'
      ) {
        const validMove = this.squares.at((square.x + 2) * 8 + (square.y - 2))?.id;
        if (validMove !== undefined) {
          attackingMoves.push(validMove);
        }
      }
    }
    if (square.checker.color === 'red') {
      if (
        square.x - 2 >= 0 &&
        square.y + 2 < 8 &&
        this.squares.at((square.x - 2) * 8 + (square.y + 2))?.checker.color === 'empty' &&
        this.squares.at((square.x - 1) * 8 + (square.y + 1))?.checker.color === 'black'
      ) {
        const validMove = this.squares.at((square.x - 2) * 8 + (square.y + 2))?.id;
        if (validMove !== undefined) {
          attackingMoves.push(validMove);
        }
      }
      if (
        square.x - 2 >= 0 &&
        square.y - 2 >= 0 &&
        this.squares.at((square.x - 2) * 8 + (square.y - 2))?.checker.color === 'empty' &&
        this.squares.at((square.x - 1) * 8 + (square.y - 1))?.checker.color === 'black'
      ) {
        const validMove = this.squares.at((square.x - 2) * 8 + (square.y - 2))?.id;
        if (validMove !== undefined) {
          attackingMoves.push(validMove);
        }
      }
    }
  }

  /**
   * Creates a new CheckerArea object that will represent a Checker Area object in the town map.
   * @param mapObject An ITiledMapObject that represents a rectangle in which this checker area exists
   * @param townEmitter An emitter that can be used by this checker area to broadcast updates to players in the town
   * @returns
   */
  public static fromMapObject(mapObject: ITiledMapObject, townEmitter: TownEmitter): CheckerArea {
    const { name, width, height } = mapObject;
    if (!width || !height) {
      throw new Error(`Malformed checker area ${name}`);
    }
    const rect: BoundingBox = { x: mapObject.x, y: mapObject.y, width, height };
    return new CheckerArea({ id: name, squares: [], leaderboard: [] }, rect, townEmitter);
  }
}

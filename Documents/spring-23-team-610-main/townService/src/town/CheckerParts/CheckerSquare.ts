import {
  CheckerSquare as CheckerSquareModel,
  CheckerPiece as CheckerPieceModel,
  CheckerType,
  CheckerColor,
} from '../../types/CoveyTownSocket';

export default class CheckerSquare {
  private _id: string;

  private _x: number;

  private _y: number;

  private _checker: CheckerPieceModel = { type: CheckerType.EMPTY, color: CheckerColor.EMPTY };

  private _moves: string[] = [];

  constructor({ id, x, y }: CheckerSquareModel, checker: CheckerPieceModel) {
    this._id = id;
    this._x = x;
    this._y = y;
    this.checker = checker;
  }

  public get id(): string {
    return this._id;
  }

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this.y;
  }

  public get checker(): CheckerPieceModel {
    return this._checker;
  }

  public set checker(checker: CheckerPieceModel) {
    this._checker = checker;
  }

  public get moves(): string[] {
    return this._moves;
  }

  public set moves(moves: string[]) {
    this._moves = moves;
  }
}

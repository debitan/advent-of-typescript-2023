type TicTacToeChip = keyof StateCycle;
type TicTacToeEmptyCell = "  ";
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = "top" | "middle" | "bottom";
type TicTacToeXPositions = "left" | "center" | "right";
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTactToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
  board: TicTactToeBoard;
  state: TicTacToeChip;
};

type EmptyBoard = [["  ", "  ", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];

type NewGame = {
  board: EmptyBoard;
  state: "❌";
};

type StateCycle = {
  "❌": "⭕";
  "⭕": "❌";
};

type GetYPosition<YPosition> = YPosition extends Extract<
  TicTacToeYPositions,
  "top"
>
  ? 0
  : YPosition extends Extract<TicTacToeYPositions, "middle">
  ? 1
  : YPosition extends Extract<TicTacToeYPositions, "bottom">
  ? 2
  : never;

type GetXPosition<XPosition> = XPosition extends Extract<
  TicTacToeXPositions,
  "left"
>
  ? 0
  : XPosition extends Extract<TicTacToeXPositions, "center">
  ? 1
  : XPosition extends Extract<TicTacToeXPositions, "right">
  ? 2
  : never;

type GetMovePosition<
  Move extends `${TicTacToeYPositions}-${TicTacToeXPositions}`
> = Move extends `${infer YPosition}-${infer XPosition}`
  ? [GetYPosition<YPosition>, GetXPosition<XPosition>]
  : never;

type InsertMove<
  Board extends Array<unknown>,
  Position extends Array<number>,
  State,
  $Acc extends Array<unknown> = []
> = Board extends [infer RowHead, ...infer RowTail]
  ? $Acc["length"] extends Position[0]
    ? InsertMove<
        RowTail,
        Position,
        State,
        [...$Acc, InsertMoveToCell<RowHead, Position[1], State>]
      >
    : InsertMove<RowTail, Position, State, [...$Acc, RowHead]>
  : $Acc;

type InsertMoveToCell<
  Row,
  CellPosition,
  State,
  $Acc extends Array<unknown> = []
> = Row extends [infer CellHead, ...infer CellTail]
  ? $Acc["length"] extends CellPosition
    ? InsertMoveToCell<CellTail, CellPosition, State, [...$Acc, State]>
    : InsertMoveToCell<CellTail, CellPosition, State, [...$Acc, CellHead]>
  : $Acc;

type CheckIsCellTaken<
  Row,
  CellPosition,
  $Acc extends Array<unknown> = []
> = Row extends [infer CellHead, ...infer CellTail]
  ? $Acc["length"] extends CellPosition
    ? CellHead extends TicTacToeChip
      ? true
      : CheckIsCellTaken<CellTail, CellPosition, [...$Acc, CellHead]>
    : CheckIsCellTaken<CellTail, CellPosition, [...$Acc, CellHead]>
  : false;

type CheckIsInvalid<
  Board,
  Position extends Array<number>,
  $Acc extends Array<unknown> = []
> = Board extends [infer RowHead, ...infer RowTail]
  ? $Acc["length"] extends Position[0]
    ? CheckIsCellTaken<RowHead, Position[1]>
    : CheckIsInvalid<RowTail, Position, [...$Acc, RowHead]>
  : false;

type WinCycle = {
  "❌": "❌ Won";
  "⭕": "⭕ Won";
};

type CheckCells<Cells> = Cells extends [infer Head, ...infer Tail]
  ? Head extends TicTacToeEmptyCell
    ? false
    : Tail[number] extends Head
    ? true
    : false
  : false;

type winCategories = "a" | "b" | "c" | "d" | "e" | "f" | "g";

type CheckForGameOverStateForChip<Board> = Board extends [
  [infer topLeft, infer topCenter, infer topRight],
  [infer middleLeft, infer middleCenter, infer middleRight],
  [infer bottomLeft, infer bottomCenter, infer bottomRight]
]
  ? CheckCells<[topLeft, topCenter, topRight]> extends true
    ? "a"
    : CheckCells<[middleLeft, middleCenter, middleRight]> extends true
    ? "b"
    : CheckCells<[bottomLeft, bottomCenter, bottomRight]> extends true
    ? "c"
    : CheckCells<[topLeft, middleLeft, bottomLeft]> extends true
    ? "d"
    : CheckCells<[topCenter, middleCenter, bottomCenter]> extends true
    ? "e"
    : CheckCells<[topRight, middleRight, bottomRight]> extends true
    ? "f"
    : CheckCells<[topLeft, middleCenter, bottomRight]> extends true
    ? "g"
    : CheckCells<[topRight, middleCenter, bottomLeft]> extends true
    ? "h"
    : false
  : never;

type CheckForDraw<Board extends TicTactToeBoard> =
  Board[number][number] extends TicTacToeChip ? true : false;

type CheckForGameOverState<Board> =
  CheckForGameOverStateForChip<Board> extends winCategories ? true : false;

type TicTacToe<
  Game extends TicTacToeGame,
  Move extends TicTacToePositions
> = CheckIsInvalid<Game["board"], GetMovePosition<Move>> extends false
  ? {
      board: InsertMove<Game["board"], GetMovePosition<Move>, Game["state"]>;
      state: CheckForGameOverState<
        InsertMove<Game["board"], GetMovePosition<Move>, Game["state"]>
      > extends true
        ? WinCycle[Game["state"]]
        : CheckForDraw<
            InsertMove<Game["board"], GetMovePosition<Move>, Game["state"]>
          > extends true
        ? "Draw"
        : StateCycle[Game["state"]];
    }
  : Game;

// TESTS
import { Equal, Expect } from "type-testing";

type test_move1_actual = TicTacToe<NewGame, "top-center">;
type test_move1_expected = {
  board: [["  ", "❌", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];
  state: "⭕";
};
type test_move1 = Expect<Equal<test_move1_actual, test_move1_expected>>;

type test_move2_actual = TicTacToe<test_move1_actual, "top-left">;
type test_move2_expected = {
  board: [["⭕", "❌", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];
  state: "❌";
};
type test_move2 = Expect<Equal<test_move2_actual, test_move2_expected>>;

type test_move3_actual = TicTacToe<test_move2_actual, "middle-center">;
type test_move3_expected = {
  board: [["⭕", "❌", "  "], ["  ", "❌", "  "], ["  ", "  ", "  "]];
  state: "⭕";
};
type test_move3 = Expect<Equal<test_move3_actual, test_move3_expected>>;

type test_move4_actual = TicTacToe<test_move3_actual, "bottom-left">;
type test_move4_expected = {
  board: [["⭕", "❌", "  "], ["  ", "❌", "  "], ["⭕", "  ", "  "]];
  state: "❌";
};
type test_move4 = Expect<Equal<test_move4_actual, test_move4_expected>>;

type test_x_win_actual = TicTacToe<test_move4_actual, "bottom-center">;
type test_x_win_expected = {
  board: [["⭕", "❌", "  "], ["  ", "❌", "  "], ["⭕", "❌", "  "]];
  state: "❌ Won";
};
type test_x_win = Expect<Equal<test_x_win_actual, test_x_win_expected>>;

type type_move5_actual = TicTacToe<test_move4_actual, "bottom-right">;
type type_move5_expected = {
  board: [["⭕", "❌", "  "], ["  ", "❌", "  "], ["⭕", "  ", "❌"]];
  state: "⭕";
};
type test_move5 = Expect<Equal<type_move5_actual, type_move5_expected>>;

type test_o_win_actual = TicTacToe<type_move5_actual, "middle-left">;
type test_o_win_expected = {
  board: [["⭕", "❌", "  "], ["⭕", "❌", "  "], ["⭕", "  ", "❌"]];
  state: "⭕ Won";
};
type test_o_win = Expect<Equal<test_o_win_actual, test_o_win_expected>>;

// invalid move don't change the board and state
type test_invalid_actual = TicTacToe<test_move1_actual, "top-center">;
type test_invalid_expected = {
  board: [["  ", "❌", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];
  state: "⭕";
};
type test_invalid = Expect<Equal<test_invalid_actual, test_invalid_expected>>;

type test_before_draw = {
  board: [["⭕", "❌", "⭕"], ["⭕", "❌", "❌"], ["❌", "⭕", "  "]];
  state: "⭕";
};
type test_draw_actual = TicTacToe<test_before_draw, "bottom-right">;
type test_draw_expected = {
  board: [["⭕", "❌", "⭕"], ["⭕", "❌", "❌"], ["❌", "⭕", "⭕"]];
  state: "Draw";
};
type test_draw = Expect<Equal<test_draw_actual, test_draw_expected>>;

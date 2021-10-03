import Player from "../types/Player";

export default interface Gamestate {
  id: string;
  turnNumber: number;
  turnLoop: Array<string>; // id
  currentPlayer: number; // index for turnLoop
}

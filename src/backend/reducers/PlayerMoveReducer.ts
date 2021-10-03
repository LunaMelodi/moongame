import Gamestate from "../../types/Gamestate";
const handleBeginTurn = require("./handleBeginTurn");

interface MoveReducerParams {
  gamestate: Gamestate;
  action: MoveAction;
}

const PlayerMoveReducer = (gamestate, action) => {
  switch (action.type) {
    case "BeginTurn":
      return handleBeginTurn(gamestate, action.payload);
    case "UnitMove":
      return handleUnitMove(gamestate, action.payload);
    case "UnitAttack":
      return handleUnitAttack(gamestate, action.payload);
    case "UnitAbility": // heal, create city, etc
      return handleUnitAbility(gamestate, action.payload);
    case "UpgradeBuilding":
      return handleUpgradeBuilding(gamestate, action.payload);
    case "UpgradeCityWall":
      return handleUpgradeCityWall(gamestate, action.payload);
    case "AdjustResourceProduction":
      return handleAdjustResourceProduction(gamestate, action.payload);
    case "BuildUnit":
      return handleBuildUnit(gamestate, action.payload);
    case "EndTurn":
      return handleEndTurn(gamestate, action.payload);

    default:
      throw new Error("Invalid move type");
  }
};

/* 
  Other things to handle/consider:
  - Game over (surrender or initial city destroyed)
  - Skipping / kicking player
*/

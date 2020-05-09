import { Player } from "../../player";
import { GameModeEnum } from "../../enemy";
import { EffectType } from "../../effect";

// Context is used to encaspulate configuration of the scenarios the user wants
// to calculate damage for

// Some high level ideas for contexts:
// - omitting certain skills from calculation

export interface Context {
  name?: string,
  player: Player,
  effects?: EffectType[],
  gameMode?: GameModeEnum,
  health?: number,
  crippled?: boolean,
  actionSkillActive?: boolean
}
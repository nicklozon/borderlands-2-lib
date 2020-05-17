import { Build, Stat } from "../../build";
import { GameModeEnum } from "../../enemy";
import { EffectType } from "../../effect";
import { Gear } from "../../gear";

export interface Context {
  name?: string,
  build: Build,
  relic?: Gear,
  shield?: Gear,
  badAssRanking?: Stat[],
  effects?: EffectType[],
  gameMode?: GameModeEnum,
  health?: number,
  crippled?: boolean,
  actionSkillActive?: boolean
}
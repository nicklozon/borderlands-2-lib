import { Build, Stat } from "../../build";
import { GameModeEnum } from "../../enemy";
import { Effect, EffectType } from "../../effect";
import { Gear } from "../../gear";

export interface Context {
  name?: string,
  build: Build,
  relic?: Gear,
  shield?: Gear,
  badAssRanking?: Stat[],
  effects?: Effect[],
  gameMode?: GameModeEnum, // could be an effect
  
}

// Context should really be a class...
export function getEffect(effectType: EffectType, effects: Effect[]) : Effect|void {
  return effects.find(effect => effect.getEffectType() === effectType)
}
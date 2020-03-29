import { StatType } from "../value_object/stat_type"
import { Stat } from "../interface/stat"

export enum RedTextEnum {
  DeDa = 'De Da.',
  LadyFist = 'Love is a Lady Finger. True love is a Lady Fist.',
  Gar = 'Gar! Gorarr! My dad\'s a scientist! GWARRRR!!!!'
}

abstract class RedTextInterface {
  protected abstract stats : Stat[]

  public getStat(statType: StatType) : number {
    let statValue = this.stats.find((stat: Stat) => stat.type === statType)?.value
    return statValue || 0
  }
}

class DeDa extends RedTextInterface {
  protected stats = []
}

class LadyFist extends RedTextInterface {
  protected stats : Stat[] = [{
    type: StatType.CritHitDamage,
    value: 8
  }]
}

class Gar extends RedTextInterface {
  /*
  There is no crit stats on this thing despite what the wiki says...
  protected stats : Stat[] = [{
    type: StatType.CritHitDamage,
    value: 0.5
  },{
    type: StatType.CritHitMultiplier,
    value: 0.15
  }]
  */
  protected stats = []
}

let RedTextClassEnum = {
  [RedTextEnum.DeDa]: DeDa,
  [RedTextEnum.LadyFist]: LadyFist,
  [RedTextEnum.Gar]: Gar
}

export function RedText(enumVal: RedTextEnum) : RedTextInterface {
  return new RedTextClassEnum[enumVal]()
}
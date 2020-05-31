import { StatType } from "../value_object/stat_type"
import { Stat } from "../interface/stat"

// TODO: Red Text can just be the weapon name, no?
export enum RedTextEnum {
  DeDa = 'De Da.',
  LadyFist = 'Love is a Lady Finger. True love is a Lady Fist.',
  Gar = 'Gar! Gorarr! My dad\'s a scientist! GWARRRR!!!!',
  ByThePeople = 'By the people. For the people.',
  GoodForStartingFires = 'Good for starting fires.',
  PeleHumblyRequestsASacrifice = 'Pele humbly requests a sacrifice, if it\'s not too much trouble',
}

abstract class RedText {
  protected abstract stats : Stat[]

  public getStat(statType: StatType): number {
    let statValue = this.stats.find((stat: Stat) => stat.type === statType)?.value
    return statValue || 0
  }
}

class DeDa extends RedText {
  protected stats = []
}

class LadyFist extends RedText {
  protected stats : Stat[] = [{
    type: StatType.CritHitDamage,
    value: 8
  }]
}

class Gar extends RedText {
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

class ByThePeople extends RedText {
  protected stats : Stat[] = [{
    type: StatType.SplashDamage,
    value: 0.7
  }]
}

class GoodForStartingFires extends RedText {
  protected stats : Stat[] = []
}

class PeleHumblyRequestsASacrifice extends RedText {
  protected stats : Stat[] = [{
    type: StatType.SplashDamage,
    value: 0.8
  }]
}

let RedTextClassEnum = {
  [RedTextEnum.DeDa]: DeDa,
  [RedTextEnum.LadyFist]: LadyFist,
  [RedTextEnum.Gar]: Gar,
  [RedTextEnum.ByThePeople]: ByThePeople,
  [RedTextEnum.GoodForStartingFires]: GoodForStartingFires,
  [RedTextEnum.PeleHumblyRequestsASacrifice]: PeleHumblyRequestsASacrifice,
}

export function RedTextFactory(enumVal: RedTextEnum): RedText {
  return new RedTextClassEnum[enumVal]()
}
import { StatType } from "../value_object/stat_type"
import { Stat } from "../interface/stat"

export enum RedTextEnum {
  DeDa = 'De Da.',
  LadyFinger = 'Love is a Lady Finger. True love is a Lady Fist.'
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

class LadyFinger extends RedTextInterface {
  protected stats : Stat[] = [{
    type: StatType.CritHitDamage,
    value: 8
  }]
}

let RedTextClassEnum = {
  [RedTextEnum.DeDa]: DeDa,
  [RedTextEnum.LadyFinger]: LadyFinger,
}

export function RedText(enumVal: RedTextEnum) : RedTextInterface {
  return new RedTextClassEnum[enumVal]()
}
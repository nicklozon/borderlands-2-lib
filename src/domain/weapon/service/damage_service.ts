import { Memoize } from 'typescript-memoize'
import { Weapon } from "../interface/weapon"
import { BuildDamageService } from "../../build/service/damage_service"
import { StatType } from "../../build/value_object/stat_type"
import { Manufacturer } from "../value_object/manufacturer"
import { Type } from "../value_object/type"
import { TargetType } from "../../enemy/value_object/target_type"
import { ElementalEffect } from "../value_object/elemental_effect"
import { Stat } from "../../build/interface/stat"
import { RedTextFactory, RedTextEnum } from "../../build/object/red_text"
import { ElementalDamageCoefficients, GameModeEnum } from "../../enemy/value_object/elemental_damage_coefficients"
import { Context } from "../../context"

// TODO: pure splash damage

export class DamageService {
  private weapon: Weapon
  private context: Context
  private buildDamageService: BuildDamageService

  constructor(weapon: Weapon, context: Context) {
    this.weapon = weapon
    this.context = context
    this.buildDamageService = new BuildDamageService(this.context.build)
  }

  @Memoize()
  public getDps(): number {
    return this.calculateDps(this.getDamage())
  }
  
  @Memoize()
  public getCritDps(): number {
    return this.calculateDps(this.getCritDamage())
  }

  @Memoize((targetType: TargetType) => targetType)
  public getTargetTypeDps(targetType: TargetType) {
    let dps = this.calculateDps(this.getDamage(targetType)) + this.getElementalDps(targetType)
    return Math.round(dps * 100)/100
  }

  @Memoize((targetType: TargetType) => targetType)
  public getTargetTypeCritDps(targetType: TargetType) {
    let dps = this.calculateDps(this.getCritDamage(targetType)) + this.getElementalDps(targetType)
    return Math.round(dps * 100)/100
  }

  @Memoize((targetType?: TargetType) => targetType ?? '')
  public getDamage(targetType?: TargetType): number {
    return this.getBaseDamage(targetType) + this.getSplashDamage(targetType)
  }
  
  @Memoize((targetType?: TargetType) => targetType ?? '')
  protected getBaseDamage(targetType?: TargetType): number {
    const { damage, pellets = 1, unlistedPellets = 0, elementalEffect, type } = this.weapon
    let buildGunDamage = this.buildDamageService.getStat(StatType.GunDamage, this.weapon, this.context)
    let elementalEffectiveness = targetType ? this.getElementalEffectiveness(targetType, elementalEffect): 1
    let ampDamage = this.buildDamageService.getStat(StatType.AmpDamage, this.weapon, this.context)

    let unlistedDamage = 0
    if(unlistedPellets > 0) {
      // Trying to reverse engineer a Fibber, didn't work
      unlistedDamage = unlistedPellets * damage
    }

    return damage * pellets * (1 + buildGunDamage) * elementalEffectiveness + unlistedDamage + ampDamage
  }

  @Memoize((targetType?: TargetType) => targetType ?? '')
  public getCritDamage(targetType?: TargetType): number {
    const { type } = this.weapon

    // Rocket launcher's can't crit
    if(type === Type.RocketLauncher) return 0

    let multiplier = this.getWeaponCritMultiplier()
    let baseBonus = this.getWeaponCritBaseBonus()
    let penalty = this.getWeaponCritPenalty()
    let buildCritDamage = this.buildDamageService.getStat(StatType.CritHitDamage, this.weapon, this.context)
    let splashDamage = this.getSplashDamage(targetType)

    return this.getBaseDamage(targetType) * multiplier * (1 + baseBonus + buildCritDamage) /  (1 + penalty) + splashDamage
  }

  @Memoize((targetType?: TargetType) => targetType ?? '')
  public getElementalDps(targetType?: TargetType): number {
    const { elementalChance, elementalDps, elementalEffect, ammoPerShot = 1, pellets = 1 } = this.weapon

    if(!elementalChance || !elementalDps || elementalEffect === undefined) return 0

    let reloadSpeed = this.getReloadSpeed()
    let fireRate = this.getFireRate()
    let magazineSize = this.getMagazineSize()
    let duration = 0

    switch(elementalEffect) {
      case ElementalEffect.Incendiary:
        duration = 5
        break
      case ElementalEffect.Shock:
        duration = 2
        break
      case ElementalEffect.Corrosive:
        duration = 8
        break
    }

    let buildElementalEffectChance = this.buildDamageService.getStat(StatType.ElementalEffectChance, this.weapon, this.context)
    let buildElementalEffectDamage = this.buildDamageService.getStat(StatType.ElementalEffectDamage, this.weapon, this.context)
    let elementalEffectiveness = targetType ? this.getElementalEffectiveness(targetType, elementalEffect): 1
    let effectiveProcDps = elementalDps * (1 + buildElementalEffectDamage) * (elementalEffectiveness + buildElementalEffectChance)
    let clipEffectiveNumberOfShots = magazineSize / ammoPerShot
    let procsPerClip = clipEffectiveNumberOfShots * elementalChance * pellets
    let clipElementalDamage = procsPerClip * effectiveProcDps * duration
    let clipSpeed = clipEffectiveNumberOfShots / fireRate
    let totalSpeed = reloadSpeed + clipSpeed
    let finalDps = clipElementalDamage / totalSpeed

    return Math.round(finalDps * 100) / 100
  }

  @Memoize((damage: number) => damage)
  protected calculateDps(damage: number): number {
    const { ammoPerShot = 1 } = this.weapon

    let reloadSpeed = this.getReloadSpeed()
    let fireRate = this.getFireRate()
    let magazineSize = this.getMagazineSize()
    let clipEffectiveNumberOfShots = magazineSize / ammoPerShot
    let clipSpeed = clipEffectiveNumberOfShots / fireRate
    let totalSpeed = reloadSpeed + clipSpeed
    let totalClipDamage = damage * clipEffectiveNumberOfShots
    let finalDps = totalClipDamage / totalSpeed

    return Math.round(finalDps * 100)/100
  }

  @Memoize()
  protected getWeaponCritMultiplier(): number {
    const { manufacturer, type, redText } = this.weapon

    let redTextStat = this.getRedTextStat(StatType.CritHitMultiplier, redText)

    let multipliers = {
      [Manufacturer.Jakobs]: {
        [Type.Shotgun]: 2.3,
        [Type.AssaultRifle]: 2.3,
        [Type.Pistol]: 2.5
      }
    }

    let result = multipliers[manufacturer]?.[type]
    return (result ?? 2) + redTextStat
  }

  @Memoize()
  protected getWeaponCritBaseBonus(): number {
    const { manufacturer, type } = this.weapon

    // If the weapon has CritHitDamage property, we just use that since it
    // includes any manufacturer or weapon type specific bonuses
    let weaponCritDamage = this.getStat(StatType.CritHitDamage)
    if(weaponCritDamage) return weaponCritDamage

    if(type === Type.SniperRifle) {
      if(manufacturer === Manufacturer.Jakobs) {
        return 1.6
      }

      return 1
    }

    return 0
  }

  @Memoize()
  protected getWeaponCritPenalty(): number {
    const { manufacturer, type, isEtech } = this.weapon

    if(manufacturer === Manufacturer.Jakobs) {
      return 0
    }

    if(isEtech) {
      if(type === Type.AssaultRifle) {
        return 0.7
      } else if(type === Type.SniperRifle) {
        return 1
      }
    }

    if(type === Type.AssaultRifle) {
      return 0.2
    }

    return 0
  }

  @Memoize()
  protected getReloadSpeed(): number {
    const { reloadSpeed } = this.weapon

    let buildReloadSpeed = this.buildDamageService.getStat(StatType.ReloadSpeed, this.weapon, this.context)
    return reloadSpeed / (1 + buildReloadSpeed)
  }

  @Memoize()
  protected getFireRate(): number {
    const { fireRate } = this.weapon

    let buildFireRate = this.buildDamageService.getStat(StatType.FireRate, this.weapon, this.context)
    return fireRate * (1 + buildFireRate)
  }

  @Memoize()
  protected getMagazineSize(): number {
    const { magazineSize } = this.weapon

    let buildMagazineSize = this.buildDamageService.getStat(StatType.MagazineSize, this.weapon, this.context)
    return magazineSize * (1 + buildMagazineSize)
  }

  @Memoize((targetType: TargetType, elementalEffect?: ElementalEffect) => {
    return targetType + ';' + (elementalEffect ?? '')
  })
  protected getElementalEffectiveness(targetType: TargetType, elementalEffect?: ElementalEffect): number {
    if(elementalEffect === undefined) {
      if(targetType === TargetType.Armor) {
        return 0.8
      }
      return 1
    }

    const coefficients = ElementalDamageCoefficients(this.context.gameMode || GameModeEnum.NormalMode)

    let result = coefficients[elementalEffect]?.[targetType]
    return result ?? 1
  }

  @Memoize((targetType?: TargetType) => targetType ?? '')
  public getSplashDamage(targetType?: TargetType): number {
    const { elementalEffect, type, manufacturer } = this.weapon
    // Explosive seems to be exclusively splash damage and additional splash damage is not calculated?
    // Update: Mostly not true - mostly for Maliwan/Torgue and launchers
    // https://forums.gearboxsoftware.com/t/complete-splash-damage-guide/1553510

    // maybe this gets calculated as splash multiplier?
    if(elementalEffect === ElementalEffect.Explosive) {
      if(type === Type.RocketLauncher) {
        // TODO: many launchers have splash damage
        return 0
      }
    }

    return this.getBaseDamage(targetType) * this.getSplashDamageMultiplier()
  }

  @Memoize()
  protected getSplashDamageMultiplier(): number {
    // this method needs so much work
    const { type, elementalEffect, manufacturer, dealsBonusElementalDamage, redText } = this.weapon

    let grenadeDamageStat = this.buildDamageService.getStat(StatType.GrenadeDamage, this.weapon, this.context)

    // TODO: red text should have SplashDamage stat, pull it
    if(redText === RedTextEnum.ByThePeople) {
      return 0.7 * (1 + grenadeDamageStat)
    }

    if(redText === RedTextEnum.GoodForStartingFires) {
      return 1 * (1 + grenadeDamageStat)
    }

    if(redText === RedTextEnum.PeleHumblyRequestsASacrifice) {
      return 0.8 * (1 + grenadeDamageStat)
    }

    // We need a doesSplashDamage method
    if(!dealsBonusElementalDamage && elementalEffect !== ElementalEffect.Explosive) {
      return 0
    }

    // TODO: We need a coefficients object to lookup values - type, make and type/make
    if(type === Type.Pistol) {
      if(manufacturer === Manufacturer.Torgue) {
        return 1 * (1 + grenadeDamageStat)
      } else if(manufacturer === Manufacturer.Maliwan) {
        return 0.8 * (1 + grenadeDamageStat)
      }
      return 0.8
    }

    if(type === Type.AssaultRifle) {
      if(manufacturer === Manufacturer.Torgue) {
        return 0.9 * (1 + grenadeDamageStat)
      }
    }

    if(type === Type.SniperRifle) {
      if(manufacturer === Manufacturer.Maliwan) {
        return 0.5 * (1 + grenadeDamageStat)
      }
    }

    return 0.5
  }

  @Memoize((statType?: StatType) => statType ?? '')
  protected getStat(statType: StatType): number {
    const { stats, redText } = this.weapon

    let redTextStat = this.getRedTextStat(statType, redText)

    // hacky - if RedText has this stat, it trumps everything
    if(redTextStat || !stats) return redTextStat

    let result: Stat[] = stats.filter((stat: Stat) => stat.type === statType)
    return result.reduce((memo: number, stat: Stat) => memo + stat.value, 0)
  }

  @Memoize((statType: StatType, redText?: RedTextEnum) => {
    return statType + ';' + (redText ?? '')
  })
  protected getRedTextStat(statType: StatType, redText?: RedTextEnum): number {
    if(!redText) return 0

    return RedTextFactory(redText).getStat(statType)
  }
}
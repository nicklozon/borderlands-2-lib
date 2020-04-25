import { Weapon } from "../interface/weapon"
import { PlayerDamageService } from "../../player/service/damage_service"
import { Player } from "../../player/interface/player"
import { StatType } from "../../player/value_object/stat_type"
import { Manufacturer } from "../value_object/manufacturer"
import { Type } from "../value_object/type"
import { TargetType } from "../../enemy/value_object/target_type"
import { ElementalEffect } from "../value_object/elemental_effect"
import { Stat } from "../../player/interface/stat"
import { RedText, RedTextEnum } from "../../player/object/red_text"
import { ElementalDamageCoefficients, GameModeEnum } from "../../enemy/value_object/elemental_damage_coefficients"

// TODO: pure splash damage

export class DamageService {
  private weapon: Weapon
  private playerDamageService: PlayerDamageService
  private mode: GameModeEnum

  constructor(weapon: Weapon, player: Player, mode: GameModeEnum = GameModeEnum.NormalMode) {
    this.weapon = weapon
    this.playerDamageService = new PlayerDamageService(player)
    this.mode = mode
  }

  public getDps() : number {
    return this.calculateDps(this.getDamage())
  }
  
  public getCritDps() : number {
    return this.calculateDps(this.getCritDamage())
  }

  public getTargetTypeDps(targetType: TargetType) {
    let dps = this.calculateDps(this.getDamage(targetType)) + this.getElementalDps(targetType)
    return Math.round(dps * 100)/100
  }

  public getTargetTypeCritDps(targetType: TargetType) {
    let dps = this.calculateDps(this.getCritDamage(targetType)) + this.getElementalDps(targetType)
    return Math.round(dps * 100)/100
  }

  public getDamage(targetType?: TargetType) : number {
    return this.getBaseDamage(targetType) + this.getSplashDamage(targetType)
  }
  
  protected getBaseDamage(targetType?: TargetType) : number {
    const { damage, pellets = 1, unlistedPellets = 0, elementalEffect } = this.weapon
    let playerGunDamage = this.playerDamageService.getStat(StatType.GunDamage, this.weapon)
    // Is this a thing?
    let weaponGunDamage = this.getStat(StatType.GunDamage)
    let elementalEffectiveness = targetType ? this.getElementalEffectiveness(targetType, elementalEffect) : 1
    let ampDamage = this.playerDamageService.getStat(StatType.AmpDamage, this.weapon)

    let unlistedDamage = 0
    if(unlistedPellets > 0) {
      unlistedDamage = unlistedPellets * damage * 1.06
    }

    return damage * pellets * (1 + playerGunDamage + weaponGunDamage) * elementalEffectiveness + unlistedDamage + ampDamage
  }

  public getCritDamage(targetType?: TargetType) : number {
    const { type } = this.weapon

    // Rocket launcher's can't crit
    if(type === Type.RocketLauncher) return 0

    let multiplier = this.getWeaponCritMultiplier()
    let baseBonus = this.getWeaponCritBaseBonus()
    let penalty = this.getWeaponCritPenalty()
    let playerCritDamage = this.playerDamageService.getStat(StatType.CritHitDamage, this.weapon)
    let splashDamage = this.getSplashDamage(targetType)

    return this.getBaseDamage(targetType) * multiplier * (1 + baseBonus + playerCritDamage) /  (1 + penalty) + splashDamage
  }

  public getElementalDps(targetType?: TargetType) : number {
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

    let playerElementalEffectChance = this.playerDamageService.getStat(StatType.ElementalEffectChance, this.weapon)
    let playerElementalEffectDamage = this.playerDamageService.getStat(StatType.ElementalEffectDamage, this.weapon)
    let elementalEffectiveness = targetType ? this.getElementalEffectiveness(targetType, elementalEffect) : 1
    let effectiveProcDps = elementalDps * (1 + playerElementalEffectDamage) * (elementalEffectiveness + playerElementalEffectChance)
    let clipEffectiveNumberOfShots = magazineSize / ammoPerShot
    let procsPerClip = clipEffectiveNumberOfShots * elementalChance * pellets
    let clipElementalDamage = procsPerClip * effectiveProcDps * duration
    let clipSpeed = clipEffectiveNumberOfShots / fireRate
    let totalSpeed = reloadSpeed + clipSpeed
    let finalDps = clipElementalDamage / totalSpeed

    return Math.round(finalDps * 100) / 100
  }

  protected calculateDps(damage: number) : number {
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

  protected getWeaponCritMultiplier() : number {
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

  protected getWeaponCritBaseBonus() : number {
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

  protected getWeaponCritPenalty() : number {
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

  protected getReloadSpeed() : number {
    const { reloadSpeed } = this.weapon

    let playerReloadSpeed = this.playerDamageService.getStat(StatType.ReloadSpeed, this.weapon)
    return reloadSpeed / (1 + playerReloadSpeed)
  }

  protected getFireRate() : number {
    const { fireRate } = this.weapon

    let playerFireRate = this.playerDamageService.getStat(StatType.FireRate, this.weapon)
    return fireRate * (1 + playerFireRate)
  }

  protected getMagazineSize() : number {
    const { magazineSize } = this.weapon

    let playerMagazineSize = this.playerDamageService.getStat(StatType.MagazineSize, this.weapon)
    return magazineSize * (1 + playerMagazineSize)
  }

  protected getElementalEffectiveness(targetType: TargetType, elementalEffect?: ElementalEffect) : number {
    if(elementalEffect === undefined) {
      if(targetType === TargetType.Armor) {
        return 0.8
      }
      return 1
    }

    const coefficients = ElementalDamageCoefficients(this.mode)

    let result = coefficients[elementalEffect]?.[targetType]
    return result ?? 1
  }

  public getSplashDamage(targetType?: TargetType): number {
    // Explosive seems to be exclusively splash damage and additional splash damage is not calculated?
    // Update: Mostly not true - mostly for Maliwan/Torgue and launchers
    // https://forums.gearboxsoftware.com/t/complete-splash-damage-guide/1553510
    const { elementalEffect } = this.weapon
    //if(elementalEffect === ElementalEffect.Explosive) return 0

    return this.getBaseDamage(targetType) * this.getSplashDamageMultiplier()
  }

  protected getSplashDamageMultiplier(): number {
    // this method needs so much work
    const { type, manufacturer, dealsBonusElementalDamage, redText } = this.weapon

    let grenadeDamageStat = this.playerDamageService.getStat(StatType.GrenadeDamage, this.weapon)

    if(redText === RedTextEnum.ByThePeople) {
      return 0.7 * (1 + grenadeDamageStat)
    }

    // We need a doesSplashDamage method
    if(!dealsBonusElementalDamage) {
      return 0
    }

    if(type === Type.Pistol) {
      return 0.8
    }

    if(type === Type.AssaultRifle) {
      if(manufacturer === Manufacturer.Torgue) {
        return 0.9 * (1 + grenadeDamageStat)
      }
    }

    return 0.5
  }

  protected getStat(statType: StatType) : number {
    const { stats, redText } = this.weapon

    let redTextStat = this.getRedTextStat(statType, redText)

    // hacky - if RedText has this stat, it trumps everything
    if(redTextStat || !stats) return redTextStat

    let result: Stat[] = stats.filter((stat: Stat) => stat.type === statType)
    return result.reduce((memo: number, stat: Stat) => memo + stat.value, 0)
  }

  protected getRedTextStat(statType: StatType, redText?: RedTextEnum) : number {
    if(!redText) return 0

    return RedText(redText).getStat(statType)
  }
}
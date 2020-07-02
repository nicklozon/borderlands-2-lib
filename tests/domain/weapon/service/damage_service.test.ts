import { DamageService } from "../../../../src/domain/weapon/service/damage_service";
import { Weapon } from "../../../../src/domain/weapon/interface/weapon";
import { Build } from "../../../../src/domain/build/object/build";
import { Manufacturer } from "../../../../src/domain/weapon/value_object/manufacturer";
import { Type } from "../../../../src/domain/weapon/value_object/type";
import { Class } from "../../../../src/domain/build/value_object/class";
import { ElementalEffect } from "../../../../src/domain/weapon/value_object/elemental_effect";
import { TargetType } from "../../../../src/domain/enemy/value_object/target_type";
import { StatType } from "../../../../src/domain/build/value_object/stat_type";
import { Context } from "../../../../src/domain/context";

test.each([
  [{
    name: 'Vladof Pistol',
    manufacturer: Manufacturer.Vladof,
    type: Type.Pistol,
    damage: 10,
    fireRate: 4,
    reloadSpeed: 5,
    magazineSize: 20,
    pellets: 2
  }, 40],
  [{
    name: 'Jakobs AR',
    manufacturer: Manufacturer.Jakobs,
    type: Type.AssaultRifle,
    damage: 100,
    fireRate: 15,
    reloadSpeed: 4,
    magazineSize: 22,
    ammoPerShot: 2
  }, 232.39],
])('getDps for %j', (weapon: Weapon, result: number) => {

  let build : Build = new Build(Class.Siren, [])
  let context = new Context(build)
  let service = new DamageService(weapon, context)

  expect(service.getDps()).toBe(result)
})

test.each([
  [{
    name: 'Vladof Pistol',
    manufacturer: Manufacturer.Vladof,
    type: Type.Pistol,
    damage: 10,
    fireRate: 4,
    reloadSpeed: 5,
    magazineSize: 20,
    pellets: 2,
    elementalEffect: ElementalEffect.Incendiary,
    dealsBonusElementalDamage: true
  }, TargetType.Flesh, 108],
  [{
    name: 'Jakobs AR',
    manufacturer: Manufacturer.Jakobs,
    type: Type.AssaultRifle,
    damage: 100,
    fireRate: 15,
    reloadSpeed: 4,
    magazineSize: 22,
    ammoPerShot: 2,
    elementalEffect: ElementalEffect.Corrosive
  }, TargetType.Shield, 174.3],
])('getTargetTypeDps for %j', (weapon: Weapon, targetType: TargetType, result: number) => {

  let build : Build = new Build(Class.Siren, [])
  let context = new Context(build)
  let service = new DamageService(weapon, context)

  expect(service.getTargetTypeDps(targetType)).toBe(result)
})

test.each([
  [{
    name: 'Vladof Sniper',
    manufacturer: Manufacturer.Vladof,
    type: Type.SniperRifle,
    damage: 100,
    fireRate: 1.2,
    reloadSpeed: 3.8,
    magazineSize: 8
  }, 400],
  [{
    name: 'Jakobs Sniper',
    manufacturer: Manufacturer.Jakobs,
    type: Type.SniperRifle,
    damage: 100,
    fireRate: 1.2,
    reloadSpeed: 3.8,
    magazineSize: 8,
    stats: [{
      type: StatType.CritHitDamage,
      value: 1.8
    }]
  }, 560],
])('getCritDamage for %j', (weapon: Weapon, result: number) => {

  let build : Build = new Build(Class.Siren, [])
  let context = new Context(build)
  let service = new DamageService(weapon, context)

  expect(service.getCritDamage()).toBe(result)
})
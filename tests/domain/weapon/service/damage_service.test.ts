import { DamageService } from "../../../../src/domain/weapon/service/damage_service";
import { Weapon } from "../../../../src/domain/weapon/interface/weapon";
import { Player } from "../../../../src/domain/player/interface/player";
import { Manufacturer } from "../../../../src/domain/weapon/value_object/manufacturer";
import { Type } from "../../../../src/domain/weapon/value_object/type";
import { Class } from "../../../../src/domain/player/value_object/class";
import { ElementalEffect } from "../../../../src/domain/weapon/value_object/elemental_effect";
import { TargetType } from "../../../../src/domain/enemy/value_object/target_type";

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
    ammoPerShot: 1
  }, 40],
  [{
    name: 'Jakobs AR',
    manufacturer: Manufacturer.Jakobs,
    type: Type.AssaultRifle,
    damage: 100,
    fireRate: 15,
    reloadSpeed: 4,
    magazineSize: 22,
    pellets: 1,
    ammoPerShot: 2
  }, 232.39],
])('getDps for %j', (weapon: Weapon, result: number) => {
  let player : Player = {
    class: Class.Siren
  }

  let service = new DamageService(weapon, player)

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
    ammoPerShot: 1,
    elementalEffect: ElementalEffect.Incendiary
  }, TargetType.Flesh, 60],
  [{
    name: 'Jakobs AR',
    manufacturer: Manufacturer.Jakobs,
    type: Type.AssaultRifle,
    damage: 100,
    fireRate: 15,
    reloadSpeed: 4,
    magazineSize: 22,
    pellets: 1,
    ammoPerShot: 2,
    elementalEffect: ElementalEffect.Corrosive
  }, TargetType.Shield, 174.3],
])('getTargetTypeDps for %j', (weapon: Weapon, targetType: TargetType, result: number) => {
  let player : Player = {
    class: Class.Siren
  }

  let service = new DamageService(weapon, player)

  expect(service.getTargetTypeDps(targetType)).toBe(result)
})
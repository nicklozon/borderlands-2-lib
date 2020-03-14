import { DamageService } from "../../../../src/domain/weapon/service/damage_service";
import { Weapon } from "../../../../src/domain/weapon/interface/weapon";
import { Player } from "../../../../src/domain/player/interface/player";
import { Manufacturer } from "../../../../src/domain/weapon/value_object/manufacturer";
import { Type } from "../../../../src/domain/weapon/value_object/type";
import { Class } from "../../../../src/domain/player/value_object/class";

test.each([
  [{
    manufacturer: Manufacturer.Vladof,
    type: Type.Pistol,
    damage: 10,
    fire_rate: 4,
    reload_speed: 5,
    magazine_size: 20
  }, 20],
  [{
    manufacturer: Manufacturer.Jakobs,
    type: Type.AssaultRifle,
    damage: 100,
    fire_rate: 15,
    reload_speed: 4,
    magazine_size: 22
  }, 402.44],
])('getDps for %j', (weapon: Weapon, result) => {
  let player : Player = {
    class: Class.Siren
  }

  let service = new DamageService(weapon, player)

  expect(service.getDps()).toBe(result)
})
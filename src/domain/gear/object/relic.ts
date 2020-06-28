import { Gear } from "./gear";
import { Stat } from "../../build/interface/stat";
import { GearType } from "./gear_type";

export class Relic extends Gear {
  constructor(stats: Stat[]) {
    super(GearType.Relic, stats)
  }
}
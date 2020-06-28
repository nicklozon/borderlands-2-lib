import { Gear } from "./gear";
import { Stat } from "../../build/interface/stat";
import { GearType } from "./gear_type";
import { RedTextEnum } from "../../build";

export class Shield extends Gear {
  constructor(stats: Stat[], redText?: RedTextEnum) {
    super(GearType.Shield, [])
    this.redText = redText
  }
}
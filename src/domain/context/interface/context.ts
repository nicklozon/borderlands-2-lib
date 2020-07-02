import { v4 as uuidv4 } from 'uuid'
import { Build, Stat, Skill } from "../../build";
import { GameModeEnum } from "../../enemy";
import { Effect, EffectType } from "../../effect";
import { ClassMod } from "../../gear";
import { Relic } from "../../gear/object/relic";
import { Shield } from "../../gear/object/shield";
import { Memoize } from "typescript-memoize";

export class Context {
  public id: string
  public name?: string
  public build: Build
  public classMod?: ClassMod
  public relic?: Relic
  public shield?: Shield
  public badassRanking: Stat[]
  public effects: Effect[]
  public gameMode: GameModeEnum // could be an effect

  constructor(
    build: Build,
    name?: string,
    classMod?: ClassMod,
    relic?: Relic,
    shield?: Shield,
    badassRanking: Stat[] = [],
    effects : Effect[] = [],
    gameMode: GameModeEnum = GameModeEnum.NormalMode
  ) {
    this.id = uuidv4()
    this.build = build
    this.name = name
    this.classMod = classMod
    this.relic = relic
    this.shield = shield
    this.badassRanking = badassRanking
    this.effects = effects
    this.gameMode = gameMode
  }

  public getEffect = (effectType: EffectType): Effect|void => {
    return this.effects.find(effect => effect.getEffectType() === effectType)
  }

  @Memoize()
  public getSkills(): Skill[] {
    if(!this.classMod) return this.build.skills
    let classModSkills = this.classMod.getSkills()

    // merge class mod skills into skills
    return this.build.skills.map((skill: Skill) => {
      let classModSkill = classModSkills.find((classModSkill: Skill) => classModSkill.name === skill.name )
      let classModLevel = classModSkill?.level ?? 0
      return skill.constructor(skill.level + classModLevel)
    })
  }
}
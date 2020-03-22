
# Description
Borderlands 2 weapon damage and DPS calculation library

## Goal of this library
This is a node.js library - the overall intention is to provide programmers with a set of easy to use and understandable modules that calculates accurate weapon damage and DPS. The modules will contain all necessary logic and nuances within Borderlands 2 such that the developer will not need to know about them; just enter the player configuration and weapon details and proper damage and DPS values will be calculated based on all stats and skills.

Ultimately I would like to build a nice browser UI that makes use of this library, but that is a long way off as there will be MANY, MANY things to update and fix in this library as I build on it slowly.

You can use this library to calcualte damage/DPS for your playthrough, but you'll need to do a little bit of coding. Skip down to the Usage section to see how I am using the library for my personal playthrough.

# Why I built this library
I was disappointed with the available offerings for comparing loot - the calculators I was using would not allow me to compare multiple weapons at once, they did not include known logic about mechanics and items in the game that impacted damage, they did not include elemental weapon damage over time, they did not allow me to customize my player configuration (skill build, BAR, relics, etc.) once and re-use those across all weapons or allow for multiple player customizations (compare skill builds and non-weapon gear), they were not aware of the different target types (flesh, armor, shield) and how each element affects them, etc.

End goal of this library is to be able to enter multiple players of any class, with multiple item configurations, in multiple scenarios (fight for your life, turret deployed, etc.) and render a comprehensive of damage and DPS values against each target type and know quickly what weapon is best for each player in each scenario.

# About Me
Software developer (imagine that) and amateur Borderlands 2 player, spend most of my time working so Borderlands is low pressure escape. Played through the game twice as Mechromancer and Axton, never in THVM or UHVM but I understand the concepts and plan to implement them into this library. Take my opinions with a grain of salt, constructive feedback is always welcome.

# How it works
## Installing
Install node, optionally install yarn.

Use `yarn install` to install the app, see below for running the program...

## Usage
Again, this is a library intended more for developers than gamers...but it can still be used  as a standalone tool for calculating weapon damage.

No time to explain usage right now...check out index.ts

Run `yarn tsc && node dist/index.js` to see the output:

```
┌─────────────────────────────┬─────────────────┬────────────┬──────────┬───────────┬───────────┬────────────┬───────────────────┬──────────────────┬──────────────────┐
│                        name │            type │ singleShot │ critShot │ fleshShot │ armorShot │ shieldShot │          fleshDps │         armorDps │        shieldDps │
├─────────────────────────────┼─────────────────┼────────────┼──────────┼───────────┼───────────┼────────────┼───────────────────┼──────────────────┼──────────────────┤
│ Longitudinal Hybridfication │    Sniper Rifle │       1221 │     4908 │      1221 │      1221 │       2442 │    961.59 (69.94) │   961.59 (69.94) │ 1923.17 (139.87) │
│            Sledge's Shotgun │         Shotgun │       2295 │     4636 │      2295 │      1836 │       2295 │       4702.81 (0) │      3762.25 (0) │      4702.81 (0) │
│                  Filled Law │          Pistol │        983 │     2481 │       983 │       786 │        983 │       4854.15 (0) │      3883.32 (0) │      4854.15 (0) │
│     Miss Moxxi's Good touch │  Submachine Gun │        273 │      935 │       410 │       205 │        205 │ 3741.02 (1705.03) │ 1870.52 (852.52) │ 1870.52 (852.52) │
│          Wild Hammer Buster │   Assault Rifle │        934 │     2171 │       934 │       748 │        934 │       3930.15 (0) │      3144.12 (0) │      3930.15 (0) │
│          Expansive Spinigun │   Assault Rifle │        213 │      358 │       192 │       319 │        160 │  1830.13 (422.09) │ 3050.22 (703.49) │ 1525.12 (351.75) │
│              Surgical Sloth │    Sniper Rifle │        606 │     2437 │       546 │       909 │        455 │  1298.98 (317.18) │ 2164.96 (528.63) │ 1082.48 (264.31) │
│                 rock a boom │ Rocket Launcher │       9803 │          │      9803 │      9803 │       7843 │       3142.26 (0) │      3142.26 (0) │      2513.81 (0) │
└─────────────────────────────┴─────────────────┴────────────┴──────────┴───────────┴───────────┴────────────┴───────────────────┴──────────────────┴──────────────────┘
┌─────────────────────────────┬─────────────────┬────────────┬──────────┬───────────┬───────────┬────────────┬───────────────────┬──────────────────┬──────────────────┐
│                        name │            type │ singleShot │ critShot │ fleshShot │ armorShot │ shieldShot │          fleshDps │         armorDps │        shieldDps │
├─────────────────────────────┼─────────────────┼────────────┼──────────┼───────────┼───────────┼────────────┼───────────────────┼──────────────────┼──────────────────┤
│ Longitudinal Hybridfication │    Sniper Rifle │       1221 │     4908 │      1221 │      1221 │       2442 │    730.62 (53.14) │   730.62 (53.14) │ 1461.24 (106.28) │
│            Sledge's Shotgun │         Shotgun │       2295 │     4636 │      2295 │      1836 │       2295 │       3415.37 (0) │       2732.3 (0) │      3415.37 (0) │
│                  Filled Law │          Pistol │        983 │     2481 │       983 │       786 │        983 │       3546.08 (0) │      2836.86 (0) │      3546.08 (0) │
│     Miss Moxxi's Good touch │  Submachine Gun │        273 │      935 │       410 │       205 │        205 │ 3141.13 (1431.62) │ 1570.57 (715.81) │ 1570.57 (715.81) │
│          Wild Hammer Buster │   Assault Rifle │       1088 │     2527 │      1088 │       870 │       1088 │          3997 (0) │       3197.6 (0) │         3997 (0) │
│          Expansive Spinigun │   Assault Rifle │        255 │      430 │       230 │       383 │        191 │        1999 (400) │ 3331.66 (666.67) │ 1665.83 (333.33) │
│              Surgical Sloth │    Sniper Rifle │        606 │     2437 │       546 │       909 │        455 │   961.83 (234.85) │ 1603.05 (391.42) │  801.53 (195.71) │
│                 rock a boom │ Rocket Launcher │       9803 │          │      9803 │      9803 │       7843 │       2303.37 (0) │      2303.37 (0) │       1842.7 (0) │
└─────────────────────────────┴─────────────────┴────────────┴──────────┴───────────┴───────────┴────────────┴───────────────────┴──────────────────┴──────────────────┘
```
*The values in parentheses are the elemental damage over time*

## Testing
I have very minimal tests right now, but they are built with jest.

Run `yarn test` to run the jest tests


# Damage/DPS Calculation
## Gun Time
DPS calculation is based on a concept I'm calling **Gun Time**. Gun Time is the duration of emptying an entire magazine at full fire rate plus reload time.

## Gun Time DPS
The amount of damage that can be inflicted for a weapon's Gun Time divided out over that time is the DPS.

## Damage Over Time
DPS includes elemental damage over time (DOT) where the damage duration can extend beyond the window of emptying the full clip and reloading - this reiterates the Gun Time DPS statement that the DPS is based on the amount of damage you can inflict for the duration of "gun time", not just during that time.

## Arguments against Gun Time DPS
### Theoretical DPS
As DOTs extend outside the duration of "gun time" and do stack to apply simultaneous damage (corrosive DOT is 8 seconds), emptying multiple subsequent magazines will theoretically achieve a higher DPS value than the aforementioned Gun Time value. This leads into one self-argument I've had with myself...

...and that is this library doesn't calculate a sustained DPS metric like one MAY experience during boss fights. My opinion is that "sustained DPS" is not an effective value for comparing loot in Borderlands as fights are very sparatic and short lived outside of the rare boss battle; RPGs with long lived boss battles and repetitive skill rotations benefit from this type of metric, but not Borderlands. Additionally, taking into account skills, slag and other factors in fights, sustained DPS is (probably) not even a concept that high skilled players even think about - it is more valuable and impactful when deciding skill builds and what weapons to use in what scenarios than theoretical damage. **This is an assumption, I'm a amateur Borderlands 2 player**

### Reload Time
Another argument I've had with myself is that "reload time" detracts from a true DPS value as reload times are used for repositioning, hiding under cover, regenerating shield, collecting ammo/health, etc. I agree with this to an extent, and this library could be easily updated to add "include reload times" as a DPS calculation parameter, but we all love fast reload times - if you out level the area you are clearing or have good sustain, then reload time is a very important metric when comparing loot in scenarios where moving and killing as fast as possible is desired.

# FAQs
## How do you calculate skills that are event based?
For skills like "turret deployed", or "after swapping weapon", or "after reloading", etc. my plan is to bake these into "scenarios" and then damage/DPS will be presented so you can compare a weapon's damage/DPS for each scenario. Currently you can create a Player object for each set of skills you would like to calculate the damage/DPS for.
# Description
Borderlands 2 damage calculation library

This is LIBRARY, meaning it isn't meant to be used by gamers but by developers to build tools for gamers...

However, I'm using this library for my personal playthrough of Borderlands 2. The output I generate from this library looks like this:
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

# Installing
Install node, optionally install yarn.

Use `yarn install` to install the app, see below for running the program...

# Getting started
No time to write this...check out index.ts

Run `yarn tsc && node dist/index.js` to see the output

# Testing
I have very minimal tests right now, but they are built on jest.

Run `yarn test` to run the jest tests

# Future
Would be nice to create a UI app that uses this library...

But for now I'm just filling in missing pieces as I go
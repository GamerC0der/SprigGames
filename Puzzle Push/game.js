/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Puzzle
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const enemy = "e"
const goal = "g"
const wall = "|"
const goal2 = "t"
const powerup = "x"
const decoywall = "d"
const air = "a"


setLegend(
  [ player, bitmap`
11LLLLLLLLLLLL11
11LLLLLLLLLLLL11
LL000000000000LL
LL000000000000LL
LL000000000000LL
LL000000000000LL
LL000000000000LL
LL000000000000LL
LL000000000000LL
LL000000000000LL
LL000000000000LL
LL000000000000LL
LL000000000000LL
LL000000000000LL
11LLLLLLLLLLLL11
11LLLLLLLLLLLL11`],
  [ enemy,  bitmap`
3399999999999933
3399999999999933
9900000000000099
9900000000000099
9900000000000099
9900000000000099
9900000000000099
9900000000000099
9900000000000099
9900000000000099
9900000000000099
9900000000000099
9900000000000099
9900000000000099
3399999999999933
3399999999999933`],
  [ wall,  bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ decoywall,  bitmap`
0000000000000000
0000000000000000
00L0000000000000
00000000000L0000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
000L0000L0000000
0000000000000000
0000000000000000
00000000000L0000
0000000000000000
0000000L00000000
0000000000000000
0000000000000000`],

  [ goal,  bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [ goal2,  bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`],
  [ powerup,  bitmap`
................
................
................
.....999999.....
...9999999999...
...9966666699...
..996066666699..
..966006660669..
..966660006669..
..966660066669..
..966600600669..
..966606666669..
...9666666669...
...9966666699...
.....999999.....
................`],
  [ air, bitmap``],
  
)

setSolids([ player, wall, enemy, decoywall ])

let level = 0
const levels = [
  map`
    p.....g
    ...|||.
    ....e..
  `,
  map`
    pe....|t|....|
    ...|..|.|.|..g
    ..........||||
    ||||||||||||||
    ||||||||||||||
  `,
  map`
..d|pdd||||||..|dd
..d..d......|..|||
t.|..dx...e.|..|g|
..|..d......d..|g.
..|||||||||||.....`,
  map`
dtddxaaaddaaedd
pddddddaaaadddd`
]
setMap(levels[level])

setPushables({
  [ player ]: [ powerup ]
})
onInput("s", () => {
  getFirst(player).y += 1
  getFirst(enemy).y += 1
})
onInput("d", () => {
  getFirst(player).x += 1
  getFirst(enemy).x += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
  getFirst(enemy).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
  getFirst(enemy).x -= 1
})
function handlePowerupCollection() {
    const powerupCollected = true; 
  
    if (powerupCollected) {
        const allDecoyWalls = getAll(decoywall);
        allDecoyWalls.forEach(decoyWall => {
            const tile = getTile(decoyWall.x, decoyWall.y);
            tile.forEach(sprite => {
                if (sprite.type === decoywall) {
                    sprite.type = air; 
                }
            });
        });
    }
}

afterInput(() => {
  const enemyOnGoal = getAll(enemy).some(enemy => {
    const enemyTile = getTile(enemy.x, enemy.y);
    return enemyTile.some(sprite => sprite.type === goal);
  });

  if (level === 1 || level == 2) {
    const playerOnGoal2 = getAll(player).some(player => {
      const playerTile = getTile(player.x, player.y);
      return playerTile.some(sprite => sprite.type === goal2);
    });

    if (playerOnGoal2 && enemyOnGoal) {
      level += 1;
      setMap(levels[level]);
    }
  } else if (enemyOnGoal) {
    level += 1;
    setMap(levels[level]);
  }
getAll(player).forEach(player => {
    const playerTile = getTile(player.x, player.y);
    const collectedPowerup = playerTile.find(sprite => sprite.type === powerup);

    if (collectedPowerup) {
      collectedPowerup.remove();
      handlePowerupCollection();
    }
  });

  getAll(enemy).forEach(enemy => {
    const enemyTile = getTile(enemy.x, enemy.y);
    const collectedPowerup = enemyTile.find(sprite => sprite.type === powerup);

    if (collectedPowerup) {
      collectedPowerup.remove();
      handlePowerupCollection();
    }
  });

});

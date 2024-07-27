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
L000000000000000
0L00000000000000
00L0000000000000
000L000000000000
0000L00000000000
00000L0000000000
000000L000000000
0000000L00000000
00000000L0000000
000000000L000000
0000000000L00000
00000000000L0000
000000000000L000
0000000000000L00
00000000000000L0
000000000000000L`],
  [ enemy, bitmap`
....33333333....
...3333333333...
..333333333333..
.33399999999333.
3339999999999333
3399999999999933
3399999999999933
3399999999999933
3399999999999933
3399999999999933
3399999999999933
3399999999999933
.33999999999933.
..339999999933..
...3333333333...
....33333333....`],

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

setSolids([ player, wall, decoywall ])

let level = 0
const levels = [
  map`
||||||||||||||||||||||||||||||
||||||||||||||||||||||||||||||
||||||||||||||||||||||||||||||
||||||||||||||||||||||||||||||
||||||||||||||||||||||||||||||
|||............|||||||||||||||
|||.....||||||.|||||||||||||||
|||.....|......|||||||||||||||
|||..|xx|x||||.|||||||||||||||
|||..|.........|||||||||||||||
|||.x|.....|||||||||||||||||||
|||..|...|||.........x.......|
|||..|...|.a.x...............|
|||x.|...|.a.x.|||||||||||...|
|g|..|...|.|...|.x.g.x...|...|
|.|..|...|.|||||..a......|...|
|.|..||x.|.....|......x..|.xx|
|.|.x||..|...|.|x........|...|
|.|..||..|||||.|............x|
|.|..||........|......||||||||
|.|..|||..x....|.....a|......|
|p|..|||.....|.|xx..xx|..|||.|
|.x...||..||.|.|.aaaaa|...x..|
|......|..||x|x|...a......x..|
|...||.|.....|.|..xxxxxx....x|
|...||.|x......|...........xx|
|...||.|xx.....|||||||||||||||
|......|||||...|||||||||||||||
|....xx|||||...|||||||||||||||
|...xx||x..............x....x|
||||||||x....x.|||||...x||..x|
||||||||x....x.|||||...x||..x|
||||||||x.......x.x.x........|
||||||||||||||||||||||||||||||`,
  
]
setMap(levels[level])

setPushables({
  [ player ]: [ powerup ]
})
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})


afterInput(() => {
  const enemyOnGoal = getAll(player).some(player => {
    const playerTile = getTile(player.x, player.y);
    return playerTile.some(sprite => sprite.type === goal);
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
      player.remove()
      addText("Game Over", { x: 10, y: 10, color: color`3` });
      
    }
  });



});

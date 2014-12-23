var mobCount = 0;
var mobRoll = 0;
var mobName = "";

var monster = function(name, minhp, maxhp, mindmg, maxdmg) {
	this.name = name;
	this.minhp = minhp;
	this.maxhp = maxhp;
	this.mindmg = mindmg;
	this.maxdmg = maxdmg;
}
//Forest(0-3)
var greyWolf = new monster("Grey Wolf", 30, 40, 1, 3);
var brownBear = new monster("Brown Bear", 40, 50, 1, 4);
var wildBoar = new monster("Wild Boar", 35, 45, 2, 4);
var brownBearCub = new monster("Brown Bear Cub", 25, 45, 1, 2);
//Deep Forest(4-8)
var grizzledBear = new monster("Grizzled Bear", 120, 160, 8, 12);
var direWolf = new monster("Dire Wolf", 100, 140, 10, 15);
var forestWight = new monster("Forest Wight", 130, 180, 13, 19);
var deepSpider = new monster("Deep Spider", 80, 120, 8, 12);
var ghostWolf = new monster("Ghost Wolf", 115, 155, 12, 18);
//Cave(9-13)
var caveWorm = new monster("Cave Worm", 360, 400, 25, 35);
var troll = new monster("Troll", 400, 560, 40, 55);
var orc = new monster("Orc", 280, 360, 30, 40);
var goblin = new monster("Goblin", 240, 320, 35, 45);
var goblinRogue = new monster("Goblin Rogue", 260, 340, 40, 50);
//Crypt(14-18)
var skeletonWarrior = new monster("SkeletonWarrior", 800, 1200, 70, 90);
var skeletonMage = new monster("Skeleton Mage", 600, 1000, 100, 120);
var ghoul = new monster("Ghoul", 1200, 1400, 65, 75);
var zombie = new monster("Zombie", 800, 1000, 130, 150);
var banshee = new monster("Banshee", 500, 700, 110, 150);
//Hell(19-21)
var cthulu = new monster("Cthulu", 100000, 120000, 300, 500);
var diablo = new monster("Diablo", 130000, 150000, 400, 600);
var andariel = new monster("Andariel", 80000, 90000, 250, 350);

var mobList = [greyWolf, brownBear, wildBoar, brownBearCub, grizzledBear, direWolf, forestWight, deepSpider, ghostWolf, caveWorm, troll, orc, goblin, goblinRogue, skeletonWarrior, skeletonMage, ghoul, zombie, banshee, cthulu, diablo, andariel];

var zone = function(name, id) {
	this.name = name;
	this.id = id;
	this.spawnMonster = function(zname) {
		currentzone = zname;
		logCombat("");
		clearInterval(combatTimer);
		clearInterval(enemyTimer);
		if (currentzone.id == 1) {
			mobRoll = (Math.floor(Math.random() * (3 - 0 + 1)) + 0);
			combat(mobList[mobRoll]);
		}
		else if (currentzone.id == 2) {
			mobRoll = (Math.floor(Math.random() * (8 - 4 + 1)) + 4);
			combat(mobList[mobRoll]);
		}
		else if (currentzone.id == 3) {
			mobRoll = (Math.floor(Math.random() * (13 - 9 + 1)) + 9);
			combat(mobList[mobRoll]);
		}
		else if (currentzone.id == 4) {
			mobRoll = (Math.floor(Math.random() * (18 - 14 + 1)) + 14);
			combat(mobList[mobRoll]);
		}
		else if (currentzone.id == 10) {
			mobRoll = (Math.floor(Math.random() * (21 - 19 + 1)) + 19);
			combat(mobList[mobRoll]);
		}
	};
}	

var forest = new zone("Forest", 1);
var dforest = new zone("Deep Forest", 2);
var cave = new zone ("Cave", 3);
var crypt = new zone("Crypt", 4)
var hell = new zone("Hell", 10);
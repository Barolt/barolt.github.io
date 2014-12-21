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
var greyWolf = new monster("Grey Wolf", 8, 12, 1, 3);
var brownBear = new monster("Brown Bear", 10, 16, 1, 4);
var wildBoar = new monster("Wild Boar", 5,8, 2, 4);
var brownBearCub = new monster("Brown Bear Cub", 4, 8, 1, 2);
//Deep Forest
var grizzledBear = new monster("Grizzled Bear", 30, 40, 8, 12);
var direWolf = new monster("Dire Wolf", 25, 35, 10, 15);
var forestWight = new monster("Forest Wight", 40, 50, 14, 20);
var deepSpider = new monster("Deep Spider", 20, 30, 8, 12);
var ghostWolf = new monster("Ghost Wolf", 28, 38, 12, 18);
//Cave
var caveWorm = new monster("Cave Worm", 80, 100, 25, 35);
var troll = new monster("Troll", 100, 140, 40, 55);
var orc = new monster("Orc", 70, 90, 30, 40);
var goblin = new monster("Goblin", 60, 80, 35, 45);
var goblinRogue = new monster("Goblin Rogue", 65, 85, 40, 50);
//Crypt
var skeletonWarrior = new monster("SkeletonWarrior", 200, 300, 70, 90);
var skeletonMage = new monster("Skeleton Mage", 150, 250, 100, 120);
var ghoul = new monster("Ghoul", 300, 350, 65, 75);
var zombie = new monster("Zombie", 200, 250, 130, 150);
var banshee = new monster("Banshee", 125, 175, 110, 150);
//Hell
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
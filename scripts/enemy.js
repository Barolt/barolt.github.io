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

var greyWolf = new monster("Grey Wolf", 8, 12, 1, 3);
var brownBear = new monster("Brown Bear", 10, 16, 1, 4);
var wildBoar = new monster("Wild Boar", 5,8, 2, 4);
var brownBearCub = new monster("Brown Bear Cub", 4, 8, 1, 2);
var cthulu = new monster("Cthulu", 100000, 120000, 300, 500);
var diablo = new monster("Diablo", 130000, 150000, 400, 600);
var andariel = new monster("Andariel", 80000, 90000, 250, 350);

var mobList = [greyWolf, brownBear, wildBoar, brownBearCub, cthulu, diablo, andariel];

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
			mobRoll = (Math.floor(Math.random() * (6 - 4 + 1)) + 4);
			combat(mobList[mobRoll]);
		}
	};
}	

var forest = new zone("Forest", 1);
var hell = new zone("Hell", 2);
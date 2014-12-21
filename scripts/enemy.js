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

var forestMobList = ["greyWolf", "brownBear", "wildBoar", "brownBearCub"];
var hellMobList = ["cthulu", "diablo", "andariel"];

function zone(name, isUnlocked) {
	this.name = name;
	this.isUnlocked = isUnlocked;
	this.spawnMonster = function() {
		logCombat("");
		if (this.name = ("Forest")) {
			clearTimeout(combatTimer);
			clearTimeout(enemyTimer);
			mobCount = (forestMobList.length - 1);
			mobRoll = Math.floor((Math.random() * mobCount) + 1);
			switch (mobRoll) {
				case 0:
					combat(greyWolf);
					break;
				case 1:
					combat(brownBear);
					break;
				case 2:
					combat(wildBoar);
					break;
				case 3:
					combat(brownBearCub);
					break;
			}
		}
		if (this.name = ("Hell")) {
			clearTimeout(combatTimer);
			clearTimeout(enemyTimer);
			mobCount = (hellMobList.length - 1);
			mobRoll = Math.floor((Math.random() * mobCount) + 1);
			switch (mobRoll) {
				case 0:
					combat(cthulu);
					break;
				case 1:
					combat(diablo);
					break;
				case 2:
					combat(andariel);
					break;
			}
		}
	};
}	

var forest = new zone("Forest", 1);
var hell = new zone("Hell", 2);
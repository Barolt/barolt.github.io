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

var greyWolf = new monster("Grey Wolf", 4, 6, 1, 3);
var brownBear = new monster("Brown Bear", 8, 10, 1, 4);
var wildBoar = new monster("Wild Boar", 3, 5, 2, 4);
var brownBearCub = new monster("Brown Bear Cub", 2, 4, 1, 2);

var forestMobList = ["greyWolf", "brownBear", "wildBoar", "brownBearCub"];

function zone(name, isUnlocked) {
	this.name = name;
	this.isUnlocked = isUnlocked;
	this.spawnMonster = function() {
		logCombat("");
		if (this.name = ("Forest")) {
			clearTimeout(combatTimer);
			clearInterval(enemyTimer);
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
	};
}	

var forest = new zone("Forest", 1);

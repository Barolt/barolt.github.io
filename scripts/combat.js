// Variables for combat log, needs to be rewritten at some point
var combatlog1 = "";
var combatlog2 = "";
var combatlog3 = "";
var combatlog4 = "";
var combatlog5 = "";
var combatlog6 = "";
var combatlog7 = "";
var combatlog8 = "";
var combatlog9 = "";
var combatlog10 = "";

var hpRoll = 0;
var damage = 0;
var hitRoll = 0;
var critRoll = 0;
var skillRoll = 0;
var enemydamage = 0;

//Function for creating attributes
function attribute(name, level, exp, exptolevel) {
	this.name = name;
	this.level = level;
	this.exp = exp;
	this.exptolevel = exptolevel;
}

//Attributes for player
var strength = new attribute("Strength", 1, 0, 100);
var agility = new attribute("Agility", 1, 0, 100);
var dexterity = new attribute("Dexterity", 1, 0, 100);
var constitution = new attribute("Constitution", 1, 0, 100);
var intelligence = new attribute("Intelligence", 1, 0, 100);
var wisdom = new attribute("Wisdom", 1, 0, 100);
var cunning = new attribute("Cunning", 1, 0, 100);
var luck = new attribute("Luck", 1, 0, 100);

//Create player combat entity
var player = {
	maxhp: ((constitution.level * 2) + 10),
	currenthp: ((constitution.level * 2) + 10)
};

var enemy = {
	name: "enemy",
	currenthp: 0,
	maxhp: 0,
	mindmg: 0,
	maxdmg: 0,
	blockChance: 0,
	blockAmount: 0
}

//Function for creating skills
function skill(name, hitChance, minDamage, maxDamage, speed, damageType, critChance, critDamage) {
	this.name = name;
	this.hitChance = hitChance;
	this.minDamage = minDamage;
	this.maxDamage = maxDamage;
	this.speed = speed;
	this.damageType = damageType;
	this.critDamage = critDamage;
	this.critChance = critChance;
}

//Skills, need to be divided by attribute/progression and organized later on
var fireball = new skill("Fireball", 95, 1, 2, 2000, "fire", 25, 200);
var frostbolt = new skill("Frostbolt", 90, 1, 2, 1500, "frost", 20, 250);
var lightningBolt = new skill("Lightning Bolt", 80, 1, 2, 2500, "nature", 5, 500);
var slash = new skill("Slash", 100, 1, 2, 500, "physical", 40, 150);
var bash = new skill("Bash", 60, 1, 2, 4000, "physical", 10, 120);

function load() {
	document.getElementById("player_maxhp").textContent = player.maxhp;
	document.getElementById("player_currenthp").textContent = player.currenthp;
	document.getElementById("enemy_maxhp").textContent = combat.maxhp;
	document.getElementById("enemy_currenthp").textContent = combat.currenthp;
}

//Main combat function for determining skill in use, needs to be rolled into skill system later on
function combat(target) {
	enemy.name = target.name;
	hpRoll = (Math.floor(Math.random() * (target.maxhp - target.minhp + 1)) + target.minhp);
	enemy.currenthp = hpRoll;
	enemy.maxhp = hpRoll;
	enemy.mindmg = target.mindmg;
	enemy.maxdmg = target.maxdmg;
	enemy.blockChance = 0;
	enemy.blockAmount = 0;
	document.getElementById("enemy_name").textContent = enemy.name;
	document.getElementById("enemy_maxhp").textContent = enemy.maxhp;
	document.getElementById("enemy_currenthp").textContent = enemy.currenthp;
	player.currenthp = player.maxhp;
	document.getElementById("player_currenthp").textContent = player.currenthp;
	skills();
	enemyhit();
}

function enemyhit() {
	enemydamage = (Math.floor(Math.random() * (enemy.maxdmg - enemy.mindmg + 1)) + enemy.mindmg);
	player.currenthp = player.currenthp - enemydamage;
	logCombat(enemy.name + " hit you for " + enemydamage + ".");
	if (player.currenthp <= 0) {
		player.currenthp = 0;
		clearTimeout(combatTimer);
		clearTimeout(enemyTimer);
		logCombat("You have died.");
	}
	else {
		enemyTimer = setTimeout(enemyhit, 2000);
	}
	document.getElementById("player_currenthp").textContent = player.currenthp;
}

function skills() {
    skillRoll = Math.floor((Math.random() * 100) + 1);
		if (skillRoll <= 20) {
			hit(fireball);
		}
		else if (skillRoll <= 40) {
			hit(frostbolt);
		}
		else if (skillRoll <= 60) {
			hit(lightningBolt);
		}
		else if (skillRoll <= 80) {
			hit(slash);
		}
		else {
			hit(bash);
		}
}

//Combat resolution function, will pass result into enemy function for resolution of damage to enemy's hp later on.
function hit(skill) {
	combatTimer = setTimeout(skills, skill.speed);
	hitRoll = Math.floor((Math.random() * 100) + 1);
    if (hitRoll <= (100 - skill.hitChance)) {
		logCombat("Your " + skill.name + " missed.");
    }
	else {
		damage = (Math.floor(Math.random() * (skill.maxDamage - skill.minDamage + 1)) + skill.minDamage);
		critRoll = Math.floor((Math.random() * 100) + 1);
		if (critRoll <= (100 - skill.critChance)) {
			blockRoll = Math.floor((Math.random() * 100) + 1);
			if (blockRoll <= (100 - enemy.blockChance)) {
				logCombat("Your " + skill.name + " hit for " + damage + " " + skill.damageType + " damage.");
				resolveDamage(damage);
			}
			else {
				logCombat("Your " + skill.name + " hit for " + (damage - enemy.blockAmount) + " " + skill.damageType + " damage. (" + enemy.blockAmount + " blocked.)");
				resolveDamage((damage - enemy.blockAmount));
			}
		}
		else {
			damage = Math.floor(damage * (skill.critDamage/100));
			blockRoll = Math.floor((Math.random() * 100) + 1);
			if (blockRoll <= (100 - enemy.blockChance)) {
				logCombat("Your " + skill.name + " crit for " + damage + " " + skill.damageType + " damage.");
				resolveDamage(damage);
			}
			else {
				logCombat("Your " + skill.name + " crit for " + (damage - enemy.blockAmount) + " " + skill.damageType + " damage. (" + enemy.blockAmount + " blocked.)");
				resolveDamage((damage - enemy.blockAmount));
			}
		}
	}
	document.getElementById("player_currenthp").textContent = player.currenthp;
}

function resolveDamage(impact) {
	enemy.currenthp = (enemy.currenthp - impact);
	if (enemy.currenthp <= 0) {
		enemy.currenthp = 0;
		logCombat(enemy.name + " has died.");
		clearTimeout(combatTimer);
		clearTimeout(enemyTimer);
		forest.spawnMonster();
		document.getElementById("enemy_currenthp").textContent = enemy.currenthp;
	}
	else {
		document.getElementById("enemy_currenthp").textContent = enemy.currenthp;
	}
}

//Generates combat log, needs to be rewritten
function logCombat(lastevent) {
	combatlog1 = combatlog2;
	combatlog2 = combatlog3;
	combatlog3 = combatlog4;
	combatlog4 = combatlog5;
	combatlog5 = combatlog6;
	combatlog6 = combatlog7;
	combatlog7 = combatlog8;
	combatlog8 = combatlog9;
	combatlog9 = combatlog10;
	combatlog10 = lastevent;
	document.getElementById("combat_log").innerHTML = combatlog1 + "<br />" + combatlog2 +  "<br />" + combatlog3 +  "<br />" + combatlog4 +  "<br />" + combatlog5 +  "<br />" + combatlog6 +  "<br />" + combatlog7 +  "<br />" + combatlog8 +  "<br />" + combatlog9 +  "<br />" + combatlog10;
}




















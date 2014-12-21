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
var combatlog11 = "";
var combatlog12 = "";
var combatlog13 = "";
var combatlog14 = "";
var combatlog15 = "";
var combatlog16 = "";
var combatlog17 = "";
var combatlog18 = "";
var combatlog19 = "";
var combatlog20 = "";

var hpRoll = 0;
var skillRoll = 0;
var enemydamage = 0;
var currentzone = null;

//Create player combat entity
var player = {
	maxhp: ((constitution.level * 2) + 10),
	currenthp: ((constitution.level * 2) + 10),
	dodgeChance: (Math.floor(50 + (agility.level / 8) + (dodge.level / 4)) / 10),
	parryChance: (Math.floor(50 + (strength.level / 8) + (parry.level / 4)) / 10),
	currentweapon: axe,
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

function updateAttributes() {
	document.getElementById("strength").innerHTML = strength.level + " Strength </br>" + strength.exp + "/" + strength.exptolevel;
	document.getElementById("agility").innerHTML = agility.level + " Agility </br>" + agility.exp + "/" + agility.exptolevel;
	document.getElementById("dexterity").innerHTML = dexterity.level + " Dexterity </br>" + dexterity.exp + "/" + dexterity.exptolevel;
	document.getElementById("constitution").innerHTML = constitution.level + " Constitution </br>" + constitution.exp + "/" + constitution.exptolevel;
	document.getElementById("intelligence").innerHTML = intelligence.level + " Intelligence </br>" + intelligence.exp + "/" + intelligence.exptolevel;
	document.getElementById("wisdom").innerHTML = wisdom.level + " Wisdom </br>" + wisdom.exp + "/" + wisdom.exptolevel;
	document.getElementById("cunning").innerHTML = cunning.level + " Cunning </br>" + cunning.exp + "/" + cunning.exptolevel;
	document.getElementById("luck").innerHTML = luck.level + " Luck </br>" + luck.exp + "/" + luck.exptolevel;
	document.getElementById("axe").innerHTML = axe.level + " Axe </br>" + axe.exp + "/" + axe.exptolevel;
	document.getElementById("bow").innerHTML = bow.level + " Bow </br>" + bow.exp + "/" + bow.exptolevel;
	document.getElementById("sword").innerHTML = sword.level + " Sword </br>" + sword.exp + "/" + sword.exptolevel;
	document.getElementById("staff").innerHTML = staff.level + " Staff </br>" + staff.exp + "/" + staff.exptolevel;
	document.getElementById("mace").innerHTML = mace.level + " Mace </br>" + mace.exp + "/" + mace.exptolevel;
	document.getElementById("dagger").innerHTML = dagger.level + " Dagger </br>" + dagger.exp + "/" + dagger.exptolevel;
	document.getElementById("dodge").innerHTML = dodge.level + " Dodge </br>" + dodge.exp + "/" + dodge.exptolevel;
	document.getElementById("parry").innerHTML = parry.level + " Parry </br>" + parry.exp + "/" + parry.exptolevel;
	document.getElementById("combat_stats").innerHTML = player.currentweapon.hitChance + "% Hit Chance</br>" + player.currentweapon.critChance + "% Crit Chance</br>" + player.currentweapon.minDamage + " - " + player.currentweapon.maxDamage + " damage</br>";
}

function updateSecondarystats() {
	player.maxhp = ((constitution.level * 2) + 10);
	player.currenthp = ((constitution.level * 2) + 10);
	player.dodgeChance = (Math.floor(50 + (agility.level / 8) + (dodge.level / 4)) / 10);
	if (player.dodgeChance >= 45) {
		player.dodgeChance = 45;
	}
	player.parryChance = (Math.floor(50 + (strength.level / 8) + (parry.level / 4)) / 10);
	if (player.parryChance >= 45) {
		player.parryChance = 45;
	}
	document.getElementById("avoidance").innerHTML = player.dodgeChance + "% Dodge Chance</br>" + player.parryChance + "% Parry Chance</br>";
	document.getElementById("player_currenthp").textContent = player.currenthp;
	document.getElementById("player_maxhp").textContent = player.maxhp;
}

function load() {
	document.getElementById("player_maxhp").textContent = player.maxhp;
	document.getElementById("player_currenthp").textContent = player.currenthp;
	document.getElementById("enemy_maxhp").textContent = combat.maxhp;
	document.getElementById("enemy_currenthp").textContent = combat.currenthp;
	updateAttributes();
	updateSecondarystats();
}

function enemyhit() {
	ehitRoll = (Math.floor((Math.random() * 1000) +10) / 10);
	if (ehitRoll >= 100 - player.dodgeChance) {
		logCombat("<font color=orange>You dodged " + enemy.name + "'s attack.</font>");
		dodge.gainexp();
	}
	else if (ehitRoll >= 100 - (player.dodgeChance + player.parryChance)) {
		logCombat("<font color=orange>You parried " + enemy.name + "'s attack.</font>");
		parry.gainexp();
	}
	else {
		constitution.gainexp();
		enemydamage = (Math.floor(Math.random() * (enemy.maxdmg - enemy.mindmg + 1)) + enemy.mindmg);
		player.currenthp = player.currenthp - enemydamage;
		logCombat("<font color=blue>" + enemy.name + " hit you for " + enemydamage + ".</font>");
		if (player.currenthp <= 0) {
			player.currenthp = 0;
			clearInterval(combatTimer);
			clearInterval(enemyTimer);
			logCombat("<font color=red>You have died.</font>");
			setTimeout(currentzone.spawnMonster(currentzone), 5000);
		}
	}
	document.getElementById("player_currenthp").textContent = player.currenthp;
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
	enemyTimer = setInterval(enemyhit, 2000);
	combatTimer = setInterval(player.currentweapon.hit, player.currentweapon.speed);
}

function resolveDamage(impact) {
	enemy.currenthp = (enemy.currenthp - impact);
	if (enemy.currenthp <= 0) {
		enemy.currenthp = 0;
		logCombat("<font color=red>" + enemy.name + " has died.</font>");
		clearInterval(combatTimer);
		clearInterval(enemyTimer);
		currentzone.spawnMonster(currentzone);
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
	combatlog10 = combatlog11;
	combatlog11 = combatlog12;
	combatlog12 = combatlog13;
	combatlog13 = combatlog14;
	combatlog14 = combatlog15;
	combatlog15 = combatlog16;
	combatlog16 = combatlog17;
	combatlog17 = combatlog18;
	combatlog18 = combatlog19;
	combatlog19 = combatlog20;
	combatlog20 = lastevent;
	document.getElementById("combat_log").innerHTML = combatlog1 + "<br />" + combatlog2 +  "<br />" + combatlog3 +  "<br />" + combatlog4 +  "<br />" + combatlog5 +  "<br />" + combatlog6 +  "<br />" + combatlog7 +  "<br />" + combatlog8 +  "<br />" + combatlog9 +  "<br />" + combatlog10 + "<br />" + combatlog11 + "<br />" + combatlog12 + "<br />" + combatlog13 + "<br />" + combatlog14 + "<br />" + combatlog15 + "<br />" + combatlog16 + "<br />" + combatlog17 + "<br />" + combatlog18 + "<br />" + combatlog19 + "<br />" + combatlog20;
}




















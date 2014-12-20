var damage = 0;
var hitRoll = 0;
var critRoll = 0;
var combatTimer = 0;
var enemyTimer = 0;

//Function for creating attributes
function attribute(name, level, exp, exptolevel) {
	this.name = name;
	this.level = level;
	this.exp = exp;
	this.exptolevel = exptolevel;
	this.gainexp = function() {
		this.exp++;
		if (this.exp >= this.exptolevel) {
			this.exp = 0;
			this.exptolevel = (Math.floor(this.exptolevel + this.level * 1.20));
			this.level++;
			equip(player.currentweapon);
			updateAttributes();
		}
	}
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

function equip(weapon) {
	if (player.currentweapon != weapon) {
		clearTimeout(combatTimer);
		clearInterval(enemyTimer);
	}
	player.currentweapon = weapon;
	weapon.hitChance = (80 + (Math.floor(weapon.attrib.level / 100)) + (Math.floor(weapon.level / 100)));
	weapon.critChance = (5 + (Math.floor(weapon.attrib.level / 100)) + (Math.floor(weapon.level / 50)));
	if (weapon.critChance >= 100) {
		weapon.critChance = 100;
	}
	weapon.minDamage = Math.floor((1 + (weapon.attrib.level / 10) + (weapon.level / 4)) * (weapon.speed / 1000));
	weapon.maxDamage = Math.floor((2 + (weapon.attrib.level / 5) + (weapon.level / 2)) * (weapon.speed / 1000));
	updateAttributes();
}
	
//Function for creating weapon skills
function wskill(name, attrib, speed, level, exp, exptolevel) {
	this.name = name;
	this.attrib = attrib;
	this.speed = speed;
	this.level = level;
	this.exp = exp;
	this.exptolevel = exptolevel;
	this.hitChance = (80 + (Math.floor(this.attrib.level / 100)) + (Math.floor(this.level / 100)));
	this.critChance = (5 + (Math.floor(this.attrib.level / 100)) + (Math.floor(this.level / 50)));
	this.minDamage = Math.floor((1 + (this.attrib.level / 10) + (this.level / 4)) * (this.speed / 1000));
	this.maxDamage = Math.floor((2 + (this.attrib.level / 5) + (this.level / 2)) * (this.speed / 1000));
	this.gainexp = function() {
		this.exp++;
		if (this.exp >= this.exptolevel) {
			this.exp = 0;
			this.exptolevel = (Math.floor(this.exptolevel + this.level * 1.15));
			this.level++;
			equip(player.currentweapon);
			updateAttributes();
		}
	}
	this.hit = function() {
		combatTimer = setTimeout(player.currentweapon.hit, player.currentweapon.speed);
		hitRoll = Math.floor((Math.random() * 100) + 1);
		critRoll = Math.floor((Math.random() * 100) + 1);
		if (hitRoll <= (100 - player.currentweapon.hitChance)) {
			logCombat("Your " + player.currentweapon.name + " missed.");
		}
		else {
			player.currentweapon.attrib.gainexp();
			player.currentweapon.gainexp();
			damage = (Math.floor(Math.random() * (player.currentweapon.maxDamage - player.currentweapon.minDamage + 1)) + player.currentweapon.minDamage);
			if (critRoll <= (100 - player.currentweapon.critChance)) {
				blockRoll = Math.floor((Math.random() * 100) + 1);
				if (blockRoll <= (100 - enemy.blockChance)) {
					logCombat("Your " + player.currentweapon.name + " hit for " + damage + " damage.");
					resolveDamage(damage);
				}
				else {
					logCombat("Your " + player.currentweapon.name + " hit for " + (damage - enemy.blockAmount) + " damage. (" + enemy.blockAmount + " blocked.)");
					resolveDamage((damage - enemy.blockAmount));
				}
			}
			else {
				damage = (damage * 2);
				blockRoll = Math.floor((Math.random() * 100) + 1);
				if (blockRoll <= (100 - enemy.blockChance)) {
					logCombat("Your " + player.currentweapon.name + " crit for " + damage + " damage.");
					resolveDamage(damage);
				}
				else {
					logCombat("Your " + player.currentweapon.name + " crit for " + (damage - enemy.blockAmount) + " damage. (" + enemy.blockAmount + " blocked.)");
					resolveDamage((damage - enemy.blockAmount));
				}
			}
		}
		document.getElementById("player_currenthp").textContent = player.currenthp;
		updateAttributes();
	};
}

var axe = new wskill("Axe", strength, 2300, 1, 0, 100);
var sword = new wskill("Sword", dexterity, 1500, 1, 0, 100);
var bow = new wskill("Bow", agility, 3000, 1, 0 ,100);
var staff = new wskill("Staff", intelligence, 2800, 1, 0, 100);
var mace = new wskill("Mace", wisdom, 2000, 1, 0, 100);
var dagger = new wskill("Dagger", cunning, 1000, 1, 0, 100);

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
var fireball = new skill("Fireball", 95, 1, 3, 2000, "fire", 25, 200);
var frostbolt = new skill("Frostbolt", 90, 1, 3, 1500, "frost", 20, 250);
var lightningBolt = new skill("Lightning Bolt", 80, 1, 3, 2500, "nature", 5, 500);
var slash = new skill("Slash", 100, 1, 3, 500, "physical", 40, 150);
var bash = new skill("Bash", 60, 1, 3, 4000, "physical", 10, 120);

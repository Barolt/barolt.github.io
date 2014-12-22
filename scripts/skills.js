var damage = 0;
var ehitRoll = 0;
var hitRoll = 0;
var critRoll = 0;
var procRoll = 0;
var combatTimer = 0;
var enemyTimer = 0;
var stunTime = 0;
var stunTimer = 0;
var dodgeBuff = 0;

//Function for creating attributes
function attribute(name, level, exp, exptolevel) {
	this.name = name;
	this.level = level;
	this.exp = exp;
	this.exptolevel = exptolevel;
	this.gainexp = function() {
		this.exp += currentzone.id;
		if (this.exp >= this.exptolevel) {
			this.exp = 0;
			this.exptolevel = (Math.floor(this.exptolevel + this.level * 2.10));
			this.level++;
			equip(player.currentweapon);
			maxhp: ((constitution.level * 2) + 10);
			currenthp: ((constitution.level * 2) + 10);
			updateSecondarystats();
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
		clearTimeout(enemyTimer);
	}
	player.currentweapon = weapon;
	weapon.hitChance = (80 + (Math.floor(weapon.attrib.level / 100)) + (Math.floor(weapon.level / 100)));
	if (weapon.hitChance >= 100) {
		weapon.hitChance = 100;
	}
	weapon.critChance = ((50 + (Math.floor(luck.level / 3)) + (Math.floor(weapon.level / 50))) /10);
	if (weapon.critChance >= 65) {
		weapon.critChance = 65;
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
	this.critChance = ((50 + (Math.floor(luck.level / 3)) + (Math.floor(this.level / 5))) / 10);
	this.minDamage = Math.floor((1 + (this.attrib.level / 10) + (this.level / 4)) * (this.speed / 1000));
	this.maxDamage = Math.floor((2 + (this.attrib.level / 5) + (this.level / 2)) * (this.speed / 1000));
	this.gainexp = function() {
		this.exp += currentzone.id;
		if (this.exp >= this.exptolevel) {
			this.exp = 0;
			this.exptolevel = (Math.floor(this.exptolevel + this.level * 1.60));
			this.level++;
			equip(player.currentweapon);
			updateAttributes();
		}
	}
	this.hit = function() {
		if (player.currenthp > 0) {
			hitRoll = Math.floor((Math.random() * 100) + 1);
			critRoll = (Math.floor((Math.random() * 1000) +10) / 10);
			if (hitRoll <= (100 - player.currentweapon.hitChance)) {
				logCombat("Your " + player.currentweapon.name + " missed.");
			}
			else {
				player.currentweapon.attrib.gainexp();
				player.currentweapon.gainexp();
				damage = (Math.floor(Math.random() * (player.currentweapon.maxDamage - player.currentweapon.minDamage + 1)) + player.currentweapon.minDamage);
				if (critRoll <= (100 - player.currentweapon.critChance)) {
					logCombat("<font color=green>Your " + player.currentweapon.name + " hit for " + damage + " damage.</font>");
					resolveDamage(damage);
				}
				else {
					luck.gainexp();
					damage = (damage * 2);
					logCombat("<font color=green>Your " + player.currentweapon.name + " crit for " + damage + " damage.</font>");
					resolveDamage(damage);
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

//Function for creating passive skills
function passive(name, attrib, isUnlocked, leveltoUnlock, level, exp, exptolevel) {
	this.name = name;
	this.attrib = attrib;
	this.isUnlocked = isUnlocked;
	this.leveltoUnlock = leveltoUnlock;
	this.level = level;
	this.exp = exp;
	this.exptolevel = exptolevel;
	this.gainexp = function() {
		this.attrib.gainexp();
		this.exp += currentzone.id;
		if (this.exp >= this.exptolevel) {
			this.exp = 0;
			this.exptolevel = (Math.floor(this.exptolevel + this.level * 1.80));
			this.level++;
			updateSecondarystats();
			updateAttributes();
		};
	};
}

var dodge = new passive("Dodge", agility, 1, 0, 1, 0, 100);
var parry = new passive("Parry", strength, 1, 0, 1, 0, 100);
var stagger = new passive("Stagger", strength, 0, 15, 1, 0, 100);
var windfury = new passive("Windfury", agility, 0, 15, 1, 0, 100);
var riposte = new passive("Riposte", dexterity, 0, 15, 1, 0, 100);
var regen = new passive("Regeneration", constitution, 0, 15, 1, 0, 100);
var phaseShift = new passive("Phase Shift", intelligence, 0, 15, 1, 0, 100);
var sealLight = new passive("Seal of Light", wisdom, 0, 15, 1, 0, 100);
var dPoison = new passive("Deadlypoison", cunning, 0, 15, 1, 0, 100);

//Function for creating skills
function skill(name, attrib, weapon, isUnlocked, leveltoUnlock, level, exp, exptolevel, damageFactor) {
	this.name = name;
	this.attrib = attrib;
	this.weapon = weapon;
	this.isUnlocked = isUnlocked;
	this.leveltoUnlock = leveltoUnlock;
	this.level = level;
	this.exp = exp;
	this.exptolevel = exptolevel;
	this.damageFactor = damageFactor;
	this.minDamage = Math.floor((1 + (this.attrib.level / 10) + (this.level / 4) + (this.weapon.level / 10)) * (this.damageFactor) * (this.weapon.speed / 1000));
	this.maxDamage = Math.floor((2 + (this.attrib.level / 5) + (this.level / 2) + (this.weapon.level / 5)) * (this.damageFactor) * (this.weapon.speed / 1000));
	this.gainexp = function() {
		this.weapon.gainexp();
		this.attrib.gainexp();
		this.exp += currentzone.id;
		if (this.exp >= this.exptolevel) {
			this.exp = 0;
			this.exptolevel = (Math.floor(this.exptolevel + this.level * 1.80));
			this.level++;
			updateSecondarystats();
			updateAttributes();
		}
	};
	this.updateSkill = function() {
		this.minDamage = Math.floor((1 + (this.attrib.level / 10) + (this.level / 4) + (this.weapon.level / 4)) * (this.damageFactor) * (this.weapon.speed / 1000));
		this.maxDamage = Math.floor((2 + (this.attrib.level / 5) + (this.level / 2) + (this.weapon.level / 2)) * (this.damageFactor) * (this.weapon.speed / 1000));
	};
	this.hit = function(activeskill) {
		player.currentskill = activeskill;
		if (player.currenthp > 0) {
			hitRoll = Math.floor((Math.random() * 100) + 1);
			critRoll = (Math.floor((Math.random() * 1000) +10) / 10);
			if (hitRoll <= (100 - player.currentweapon.hitChance)) {
				logCombat("Your " + player.currentskill.name + " missed.");
			}
			else {
				switch(activeskill) {
					case stunningBlow:
						player.currentskill.updateSkill();
						player.currentskill.gainexp();
						damage = (Math.floor(Math.random() * (player.currentskill.maxDamage - player.currentskill.minDamage + 1)) + player.currentskill.minDamage);
						if (critRoll <= (100 - player.currentweapon.critChance)) {
							logCombat("<font color=green>Your " + player.currentskill.name + " hit for " + damage + " damage.</font>");
							resolveDamage(damage);
						}
						else {
							luck.gainexp();
							damage = (damage * 2);
							logCombat("<font color=green>Your " + player.currentskill.name + " crit for " + damage + " damage.</font>");
							resolveDamage(damage);
						}	
						clearInterval(enemyTimer);
						stunTime = (Math.floor((player.currentskill.level / 100) + 1) * 1000);
						stunEnemy(stunTime);
						logCombat("<font color=purple>You stunned " + enemy.name + ".");
						break;
					case doubleShot:
						player.currentskill.updateSkill();
						player.currentskill.attrib.gainexp();
						player.currentskill.gainexp();
						damage = (Math.floor(Math.random() * (player.currentskill.maxDamage - player.currentskill.minDamage + 1)) + player.currentskill.minDamage);
						if (critRoll <= (100 - player.currentweapon.critChance)) {
							logCombat("<font color=green>Your " + player.currentskill.name + " hit for " + damage + " damage.</font>");
							resolveDamage(damage);
						}
						else {
							luck.gainexp();
							damage = (damage * 2);
							logCombat("<font color=green>Your " + player.currentskill.name + " crit for " + damage + " damage.</font>");
							resolveDamage(damage);
						}	
						hitRoll = Math.floor((Math.random() * 100) + 1);
						critRoll = (Math.floor((Math.random() * 1000) +10) / 10);
						if (hitRoll <= (100 - player.currentweapon.hitChance)) {
							logCombat("Your " + player.currentskill.name + " missed.");
						}
						else if (critRoll <= (100 - player.currentweapon.critChance)) {
							logCombat("<font color=green>Your " + player.currentskill.name + " hit for " + damage + " damage.</font>");
							resolveDamage(damage);
						}
						else {
							luck.gainexp();
							damage = (damage * 2);
							logCombat("<font color=green>Your " + player.currentskill.name + " crit for " + damage + " damage.</font>");
							resolveDamage(damage);
						}
						break;
					case evasiveStrike:
						player.currentskill.updateSkill();
						player.currentskill.attrib.gainexp();
						player.currentskill.gainexp();
						damage = (Math.floor(Math.random() * (player.currentskill.maxDamage - player.currentskill.minDamage + 1)) + player.currentskill.minDamage);
						if (critRoll <= (100 - player.currentweapon.critChance)) {
							logCombat("<font color=green>Your " + player.currentskill.name + " hit for " + damage + " damage.</font>");
							resolveDamage(damage);
						}
						else {
							luck.gainexp();
							damage = (damage * 2);
							logCombat("<font color=green>Your " + player.currentskill.name + " crit for " + damage + " damage.</font>");
							resolveDamage(damage);
						}	
						dodgeBuff += (3 + Math.floor((player.currentskill.level / 50) + (player.currentskill.attrib.level / 100)));
						if (dodgeBuff > 15) {
							dodgeBuff = 15;
						}
						setTimeout((dodgebuff = 0), 5000);
						updateSecondarystats();
						break;
					case fireball:
						player.currentskill.updateSkill();
						player.currentskill.attrib.gainexp();
						player.currentskill.gainexp();
						damage = (Math.floor(Math.random() * (player.currentskill.maxDamage - player.currentskill.minDamage + 1)) + player.currentskill.minDamage);
						if (critRoll <= (100 - player.currentweapon.critChance)) {
							logCombat("<font color=green>Your " + player.currentskill.name + " hit for " + damage + " damage.</font>");
							resolveDamage(damage);
						}
						else {
							luck.gainexp();
							damage = (damage * 2);
							logCombat("<font color=green>Your " + player.currentskill.name + " crit for " + damage + " damage.</font>");
							resolveDamage(damage);
						}
						break;
					case smite:
						player.currentskill.updateSkill();
						player.currentskill.attrib.gainexp();
						player.currentskill.gainexp();
						damage = (Math.floor(Math.random() * (player.currentskill.maxDamage - player.currentskill.minDamage + 1)) + player.currentskill.minDamage);
						if (critRoll <= (100 - player.currentweapon.critChance)) {
							logCombat("<font color=green>Your " + player.currentskill.name + " hit for " + damage + " damage.</font>");
							resolveDamage(damage);
						}
						else {
							luck.gainexp();
							damage = (damage * 2);
							logCombat("<font color=green>Your " + player.currentskill.name + " crit for " + damage + " damage.</font>");
							resolveDamage(damage);
						}
						break;
					case backstab:
						player.currentskill.updateSkill();
						player.currentskill.attrib.gainexp();
						player.currentskill.gainexp();
						damage = (Math.floor(Math.random() * (player.currentskill.maxDamage - player.currentskill.minDamage + 1)) + player.currentskill.minDamage);
						if (critRoll <= (100 - player.currentweapon.critChance)) {
							logCombat("<font color=green>Your " + player.currentskill.name + " hit for " + damage + " damage.</font>");
							resolveDamage(damage);
						}
						else {
							luck.gainexp();
							damage = (damage * 2);
							logCombat("<font color=green>Your " + player.currentskill.name + " crit for " + damage + " damage.</font>");
							resolveDamage(damage);
						}
						break;
				}
			document.getElementById("player_currenthp").textContent = player.currenthp;
			updateAttributes();
			}
		}
	};
}

//Skills, need to be divided by attribute/progression and organized later on(name, attrib, weapon, isUnlocked, leveltoUnlock, level, exp, exptolevel, minDamageFactor, maxDamageFactor)
var stunningBlow = new skill("Stunning Blow", strength, axe, 0, 10, 1, 0, 100, 1.2);
var doubleShot = new skill("Double Shot", agility, bow, 0, 10, 1, 0, 100, 1.2);
var evasiveStrike = new skill("Evasive Strike", dexterity, sword, 0, 10, 1, 0, 100, 1.2);
var fireball = new skill("Fireball", intelligence, staff, 0, 10, 1, 0, 100, 2.5);
var smite = new skill("Smite", wisdom, mace, 0, 10, 1, 0, 100, 1.6);
var backstab = new skill("Backstab", cunning, dagger, 0, 10, 1, 0, 100, 1.2);
const bcworkshop = new require("bcworkshop");

const passive = new bcworkshop.Passive("Passive", function check(acted, victim, message){
    return false;
  }, function passed(acted, victim, message){
    victim.hp = victim.hp - 28;
    let embed = new Discord.MessageEmbed()
    .setTitle(`Uh oh, [${acted.username}] ${acted.bey.bbname || acted.bey.name} tried to use it's passive ability but it was not set up properly. 28 damage dealt.`)
    .setDescription("Please report this at the support server.")
    .setColor("#551a8b");
    message.channel.createMessage({embed: embed});
  }, 180);

const special = new bcworkshop.Special("Special", function req(acted, victim, logger){return acted.sp > 3}, function special(acted, victim, message){
    
    
    let before = victim.hp;
    let base = 40;
    let plus = 0;
    for(var i = 0; i < acted.lvl; i++){
       plus = plus + 0.2; 
	   //+0.1 every level which means 1 more damage every 10 levels
    }
    let dmg = base + plus;
    victim.hp = victim.hp - dmg;
    let after = victim.hp;
    let diff = before - after;
	
	//Change "victim.hp = victim.hp - 123" to "victim.hp = victim.hp - <damage number>. This and the line below can be removed if the special move does not deal any damage.
	acted.stamina = acted.stamina - 2;
	victim.atk = Math.round((victim.atk/100)*75);
    //For more options check the README.md
    
    //Make sure to change the "Name", "Special Name" and damage dealt below.
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Kerbeus used **Chain Defense**.`)
	.setDescription(`Kerbeus utilized the centralized weight distribution of it's Central disc, increasing it's spin velocity as a method of improving it's damage resistance, along with the tabs on it's Defense driver to reduce damage by 25% at the cost of 2 stamina. Kerbeus retaliated by using the chain on it's layer to shred into the opponent for ${diff} damage`)
    .setColor("#551a8b");
    
    message.channel.createMessage({embed: embed});
  });

const Kerbeus = new bcworkshop.Beyblade({name: "Kerbeus", type: "Defense", imageLink: "https://i.ibb.co/Q8p0yvz/kerbeus.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = Kerbeus;
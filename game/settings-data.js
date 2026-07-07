// ── DATA ──
const SETTINGS = [
  {
    id:'fantasy',
    meta:{name:'Sword & Sorcery',description:'Ancient magic stirs. Kingdoms rise and fall by blade and spell. Your bloodline may decide the fate of the realm.',author:'official',locked:false},
    icon:'⚔️',
    tags:['Warriors','Magic','Kingdoms'],
    classes:[
      {id:'warrior',name:'Warrior',description:'Masters of physical combat and battlefield tactics.',attribute_contribution:{physical:8,mental:3,supernatural:1}},
      {id:'mage',name:'Mage',description:'Wielders of arcane power and ancient knowledge.',attribute_contribution:{physical:2,mental:5,supernatural:8}},
      {id:'rogue',name:'Rogue',description:'Cunning survivors who blend skill and shadow.',attribute_contribution:{physical:5,mental:6,supernatural:2}}
    ],
    species:[
      {id:'human',name:'Human',description:'Adaptable and resilient, humans excel in all paths.',attribute_contribution:{physical:3,mental:4,supernatural:2}},
      {id:'elf',name:'Elf',description:'Ancient and graceful, elves channel natural magic.',attribute_contribution:{physical:2,mental:3,supernatural:6}},
      {id:'dwarf',name:'Dwarf',description:'Stout and stubborn, dwarves endure where others fall.',attribute_contribution:{physical:6,mental:3,supernatural:1}}
    ],
    flavors:{
      warrior_human:"You move like a force of nature — where others hesitate, you act. The battlefield is your home and your body is your weapon.",
      warrior_elf:"Beneath your elegance lies iron resolve. You fight with a grace that deceives your enemies until it is far too late.",
      warrior_dwarf:"You are unmovable. Your ancestors carved mountains with their bare hands, and their stubborn blood runs hot in your veins.",
      mage_human:"Your hunger for knowledge is matched only by your adaptability. You bend every discipline to your will.",
      mage_elf:"Magic is not something you learned — it is something you remembered. The arcane feels like a mother tongue.",
      mage_dwarf:"Where others see mysticism, you see engineering. Your magic is precise, methodical, and terrifyingly effective.",
      rogue_human:"You read people like open books. Every room you enter has three exits — you found them before you sat down.",
      rogue_elf:"You move through the world like smoke. Patient, silent, present only when you choose to be.",
      rogue_dwarf:"You are the one they never see coming. Nobody suspects the dwarf. That is exactly how you like it."
    },
    questions:[
      {id:'q1',axis:'both',prompt:'A stranger collapses before you clutching a stolen artifact. What do you do?',answers:[
        {id:'a1',text:'Rush to their aid immediately.',weights:{class:{warrior:3,mage:1,rogue:2},species:{human:4,elf:2,dwarf:1}}},
        {id:'a2',text:'Examine the artifact first.',weights:{class:{warrior:0,mage:5,rogue:3},species:{human:1,elf:4,dwarf:2}}},
        {id:'a3',text:'Scan the area for who is chasing them.',weights:{class:{warrior:2,mage:2,rogue:5},species:{human:2,elf:3,dwarf:3}}}
      ]},
      {id:'q2',axis:'class',prompt:'Your party faces a locked door to the enemy stronghold. Your approach?',answers:[
        {id:'a1',text:'Kick it down.',weights:{class:{warrior:5,mage:1,rogue:0},species:{human:2,elf:1,dwarf:3}}},
        {id:'a2',text:'Decipher the runic seal on it.',weights:{class:{warrior:0,mage:5,rogue:2},species:{human:2,elf:4,dwarf:1}}},
        {id:'a3',text:'Find a hidden side entrance.',weights:{class:{warrior:1,mage:2,rogue:5},species:{human:3,elf:2,dwarf:1}}}
      ]},
      {id:'q3',axis:'species',prompt:'You discover an ancient shrine deep in the forest. What draws your attention first?',answers:[
        {id:'a1',text:'The craftsmanship of the stonework.',weights:{class:{warrior:3,mage:2,rogue:2},species:{human:4,elf:1,dwarf:5}}},
        {id:'a2',text:'The faint magical aura emanating from the altar.',weights:{class:{warrior:1,mage:5,rogue:2},species:{human:1,elf:5,dwarf:1}}},
        {id:'a3',text:'The offerings left by those who came before.',weights:{class:{warrior:2,mage:3,rogue:3},species:{human:3,elf:3,dwarf:3}}}
      ]},
      {id:'q4',axis:'class',prompt:'A warlord offers you wealth to fight in his army. You respond:',answers:[
        {id:'a1',text:'Accept — you were born for battle.',weights:{class:{warrior:5,mage:1,rogue:1},species:{human:3,elf:2,dwarf:3}}},
        {id:'a2',text:'Decline — but offer to advise him on strategy for a price.',weights:{class:{warrior:1,mage:4,rogue:3},species:{human:3,elf:3,dwarf:2}}},
        {id:'a3',text:'Accept — then spend a week learning his secrets before disappearing.',weights:{class:{warrior:0,mage:2,rogue:5},species:{human:3,elf:3,dwarf:1}}}
      ]},
      {id:'q5',axis:'species',prompt:'Your village is suffering a harsh winter. How do you help?',answers:[
        {id:'a1',text:'Organize hunting parties and fortify shelters.',weights:{class:{warrior:4,mage:1,rogue:2},species:{human:4,elf:1,dwarf:5}}},
        {id:'a2',text:'Commune with the land to find where game has gone.',weights:{class:{warrior:1,mage:5,rogue:1},species:{human:1,elf:5,dwarf:1}}},
        {id:'a3',text:'Ration what remains and keep morale alive.',weights:{class:{warrior:2,mage:3,rogue:3},species:{human:5,elf:2,dwarf:2}}}
      ]},
      {id:'q6',axis:'class',prompt:'You are captured and thrown in a dungeon. Your escape plan:',answers:[
        {id:'a1',text:'Wait for the guards to get close, then overpower them.',weights:{class:{warrior:5,mage:1,rogue:2},species:{human:3,elf:2,dwarf:3}}},
        {id:'a2',text:'Study the cell for weaknesses — there is always a flaw.',weights:{class:{warrior:1,mage:5,rogue:3},species:{human:3,elf:3,dwarf:2}}},
        {id:'a3',text:'You already loosened the window bars on day one.',weights:{class:{warrior:0,mage:2,rogue:5},species:{human:3,elf:3,dwarf:1}}}
      ]},
      {id:'q7',axis:'both',prompt:'A dying elder presses a sealed letter into your hand. What do you do?',answers:[
        {id:'a1',text:'Deliver it unopened — her wishes deserve respect.',weights:{class:{warrior:3,mage:1,rogue:1},species:{human:4,elf:3,dwarf:4}}},
        {id:'a2',text:'Read it — knowledge of what you carry protects you.',weights:{class:{warrior:1,mage:5,rogue:2},species:{human:2,elf:4,dwarf:1}}},
        {id:'a3',text:'Deliver it, but make a copy first.',weights:{class:{warrior:0,mage:3,rogue:5},species:{human:2,elf:2,dwarf:2}}}
      ]},
      {id:'q8',axis:'species',prompt:'You are lost in an enchanted forest that shifts around you. You:',answers:[
        {id:'a1',text:'Mark the trees and build a mental map systematically.',weights:{class:{warrior:3,mage:2,rogue:3},species:{human:3,elf:1,dwarf:5}}},
        {id:'a2',text:'Quiet your mind and listen to what the forest wants.',weights:{class:{warrior:1,mage:5,rogue:1},species:{human:1,elf:5,dwarf:0}}},
        {id:'a3',text:'Find high ground and look for landmarks.',weights:{class:{warrior:4,mage:2,rogue:3},species:{human:4,elf:2,dwarf:4}}}
      ]},
      {id:'q9',axis:'class',prompt:'A rival has publicly humiliated you at court. Your response:',answers:[
        {id:'a1',text:'Challenge them to single combat immediately.',weights:{class:{warrior:5,mage:1,rogue:1},species:{human:3,elf:2,dwarf:4}}},
        {id:'a2',text:'Say nothing — and begin researching their weaknesses.',weights:{class:{warrior:1,mage:5,rogue:2},species:{human:3,elf:3,dwarf:2}}},
        {id:'a3',text:'Smile, walk away, and ruin them quietly over the following month.',weights:{class:{warrior:0,mage:2,rogue:5},species:{human:3,elf:3,dwarf:1}}}
      ]},
      {id:'q10',axis:'species',prompt:'What does home mean to you?',answers:[
        {id:'a1',text:'The people you would bleed for.',weights:{class:{warrior:4,mage:2,rogue:2},species:{human:5,elf:2,dwarf:3}}},
        {id:'a2',text:'The old places that remember what the world once was.',weights:{class:{warrior:2,mage:4,rogue:2},species:{human:1,elf:5,dwarf:2}}},
        {id:'a3',text:'The halls your ancestors carved with their own hands.',weights:{class:{warrior:3,mage:2,rogue:2},species:{human:2,elf:1,dwarf:5}}}
      ]}
    ]
  },
  {
    id:'scifi',
    meta:{name:'Sci-Fi',description:'The galaxy is vast, indifferent, and dangerous. Corporations rule, stars are conquered, and your DNA may be your destiny.',author:'official',locked:true},
    icon:'🚀',
    tags:['Cybernetics','Starships','Factions']
  },
  {
    id:'horror',
    meta:{name:'Horror',description:'Something ancient stirs in the dark. Sanity is fragile, monsters are real, and survival is never guaranteed.',author:'official',locked:false},
    icon:'🕯️',
    tags:['Survival','Monsters','Dread'],
    classes:[
      {id:'stalker',name:'Stalker',description:'Patient predators who hunt from shadow. They win before the fight begins.',attribute_contribution:{physical:2,mental:6,supernatural:4}},
      {id:'brawler',name:'Brawler',description:'Raw aggression incarnate. They take the hit and keep coming.',attribute_contribution:{physical:8,mental:2,supernatural:2}},
      {id:'tank',name:'Tank',description:'Immovable. Unbreakable. They stand between the dark and everything worth protecting.',attribute_contribution:{physical:6,mental:2,supernatural:5}}
    ],
    species:[
      {id:'vampire',name:'Vampire',description:'Predatory elegance wrapped in centuries of cunning.',attribute_contribution:{physical:2,mental:5,supernatural:7}},
      {id:'werewolf',name:'Werewolf',description:'Primal fury barely contained in human skin.',attribute_contribution:{physical:7,mental:3,supernatural:2}},
      {id:'zombie',name:'Zombie',description:'They should be dead. They keep moving anyway.',attribute_contribution:{physical:5,mental:1,supernatural:8}}
    ],
    flavors:{
      stalker_vampire:"You are the nightmare they cannot name. Ancient, patient, and lethal — you have hunted longer than most civilizations have existed. By the time they know you are there, it is already over.",
      stalker_werewolf:"You hunt in silence until the moment you do not. The beast inside you is not a weakness — it is the most terrifying thing in the room, and you decide exactly when it arrives.",
      stalker_zombie:"You do not need to be fast. You do not need to be clever. You only need to keep moving, and you will never stop. The truly horrifying thing about you is that you know this.",
      brawler_vampire:"Centuries of strength with none of the restraint. You hit like something that was never human and has long since stopped pretending otherwise.",
      brawler_werewolf:"You are what the dark is afraid of. Pure, unrelenting physical force wrapped in instinct and fury. You have never met a problem that more violence did not solve.",
      brawler_zombie:"You absorbed more punishment than any living thing should survive, and you are still standing. Still swinging. Still moving forward. You always move forward.",
      tank_vampire:"You have outlasted empires. Whatever comes through that door has never faced something that simply refuses to end. You are the reason monsters check over their shoulder.",
      tank_werewolf:"Your body is a fortress. Your instincts are a weapon. You stand at the threshold between your people and the dark, and nothing has ever made it past you yet.",
      tank_zombie:"You cannot be stopped. You cannot be reasoned with. You cannot be broken. Whatever you are protecting, you will be standing in front of it long after everything else has fallen."
    },
    questions:[
      {id:'q1',axis:'both',prompt:'You hear something moving in the walls of the house. It has been there for three nights. Tonight it sounds closer. What do you do?',answers:[
        {id:'a1',text:'Cut the power and wait for it in the dark. On your terms.',weights:{class:{stalker:5,brawler:1,tank:2},species:{vampire:4,werewolf:2,zombie:1}}},
        {id:'a2',text:'Find it. Flush it out. End it.',weights:{class:{stalker:1,brawler:5,tank:2},species:{vampire:1,werewolf:5,zombie:2}}},
        {id:'a3',text:'Barricade the room and make sure whatever it is cannot reach the others.',weights:{class:{stalker:1,brawler:2,tank:5},species:{vampire:2,werewolf:2,zombie:4}}}
      ]},
      {id:'q2',axis:'class',prompt:'The creature is faster than you expected. You are cornered. How do you survive?',answers:[
        {id:'a1',text:'You were never cornered. This was the plan.',weights:{class:{stalker:5,brawler:0,tank:1},species:{vampire:4,werewolf:1,zombie:2}}},
        {id:'a2',text:'You hit it harder than it thought possible and you do not stop.',weights:{class:{stalker:0,brawler:5,tank:2},species:{vampire:1,werewolf:5,zombie:3}}},
        {id:'a3',text:'You absorb the blow, stay on your feet, and give the others time to run.',weights:{class:{stalker:1,brawler:2,tank:5},species:{vampire:2,werewolf:3,zombie:4}}}
      ]},
      {id:'q3',axis:'species',prompt:'You wake and something is wrong with your reflection. What unsettles you most?',answers:[
        {id:'a1',text:'Your eyes. They are not the colour they were.',weights:{class:{stalker:3,brawler:1,tank:2},species:{vampire:5,werewolf:1,zombie:2}}},
        {id:'a2',text:'The way your hands look. Too large. Too ready.',weights:{class:{stalker:1,brawler:4,tank:3},species:{vampire:1,werewolf:5,zombie:2}}},
        {id:'a3',text:'The fact that you feel nothing looking at it.',weights:{class:{stalker:2,brawler:2,tank:3},species:{vampire:2,werewolf:2,zombie:5}}}
      ]},
      {id:'q4',axis:'class',prompt:'A survivor begs you to go back for someone who was left behind. What is your answer?',answers:[
        {id:'a1',text:'You already scouted the route. You know exactly what it will cost.',weights:{class:{stalker:5,brawler:1,tank:2},species:{vampire:4,werewolf:1,zombie:2}}},
        {id:'a2',text:'You are already moving. You do not wait for permission.',weights:{class:{stalker:1,brawler:5,tank:2},species:{vampire:1,werewolf:5,zombie:2}}},
        {id:'a3',text:'You go. But you make the survivor stay behind. You are not risking two people.',weights:{class:{stalker:2,brawler:1,tank:5},species:{vampire:2,werewolf:3,zombie:4}}}
      ]},
      {id:'q5',axis:'species',prompt:'The hunger you feel is changing. It is no longer for food. What do you reach for?',answers:[
        {id:'a1',text:'Something warm. Something alive. The thought arrives before the shame does.',weights:{class:{stalker:3,brawler:2,tank:2},species:{vampire:5,werewolf:2,zombie:1}}},
        {id:'a2',text:'Movement. Heat. The instinct to chase and bring down.',weights:{class:{stalker:1,brawler:4,tank:2},species:{vampire:1,werewolf:5,zombie:2}}},
        {id:'a3',text:'You do not know. You are not sure you still feel hunger the way you did.',weights:{class:{stalker:2,brawler:1,tank:4},species:{vampire:2,werewolf:1,zombie:5}}}
      ]},
      {id:'q6',axis:'class',prompt:'The group wants to vote on whether to fortify or flee. You have thirty seconds before the decision is made for you. What do you say?',answers:[
        {id:'a1',text:'Nothing. You have already left to secure the perimeter.',weights:{class:{stalker:5,brawler:1,tank:2},species:{vampire:4,werewolf:2,zombie:1}}},
        {id:'a2',text:'We fight. Standing still is how you die.',weights:{class:{stalker:0,brawler:5,tank:2},species:{vampire:2,werewolf:5,zombie:2}}},
        {id:'a3',text:'We fortify. I will hold whatever comes through that door.',weights:{class:{stalker:1,brawler:2,tank:5},species:{vampire:1,werewolf:2,zombie:5}}}
      ]},
      {id:'q7',axis:'both',prompt:'You find a journal from someone who did not make it. The last entry is dated three days from now. Do you read it?',answers:[
        {id:'a1',text:'Yes. Every word. Knowledge of what is coming is the only advantage you have.',weights:{class:{stalker:5,brawler:0,tank:2},species:{vampire:5,werewolf:1,zombie:2}}},
        {id:'a2',text:'You skim it for useful information and move on. Grief is a luxury.',weights:{class:{stalker:2,brawler:4,tank:3},species:{vampire:2,werewolf:4,zombie:3}}},
        {id:'a3',text:'You read it, but you do not tell the others what it says.',weights:{class:{stalker:4,brawler:1,tank:3},species:{vampire:4,werewolf:2,zombie:3}}}
      ]},
      {id:'q8',axis:'species',prompt:'Another survivor recognizes what you are becoming. How do you respond?',answers:[
        {id:'a1',text:'You hold their gaze and let them decide if they are still afraid.',weights:{class:{stalker:4,brawler:1,tank:2},species:{vampire:5,werewolf:2,zombie:1}}},
        {id:'a2',text:'You show them what you can do. Fear is better than doubt.',weights:{class:{stalker:1,brawler:5,tank:2},species:{vampire:2,werewolf:5,zombie:1}}},
        {id:'a3',text:'You say nothing. You are not sure you could explain it even if you tried.',weights:{class:{stalker:2,brawler:2,tank:4},species:{vampire:1,werewolf:2,zombie:5}}}
      ]},
      {id:'q9',axis:'class',prompt:'Something has been following your group for two days. It has not attacked. Why do you think it is waiting?',answers:[
        {id:'a1',text:'It is learning you. Which means you should be learning it faster.',weights:{class:{stalker:5,brawler:1,tank:2},species:{vampire:5,werewolf:1,zombie:1}}},
        {id:'a2',text:'It does not matter why. You double back and end the question.',weights:{class:{stalker:1,brawler:5,tank:2},species:{vampire:1,werewolf:5,zombie:2}}},
        {id:'a3',text:'It is waiting for you to be weaker. So you make sure that never happens.',weights:{class:{stalker:2,brawler:2,tank:5},species:{vampire:2,werewolf:3,zombie:4}}}
      ]},
      {id:'q10',axis:'species',prompt:'When this is over — if it is ever over — what do you want people to remember about you?',answers:[
        {id:'a1',text:'That they never saw you coming until it was already done.',weights:{class:{stalker:5,brawler:1,tank:1},species:{vampire:5,werewolf:1,zombie:2}}},
        {id:'a2',text:'That you hit the hardest and got back up every time.',weights:{class:{stalker:1,brawler:5,tank:2},species:{vampire:1,werewolf:5,zombie:3}}},
        {id:'a3',text:'That while you were standing, nothing got through.',weights:{class:{stalker:1,brawler:2,tank:5},species:{vampire:2,werewolf:3,zombie:5}}}
      ]}
    ]
  }
];
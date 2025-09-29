// === Super Complex Mod (GPT Category) ===
// All elements go into "gpt"
// Each has a random 2-digit suffix to avoid conflicts

// Powder (heats randomly)
elements.blue_sand_47 = {
    color: ["#0a56ff","#0c6bff","#0e81ff"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    category: "gpt",
    state: "solid",
    density: 1600,
    stain: 0.05,
    hardness: 0.02,
    tick: function(pixel){
        if(Math.random() < 0.002) pixel.temp += 10; // heats over time
        if(pixel.temp > 900) { // melts into glass
            changePixel(pixel,"glass_29");
        }
    }
};

// Magma (cooling, glowing, bursts embers)
elements.magma_92 = {
    color: ["#ff6600","#ff3a00","#ffd700"],
    behavior: behaviors.LIQUID,
    category: "gpt",
    state: "liquid",
    temp: 1200,
    tempLow: 700,
    stateLow: "igneous_rock_33",
    density: 2600,
    viscosity: 12000,
    burn: 80,
    fireColor: "#ffb24d",
    glow: true,
    tick: function(pixel){
        pixel.temp -= 0.3;
        if (Math.random() < 0.003 && isEmpty(pixel.x,pixel.y-1)) {
            createPixel("ember_56", pixel.x, pixel.y-1);
        }
        if (Math.random() < 0.001 && isEmpty(pixel.x+1,pixel.y)) {
            createPixel("lava_bubble_88", pixel.x+1, pixel.y);
        }
    },
    renderer: function(pixel, ctx) {
        drawSquare(ctx,"#ff6a00",pixel.x-1,pixel.y);
        drawSquare(ctx,"#ff3a00",pixel.x,pixel.y);
        drawSquare(ctx,"#ffd700",pixel.x+1,pixel.y);
    },
};

// Cooled rock
elements.igneous_rock_33 = {
    color: "#444444",
    behavior: behaviors.WALL,
    category: "gpt",
    state: "solid",
    density: 3000,
    hardness: 0.9,
    breakInto: "gravel_74",
};

// Gravel
elements.gravel_74 = {
    color: "#888888",
    behavior: behaviors.POWDER,
    category: "gpt",
    state: "solid",
    density: 1800,
};

// Ember → ash
elements.ember_56 = {
    color: ["#ff4500","#ffae00"],
    behavior: behaviors.POWDER,
    category: "gpt",
    state: "solid",
    temp: 400,
    burn: 100,
    burnTime: 15,
    burnInto: "ash_21",
};

// Lava bubble (explodes)
elements.lava_bubble_88 = {
    color: "#ff9900",
    behavior: [
        "XX|DL|XX",
        "DL|EX:10>fire|DL",
        "M2|M1|M2"
    ],
    category: "gpt",
    state: "liquid",
    temp: 1500,
    density: 1000,
    burn: 100,
    burnTime: 10,
    burnInto: "ash_21",
};

// Steam
elements.steam_14 = {
    color: "#cccccc",
    behavior: behaviors.GAS,
    category: "gpt",
    state: "gas",
    temp: 120,
    density: 0.3,
    reactions: {
        "magma_92": { elem1:"steam_14", elem2:"explosion_18", chance:0.01 },
        "mustard_73": { elem1:"steam_14", elem2:"stinky_gas_64", chance:0.2 },
    }
};

// Glass
elements.glass_29 = {
    color: "#aaddff",
    behavior: behaviors.WALL,
    category: "gpt",
    state: "solid",
    density: 2600,
    hardness: 0.8,
};

// Mustard
elements.mustard_73 = {
    color: "#ffff00",
    behavior: behaviors.LIQUID,
    category: "gpt",
    state: "liquid",
    density: 1100,
    viscosity: 60000,
    isFood: true,
};

// Mustard stone
elements.mustard_stone_65 = {
    color: "#d4c300",
    behavior: behaviors.WALL,
    category: "gpt",
    state: "solid",
    density: 2300,
    hardness: 0.5,
};

// Explosion
elements.explosion_18 = {
    color: ["#ff0000","#ffa500","#ffff00"],
    behavior: [
        "XX|EX:5>fire|XX",
        "EX:10>fire|DL|EX:10>fire",
        "M2|M1|M2"
    ],
    category: "gpt",
    state: "gas",
    temp: 2000,
    glow: true,
    burn: 100,
    burnTime: 20,
    burnInto: "ash_21",
};

// Ash
elements.ash_21 = {
    color: "#555555",
    behavior: behaviors.POWDER,
    category: "gpt",
    state: "solid",
    density: 700,
};

// Stinky gas (decays away)
elements.stinky_gas_64 = {
    color: "#99ff99",
    behavior: behaviors.GAS,
    category: "gpt",
    state: "gas",
    density: 0.1,
    tick: function(pixel){
        if(!pixel.life) pixel.life = 200;
        pixel.life--;
        if(pixel.life <= 0) changePixel(pixel,"steam_14");
    }
};

// Egg
elements.mystery_egg_84 = {
    color: "#ff00ff",
    behavior: behaviors.WALL,
    category: "gpt",
    state: "solid",
    tempHigh: 50,
    stateHigh: "tiny_critter_91",
    egg: true,
    baby: "tiny_critter_91",
    tick: function(pixel){
        if(Math.random() < 0.001){
            changePixel(pixel,"mutant_critter_93"); // rare mutation
        }
    }
};

// Baby critter
elements.tiny_critter_91 = {
    color: "#00ff99",
    behavior: behaviors.LIQUID,
    category: "gpt",
    state: "liquid",
    movable: true,
    density: 500,
    tick: function(pixel){
        // wander randomly
        tryMove(pixel, pixel.x+(Math.floor(Math.random()*3)-1), pixel.y+1);
        if(Math.random()<0.0005) changePixel(pixel,"explosion_18"); // suicide critter
    }
};

// Mutant critter (rare hatch)
elements.mutant_critter_93 = {
    color: ["#9900ff","#ff0099"],
    behavior: behaviors.LIQUID,
    category: "gpt",
    state: "liquid",
    movable: true,
    density: 800,
    burn: 50,
    burnTime: 200,
    burnInto: "ash_21",
    tick: function(pixel){
        if(Math.random()<0.002 && isEmpty(pixel.x,pixel.y-1)){
            createPixel("stinky_gas_64",pixel.x,pixel.y-1);
        }
    }
};

// Universal GPT tool
elements.gpt_tool_11 = {
    color: "#00ffff",
    tool: function(pixel) {
        if(pixel.element.startsWith("blue_sand") || pixel.element.startsWith("magma")) {
            pixel.element = "explosion_18";
        } else {
            pixel.temp += 200; // superheat everything else
        }
    },
    category: "gpt",
};

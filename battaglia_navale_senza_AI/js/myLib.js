// the size of the grid
var gridSizeX = 5;
var gridSizeY = 5;

// maximum amont of ammunition, the more grids there are, the higher the ammo
const maxAmmo = Math.round((gridSizeX * gridSizeY) / 1.52);
// maximum num of subs, the more grids there are, the higher the subs
const maxSub = Math.round((gridSizeX * gridSizeY) / 4);

// attempts to choose the cell with the sub
var userAmmo = maxAmmo;
var enemyAmmo = maxAmmo;
// amount of subs left in the grid
var enemySubLeft = maxSub;
var userSubLeft = maxSub;

// canges the value of the paragrapsh that contais these info
function initValues(){
    document.getElementById("ammo").innerHTML = maxAmmo;
    document.getElementById("subNum").innerHTML = maxSub;
}

// returns a random number
function randInt(max) {
  return Math.floor(Math.random() * max);
}

// changes te class of random cells to sub
function spawnSub(){
    // position of the potential sub
    let pos = 0;
    // the sub element
    let sub = document.getElementById(pos);
    console.log("enemy grid:");

    // it loops until all the subs are spawned on the grid
    for(let i = 0; i < maxSub; i++){
        // position of the sub
        pos = randInt(gridSizeX * gridSizeY) + 1;
        console.log(i+": "+pos);
        sub = document.getElementById(pos);
        // if there is alredy a sub there it just repeats the cycle
        // and if not it changes the class to "sub"
        if(sub.className == "sub"){
            i--;
        }else{
            sub.className = "sub";
        }
    }
    console.log("___________");

    // does the same thig as the loop above but for the enemy table
    console.log("user grid:");
    for(let i = 0; i < maxSub; i++){
        pos = randInt(2*(gridSizeX * gridSizeY)) + 1;
        console.log(i+": "+pos);
        sub = document.getElementById(pos);
        if(sub.className == "sub"){
            i--;
        }else{
            sub.className = "sub";
        }
    }
    console.log("___________");

}

// it's called AI but it's far from intelligent
function enemyAI(){
    let pos = 0;
    let element = document.getElementById(pos);
    let subNum = document

    while(element.alt != "onde"){
        pos = randInt(gridSizeX + gridSizeY) + 1;
        element = document.getElementById(pos);
    }

    if(element.className == "sub"){
        attVal.src="img/affondato_2.png";
        attVal.alt="affondato";

        userSubLeft--;
        subNum.innerHTML= userSubLeft;
    }

}

// canges the photo of the cell, subtracts the ammo for each click of the image and if the
// if the image has the "sub" class it subtracts to the subsLeft variable and when the
// user find all the subs or finishes the ammo he can no longer click on the images and the 
// paragraph on the top of the page says if he won or not

function shoot(pos){
    // so i can change the paragraph were the amount of ammo is shown
    let magazine = document.getElementById("ammo");
    // so i can change the paragraph were the amount of suds left is shown
    let subNum = document.getElementById("subNum");
    // so i can change the src attribute value to anoter image (it stands for ATTribute VALue)
    let attVal = document.getElementById(pos);
    // so i can change the paragraph were it says if the user won or lost
    let win = document.getElementById("win");

    // the image changes only if:
    // 1) the user has enough ammo
    // 2) ther are subs left in the enemy grid
    // 3) the image was not already clicked
    if((userAmmo > 0) && (enemySubLeft > 0) && (attVal.alt != "affondato") && (attVal.alt != "mancato")){
        // if there is a sub the image is changed to a "drowning" submarine
        // and the value of subs is decrased from the paragraph
        if(attVal.className == "sub"){
            attVal.src="img/affondato_2.png";
            attVal.alt="affondato";

            enemySubLeft--;
            subNum.innerHTML= enemySubLeft;
        }else{
            // if there is not a sub there it changes the image to one of a seagull
            attVal.src="img/gabbiano.png";
            attVal.alt="mancato";
        }

        userAmmo--;
        magazine.innerHTML=userAmmo;
    }
    
    // changes the text if the user won or lost
    if((userAmmo < 1) && (enemySubLeft > 0)){
        win.innerHTML="HAI PERSO";
    }
    if((userAmmo > 0) && (enemySubLeft < 1)){
        win.innerHTML="HAI VINTO";
    }
}

// resets a bunch of values to it's original state and spawns subs
function resetGame(){
    userAmmo = maxAmmo
    enemySubLeft = maxSub
    document.getElementById("win").innerHTML='';
    initValues();
    let element;
    
    // sets the map's img tag src, class, and alt attributes to it's original state 
    for(let i = 1; i < (gridSizeX * gridSizeY + 1); i++){
        element = document.getElementById(i);
        element.src="img/onda.png";
        element.alt="onda";
        element.className = "onda";

        // very useful comand \/ \/ \/
        //element.setAttribute("onclick", 'shoot('+i+')');
    }
    for(let i = gridSizeX * gridSizeY + 1; i < 2*(gridSizeX * gridSizeY) + 1; i++){
        element = document.getElementById(i);
        element.src="img/onda.png";
        element.alt="onda";
        element.className = "enemyCell";
        element.className = "onda";
    }
    spawnSub();
}

// it populates the table tag with tr, td and image tags.
// it puts some text into a variable and with that changes the innerHTML
// of the tables, so i can have the amount of rows and columns on the fly
function createMap(){
    let enemyMap = document.getElementById("enemyMap");
    let userMap = document.getElementById("userMap");
    let f = 1;
    let insideEnemyMap = "";
    let insideYourMap = "";

    for(let i = 1; i < (gridSizeY + 1); i++){
        insideEnemyMap += "\n<tr>\n";
        for(let j = 0; j < gridSizeX; j++){
            insideEnemyMap += '<td><img id="'+f+'" onclick="shoot('+f+')"></td>\n';
            f++;
        }
        insideEnemyMap += "</tr>";
    }
    for(let i = gridSizeY + 2; i < 2*(gridSizeY + 1); i++){
        insideYourMap += "\n<tr>\n";
        for(let j = 0; j < gridSizeX; j++){
            insideYourMap += "<td><img id="+f+"></td>\n"
            f++
        }
        insideYourMap += "</tr>";
    }

    enemyMap.innerHTML = insideEnemyMap;
    userMap.innerHTML = insideYourMap;
}
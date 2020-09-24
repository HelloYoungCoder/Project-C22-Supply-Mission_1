//PROJECT - 23: SUPPLY MISSION - 1

//Create Variables
var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground;

//Create namespaces
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	//Load Images
	helicopterIMG=loadImage("helicopter.png");
	packageIMG=loadImage("package.png");
}

function setup() {
	//Create canvas
	createCanvas(800, 700);

	//Place objects in center
	rectMode(CENTER);
	
	//Create sprites for package, helicopter & ground
	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG);
	packageSprite.scale=0.2;

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG);
	helicopterSprite.scale=0.6;

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(59, 54, 54);

	//Create Physics Engine
	engine = Engine.create();
	//Create Physics World to add objects
	world = engine.world;

	//Assign static state (initial) & bounceoff (after pressing down arrow)
	var package_object = {restitution:0.4, isStatic:true};

	//Create package object & add it to world
	packageBody = Bodies.circle(width/2 , 200 , 5 ,package_object);
	World.add(world, packageBody);
	
	//Assign static state
	var static_object = {isStatic:true};

	//Create ground object & add it to world
	ground = Bodies.rectangle(width/2, 650, width, 10 ,static_object);
 	World.add(world, ground);

	//The Matter.Runner module is an optional utility which provides a game loop, that handles continuously updating a Matter.Engine for you within a browser.
	Engine.run(engine);
  
}


function draw() {

	//Place objects in center
	rectMode(CENTER);

	//Clear the screen
	background(100, 178, 209);

	//Make the package sprite position as package object position
	packageSprite.x= packageBody.position.x;
	packageSprite.y= packageBody.position.y; 

	//Display sprites on screen
	drawSprites();
 
}

function keyPressed() {

	if (keyCode === LEFT_ARROW) {

		//Move in left direction
		helicopterSprite.x = helicopterSprite.x - 20;

		//Translation acts as Vector - A vector is an object that has both a magnitude and a direction.
		translation={x:-20,y:0}; 

		//Moves a body by a given vector relative to its current position, without imparting any velocity.
    	Matter.Body.translate(packageBody, translation);
	}

	if (keyCode === RIGHT_ARROW) {

		//Move in right direction
		helicopterSprite.x = helicopterSprite.x + 20;

		//Translation acts as Vector - A vector is an object that has both a magnitude and a direction.
		translation={x:20,y:0}; 

		//Moves a body by a given vector relative to its current position, without imparting any velocity.
    	Matter.Body.translate(packageBody, translation);
	}

	if (keyCode === DOWN_ARROW) {

		//Sets the body as static, including isStatic flag and setting mass and inertia to Infinity.
		Matter.Body.setStatic(packageBody,false);
	}
}




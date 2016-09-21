var canvasWidth = 800;
var canvasHeight = canvasWidth;
var isMouseDown = false;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var lastLoc = ( 0,0 );
var lastTimestamp = 0;
var lastLineWidth = -1;

canvas.width = canvasWidth ;
canvas.height = canvasHeight;

drawGrid();

canvas.onmousedown = function(e){
	e.preventDefault();
	isMouseDown =true;
	lastLoc = windowToCanvas(e.clientX,e.clientY);
	lastTimestamp = new Date().getTime();
//	alert(loc.x + "," + loc.y);
//	console.log("mouse down");
}
canvas.onmouseup = function(e){
	e.preventDefault();
	isMouseDown = false;
//	console.log("mouse up");
}
canvas.ommouseout = function(e){
	e.preventDefault();
	isMouseDown = false;
//	console.log("mouse out");
}
canvas.onmousemove = function(e)
{
	e.preventDefault();
	if (isMouseDown) {
//		console.log("mouse move");
		var curLoc = windowToCanvas(e.clientX,e.clientY);
		var curTimestamp = new Date().getTime();
		var s = calcDistance(curLoc , lastLoc);
		var t = curTimestamp - lastTimestamp;
		var lineWidth = calclineWidth( s, t);
		console.log(lineWidth);
		
		
		
		context.beginPath();
		context.moveTo(lastLoc.x , lastLoc .y);
		context.lineTo(curLoc.x , curLoc.y);
		
		context.strokeStyle = 'black';
		context.lineWidth = lineWidth ;
		context.lineCap = "round";
		context.lineJoin ="round";
		context.stroke();
		
		lastLoc = curLoc;
		lastTimestamp = curTimestamp;
		lastLineWidth = lineWidth;
		
	}
}
function calclineWidth( s , t)
{
	var v = s/t;
	var resultLineWidth;
	if (v <= 0.1) 
		resultLineWidth = 30;
	 else if(v >= 10)
		resultLineWidth = 1;
	else
		resultLineWidth = 30 - (v-0.1)/(10-0.1)*(30-1);	
	if (lastLineWidth == -1) 
	  return resultLineWidth;
	return lastLineWidth*2/3 + resultLineWidth*1/3;
	
}

function windowToCanvas( x , y )
{
	var bbox = canvas.getBoundingClientRect();
	return {x:Math.round(x-bbox.left) , y:Math.round(y-bbox.top)};
}

function calcDistance( loc1 , loc2 )
{
	return Math.sqrt( (loc1.x-loc2.x)*(loc1.x-loc2.x) + (loc1.y - loc2.y)*(loc1.y - loc2.y));
}

function drawGrid(){
	context.save();
	context.strokeStyle = "rgb(230,11,9)";

	context.beginPath();
	context.moveTo( 3 , 3);
	context.lineTo(canvasWidth-3 , 3);
	context.lineTo(canvasWidth - 3 , canvasHeight - 3);
	context.lineTo( 3, canvasHeight -3 );
	context.closePath();
	
	context.lineWidth = 6;
	context.stroke();
	
	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(canvasWidth,canvasHeight);
	
	context.moveTo(canvasWidth,0);
	context.lineTo(0,canvasHeight);
	
	context.moveTo(canvasWidth/2,0);
	context.lineTo(canvasWidth/2 , canvasHeight);
	
	context.moveTo(0,canvasHeight/2);
	context.lineTo(canvasWidth,canvasHeight/2);
	
	context.lineWidth = 1;
	context.stroke();
	context.restore();
}

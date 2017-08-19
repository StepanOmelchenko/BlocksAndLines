but.addEventListener('click', createDiv);
var array = [];
var lines = [];

function createDiv() {
	array.push(new CreateBlock);
}


function CreateBlock() {
    this.newDiv = document.createElement('div');
    this.butt = document.createElement('button');
    this.butt.onclick = makeLine.bind(this);
    this.butt.className = 'button';
    this.newDiv.className = 'windows';
    this.newDiv.onmousedown = move;
    document.body.appendChild(this.newDiv);
    this.newDiv.appendChild(this.butt);
}

function makeLine() {
	this.newDiv.onmousedown = start.bind(this);
}

function start() {
	var box = this.newDiv.getBoundingClientRect();
	var shiftX = event.clientX - box.left;
	var shiftY = event.clientY - box.top;
	array.forEach(function(obj) {
		obj.newDiv.onmousedown = finish.bind(obj);
	});
	finish.shiftX = shiftX;
	finish.shiftY = shiftY;
	finish.start = this;
	this.newDiv.onemousedown = null;
}

function finish() {
	var box = this.newDiv.getBoundingClientRect();
	var shiftX = event.clientX - box.left;
	var shiftY = event.clientY - box.top;
	lines.push(new CreateLine(finish.start, this, finish.shiftX, finish.shiftY, shiftX, shiftY));
	array.forEach(function(obj) {
		obj.newDiv.onmousedown = move;
	});
}

function move() {
    var cont = document;
    var box = this.getBoundingClientRect();
    var shiftX = event.clientX - box.left;
    var shiftY = event.clientY - box.top;
  	cont.onmousemove = mover.bind(this);

function mover() {
	this.style.left = event.clientX - shiftX + 'px';
	this.style.top = event.clientY - shiftY + 'px';
}

cont.onmouseup = function() {
	cont.onmousemove = null;
	cont.onmouseup = null;
	lines.forEach(function(obj) {
		moveLine(obj);
	});
}
}

function CreateLine(block1, block2, fromX, fromY, toX, toY) { // создаем связь
	this.line = document.createElement('div');
	this.from = block1.newDiv;
	this.fromShiftX = fromX;
	this.fromShiftY = fromY;
	this.to = block2.newDiv;
	this.toShiftX = toX;
	this.toShiftY = toY;
    this.line.className = 'lines';
	document.body.appendChild(this.line);
	moveLine(this);
}

function moveLine(obj) { // перемещение связей
	var coordsFrom = obj.from.getBoundingClientRect();
	var coordsTo = obj.to.getBoundingClientRect();
	var angle, catheterX, catheterY = 0; // угол, координаты
	var sideA, sideB, sideC = 0; // стороны треугольника
	var hypotenuse; // длина палки
	var heightOfTriangle; // высота треугольника
	var offsetToLeft; // смещение влево
	var lineFromLeft = coordsFrom.left + obj.fromShiftX;
	var lineFromTop = coordsFrom.top + obj.fromShiftY;
	var lineToLeft = coordsTo.left + obj.toShiftX;
	var lineToTop = coordsTo.top + obj.toShiftY;
	catheterX = lineToLeft - lineFromLeft;
	catheterY = lineToTop - lineFromTop; 
	hypotenuse = Math.sqrt(catheterX*catheterX + catheterY*catheterY); // длина палки
	obj.line.style.width = hypotenuse + 'px'; 
	if ( catheterX >= 0) {
		angle = Math.atan(1/(catheterX/catheterY)) * (180/Math.PI);
	} else {
		angle = Math.atan(1/(catheterX/catheterY)) * (180/Math.PI) + 180;
	}
	obj.line.style.transform = 'rotateZ(' + angle + 'deg)';
	sideA = sideB = hypotenuse/2; // стороны треугольника две
	sideC = 2 * sideA * Math.sin(angle/2 * Math.PI / 180); // третья сторона
  
	heightOfTriangle = sideB * Math.sin(angle * Math.PI / 180); // высота
	offsetToLeft = Math.sqrt(sideC*sideC - heightOfTriangle*heightOfTriangle); // смещение влево
	obj.line.style.top = lineFromTop + heightOfTriangle + 'px'; // отступ сверху
	obj.line.style.left = lineFromLeft - offsetToLeft + 'px'; // отступ слева
}
but.addEventListener('click', jopa);
var array = [];

function jopa() {
	//console.log('jopa');
  var newDiv = document.createElement('div');
  newDiv.className = 'windows';
  newDiv.innerHTML = 'jopa';
  newDiv.onmousedown = move;
  document.body.appendChild(newDiv);
  array.push(newDiv);
}

function move() {
	var cont = document;
  var box = this.getBoundingClientRect();
  var shiftX = event.clientX - box.left;
  var shiftY = event.clientY - box.top;
  //console.log(box);
	cont.onmousemove = mover.bind(this);


function mover() {
	console
	this.style.left = event.clientX - shiftX + 'px';
  this.style.top = event.clientY - shiftY + 'px';
  
}

cont.onmouseup = function() {
	cont.onmousemove = null;
  cont.onmouseup = null;
}
}

/*
Script by RoBorg
RoBorg@geniusbug.com
http://javascript.geniusbug.com
Please do not remove or edit this message
*/

/*
myName = new floater('myDivID', Position, Width, Height, Vertical Margin, Horizontal Margin);
For Width & Height, use -1 for automatic.
Positions: 
__________
|1   2   3|
|         |
|8   9   4|   <-- The page
|         |
|7___6___5|

*/

function initFloaters() {
  if (!document.getElementById) return;
  allFloaters = new Array();

  floater1 = new floater("floater1Div", 5, -1, -1, 30, 30);
}

function floater(div, position, width, height, hMargin, vMargin) {
  this.div = document.getElementById(div);
  this.div.style.visibility = "visible";
  if (width == -1) width = this.div.offsetWidth;
  if (height == -1) height = this.div.offsetHeight;
  this.position = position;
  this.width = width;
  this.height = height;
  this.hMargin = hMargin;
  this.vMargin = vMargin;

  this.doFloat = doFloat;
  this.idNo = allFloaters.length;
  allFloaters[allFloaters.length] = this;
  this.floatTimer = setInterval("allFloaters[" + this.idNo + "].doFloat()", 50);
}

function doFloat() {
  browserVars.updateVars();

  var w = browserVars.width - this.width;
  var h = browserVars.height - this.height;
  var xPos = 0;
  var yPos = 0;

  if (this.position == 1) {
    xPos = this.hMargin;
    yPos = this.vMargin;
  }
  if (this.position == 2) {
    xPos = w / 2;
    yPos = this.vMargin;
  }
  if (this.position == 3) {
    xPos = w - this.hMargin;
    yPos = this.vMargin;
  }
  if (this.position == 4) {
    xPos = w - this.hMargin;
    yPos = h / 2;
  }
  if (this.position == 5) {
    xPos = w - this.hMargin;
    yPos = h - this.vMargin;
  }
  if (this.position == 6) {
    xPos = w / 2;
    yPos = h - this.vMargin;
  }
  if (this.position == 7) {
    xPos = this.hMargin;
    yPos = h - this.vMargin;
  }
  if (this.position == 8) {
    xPos = this.hMargin;
    yPos = h / 2;
  }
  if (this.position == 9) {
    xPos = w / 2;
    yPos = h / 2;
  }

  if (isNaN(xPos) || isNaN(yPos)) return;

  this.div.style.left = browserVars.scrollLeft + xPos;
  this.div.style.top = browserVars.scrollTop + yPos;
}

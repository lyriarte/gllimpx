/*
 * Copyright (c) 2012, Luc Yriarte
 * All rights reserved.
 * 
 * License: BSD <http://www.opensource.org/licenses/bsd-license.php>
 * 
 */

function gllimpx()
{
	this.x3d = new x3d();
	this.canvas = null;
	this.gc = null;
	this.model = null;
	this.dragX = 0;
	this.dragY = 0;
	return this;	
}

gllimpx.prototype.parseX3d = function(x3dStr) {
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(x3dStr, "text/xml");
	this.model = this.x3d.getScene(xmlDoc);
	return this.model;
}

gllimpx.prototype.setCanvas = function(aCanvas) {
	this.canvas = aCanvas;
	this.gc = this.canvas.getContext("2d");
}

gllimpx.prototype.redrawCanvas = function() {
	this.x3d.scene.update(this.canvas.width / 2,this.canvas.width,this.canvas.height);
	this.gc.clearRect(0,0,this.canvas.width,this.canvas.height);
	this.x3d.scene.paint(this.gc);  
}

gllimpx.prototype.onMouseDown = function(event) {
	this.dragX = event.clientX;
	this.dragY = event.clientY;
}

gllimpx.prototype.onMouseUp = function(event) {
	this.dragX = 0;
	this.dragY = 0;
}

gllimpx.prototype.rotateOnMouseMove = function(event) {
  if (this.x3d.scene && this.model && (this.dragX || this.dragY)) {
	var deltaX = (event.clientX - this.dragX) * 2 * Math.PI / this.canvas.width;
	var deltaY = (this.dragY - event.clientY) * 2 * Math.PI / this.canvas.height;
	this.model.transformation = this.model.transformation.mul(
		Matrix3D.rotationY(deltaX).mul(
			Matrix3D.rotationX(deltaY)));
	this.redrawCanvas();
	this.dragX = event.clientX;
	this.dragY = event.clientY;
  }
}

gllimpx.prototype.translateOnMouseMove = function(event) {
  if (this.x3d.scene && this.model && (this.dragX || this.dragY)) {
	var deltaX = (event.clientX - this.dragX) / this.canvas.width;
	var deltaY = (this.dragY - event.clientY) / this.canvas.height;
	this.x3d.translation(this.model, deltaX, deltaY, 0);
	this.redrawCanvas();
	this.dragX = event.clientX;
	this.dragY = event.clientY;
  }
}

gllimpx.prototype.zoomOnMouseMove = function(event) {
  if (this.x3d.scene && this.model && this.dragY) {
	var deltaZ = (this.dragY - event.clientY) / this.canvas.height;
	this.x3d.translation(this.model, 0, 0, deltaZ);
	this.redrawCanvas();
	this.dragX = event.clientX;
	this.dragY = event.clientY;
  }
}


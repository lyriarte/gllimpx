/*
 * Copyright (c) 2010, Luc Yriarte
 * All rights reserved.
 * 
 * License: BSD <http://www.opensource.org/licenses/bsd-license.php>
 * 
 */
function Object3D()
{
	this.color = null;
	this.name = null;
	
	this.mesh = new Mesh(0,0,null,null);
	this.position = new Matrix3D();
	this.orientation = new Matrix3D();
	this.scale = new Matrix3D();
	this.transformation = new Matrix3D();
	this.updatedTransform = null;
	
	this.nChild = 0;
	this.nFacet = 0;
	this.nFacetTotal = 0;
	
	this.child = null;
	this.parent = null;
	return this;
};

Object3D.prototype.setScale = function(s) 
{
	this.scale = s;
	this.transformation = this.position.mul(this.orientation).mul(this.scale);
	this.updatedTransform = null;
	return this;
};

Object3D.prototype.setOrientation = function(o) 
{
	this.orientation = o;
	this.transformation = this.position.mul(this.orientation).mul(this.scale);
	this.updatedTransform = null;
	return this;
};

Object3D.prototype.setPosition = function(p) 
{
	this.position = p;
	this.transformation = this.position.mul(this.orientation).mul(this.scale);
	this.updatedTransform = null;
	return this;
};

Object3D.prototype.transform = function(trans) 
{
	this.transformation = this.transformation.mul(trans);
	this.updatedTransform = null;
	return this;
};

Object3D.prototype.addChild = function(obj)
{
	obj.parent = this;
	if (obj.color == null)
		obj.color = this.color;
	if (this.child == null)
		this.child = new Array();
	this.child.push(obj);
	this.nChild++;
	return this;
};

Object3D.prototype.update = function(focal, screenX, screenY) 
{
	var i, nEdge;
	nEdge = 0;
	if (this.parent != null && this.parent.updatedTransform != null)
		this.updatedTransform = this.parent.updatedTransform.mul(this.transformation);
	else
		this.updatedTransform = this.transformation;
	for (i = 0; i < this.nChild; i++) {
		nEdge += this.child[i].update(focal, screenX, screenY);
	}
	if (this.mesh.nEdge > 0) {
		var transMesh = this.mesh.transform(this.updatedTransform);
		this.mesh.setWireframe(transMesh.updateWireframe(focal, screenX, screenY));
	}
	return nEdge + this.mesh.nEdge;
};

Object3D.prototype.paint = function(gc, parentColor) 
{
	var paintColor = this.color ? this.color : parentColor;
	var i;
	for (i = 0; i < this.nChild; i++) {
		this.child[i].paint(gc, paintColor);
	}
	this.mesh.drawWireframe(gc, paintColor);
};


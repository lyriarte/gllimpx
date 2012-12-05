/*
 * Copyright (c) 2010, Luc Yriarte
 * All rights reserved.
 * 
 * License: BSD <http://www.opensource.org/licenses/bsd-license.php>
 * 
 */
Vector3D.prototype = new Vector();
Vector3D.prototype.constructor = Vector;

function Vector3D(x,y,z) {
	Vector.call(this,4);
	this.cell[0][0] = x ? x : 0;
	this.cell[1][0] = y ? y : 0;
	this.cell[2][0] = z ? z : 0;
	this.cell[3][0] = 1;
	return this;
};

Vector3D.prototype.transformThis = function(aMatrix)
{
	var x,y,z;
	var mCell = aMatrix.cell;
	x = (mCell[0][0] * this.cell[0][0])
	  + (mCell[0][1] * this.cell[1][0])
	  + (mCell[0][2] * this.cell[2][0])
	  +  mCell[0][3];
	y = (mCell[1][0] * this.cell[0][0])
	  + (mCell[1][1] * this.cell[1][0])
	  + (mCell[1][2] * this.cell[2][0])	
	  +  mCell[1][3];
	z = (mCell[2][0] * this.cell[0][0])
	  + (mCell[2][1] * this.cell[1][0])
	  + (mCell[2][2] * this.cell[2][0])
	  +  mCell[2][3];
	this.cell[0][0] = x;
	this.cell[1][0] = y;
	this.cell[2][0] = z;
	return this;
};


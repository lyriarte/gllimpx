/*
 * Copyright (c) 2010, Luc Yriarte
 * All rights reserved.
 * 
 * License: BSD <http://www.opensource.org/licenses/bsd-license.php>
 * 
 */
Matrix3D.prototype = new Matrix();
Matrix3D.prototype.constructor = Matrix;

function Matrix3D() {
	Matrix.call(this,4,4);
	for (var i=0; i<this.nLines; i++)
		this.cell[i][i] = 1;
	return this;
};

Matrix3D.translation = function(x, y, z)
{
	var result = new Matrix3D();
	result.cell[0][3] = x;
	result.cell[1][3] = y;
	result.cell[2][3] = z;
	return result;
};

Matrix3D.scale = function(x, y, z)
{
	var result = new Matrix3D();
	result.cell[0][0] = x;
	result.cell[1][1] = y;
	result.cell[2][2] = z;
	return result;
};

Matrix3D.rotationX = function(teta)
{
	var result = new Matrix3D();
	result.cell[1][1] = Math.cos(teta);
	result.cell[1][2] = Math.sin(teta);
	result.cell[2][1] = -1 * Math.sin(teta);
	result.cell[2][2] = Math.cos(teta);
	return result;
};

Matrix3D.rotationY = function(teta)
{
	var result = new Matrix3D();
	result.cell[0][0] = Math.cos(teta);
	result.cell[0][2] = -1 * Math.sin(teta);
	result.cell[2][0] = Math.sin(teta);
	result.cell[2][2] = Math.cos(teta);
	return result;
};

Matrix3D.rotationZ = function(teta)
{
	var result = new Matrix3D();
	result.cell[0][0] = Math.cos(teta);
	result.cell[0][1] = Math.sin(teta);
	result.cell[1][0] = -1 * Math.sin(teta);
	result.cell[1][1] = Math.cos(teta);
	return result;
};


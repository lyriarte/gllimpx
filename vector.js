/*
 * Copyright (c) 2010, Luc Yriarte
 * All rights reserved.
 * 
 * License: BSD <http://www.opensource.org/licenses/bsd-license.php>
 * 
 */
Vector.prototype = new Matrix;

function Vector(l) {
	Matrix.call(this,l,1);
	return this;
};


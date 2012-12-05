/*
 * Copyright (c) 2010, Luc Yriarte
 * All rights reserved.
 * 
 * License: BSD <http://www.opensource.org/licenses/bsd-license.php>
 * 
 */
Box.prototype = new Object3D();
Box.prototype.constructor = Object3D;

function Box(x, y, z, fx) {
	Object3D.call(this);
	var dx = x / 2;
	var dy = y / 2;
	var dz = z / 2;
	var dbx = dx * (fx ? fx : 1);
	var v = new Array(8);
	// bottom rectangle
	v[0] = new Vector3D(-dbx, -dy, -dz);
	v[1] = new Vector3D(-dbx, -dy, dz);
	v[2] = new Vector3D(dbx, -dy, dz);
	v[3] = new Vector3D(dbx, -dy, -dz);
	// top rectangle
	v[4] = new Vector3D(-dx, dy, -dz);
	v[5] = new Vector3D(-dx, dy, dz);
	v[6] = new Vector3D(dx, dy, dz);
	v[7] = new Vector3D(dx, dy, -dz);
	var e = new Array(12);
	var i;
	for (i = 0; i < 12; i++)
		e[i] = new Array(2);
	for (i = 0; i < 4; i++) {
		// bottom rectangle
		e[i][0] = i;
		e[i][1] = (i + 1) % 4;
		// top rectangle
		e[i + 4][0] = i + 4;
		e[i + 4][1] = ((i + 1) % 4) + 4;
		// vertical lines
		e[i + 8][0] = i;
		e[i + 8][1] = i + 4;
	}
	this.mesh = new Mesh(8, 12, v, e);
	return this;
};

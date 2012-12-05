/*
 * Copyright (c) 2010, Luc Yriarte
 * All rights reserved.
 * 
 * License: BSD <http://www.opensource.org/licenses/bsd-license.php>
 * 
 */
PolyCylinder.prototype = new Object3D();
PolyCylinder.prototype.constructor = Object3D;

function PolyCylinder(nTotal, n, h, r) 
{
	if (n < 3)
		n = 3;
	var dh = h / 2;
	var step = 2 * Math.PI / nTotal;
	var v = new Array(n * 2);
	var e = new Array(n * 3);
	var i;
	for (i = 0; i < n * 3; i++)
		e[i] = new Array(2);
	for (i = 0; i < n; i++) {
		// bottom polygon
		v[i] = new Vector3D(r * Math.cos(i * step), -dh, r
				* Math.sin(i * step));
		e[i][0] = i;
		e[i][1] = (i + 1) % n;
		// top polygon
		v[i + n] = new Vector3D(r * Math.cos(i * step), dh, r
				* Math.sin(i * step));
		e[i + n][0] = i + n;
		e[i + n][1] = ((i + 1) % n) + n;
		// vertical lines
		e[i + n * 2][0] = i;
		e[i + n * 2][1] = i + n;
	}
	this.mesh = new Mesh(n * 2, n * 3, v, e);
	return this;
};

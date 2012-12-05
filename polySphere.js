/*
 * Copyright (c) 2010, Luc Yriarte
 * All rights reserved.
 * 
 * License: BSD <http://www.opensource.org/licenses/bsd-license.php>
 * 
 */
PolySphere.prototype = new Object3D();
PolySphere.prototype.constructor = Object3D;

function PolySphere(nTotal, n, r, frad) 
{
	if (n < 3)
		n = 3;
	if (nTotal < n)
		nTotal = n;
	var step = 2 * Math.PI / nTotal;
	var rLat, y;
	var nV = n * (n - 2) + 2;
	var v = new Array(nV);
	var nE = 2 * (nV - 2) + n;
	var e = new Array(nE);
	var i, j, f;
	for (i = 0; i < nE; i++)
		e[i] = new Array(2);
	// top
	v[nV - 1] = new Vector3D(0, r, 0);
	// bottom
	v[nV - 2] = new Vector3D(0, -r, 0);
	// lines from top
	for (i = 0; i < n; i++) {
		e[nE - (i + 1)][0] = nV - 1;
		e[nE - (i + 1)][1] = i;
	}
	// layers top down
	for (i = 0; i < n - 2; i++) {
		// top down
		rLat = frad * r * Math.sin(Math.PI * (i + 1) / (n - 1));
		y = r * Math.cos(Math.PI * (i + 1) / (n - 1));
		// polygon
		for (j = 0; j < n; j++) {
			var iV = i * n + j;
			v[iV] = new Vector3D(rLat * Math.cos(j * step), y, rLat
					* Math.sin(j * step));
			// line to next
			e[iV][0] = iV;
			e[iV][1] = i * n + ((j + 1) % n);
			// vertical lines to next below
			e[n * (n - 2) + iV][1] = iV;
			if (i < n - 3) {
				e[n * (n - 2) + iV][0] = iV + n;
			} else {
				e[n * (n - 2) + iV][0] = nV - 2;
			}
		}
	}
	this.mesh = new Mesh(nV, nE, v, e);
	return this;
};


/*
 * Copyright (c) 2010, Luc Yriarte
 * All rights reserved.
 * 
 * License: BSD <http://www.opensource.org/licenses/bsd-license.php>
 * 
 */
function Matrix(l, c, data)
{
	this.nLines = l || 1;
	this.nCols = c || 1;
	this.cell = data;
	if (this.cell)
		return this;
	this.cell = new Array(this.nLines);
	for (var i=0; i<this.nLines; i++)
	{
		this.cell[i] = new Array(this.nCols);
		for (var j=0; j<this.nCols; j++)
		{
			this.cell[i][j]=0;
		}
	}
	return this;
};

Matrix.prototype.mul = function(aMatrix)
{
	if (aMatrix.nLines != this.nCols)
		return null;
	var mResult = new Matrix(this.nLines, aMatrix.nCols);
	for (var i=0; i<mResult.nLines; i++)
	{
		for (var j=0; j<mResult.nCols; j++)
		{
			mResult.cell[i][j]=0;
			for (var k=0; k<this.nCols; k++)
			{
				mResult.cell[i][j] += this.cell[i][k] * aMatrix.cell[k][j];
			}
		}
	}
	return mResult;
};


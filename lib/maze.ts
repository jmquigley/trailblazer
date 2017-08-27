/**
 * Creates an instance of a Maze structure.  A maze is created within an
 * M x N grid of cells.  This grid is then given to a processing Algorithm
 * to carve out passages within the grid.
 *
 * #### Examples:
 *
 * ```javascript
 * import {AlgorithmType, Maze} from 'trailz';
 * const maze = new Maze(10, 10, AlgorithmType.BinaryTree);
 * console.log(maze.string);
 * ```
 *
 * @module Maze
 */

'use strict';

import {Algorithm, AlgorithmType} from './algorithm';
import {BinaryTree} from './binarytree';
import {Grid} from './grid';

interface Algorithms {
	[key: string]: Algorithm;
}

export class Maze {

	private _algorithm: AlgorithmType;
	private _algorithms: Algorithms = {
		[AlgorithmType.BinaryTree]: new BinaryTree()
	};

	private _grid: Grid;

	constructor(rows: number, cols: number, algorithm: AlgorithmType = AlgorithmType.BinaryTree) {

		if (rows < 1) rows = 1;
		if (cols < 1) cols = 1;

		this.resize(rows, cols, algorithm);
	}

	/**
	 * @return {string} the algorithm currently set within this instance.
	 */
	get algorithm(): AlgorithmType {
		return this._algorithm;
	}

	/**
	 * @return {number[][]} a 2D array that represents how each cell is drawn
	 */
	get array(): number[][] {
		// TODO: implement array function within Maze
		return null;
	}

	/**
	 * @return {number} the number of columns in this maze
	 */
	get cols(): number {
		return this._grid.cols;
	}

	/**
	 * @return {number} the number of rows in this maze
	 */
	get rows(): number {
		return this._grid.rows;
	}

	/**
	 * @return {string} an ASCII string representation of the maze
	 */
	get string(): string {
		return this._grid.toString();
	}

	/**
	 * Takes a given maze algorithm, resets the gride and applies this algorithm to the
	 * grid.  The previous grid is lost with this operation.
	 * @param algorithm {AlgorithmType} the algorithm that will be applied to the grid.
	 * this is an enumeration with the possible types that can be generated.
	 */
	public rebuild(algorithm: AlgorithmType) {
		this._algorithm = algorithm;
		this._grid.reset();
		this._algorithms[algorithm].process(this._grid);
	}

	/**
	 * Allows one to change the initial size of the grid.  This will created the grid and
	 * apply the given algorithm to the newly sized grid.
	 * @param rows {number} the new number of rows in this grid
	 * @param cols {number} the new number of cols in this grid
	 * @param [algorithm] {AlgorithmType} the maze algorithm that will be applied to the
	 * grid.  If one is not given, then the initial algorithm is reapplied.
	 */
	public resize(rows: number, cols: number, algorithm: AlgorithmType = this.algorithm) {
		this._grid = new Grid(rows, cols);
		this.rebuild(algorithm);
	}
}

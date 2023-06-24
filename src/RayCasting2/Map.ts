import { ImagePack } from './ImagePack';
import { rayEnv } from './Ray';

export class Map {
	size = 0;
	wallGrid: Uint8Array;
	skybox = new ImagePack('', 2000, 750);
	wallTexture = new ImagePack('', 1024, 1024);
	light = 0;

	constructor(size: number) {
		this.size = size;
		this.wallGrid = new Uint8Array(size * size);
	}

	get(x: number, y: number) {
		x = Math.floor(x);
		y = Math.floor(y);
		if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) {
			return -1;
		}
		return this.wallGrid[y * this.size + x];
	}

	randomMap() {
		for (let i = 0; i < this.size * this.size; i++) {
			this.wallGrid[i] = Math.random() < 0.3 ? 1 : 0;
		}
	}

	cast(point: { x: number; y: number }, angle: number, range: number) {
		const sin = Math.sin(angle);
		const cos = Math.cos(angle);
        const noWall = { length2: Infinity, x: 0, y: 0 };
		return rayEnv(sin, cos, range, noWall, this, {
			x: point.x,
			y: point.y,
			height: 0,
			distance: 0,
		});
	}

    update (seconds: number) {
        if (this.light > 0) this.light = Math.max(this.light - 10 * seconds, 0);
        else if (Math.random() * 5 < seconds) this.light = 2;
    }
}

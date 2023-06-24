import { ImagePack } from "./ImagePack";
import { Map } from "./Map";

export class Player {
    up = false;
	down = false;
	left = false;
	right = false;

	x = 0;
	y = 0;
	direction = 0;
	paces = 0;
	weapon = new ImagePack('', 319, 320);

	constructor(x: number, y: number, direction: number) {
		this.x = x;
		this.y = y;
		this.direction = direction;
	}

	listen() {
		window.onkeydown = this.onKeyDown.bind(this);
		window.onkeyup = this.onKeyUp.bind(this);
	}

	onKeyDown(e: KeyboardEvent) {
		switch (e.code) {
			case 'KeyW':
				this.up = true;
				break;
			case 'KeyS':
				this.down = true;
				break;
			case 'KeyD':
				this.right = true;
				break;
			case 'KeyA':
				this.left = true;
				break;
		}
	}

	onKeyUp(e: KeyboardEvent) {
		switch (e.code) {
			case 'KeyW':
				this.up = false;
				break;
			case 'KeyS':
				this.down = false;
				break;
			case 'KeyD':
				this.right = false;
				break;
			case 'KeyA':
				this.left = false;
				break;
		}
	}

	rotate(angle: number) {
		this.direction = (this.direction + angle + 2 * Math.PI) % (2 * Math.PI);
	}

	walk(distance: number, map: Map) {
		const dx = Math.cos(this.direction) * distance;
		const dy = Math.sin(this.direction) * distance;
		if (map.get(this.x + dx, this.y) <= 0) {
			this.x += dx;
		}
		if (map.get(this.x, this.y + dy) <= 0) {
			this.y += dy;
		}
		this.paces += distance;
	}

	update(seconds: number, map: Map) {
		if (this.left) {
			this.rotate(-Math.PI * seconds);
		}
		if (this.right) {
			this.rotate(Math.PI * seconds);
		}
		if (this.up) {
			this.walk(3 * seconds, map);
		}
		if (this.down) {
			this.walk(-3 * seconds, map);
		}
	}
}
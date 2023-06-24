// export class GameLoop {
// 	lastTime = 0;
// 	callback: (sec: number) => void;

// 	start(cb: (sec: number) => void) {
// 		this.callback = cb;
// 		requestAnimationFrame(this.frame);
// 	}

// 	frame(time: number) {
// 		const seconds = (time - this.lastTime) / 1000;
// 		this.lastTime = time;
// 		if (seconds < 0.2) this.callback(seconds);
// 		requestAnimationFrame(this.frame);
// 	}
// }

export function GameLoop() {
	this.frame = this.frame.bind(this);
	this.lastTime = 0;
	this.callback = function () {};
}

GameLoop.prototype.start = function (callback: (sec: number) => void) {
	this.callback = callback;
	requestAnimationFrame(this.frame);
};

GameLoop.prototype.frame = function (time: number) {
	const seconds = (time - this.lastTime) / 1000;
	this.lastTime = time;
	if (seconds < 0.2) this.callback(seconds);
	requestAnimationFrame(this.frame);
};

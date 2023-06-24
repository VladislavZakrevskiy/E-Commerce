import { Map } from './Map';

export const rayEnv = (
	sin: number,
	cos: number,
	range: number,
	noWall: { length2: number; x: number; y: number },
	self: Map,
	origin: {
		x: number;
		y: number;
		height: number;
		distance: number;
	}
) => {
	function ray(origin: {
		x: number;
		y: number;
		height: number;
		distance: number;
	}): any[] {
		const stepX = step(sin, cos, origin.x, origin.y, false);
		const stepY = step(cos, sin, origin.y, origin.x, true);
		const nextStep =
			stepX.length2 < stepY.length2
				? inspect(stepX, 1, 0, origin.distance, stepX?.y)
				: inspect(stepY, 0, 1, origin.distance, stepY?.x);

		if (nextStep.distance > range) return [origin];
		return [origin].concat(ray(nextStep));
	}

	function step(
		rise: number,
		run: number,
		x: number,
		y: number,
		inverted: boolean
	) {
		if (run === 0) return noWall;
		const dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
		const dy = dx * (rise / run);
		return {
			x: inverted ? y + dy : x + dx,
			y: inverted ? x + dx : y + dy,
			length2: dx * dx + dy * dy,
		};
	}

	function inspect(
		step: {
			x: number;
			y: number;
			height: number;
			distance: number;
			shading?: number;
			offset?: number;
			length2: number;
		},
		shiftX: number,
		shiftY: number,
		distance: number,
		offset: number
	) {
		const dx = cos < 0 ? shiftX : 0;
		const dy = sin < 0 ? shiftY : 0;
		step.height = self.get(step.x - dx, step.y - dy);
		step.distance = distance + Math.sqrt(step.length2 || 0);
		if (shiftX) step.shading = cos < 0 ? 2 : 0;
		else step.shading = sin < 0 ? 2 : 1;
		step.offset = offset - Math.floor(offset);
		return step;
	}

    return ray(origin)
};

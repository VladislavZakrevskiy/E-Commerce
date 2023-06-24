// import { useEffect, useRef } from 'react';
// import { Player } from './RayCasting2/Player';
// import { Map } from './RayCasting2/Map';
// import { Camera } from './RayCasting2/Camera';
// import { GameLoop } from './RayCasting2/GameLoop';

// const App2 = () => {
// 	const gameRef = useRef<HTMLCanvasElement | null>(null);
// 	const mapRef = useRef<HTMLCanvasElement | null>(null);

// 	useEffect(() => {
// 		if (gameRef.current) {
// 			const gameCanvas = gameRef.current;
// 			// const gameCtx = gameCanvas.getContext('2d');

// 			const player = new Player(15.3, -1.2, Math.PI * 0.3);
//             const map = new Map(32);
//             const camera = new Camera(gameCanvas, 320, 0.8);
//             const loop = new GameLoop();

//             map.randomMap();
            
//             loop.start(function frame(seconds: number) {
//                 map.update(seconds);
//                 player.update(seconds, map);
//                 camera.render(player, map);
//             });

// 		}
// 	}, [ gameRef]);

// 	return (
//         <canvas
//             ref={gameRef}
//             style={{ border: '1px solid black', width: '100%', height: '100%' }}
//         />
// 	);
// };

// export default App2;

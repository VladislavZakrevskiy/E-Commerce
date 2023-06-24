import { useEffect, useRef } from 'react';
import { Camera } from './RayCasting/Camera';

function App() {
	const gameRef = useRef<HTMLCanvasElement | null>(null);
	const mapRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (gameRef.current && mapRef.current) {
      const gameCanvas = gameRef.current
      const mapCanvas = mapRef.current
      const gameCtx = gameCanvas.getContext('2d')
      const mapCtx = mapCanvas.getContext('2d')
      const camera = new Camera(gameCanvas, mapCanvas)

      const animate = () =>  {
        gameCtx?.clearRect(0, 0, gameCanvas.width, gameCanvas.height)
        mapCtx?.clearRect(0, 0, mapCanvas.width, mapCanvas.height)

        gameCtx!.fillStyle = "rgba(17, 51, 119, 0.7)";
				gameCtx?.fillRect(0, 0, gameCanvas.width, gameCanvas.height / 2);
				gameCtx!.fillStyle = "rgba(0,0,0, 0.8)";
				gameCtx?.fillRect(0, gameCanvas.height / 2, gameCanvas.width, gameCanvas.height / 2);

        camera.move()

        requestAnimationFrame(animate)
      }
      camera.start()
      animate()
    }
	}, [mapRef, gameRef]);

	return (
		<>
			<canvas
				ref={gameRef}
				style={{ border: '1px solid black', width: 700, height: 700 }}
				width={700}
				height={700}
			/>
			<canvas
				ref={mapRef}
				style={{ border: '1px solid black', width: 350, height: 350 }}
				width={350}
				height={350}
			/>
		</>
	);
}

export default App;

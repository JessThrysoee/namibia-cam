import './App.css';
import { useState } from 'react';
import { PictureInPicture } from './PictureInPicture';
import { PictureMain } from './PictureMain';

const initialUrls = [
  'https://www.youtube.com/watch?v=AeMUdOPFcXI',
  'https://www.youtube.com/watch?v=ydYDqZQpim8',
  'https://www.youtube.com/watch?v=ME0dPuBtzug',
];

function App() {
  const [urls, setUrls] = useState(initialUrls);
  const [pointerEvents, setPointerEvents] = useState<'auto' | 'none'>('auto');

  const pipWidth = Math.round(Math.min(300, window.innerWidth / 3, ((window.innerHeight / 4) * 16) / 9));
  const pipHeight = (pipWidth * 9) / 16;

  const swapWithMain = (index: number) => {
    setUrls((current) => {
      const next = [...current];
      [next[0], next[index]] = [next[index], next[0]];
      return next;
    });
  };

  return (
    <>
      <title>NamibiaCam</title>

      <div style={{ pointerEvents: pointerEvents }}>
        <PictureMain src={urls[0]} />
      </div>

      <PictureInPicture
        x={12}
        y={100}
        width={pipWidth}
        url={urls[1]}
        onClick={() => swapWithMain(1)}
        onRndStart={() => setPointerEvents('none')}
        onRndStop={() => setPointerEvents('auto')}
      />

      <PictureInPicture
        x={12}
        y={100 + pipHeight + 20}
        width={pipWidth}
        url={urls[2]}
        onClick={() => swapWithMain(2)}
        onRndStart={() => setPointerEvents('none')}
        onRndStop={() => setPointerEvents('auto')}
      />
    </>
  );
}

export { App };

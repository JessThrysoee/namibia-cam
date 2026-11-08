import './App.css';
import { useState } from 'react';
import { PictureInPicture } from './PictureInPicture';
import { PictureMain } from './PictureMain';

const initialStreams = [
  { name: 'Okaukuejo waterhole', url: 'https://www.youtube.com/watch?v=AeMUdOPFcXI' },
  { name: 'Namib Desert', url: 'https://www.youtube.com/watch?v=ydYDqZQpim8' },
  { name: 'Kalahari Desert', url: 'https://www.youtube.com/watch?v=ME0dPuBtzug' },
];

const pipWidth = Math.round(Math.min(300, window.innerWidth / 3, ((window.innerHeight / 4) * 16) / 9));
const pipHeight = (pipWidth * 9) / 16;

function App() {
  const [streams, setStreams] = useState(initialStreams);
  const [pointerEvents, setPointerEvents] = useState<'auto' | 'none'>('auto');
  const [frontSlot, setFrontSlot] = useState(2);

  const swapWithMain = (index: number) => {
    setStreams((current) => {
      const next = [...current];
      [next[0], next[index]] = [next[index], next[0]];
      return next;
    });
  };

  return (
    <>
      <div style={{ pointerEvents }}>
        <PictureMain src={streams[0].url} />
      </div>

      <PictureInPicture
        x={12}
        y={100}
        width={pipWidth}
        url={streams[1].url}
        label={streams[1].name}
        onTop={frontSlot === 1}
        onClick={() => swapWithMain(1)}
        onRndStart={() => {
          setPointerEvents('none');
          setFrontSlot(1);
        }}
        onRndStop={() => setPointerEvents('auto')}
      />

      <PictureInPicture
        x={12}
        y={100 + pipHeight + 20}
        width={pipWidth}
        url={streams[2].url}
        label={streams[2].name}
        onTop={frontSlot === 2}
        onClick={() => swapWithMain(2)}
        onRndStart={() => {
          setPointerEvents('none');
          setFrontSlot(2);
        }}
        onRndStop={() => setPointerEvents('auto')}
      />
    </>
  );
}

export { App };

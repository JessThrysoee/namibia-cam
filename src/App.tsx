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

const thumbnailSlots = initialStreams.slice(1).map((_, i) => i + 1);

function App() {
  const [streams, setStreams] = useState(initialStreams);
  const [pointerEvents, setPointerEvents] = useState<'auto' | 'none'>('auto');
  const [frontSlot, setFrontSlot] = useState(thumbnailSlots.length);

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

      {thumbnailSlots.map((slot) => (
        <PictureInPicture
          key={slot}
          x={12}
          y={100 + (slot - 1) * (pipHeight + 20)}
          width={pipWidth}
          url={streams[slot].url}
          label={streams[slot].name}
          onTop={frontSlot === slot}
          onClick={() => swapWithMain(slot)}
          onRndStart={() => {
            setPointerEvents('none');
            setFrontSlot(slot);
          }}
          onRndStop={() => setPointerEvents('auto')}
        />
      ))}
    </>
  );
}

export { App };

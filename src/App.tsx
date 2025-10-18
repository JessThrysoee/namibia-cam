import './App.css';
import { useState } from 'react';
import { PictureInPicture } from './PictureInPicture';
import { PictureMain } from './PictureMain';

const urls = {
  video1: 'https://www.youtube.com/watch?v=AeMUdOPFcXI',
  video2: 'https://www.youtube.com/watch?v=ydYDqZQpim8',
  video3: 'https://www.youtube.com/watch?v=ME0dPuBtzug',
};

function App() {
  const [url, setUrl] = useState<string>(urls.video1);
  const [pointerEvents, setPointerEvents] = useState<'auto' | 'none'>('auto');

  const swapUrls = (key: keyof typeof urls) => {
    [urls.video1, urls[key]] = [urls[key], urls.video1];
    setUrl(urls.video1);
  };

  return (
    <>
      <title>NamibiaCam</title>

      <div style={{ pointerEvents: pointerEvents }}>
        <PictureMain src={url} />
      </div>

      <PictureInPicture
        x={12}
        y={100}
        width={300}
        url={urls.video2}
        onClick={() => swapUrls('video2')}
        onRndStart={() => setPointerEvents('none')}
        onRndStop={() => setPointerEvents('auto')}
      />

      <PictureInPicture
        x={12}
        y={290}
        width={300}
        url={urls.video3}
        onClick={() => swapUrls('video3')}
        onRndStart={() => setPointerEvents('none')}
        onRndStop={() => setPointerEvents('auto')}
      />
    </>
  );
}

export { App };

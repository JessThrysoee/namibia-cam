import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const style: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  margin: '0 auto',
  width: 'min(100dvw, calc(100dvh * 16 / 9))',
  height: 'min(100dvh, calc(100dvw * 9 / 16))',
};

type Props = {
  src: string;
};

const PictureMain = React.memo(function PictureMain({ src }: Props) {
  // react-player sets volume to this prop (default 1) on every render, which would reset it on a swap
  const [volume, setVolume] = useState(1);
  return (
    <ReactPlayer
      controls
      autoPlay
      style={style}
      src={src}
      volume={volume}
      onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
    />
  );
});

export { PictureMain };

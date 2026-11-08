import React from 'react';
import ReactPlayer from 'react-player';

const style: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  margin: 'auto',
  width: 'min(100dvw, calc(100dvh * 16 / 9))',
  height: 'min(100dvh, calc(100dvw * 9 / 16))',
};

type Props = {
  src: string;
};

const PictureMain = React.memo(function PictureMain({ src }: Props) {
  return <ReactPlayer controls playing={true} style={style} src={src} />;
});

export { PictureMain };

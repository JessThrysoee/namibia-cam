import React from 'react';
import ReactPlayer from 'react-player';

const style: React.CSSProperties = {
  width: '100%',
  height: 'auto',
  aspectRatio: '16/9',
};

type Props = {
  src: string;
};

const PictureMain = React.memo(function PictureMain({ src }: Props) {
  return <ReactPlayer controls playing={true} style={style} src={src} />;
});

export { PictureMain };

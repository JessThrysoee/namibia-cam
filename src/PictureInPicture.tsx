import { useCallback, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { Rnd } from 'react-rnd';

type VideoPlacement = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const styleVideo: React.CSSProperties = {
  width: '100%',
  height: 'auto',
  aspectRatio: '16/9',
};

type Props = {
  x: number;
  y: number;
  width: number;
  url: string;
  onClick: () => void;
  onRndStart: () => void;
  onRndStop: () => void;
};

function PictureInPicture({ x, y, width, url, onClick, onRndStart, onRndStop }: Props) {
  const isActive = useRef(false);

  const minWidth = width;
  const minHeight = (width * 9) / 16;

  const [placemant, setPlacement] = useState<VideoPlacement>({
    x: x,
    y: y,
    width: minWidth,
    height: minHeight,
  });

  const handleClick = useCallback(() => {
    if (!isActive.current) {
      onClick();
    }
  }, [onClick]);

  const rndStart = () => {
    isActive.current = true;
    onRndStart();
  };

  const rndStop = () =>
    setTimeout(() => {
      // delay resetting isActive to avoid click event firing immediately after drag or resize
      isActive.current = false;
      onRndStop();
    }, 0);

  return (
    <Rnd
      size={placemant}
      position={placemant}
      bounds="body"
      minWidth={minWidth}
      minHeight={minHeight}
      lockAspectRatio={true}
      onDrag={rndStart}
      onDragStop={(_e, d) => {
        setPlacement((s) => ({ ...s, x: d.x, y: d.y }));
        rndStop();
      }}
      onResizeStart={rndStart}
      onResizeStop={(_e, _direction, ref, _delta, position) => {
        setPlacement((s) => ({
          ...s,
          ...{ width: ref.offsetWidth, height: ref.offsetHeight },
          ...position,
        }));
        rndStop();
      }}
      onClick={handleClick}
      style={{ backgroundColor: 'grey', pointerEvents: 'auto' }}
      enableResizing={{
        top: false,
        right: false,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false,
      }}
    >
      <ReactPlayer
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        playing={true}
        muted={true}
        style={{ ...styleVideo, ...{ pointerEvents: 'none' } }}
        src={url}
      />
    </Rnd>
  );
}

export { PictureInPicture, type VideoPlacement };

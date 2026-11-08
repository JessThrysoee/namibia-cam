import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { Rnd } from 'react-rnd';

type VideoPlacement = {
  x: number;
  y: number;
  width: number;
  height: number;
};

function fitToViewport(p: VideoPlacement): VideoPlacement {
  const width = Math.min(p.width, window.innerWidth, (window.innerHeight * 16) / 9);
  const height = width === p.width ? p.height : (width * 9) / 16;
  const x = Math.max(0, Math.min(p.x, window.innerWidth - width));
  const y = Math.max(0, Math.min(p.y, window.innerHeight - height));
  return x === p.x && y === p.y && width === p.width ? p : { x, y, width, height };
}

const styleVideo: React.CSSProperties = {
  width: '100%',
  height: 'auto',
  minWidth: 0,
  minHeight: 0,
  aspectRatio: '16/9',
  pointerEvents: 'none',
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

  const minWidth = Math.min(width, 120);
  const minHeight = (minWidth * 9) / 16;

  const [placement, setPlacement] = useState<VideoPlacement>(() =>
    fitToViewport({ x, y, width, height: (width * 9) / 16 }),
  );

  useEffect(() => {
    const onResize = () => setPlacement(fitToViewport);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleClick = () => {
    if (!isActive.current) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

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
      size={placement}
      position={placement}
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
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          ...position,
        }));
        rndStop();
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Show in main view"
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
      <div inert>
        <ReactPlayer playing={true} muted={true} style={styleVideo} src={url} />
      </div>
    </Rnd>
  );
}

export { PictureInPicture };

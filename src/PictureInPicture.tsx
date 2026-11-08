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

const styleResizeHandle: React.CSSProperties = {
  position: 'absolute',
  right: 0,
  bottom: 0,
  width: 20,
  height: 20,
  cursor: 'se-resize',
  touchAction: 'none',
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
  const resizeStart = useRef<{ x: number; y: number; width: number } | null>(null);

  const [placement, setPlacement] = useState<VideoPlacement>(() =>
    fitToViewport({ x, y, width, height: (width * 9) / 16 }),
  );

  useEffect(() => {
    const onResize = () => setPlacement(fitToViewport);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (!isActive.current && !(e.target as Element).closest('.resize-handle')) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!e.repeat) onClick();
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

  const handleResizeStart = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    resizeStart.current = { x: e.clientX, y: e.clientY, width: placement.width };
    rndStart();
  };

  const handleResize = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!resizeStart.current) return;
    const dx = e.clientX - resizeStart.current.x;
    const dy = e.clientY - resizeStart.current.y;
    const dw = ((dx * 16 + dy * 9) / (16 * 16 + 9 * 9)) * 16;
    const maxWidth = Math.min(window.innerWidth - placement.x, ((window.innerHeight - placement.y) * 16) / 9);
    const newWidth = Math.min(Math.max(resizeStart.current.width + dw, minWidth), maxWidth);
    setPlacement((s) => ({ ...s, width: newWidth, height: (newWidth * 9) / 16 }));
  };

  const handleResizeStop = () => {
    if (!resizeStart.current) return;
    resizeStart.current = null;
    rndStop();
  };

  return (
    <Rnd
      size={placement}
      position={placement}
      bounds="body"
      onDrag={rndStart}
      onDragStop={(_e, d) => {
        setPlacement((s) => ({ ...s, x: d.x, y: d.y }));
        rndStop();
      }}
      cancel=".resize-handle"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Show in main view"
      style={{ backgroundColor: 'grey', pointerEvents: 'auto' }}
      enableResizing={false}
    >
      <div inert>
        <ReactPlayer playing={true} muted={true} style={styleVideo} src={url} />
      </div>
      <div
        className="resize-handle"
        style={styleResizeHandle}
        onPointerDown={handleResizeStart}
        onPointerMove={handleResize}
        onPointerUp={handleResizeStop}
        onPointerCancel={handleResizeStop}
      />
    </Rnd>
  );
}

export { PictureInPicture };

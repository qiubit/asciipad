import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

// Based on: http://www.petecorey.com/blog/2019/08/19/animating-a-canvas-with-react-hooks/

const Circle = () => {
  let ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let canvas = ref.current;
    if (canvas == null) {
      return;
    }
    let context = canvas.getContext('2d');
    if (context == null) {
      return;
    }
    context.fillStyle = "#FF0000";
    context.fillRect(25, 25, 50, 50);
  });

  return (
    <canvas
      ref={ref} 
      style={{ backgroundColor: 'darkcyan' }}
      width={100}
      height={100}
    />
  );
};

export default Circle;
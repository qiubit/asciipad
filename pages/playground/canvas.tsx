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
    context.beginPath();
    context.arc(50, 50, 50, 0, 2 * Math.PI);
    context.fill();
  });

  return (
    <canvas
      ref={ref} 
      style={{ width: '200px', height: '100px' }}
    />
  );
};

export default Circle;
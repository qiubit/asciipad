import React from 'react';
import { useEffect, useRef, useState } from 'react';

const WIDTH = 300;
const HEIGHT = 100;

// Based on: http://www.petecorey.com/blog/2019/08/19/animating-a-canvas-with-react-hooks/

const Circle = () => {
  let ref = useRef<HTMLCanvasElement>(null);
  let [imageData, setImageData] = useState<ImageData | null>(null);

  let [inputText, setInputText] = useState<string>("Enter text");
  let [asciiText, setAsciiText] = useState<string>("");

  useEffect(() => {
    console.log('useEffect')
    let canvas = ref.current;
    if (canvas == null) {
      return;
    }
    let context = canvas.getContext('2d');
    if (context == null) {
      return;
    }
    context.clearRect(0, 0, WIDTH, HEIGHT);
    context.fillStyle = "#FF0000";
    context.font = '40px Anton';
    context.fillText(inputText, 5, 45);

    let imageData = context.getImageData(0, 0, WIDTH, HEIGHT)
    setImageData(imageData)
  }, [inputText]);

  useEffect(() => {
    if (imageData != null) {
      let textArr: string[][] = [];
      for (let i = 0; i < HEIGHT; i++) {
        textArr.push([]);
        for (let j = 0; j < WIDTH; j++) {
          textArr[i].push('.');
        }
      }

      for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
          let wOffset = i*WIDTH*4;
          let hOffset = j*4;
          if (imageData.data[wOffset+hOffset + 0] > 254 || imageData.data[wOffset+hOffset + 1] > 254 || imageData.data[wOffset+hOffset + 2] > 254) {
            textArr[i][j] = '@';
          }
        }
      }

      let flattenedArr: string[] = [];
      for (let i = 0; i < HEIGHT; i++) {
        flattenedArr.push(textArr[i].join(""));
      }
      setAsciiText(flattenedArr.join("<br />"));
    }
  }, [imageData])

  return (
    <div>
      <input type="text" value={inputText} onChange={evt => setInputText(evt.target.value)} />
      <canvas
        ref={ref}
        width={WIDTH}
        height={HEIGHT}
      />
      <p style={{ fontFamily: "monospace" }} dangerouslySetInnerHTML={{ __html: asciiText }} />
    </div>
  );
};

export default Circle;
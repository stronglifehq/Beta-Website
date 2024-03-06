import { prominent } from "color.js";
import { useCallback, useEffect, useRef, useState } from "react";
import pixelit, { Palette } from "tools/pixelit";

type Props = {
  src: string;
  amount: number;
  height: string;
};

const PixelImage = ({ src, amount, height }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const [isPixelated, setIsPixelated] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const image = useRef<HTMLImageElement>(null);

  console.log("pix", isPixelated);

  useCallback(() => {}, []);

  useEffect(() => {
    const createPixelImage = async () => {
      console.log("calculation started");
      const output = await prominent(src, {
        amount,
        sample: 20,
      });
      if (typeof output != "string") {
        console.log("output is not string");
        const colors = output as Palette;
        const px = new pixelit({
          from: image.current,
          to: canvas.current,
          palette: colors,
          scale: 9,
        });
        px.draw().pixelate().convertPalette();
        setIsPixelated(true);
      }
    };
    if (isHover) createPixelImage();
  }, [isHover]);

  return (
    <div
      onMouseEnter={() => {
        if (isPixelated) setIsPixelated(false);
        else setIsHover(true);
      }}
      onMouseLeave={() => setIsHover(false)}
      css={{
        height: "50px",
        minWidth: "50px",
        width: "fit-content",
      }}
    >
      <img
        src={src}
        ref={image}
        css={{ display: isPixelated ? "none" : "block", height }}
      />
      <canvas
        css={{ display: isPixelated ? "block" : "none", height }}
        ref={canvas}
      ></canvas>
    </div>
  );
};

export default PixelImage;

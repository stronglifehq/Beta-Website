import React from "react";

type Props = {
  src: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

const ItemImage = ({ src, ...rest }: Props) => {
  return <img src={src} {...rest} css={{}}></img>;
};

export default ItemImage;

import { useEffect, useState } from "react";
import { colors } from "theme";
import { Link } from "wouter";

type Props = {
  name: string;
  path: string;
};

type AnimatedCharacterProps = {
  character: string;
  selected: boolean;
};

const AnimatedCharacter = ({ character, selected }: AnimatedCharacterProps) => {
  return (
    <span
      css={{
        background: selected ? colors.black : colors.cyan,
        color: selected ? colors.cyan : colors.black,
      }}
    >
      {character}
    </span>
  );
};

const HoverLink = ({ name, path }: Props) => {
  const [select, setSelect] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (hover && select < name.length) setSelect(select + 1);
      else if (!hover && select > 0) setSelect(select - 1);
      else clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [hover, select]);

  return (
    <Link
      css={{
        textDecoration: "none",
        color: "black",
        fontSize: "24px",
      }}
      href={path}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {name.split("").map((character, i) => (
        <AnimatedCharacter
          key={i}
          character={character}
          selected={i < select}
        />
      ))}
    </Link>
  );
};

export default HoverLink;

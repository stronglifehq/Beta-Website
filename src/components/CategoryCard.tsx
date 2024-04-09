import gym from "../assets/card/gym.svg";
import men from "../assets/card/men.svg";
import women from "../assets/card/women.svg";
import protein from "../assets/card/protein.svg";
import { useLocation } from "wouter";

type Props = {
  type: "1" | "2" | "3" | "4";
};

const CategoryCard = ({ type }: Props) => {
  const [_, setLocation] = useLocation();
  const type2img = (type: "1" | "2" | "3" | "4") => {
    switch (type) {
      case "1":
        return protein;
      case "2":
        return gym;
      case "3":
        return women;
      case "4":
        return men;
    }
  };
  return (
    <img
      src={type2img(type)}
      css={{
        width: "100%",
        objectFit: "cover",
        cursor: "pointer",
      }}
      onClick={() => setLocation(`/prod/${type}`)}
    />
  );
};

export default CategoryCard;

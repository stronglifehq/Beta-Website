import { colors } from "theme";
import { useLocation } from "wouter";

type Props = {
  img: string;
  title: string;
  description: string;
};

const CurationCard = ({ img, title, description }: Props) => {
  const [_, setLocation] = useLocation();

  return (
    <div
      css={{
        width: "100%",
        position: "relative",
      }}
      onClick={() => setLocation("/curation")}
    >
      <img src={img} css={{ width: "100%" }} />
      <div
        css={{
          fontSize: "19px",
          fontWeight: "bold",
          position: "absolute",
          bottom: "90px",
          left: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          color: "#FFF",
          width: "50%",
          textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div>{title}</div>
        <div
          css={{
            fontSize: "14px",
            fontWeight: "medium",
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default CurationCard;

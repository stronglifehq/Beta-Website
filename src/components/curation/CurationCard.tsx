import Typography from "components/common/Typography";
import { useLocation } from "wouter";

type Props = {
  img: string;
  title: React.ReactNode;
  description: React.ReactNode;
};

const CurationCard = ({ img, title, description }: Props) => {
  const [_, setLocation] = useLocation();

  return (
    <div
      css={{
        width: "100%",
        position: "relative",
        maxWidth: "500px",
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
        }}
      >
        <Typography
          fs={28}
          fw="medium"
          c="white"
          s={{
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          {title}
        </Typography>
        <Typography
          fs={14}
          fw="bold"
          c="white"
          s={{
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default CurationCard;

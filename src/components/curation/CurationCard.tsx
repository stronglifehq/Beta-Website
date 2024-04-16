import Typography from "components/common/Typography";
import { useLocation } from "wouter";

type Props = {
  img: string;
  title: React.ReactNode;
  description: React.ReactNode;
  mode?: string;
};

const CurationCard = ({ img, title, description, mode }: Props) => {
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
      {mode == "curation" ? (
        <div
          css={{
            fontSize: "19px",
            fontWeight: "bold",
            position: "absolute",
            top: "110px",
            left: "40px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            color: "#FFF",
            width: "50%",
          }}
        >
          <Typography
            fs={20}
            fw="bold"
            c="white"
            s={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            {description}
          </Typography>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default CurationCard;

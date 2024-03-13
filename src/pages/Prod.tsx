import { colors } from "theme";
import { useParams } from "wouter";

const Prod = () => {
  const { prodId } = useParams();

  const id2name = (id: string | undefined) => {
    switch (id) {
      case "1":
        return "보충제 및 영양제";
      case "2":
        return "헬스용품";
      case "3":
        return "여성 의류";
      case "4":
        return "남성 의류";
      default:
        return "Unknown";
    }
  };

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: colors.text,
        width: "100vw",
        padding: "32px 40px",
      }}
    >
      <div
        css={{
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        {id2name(prodId)}
      </div>
    </div>
  );
};

export default Prod;

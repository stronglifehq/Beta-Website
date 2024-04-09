import { colors } from "theme";

// 100	Thin
// 200	Extra Light
// 300	Light
// 400	Regular
// 500	Medium
// 600	Semi Bold
// 700	Bold
// 800	Extra Bold
// 900	Black
// 950	Extra Black

type Props = {
  lh?: number;
  fs?: number;
  fw?: string;

  c?: string;
  lang?: string;

  children?: React.ReactNode;
  s?: any;
};

const Typography = ({
  lh,
  fs = 16, // Font size
  fw = "regular", // Font weight
  c = colors.text, // Color
  lang = "ko",
  children,
  s,
}: Props) => {
  if (!lh) lh = fs * 1.4;

  let fwValue = 400;
  switch (fw) {
    case "thin":
      fwValue = 100;
      break;
    case "extra-light":
      fwValue = 200;
      break;
    case "light":
      fwValue = 300;
      break;
    case "regular":
      fwValue = 400;
      break;
    case "medium":
      fwValue = 500;
      break;
    case "semi-bold":
      fwValue = 600;
      break;
    case "bold":
      fwValue = 700;
      break;
    case "extra-bold":
      fwValue = 800;
      break;
    case "black":
      fwValue = 900;
      break;
    case "extra-black":
      fwValue = 950;
      break;
  }

  return (
    <div
      css={{
        fontSize: `${fs}px`,
        lineHeight: `${lh}px`,
        fontWeight: fwValue,
        color: c,
        fontFamily:
          lang === "ko" ? '"Pretendard", sans-serif' : '"Poppins", sans-serif',
        ...s,
      }}
    >
      {children}
    </div>
  );
};

export default Typography;

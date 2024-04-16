import Typography from "./common/Typography";

type Props = {
  text: string;
};

const Title = ({ text }: Props) => {
  return (
    <Typography
      fs={34}
      fw="medium"
      s={{
        margin: "24px 0",
      }}
      lang="en"
    >
      {text}
    </Typography>
  );
};

export default Title;

type Props = {
  text: string;
};

const Title = ({ text }: Props) => {
  return (
    <div
      css={{
        fontSize: "34px",
        margin: "24px 0",
      }}
    >
      {text}
    </div>
  );
};

export default Title;

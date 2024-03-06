import { colors } from "theme";

const Home = () => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: colors.primary,
        color: colors.text,
      }}
    ></div>
  );
};

export default Home;

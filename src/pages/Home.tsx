import BestSeller from "components/BestSeller";
import CategoryCard from "components/CategoryCard";
import CurationCard from "components/curation/CurationCard";
import EmailCollection from "components/EmailCollection";
import NewArrivals from "components/NewArrivals";
import Title from "components/Title";
import thumbnail from "assets/curation/thumbnail.png";
import { colors } from "theme";

const Home = () => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: colors.primary,
        color: colors.text,
        overflowX: "hidden",
        paddingBottom: "32px",
      }}
    >
      <CurationCard
        img={thumbnail}
        title="이게 운동복이라고?"
        description={
          <>
            일상에서도 무리없는 나만
            <br /> 알고싶은 짐웨어 브랜드
          </>
        }
      />
      <NewArrivals>
        <Title text="New Arrivals" />
      </NewArrivals>
      <EmailCollection />
      <Title text="Shop Category" />
      <div
        css={{
          padding: "0 32px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <CategoryCard type="1" />
        <CategoryCard type="2" />
        <CategoryCard type="3" />
        <CategoryCard type="4" />
      </div>
      <Title text="Best Sellers" />
      <BestSeller />
    </div>
  );
};

export default Home;

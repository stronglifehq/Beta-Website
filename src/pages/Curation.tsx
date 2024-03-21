import CurationCard from "components/CurationCard";
import { colors } from "theme";
import thumbnail from "assets/curation/thumbnail.png";
import image1 from "assets/curation/image1.png";
import image2 from "assets/curation/image2.png";
import image3 from "assets/curation/image3.png";
import item1 from "assets/curation/item1.svg";
import item2 from "assets/curation/item2.svg";
import item3 from "assets/curation/item3.svg";
import { Typography } from "antd";

const CurationImage = ({ src }: { src: string }) => {
  return <img src={src} css={{ width: "100%" }}></img>;
};

const CurationItem = ({ src }: { src: string }) => {
  return (
    <img src={src} css={{ width: "calc(100% - 64px)", margin: "16px" }}></img>
  );
};

const CurationBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography.Paragraph
      css={{
        textAlign: "center",
        margin: "16px 0",
      }}
    >
      {children}
    </Typography.Paragraph>
  );
};

const CurationTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography.Title
      level={4}
      css={{
        margin: "16px 0",
        fontWeight: "medium",
      }}
    >
      {children}
    </Typography.Title>
  );
};

const Curation = () => {
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
        description="일상에서도 무리없는 나만 알고싶은 짐웨어 브랜드"
      />
      <CurationTitle>운동복은 다 똑같다구요?</CurationTitle>
      <CurationBody>
        나만 알고 싶은 브랜드가 있나요?
        <br />
        당신의 취향에 맞는 짐웨어 브랜드를 찾아보세요.
        <br />
        운동할 때뿐만 아니라 일상에서도 눈길을 끄는 브랜드를
        <br />
        소개해드립니다.
      </CurationBody>
      <CurationImage src={image1} />
      <CurationBody>
        시각적 바디 포지티브가 아닌
        <br />
        나의 몸과 정서를 위한 리얼 바디 포지티브를
        <br />
        선도하기 위해 시작된 베리시의 촉감을 느껴보세요.
      </CurationBody>
      <CurationItem src={item1} />
      <CurationImage src={image2} />
      <CurationBody>
        운동력 제대로 끓어올리는
        <br />
        몸 좋아보이는 짐웨어지만 여기서 끝이 아니다.
        <br />
        일상에서까지 글램해보이는 짐웨어.
      </CurationBody>
      <CurationItem src={item2} />
      <CurationImage src={image3} />
      <CurationBody>
        건강한 라이프스타일과 패션을 기반으로
        <br />
        혁신적인 직물에 트렌디한 스타일을 통해
        <br />
        최고의 품질을 보여주는 요가복 브랜드
      </CurationBody>
      <CurationItem src={item3} />
    </div>
  );
};

export default Curation;

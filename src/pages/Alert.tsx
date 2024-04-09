import { CloseOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import Typography from "components/common/Typography";
import { useState } from "react";
import { colors } from "theme";

import { collection, addDoc } from "firebase/firestore";
import { db } from "services/firebase";

const Alert = () => {
  const [email, setEmail] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "emails"), {
        email: email,
        timestamp: new Date(),
      });
      setEmail("");
      messageApi.success("Email submitted successfully!");
      console.log("Email submitted successfully!");
    } catch (error) {
      messageApi.error("Failed to submit email");
    }
  };

  return (
    <div
      css={{
        display: "flex",
        padding: "120px 30px",
        alignItems: "center",
        boxSizing: "border-box",
        gap: "24px",
        flexDirection: "column",
        textAlign: "center",
        zIndex: 0,
      }}
    >
      {contextHolder}
      <CloseOutlined
        css={{
          position: "absolute",
          top: "16px",
          left: "16px",
          fontSize: "36px",
          color: colors.secondary,
          width: "32px",
          height: "32px",
        }}
        onClick={() => window.history.back()}
      />

      <Typography fs={16} fw="semi-bold">
        공동구매 알림
      </Typography>
      <Typography fs={12} fw="medium">
        상품의 공동구매가 진행되면 이메일로 알려드리겠습니다. 요청하신 내용은
        3개월 동안 저장됩니다.
      </Typography>
      <div
        css={{
          width: "100%",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Typography fs={12} fw="medium">
          이메일 입력
        </Typography>
        <Input
          css={{
            height: "40px",
          }}
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button
        css={{
          height: "40px",
          padding: "0 32px",
        }}
        type="primary"
        onClick={handleSubmit}
      >
        <Typography fs={12} fw="medium" c={colors.primary}>
          알림받기
        </Typography>
      </Button>
    </div>
  );
};

export default Alert;

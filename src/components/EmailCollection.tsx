import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "services/firebase";
import { message } from "antd";
import { Input } from "antd";
import { MailOutlined } from "@ant-design/icons";

const EmailCollection = () => {
  const [email, setEmail] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async () => {
    try {
      // Reference to the "emails" collection
      const docRef = await addDoc(collection(db, "emails"), {
        email: email,
        timestamp: new Date(), // Adding a timestamp to know when the email was added
      });
      setEmail(""); // Clear the input after successful submission
      messageApi.success("Email submitted successfully!");
    } catch (error) {
      messageApi.error("Failed to submit email");
    }
  };

  return (
    <div
      css={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#F2F4F6",
        padding: "95px 32px",
        boxSizing: "border-box",
        gap: 10,
      }}
    >
      {contextHolder}
      <div
        css={{
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        공동구매 알림 받기
      </div>
      <div
        css={{
          fontSize: "14px",
          textAlign: "center",
          maxWidth: 400,
        }}
      >
        공동구매가 시작되기 이틀 전,
        <br />
        이메일로 알림을 드립니다!
        <br />
        <br />
        한정수량으로 진행, 품절되기 전에 미리 등록하세요!
      </div>
      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #000",
          marginTop: "30px",
        }}
      >
        <MailOutlined />
        <Input
          placeholder="이메일 주소"
          variant="borderless"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          css={{
            fontSize: "16px",
            width: "fit-content",
          }}
        />
        <div onClick={handleSubmit}>사전알림등록</div>
      </div>
    </div>
  );
};

export default EmailCollection;

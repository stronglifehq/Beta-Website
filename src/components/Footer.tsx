import { colors } from "theme";
import { Divider } from "antd";
import { InstagramOutlined } from "@ant-design/icons";
import logoDark from "assets/logo-dark.svg";
import { useState } from "react";
import { Modal } from "antd";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<any>();

  const privacyPolicy = (
    <>
      <h1>Privacy Policy</h1>
      <p>
        Your privacy is important to us. It is 3legant's policy to respect your
        privacy regarding any information we may collect from you across our
        website, <a href="https://3legant.com">https://3legant.com</a>, and
        other sites we own and operate.
      </p>

      <h2>1. Information we collect</h2>
      <h3>Log data</h3>
      <p>
        We log information about your device and the type of browser you use.
        Log data may include the device type, operating system, browser type,
        browser version, the pages of our website that you visit, the time and
        date of your visit, the time spent on those pages, unique device
        identifiers and other statistics.
      </p>

      <h3>Device data</h3>
      <p>
        We collect device data such as information about your computer, phone,
        tablet or other device you use to access the 3legant. Depending on the
        device used, this device data may include information such as your IP
        address (or proxy server), device and application identification
        numbers, location, browser type, hardware model Internet service
        provider and/or mobile carrier, operating system configuration
        information.
      </p>

      <h3>Personal information</h3>
      <p>
        We may ask for personal information, such as your name, email, and
        social media contact. This data is considered private and will not be
        shared with third parties.
      </p>

      <h2>2. Legal bases for processing</h2>
      <p>
        We will process your personal information lawfully, fairly and in a
        transparent manner. We collect and process information about you only
        where we have legal bases for doing so.
      </p>
    </>
  );

  const termsOfUse = (
    <>
      <h1>Terms of Use</h1>
      <p>
        Please read these terms of use carefully before using our website. By
        using our website, you agree to be bound by these terms of use. You must
        not use our website if you disagree with any part of these terms of use.
      </p>

      <h2>
        1.
        <strong>Intellectual Property Rights</strong>
      </h2>
      <p>
        Unless otherwise stated, we or our licensors own the intellectual
        property rights in the website and material on the website. Subject to
        the license below, all these intellectual property rights are reserved.
      </p>

      <h2>
        2.
        <strong>License to Use Website</strong>
      </h2>
      <p>
        You may view, download for caching purposes only, and print pages from
        the website, provided that:
      </p>
      <ul>
        <li>
          You must not republish material from this website (including
          republication on another website);
        </li>
        <li>
          You must not sell, rent or sub-license material from the website;
        </li>
        <li>
          You must not reproduce, duplicate, copy or otherwise exploit material
          on our website for a commercial purpose;
        </li>
        <li>
          You must not edit or otherwise modify any material on the website.
        </li>
      </ul>
    </>
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 30px",
        gap: "25px",
        backgroundColor: colors.secondary,
      }}
    >
      <img src={logoDark} alt="logo" css={{ width: 100 }} />
      <div
        css={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <Divider
          css={{
            backgroundColor: colors.textSecondary,
          }}
        />
        <InstagramOutlined
          css={{
            fontSize: 24,
          }}
          onClick={() => {
            window.open("https://www.instagram.com/", "_blank");
          }}
        />
        <div
          css={{
            display: "flex",
            alignItems: "center",
            fontSize: "12px",
            gap: "28px",
          }}
        >
          <div
            onClick={() => {
              setModalContent(privacyPolicy);
              showModal();
            }}
          >
            Privacy Policy
          </div>
          <div
            onClick={() => {
              setModalContent(termsOfUse);
              showModal();
            }}
          >
            Terms of Use
          </div>
        </div>
        <div
          css={{
            fontSize: "12px",
            fontWeight: "lighter",
          }}
        >
          Copyright © 2023 3legant. All rights reserved
        </div>
      </div>
      <Modal
        title="Attention"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default Footer;

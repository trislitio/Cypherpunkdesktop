"use client";

import type React from "react";
import { ConnectButton } from "thirdweb/react";
import { client } from "components/system/ThirdWeb/thirdWebClient";
import styles from "components/system/ThirdWeb/UserInfo.module.css";

const UserInfo: React.FC = () => (
  <div className={styles.userInfoWrapper}>
    <ConnectButton
      appMetadata={{
        name: "Example App",
        url: "https://example.com",
      }}
      client={client}
    />
  </div>
);

export default UserInfo;

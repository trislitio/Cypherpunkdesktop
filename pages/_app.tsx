// pages/_app.tsx
import { type AppProps } from "next/app";
import { useState } from "react";
import { ThirdwebProvider } from "thirdweb/react";
import { ErrorBoundary } from "components/pages/ErrorBoundary";
import Metadata from "components/pages/Metadata";
import StyledApp from "components/pages/StyledApp";
import SplashScreen from "components/system/ThirdWeb/SplashScreen";
import UserInfo from "components/system/ThirdWeb/Userinfo";
import { FileSystemProvider } from "contexts/fileSystem";
import { MenuProvider } from "contexts/menu";
import { ProcessProvider } from "contexts/process";
import { SessionProvider } from "contexts/session";
import { ViewportProvider } from "contexts/viewport";
import { WalletProvider } from "components/system/ThirdWeb/WalletContext";

const App = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ThirdwebProvider>
      <WalletProvider>
        {isAuthenticated ? (
          <ViewportProvider>
            <ProcessProvider>
              <FileSystemProvider>
                <SessionProvider>
                  <ErrorBoundary>
                    <Metadata />
                    <StyledApp>
                      <MenuProvider>
                        <Component {...pageProps} />
                        <UserInfo />
                      </MenuProvider>
                    </StyledApp>
                  </ErrorBoundary>
                </SessionProvider>
              </FileSystemProvider>
            </ProcessProvider>
          </ViewportProvider>
        ) : (
          <SplashScreen onConnect={() => setIsAuthenticated(true)} />
        )}
      </WalletProvider>
    </ThirdwebProvider>
  );
};

export default App;

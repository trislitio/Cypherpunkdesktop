// pages/_app.tsx
import { type AppProps } from "next/app";
import { useState } from "react";
import { ThirdwebProvider } from "thirdweb/react";
import { ErrorBoundary } from "components/pages/ErrorBoundary";
import Metadata from "components/pages/Metadata";
import StyledApp from "components/pages/StyledApp";
import SplashScreen from "components/system/ThirdWeb/SplashScreen";
import { FileSystemProvider } from "contexts/fileSystem";
import { MenuProvider } from "contexts/menu";
import { ProcessProvider } from "contexts/process";
import { SessionProvider } from "contexts/session";
import { ViewportProvider } from "contexts/viewport";

const App = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ThirdwebProvider>
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
    </ThirdwebProvider>
  );
};

export default App;

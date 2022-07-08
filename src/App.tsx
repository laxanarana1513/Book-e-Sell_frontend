import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthWrapper } from "./context/auth";
import "react-toastify/dist/ReactToastify.css";

import "./assets/css/style.css";
import { theme } from "./utils/theme";
import MainNavigation from "./components/MainNavigation";
import Header from "./components/header";
import Footer from "./components/footer";
import { CartWrapper } from "./context/cart";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<></>}>
        <BrowserRouter>
          <AuthWrapper>
            <CartWrapper>
            <div className="wrapper">
              <Header />
              <main>
                <MainNavigation />
                {/* hello */}
              </main>
              <Footer />
            </div>
            </CartWrapper>
          </AuthWrapper>
          <ToastContainer />
        </BrowserRouter>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;

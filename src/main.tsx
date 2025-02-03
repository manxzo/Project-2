import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ConfigProvider } from "./config.tsx";
import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
import { ToastProvider } from "./ToastConfig.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider>
        <ToastProvider>
          <Provider>
            <App />
          </Provider>
        </ToastProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);

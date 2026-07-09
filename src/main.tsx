import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "@/app/App";
import {
  QueryProvider,
  RouterProvider,
  ThemeProvider,
} from "@/providers";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <RouterProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </RouterProvider>
    </QueryProvider>
  </React.StrictMode>,
);
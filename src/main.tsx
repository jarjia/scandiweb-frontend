import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/apollo.ts";
import AppContextProvider from "./context/AppContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>
);

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { store } from "./redux/store";
import "./index.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "animate.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.render(
  <Provider {...{ store }}>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>,

  document.getElementById("root")
);

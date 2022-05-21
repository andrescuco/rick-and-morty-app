import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

/**
 * We use appReady because we're on a sandbox
 * @see https://codesandbox.io/s/msw-react-xx1c8?file=/src/index.js
 */
let appReady = Promise.resolve();

// Make this true to enable endpoint mocking
if (process.env.NODE_ENV === "test") {
  const { worker } = require("./__mocks__/server");
  appReady = worker.start({
    serviceWorker: {
      url: "/mockServiceWorker.js"
    }
  });
}

appReady.then(() => {
  ReactDOM.render(
    <StrictMode>
      <App />
    </StrictMode>,
    document.getElementById("root")
  );
});

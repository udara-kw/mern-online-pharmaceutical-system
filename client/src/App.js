import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Base from "./Base";
import ScrollToTop from "./components/ScrollToTop.js";
import theme from "./Theme";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <ThemeProvider theme={theme}>
          <Route path="(/|/login|/prescription|/orders|/profile|/contact)">
            <Base />
          </Route>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import Layout from "./components/Layout";
import Users from "./pages/Users";
import User from "./pages/User";
import theme from "./themes/main";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Users />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import RootLayout from "./layouts/Root/Root";
import AuthLayout from "./layouts/Auth/Auth";
import HomePage from "./pages/Homepage/HomePage";
import Login from "./pages/Login/LoginPage";
import Signup from "./pages/Signup/SignupPage";
import Verify from "./pages/Verify/VerifyPage";
import Projects from "./pages/Workspace/MyProjects";
import Project from "./pages/Workspace/ProjectPage";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Layout style={{ minHeight: "100vh" }}>
          <Layout>
            <Content style={{ margin: "24px 16px 0" }}>
            
              <Routes>
              <Route path="/" element={<HomePage />} />

                <Route path="/auth" element={<AuthLayout />}>
                  <Route path="/auth/login" element={<Login />} />
                  <Route path="/auth/signup" element={<Signup />} />
                  <Route path="/auth/verify" element={<Verify />} />
                </Route>
                <Route path="/" element={<RootLayout />}>
                  <Route path="/projects" element={<Projects />} />
                      <Route
                        path="/projects/:projectId"
                        element={<Project />}
                      /> 
                </Route>
                {/* <Route
                  path="/"
                  element={
                    <RootLayout>
                      <Route path="/home" element={<HomePage />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route
                        path="/workspace/:projectId"
                        element={<Project />}
                      />
                    </RootLayout>
                  }
                /> */}
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;

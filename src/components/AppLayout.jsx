import { Layout, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const { Header, Content } = Layout;

export default function AppLayout({ children }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <b style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          LMS Admin
        </b>
        <Button danger onClick={logout}>
          Logout
        </Button>
      </Header>

      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {children}
        </div>
      </Content>
    </Layout>
  );
}

import { Card, Form, Input, Button, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Login() {
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");
  const [form] = Form.useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = (values) => {
    const ok = login(values.email, values.password);

    if (!ok) {
      setError("Email hoặc mật khẩu không đúng");
      return;
    }

    setError("");
    navigate("/");
  };

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: "120px auto" }}>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFieldsChange={() =>
          setDisabled(
            form.getFieldsError().some((f) => f.errors.length)
          )
        }
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true }, { type: "email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }, { min: 6 }]}
        >
          <Input.Password />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          disabled={disabled}
        >
          Login
        </Button>
      </Form>
    </Card>
  );
}

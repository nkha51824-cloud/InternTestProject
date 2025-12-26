import React from "react";
import { Form, Input, Button, Select, notification } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import styles from "../styles/AddCourse.module.css";
import { LEVELS, CATEGORIES, VALIDATE_MESSAGE } from "../constants/constants";
import { Course } from "../types";

const AddCourse: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: Course) => {
    try {
      await api.post("/course", values);
      notification.success({ message: "Course added successfully" });
      navigate("/courses");
    } catch (err) {
      notification.error({ message: "Add course failed" });
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Add New Course</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Title" name="title" rules={[{ required: true, message: VALIDATE_MESSAGE.REQUIRED }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Category" name="category" rules={[{ required: true, message: VALIDATE_MESSAGE.REQUIRED }]}>
          <Select>
            {CATEGORIES.map((c) => (
              <Select.Option key={c} value={c}>
                {c}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Level" name="level" rules={[{ required: true, message: VALIDATE_MESSAGE.REQUIRED }]}>
          <Select>
            {LEVELS.map((l) => (
              <Select.Option key={l} value={l}>
                {l}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Thumbnail" name="thumbnail">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Course
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCourse;

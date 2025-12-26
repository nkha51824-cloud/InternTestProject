import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, notification, Spin } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import styles from "../styles/EditCourse.module.css";
import { LEVELS, CATEGORIES, VALIDATE_MESSAGE } from "../constants/constants";
import { Course } from "../types";

const EditCourse: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const fetchCourse = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await api.get(`/course/${id}`);
      form.setFieldsValue(res.data);
    } catch (err) {
      notification.error({ message: "Fetch course failed" });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const onFinish = async (values: Course) => {
    if (!id) return;
    try {
      await api.patch(`/course/${id}`, values);
      notification.success({ message: "Course updated successfully" });
      navigate("/courses");
    } catch (err) {
      notification.error({ message: "Update failed" });
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <h2 className={styles.title}>Edit Course</h2>
      
      <div className={styles.formContainer}>
        <Spin spinning={loading}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item 
              label="Title" 
              name="title" 
              rules={[{ required: true, message: VALIDATE_MESSAGE.REQUIRED }]}
            >
              <Input placeholder="Enter course title" />
            </Form.Item>

            <Form.Item 
              label="Category" 
              name="category" 
              rules={[{ required: true, message: VALIDATE_MESSAGE.REQUIRED }]}
            >
              <Select placeholder="Select category">
                {CATEGORIES.map((c) => (
                  <Select.Option key={c} value={c}>{c}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item 
              label="Level" 
              name="level" 
              rules={[{ required: true, message: VALIDATE_MESSAGE.REQUIRED }]}
            >
              <Select placeholder="Select level">
                {LEVELS.map((l) => (
                  <Select.Option key={l} value={l}>{l}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input.TextArea rows={4} placeholder="Enter description" />
            </Form.Item>

            <Form.Item label="Thumbnail URL" name="thumbnail">
              <Input placeholder="https://example.com/image.png" />
            </Form.Item>

            <div className={styles.submitButtonContainer}>
              <Button type="primary" htmlType="submit" size="large">
                Update Course
              </Button>
            </div>
          </Form>
        </Spin>
      </div>
    </div>
  );
};

export default EditCourse;
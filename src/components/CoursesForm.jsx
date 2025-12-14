import { Form, Input, Button, Select } from "antd";

export default function CoursesForm({ initialValues, onSubmit }) {
  return (
    <Form
      layout="vertical"
      initialValues={initialValues}
      onFinish={onSubmit}
    >
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="level"
        label="Level"
        rules={[{ required: true }]}
      >
        <Select>
          <Select.Option value="Beginner">Beginner</Select.Option>
          <Select.Option value="Intermediate">Intermediate</Select.Option>
          <Select.Option value="Advanced">Advanced</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="numberOfLesson"
        label="Number Of Lessons"
        rules={[{ required: true }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item name="thumbnail" label="Thumbnail URL">
        <Input />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
}

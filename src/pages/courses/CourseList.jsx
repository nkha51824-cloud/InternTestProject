import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Card,
  Input,
  Select,
} from "antd";
import { useNavigate } from "react-router-dom";
import { courseApi } from "../../api/courseApi";

const { Option } = Select;

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const fetchCourses = async () => {
    const res = await courseApi.getAll();
    let data = res.data;

    if (search) {
      data = data.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (level) {
      data = data.filter((c) => c.level === level);
    }

    if (category) {
      data = data.filter((c) => c.category === category);
    }

    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, [search, level, category]);

  const columns = [
    { title: "Title", dataIndex: "title" },
    { title: "Category", dataIndex: "category" },
    { title: "Level", dataIndex: "level" },
    { title: "Lessons", dataIndex: "numberOfLesson" },
    { title: "Description", dataIndex: "description" },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      render: (url) => <img src={url} width={80} />,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button onClick={() => navigate(`/courses/edit/${record.id}`)}>
            Edit
          </Button>
          <Button
            danger
            onClick={async () => {
              await courseApi.remove(record.id);
              fetchCourses();
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Course List"
      extra={
        <Button type="primary" onClick={() => navigate("/courses/add")}>
          Add Course
        </Button>
      }
    >
      <Space style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Search by name"
          onSearch={setSearch}
          allowClear
        />

        <Select
          placeholder="Filter by category"
          style={{ width: 180 }}
          allowClear
          onChange={setCategory}
        >
          <Option value="4SKILLS">4SKILLS</Option>
          <Option value="IELTS">IELTS</Option>
          <Option value="TOEIC">TOEIC</Option>
        </Select>

        <Select
          placeholder="Filter by level"
          style={{ width: 180 }}
          allowClear
          onChange={setLevel}
        >
          <Option value="Beginner">Beginner</Option>
          <Option value="Intermediate">Intermediate</Option>
          <Option value="Advanced">Advanced</Option>
        </Select>
      </Space>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={courses}
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );
}

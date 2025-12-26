import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space, Select, notification, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; 
import api from "../api/api";
import { Course } from "../types";
import styles from "../styles/CourseList.module.css";
import { LEVELS, CATEGORIES, PAGE, LIMIT } from "../constants/constants";

const { Search } = Input;
const { confirm } = Modal;

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  
  const navigate = useNavigate();

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params: any = { page: PAGE, limit: LIMIT };
      if (search) params.search = search;
      if (level) params.level = level;
      if (category) params.category = category;

      const res = await api.get("/course", { params });
      setCourses(res.data);
    } catch (err) {
      notification.error({ message: "Lỗi tải dữ liệu" });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, [search, level, category]);

  // Hàm xử lý xóa khóa học
  const handleDelete = (id: string, title: string) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa khóa học này?",
      content: `Khóa học "${title}" sẽ bị xóa vĩnh viễn khỏi hệ thống.`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await api.delete(`/course/${id}`);
          notification.success({ message: "Xóa thành công" });
          fetchCourses(); // Tải lại danh sách sau khi xóa
        } catch (err) {
          notification.error({ 
            message: "Xóa thất bại", 
            description: "Không thể kết nối với máy chủ hoặc quyền bị từ chối." 
          });
        }
      },
    });
  };

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.clear();
    notification.success({
      message: "Đã đăng xuất",
      description: "Đang quay lại trang đăng nhập...",
    });
    navigate("/login", { replace: true });
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Level", dataIndex: "level", key: "level" },
    { title: "Lessons", key: "lessons", render: () => "0" }, 
    { title: "Description", dataIndex: "description", key: "description", ellipsis: true },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Course) => (
        <Space size="small">
          <Link to={`/courses/edit/${record.id}`}>
            <Button size="small">Edit</Button>
          </Link>
          <Button 
            danger 
            size="small" 
            onClick={() => {
              // Kiểm tra id tồn tại để sửa lỗi TypeScript 'string | undefined'
              if (record.id) {
                handleDelete(record.id, record.title);
              }
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={styles.logoText}>English Class Management Course</div>
        <Button danger size="small" onClick={handleLogout}>Logout</Button>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.tableHeader}>
            <h2 className={styles.tableTitle}>Course List</h2>
            <Link to="/courses/add">
              <Button type="primary">Add Course</Button>
            </Link>
          </div>

          <div className={styles.searchContainer}>
            <Search 
              placeholder="Search by name" 
              onSearch={(val) => setSearch(val)} 
              className={styles.searchInput}
              size="small"
              allowClear
            />
            <Select 
              placeholder="Category" 
              onChange={(val) => setCategory(val)} 
              allowClear 
              className={styles.categorySelect}
              size="small"
            >
              {CATEGORIES.map((c) => (
                <Select.Option key={c} value={c}>{c}</Select.Option>
              ))}
            </Select>
            <Select 
              placeholder="Level" 
              onChange={(val) => setLevel(val)} 
              allowClear 
              className={styles.levelSelect}
              size="small"
            >
              {LEVELS.map((l) => (
                <Select.Option key={l} value={l}>{l}</Select.Option>
              ))}
            </Select>
          </div>

          <Table 
            columns={columns} 
            dataSource={courses} 
            rowKey="id" 
            loading={loading} 
            size="middle" 
            pagination={{ pageSize: LIMIT, size: "small" }} 
          />
        </div>
      </main>
    </div>
  );
};

export default CourseList;
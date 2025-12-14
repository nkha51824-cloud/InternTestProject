import { Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import CoursesForm from "../../components/CoursesForm.jsx";
import { courseApi } from "../../api/courseApi.js";

export default function AddCourses() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    await courseApi.add(values);
    message.success("Added successfully");
    navigate("/");
  };

  return (
    <Card title="Add Course">
      <CoursesForm onSubmit={handleSubmit} />
    </Card>
  );
}

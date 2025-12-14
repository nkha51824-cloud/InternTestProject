import { useEffect, useState } from "react";
import { Card, message, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import CoursesForm from "../../components/CoursesForm.jsx";
import { courseApi } from "../../api/courseApi.js";

export default function EditCourses() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    courseApi.getById(id).then((data) => {
      setCourse(data);
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (values) => {
    await courseApi.update(id, values);
    message.success("Updated successfully");
    navigate("/");
  };

  if (loading) return <Spin />;

  return (
    <Card title="Edit Course">
      <CoursesForm
        initialValues={course}
        onSubmit={handleSubmit}
      />
    </Card>
  );
}

import { useState } from "react";
import Password from "./Password";
import { Button, Form, Image, Input, message, Upload } from "antd";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import profileImage from "../../assets/profile.png";
import Back from "../../components/back/Back";
const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Thuto Makohaone",
    email: "thutomakohaone@gmail.com",
    phone: "+27 55745 2567 125",
    area: "",
    building: "",
    postalCode: "2191",
    streetAddress: "Alice Street",
    pdf: null,
    image: null,
  });

  const handleUpdate = () => {
    if (isEditing) {
      form
        .validateFields()
        .then((values) => {
          setFormData({ ...formData, ...values });
          message.success("Profile updated successfully!");
          setIsEditing(false);
        })
        .catch(() => {
          message.error("Please complete the form properly.");
        });
    } else {
      setIsEditing(true);
    }
  };

  const handleImageUpload = async (info) => {
    setImageLoading(true);

    const uploadedImage = info.file.originFileObj || info.file;

    if (!(uploadedImage instanceof File)) {
      message.error("Invalid file type. Please upload a valid image.");
      setImageLoading(false);
      return;
    }

    setTimeout(() => {
      setImageLoading(false);

      try {
        const imageURL = URL.createObjectURL(uploadedImage);

        setFormData({
          ...formData,
          image: imageURL,
        });

        message.success("Profile image updated successfully!");
      } catch (error) {
        console.error("Error creating image URL:", error);
        message.error("Error displaying image.");
      }
    }, 2000);
  };
  return (
    <div className="bg-[#F9FAFB] px-10 py-10">
      <Back name="Profile Setting" />
      <div className="min-h-screen  flex flex-col items-center py-10 font-poppins">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
          <div className="flex flex-col items-center">
            <Image
              src={formData.image ? formData.image : profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full border object-cover"
              width={100}
              height={100}
            />

            {isEditing && (
              <Upload
                accept="image/*"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleImageUpload}
                className="mt-2"
              >
                <Button
                  icon={
                    imageLoading ? <LoadingOutlined spin /> : <UploadOutlined />
                  }
                >
                  {imageLoading ? "Uploading..." : "Update Image"}
                </Button>
              </Upload>
            )}

            <h2 className="mt-3 text-xl font-semibold font-poppins">
              Jerome Smith
            </h2>
          </div>

          <div className="flex justify-center mt-6  ">
            <button
              className={`px-4 py-2 cursor-pointer font-poppins ${
                activeTab === "profile"
                  ? "border-b-2 border-[#6C63FF] text-[#6C63FF]"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Edit Profile
            </button>
            <button
              className={`px-4 py-2 cursor-pointer ${
                activeTab === "password"
                  ? "border-b-2 border-[#6C63FF] text-[#6C63FF]"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("password")}
            >
              Edit Password
            </button>
          </div>

          {activeTab === "profile" && (
            <div className="flex flex-col items-center font-poppins">
              <div className="rounded-lg  w-full max-w-3xl font-poppins">
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={formData}
                  className="font-poppins"
                >
                  <div className="flex flex-col gap-1">
                    <Form.Item
                      label={<div className="  font-poppins">User Name</div>}
                      name="fullName"
                      className="font-poppins "
                    >
                      <Input disabled={!isEditing} className="h-[48px]" />
                    </Form.Item>

                    <Form.Item
                      label={<div className="  font-poppins">Email</div>}
                      name="email"
                    >
                      <Input disabled={!isEditing} className="h-[48px]" />
                    </Form.Item>
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button
                      type="primary"
                      onClick={handleUpdate}
                      disabled={loading}
                      className="!px-10 !py-3 !font-poppins w-full bg-[#6C63FF] hover:!bg-[#615af8] h-[42px]"
                    >
                      {isEditing ? "Save" : "Update Now"}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          )}

          {activeTab === "password" && <Password />}
        </div>
      </div>
    </div>
  );
};

export default Profile;

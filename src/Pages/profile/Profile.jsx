import { useEffect, useState } from "react";
import Password from "./Password";
import { Button, Form, Image, Input, Upload } from "antd";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import profileImage from "../../assets/profile.png";
import Back from "../../components/back/Back";
import toast from "react-hot-toast";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../Redux/profileApis";
import { image_url } from "../../Redux/main/server";
const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const { data: profileData, isLoading } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();

  console.log(profileData);

  useEffect(() => {
    if (profileData?.data) {
      form.setFieldsValue({
        fullName: profileData?.data?.fullName,
        email: profileData?.data?.email,
      });

      setFormData({
        image: `${image_url}/${profileData?.data?.profileImage}`,
      });
    }
  }, [profileData, form]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleUpdate = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      const values = await form.validateFields();

      const fd = new FormData();
      fd.append("fullName", values.fullName);

      if (formData.imageFile) {
        fd.append("profileImage", formData.imageFile);
      }

      const response = await updateProfile(fd).unwrap();
      toast.success(response?.message || "Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error(error?.data?.message || "Update failed");
      console.error(error);
    }
  };

  const handleImageUpload = (info) => {
    console.log(info.file);
    const file = info.file;

    if (!(file instanceof File)) {
      toast.error("Invalid image file");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    }));

    toast.success("Image selected");
  };
  return (
    <div className="bg-[#F9FAFB] px-10 py-10">
      <Back name="Profile Setting" />
      <div className="min-h-screen  flex flex-col items-center py-10 font-poppins">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
          <div className="flex flex-col items-center">
            <Image
              src={
                formData.imagePreview ||
                `${image_url}/${profileData?.data?.profileImage}` ||
                profileImage
              }
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
              {profileData?.data?.fullName}
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

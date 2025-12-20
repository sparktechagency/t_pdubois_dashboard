import { Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useChangePasswordMutation } from "../../Redux/authApis";
import toast from "react-hot-toast";

const Password = () => {
  const [form] = Form.useForm();

  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const handleCancelClick = () => {
    form.resetFields();
  };

  const handleSaveClick = async (values) => {
    console.log(values);
    try {
      const response = await changePassword({
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmPassword,
      }).unwrap();
      toast.success(response.message);
      form.resetFields();
    } catch (error) {
      toast.error(error.data?.error || "Failed to update password.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="rounded-lg  w-full ">
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={handleSaveClick}
        >
          <Form.Item
            label={<div className=" font-poppins">Current Password</div>}
            name="currentPassword"
            rules={[
              { required: true, message: "Please enter your current password" },
            ]}
          >
            <Input.Password
              placeholder="*************"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              className="h-[42px]"
            />
          </Form.Item>

          <Form.Item
            label={<div className=" font-poppins">New Password</div>}
            name="newPassword"
            rules={[
              { required: true, message: "Please enter your new password" },
            ]}
          >
            <Input.Password
              placeholder="*************"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              className="h-[42px]"
            />
          </Form.Item>

          <Form.Item
            label={<div className=" font-poppins">Confirm New Password</div>}
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="*************"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              className="h-[42px]"
            />
          </Form.Item>

          <div className="flex items-center justify-center gap-1.5">
            <Button
              type="primary"
              htmlType="submit"
              className="!px-10 !py-3 font-poppins w-full bg-[#6C63FF] hover:!bg-[#635bfa]"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button
              onClick={handleCancelClick}
              className="!px-10 !py-3 font-poppins w-full"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Password;

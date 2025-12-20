import { Form, Input, Button } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../Redux/authApis";
const SetNewPassword = () => {
  const navigate = useNavigate();

  const [postResetPassword, { isLoading }] = useResetPasswordMutation();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await postResetPassword({
        email: localStorage.getItem("email"),
        password: values.password,
        confirmPassword: values.confirmPassword,
      })
        .unwrap()
        .then((res) => {
          toast.success(res?.message);
          form.resetFields();
          localStorage.clear();
          localStorage.setItem("token", res?.data?.accessToken);
          navigate("/");
        });
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-[#F9FAFB] font-poppins ">
      <div className="!max-w-[500px] !w-full">
        <div className=" bg-white flex flex-col justify-center items-center px-12 py-28 rounded-xl ">
          <h1 className="text-3xl font-semibold  mb-4">Set New Password</h1>

          <Form
            layout="vertical"
            onFinish={onFinish}
            className="w-full font-poppins"
          >
            <label htmlFor="password" className=" text-[16px] ">
              New Password
            </label>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your new password!" },
                {
                  min: 6,
                  message: "Password must be at least 6 characters long!",
                },
              ]}
              className="mt-1 "
            >
              <Input.Password
                placeholder="New password"
                className="h-[48px] px-4 border-gray-300 rounded-md"
              />
            </Form.Item>

            <label htmlFor="confirmPassword" className=" text-[16px] ">
              Confirm New Password
            </label>
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
              className="mt-1"
            >
              <Input.Password
                placeholder="confirm password"
                className="h-[48px] px-4 border-gray-300 rounded-md"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-[#6C63FF] hover:!bg-[#5a52f1] text-white font-bold  h-[48px] rounded-md font-poppins"
              >
                {isLoading ? "Loading..." : "Confirm"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;

import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useForgetPasswordOTPMutation } from "../../Redux/authApis";
import toast from "react-hot-toast";
const ForgetPassword = () => {
  // const navigate = useNavigate();
  // const onFinish = (values) => {
  //   console.log(values);
  //   navigate("/verify-code");
  // };

  const navigate = useNavigate();

  const [postForgotPassword, { isLoading }] = useForgetPasswordOTPMutation();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await postForgotPassword({
        email: values.email,
      })
        .unwrap()
        .then((res) => {
          toast.success(res?.message);
          form.resetFields();
          localStorage.removeItem("email");
          localStorage.setItem("email", values.email);
          navigate("/verify-code");
        });
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#F9FAFB] font-poppins">
      <div className=" bg-white flex flex-col justify-center items-center px-16 py-32 rounded-xl">
        <div className="text-3xl font-semibold">Forget Password?</div>
        <h1 className="text-center mt-5">
          Please enter your email to get verification code
        </h1>

        <Form
          layout="vertical"
          onFinish={onFinish}
          className="w-full max-w-sm mt-7"
        >
          <label
            htmlFor="email"
            className="text-gray-500 text-[16px] font-poppins"
          >
            Email
          </label>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your  email!",
              },
              {
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
            className="mt-1 font-poppins"
          >
            <Input
              placeholder="Enter  Email"
              className="h-[48px]  border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-[#6C63FF] hover:!bg-[#645cfc] mt-5 text-white font-bold font-poppins h-[48px] rounded-md"
            >
              {isLoading ? "Loading..." : "Continue"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;

import { Form, Input, Button, Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import craveCrusherlogo from "../../../public/crave-crusher-logo.svg";
import { useSignInMutation } from "../../Redux/authApis";

const Login = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [postSignIn, { isLoading }] = useSignInMutation();

  const onFinish = async (values) => {
    console.log(values);
    try {
      await postSignIn({
        email: values.email,
        password: values.password,
      })
        .unwrap()
        .then((res) => {
          toast.success(res?.message);
          form.resetFields();
          localStorage.setItem("token", res?.data?.accessToken);
          navigate("/");
        });
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="h-screen flex  items-center justify-center bg-[#F9FAFB] font-poppins">
      <div className=" bg-white flex flex-col justify-center items-center p-12 rounded-xl">
        <div className="flex items-center justify-center flex-col gap-2">
          <img src={craveCrusherlogo} alt="craveCrusherlogo" />
          <div className="text-2xl mb-5 text-[#6C63FF] font-semibold">
            Crave Crusher
          </div>
        </div>
        <h1 className="text-3xl font-semibold mb-2">Login to Account</h1>
        <p className="text-lg  mb-8 text-center">
          Please enter your email and password to continue
        </p>

        <Form
          layout="vertical"
          onFinish={onFinish}
          className="w-full font-poppins"
        >
          <label htmlFor="email" className=" text-[16px] ">
            Email
          </label>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your username or email!",
              },
              {
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
            className="mt-1"
          >
            <Input
              placeholder="Enter  Email"
              className="h-[48px] px-4 border-gray-300 rounded-md"
            />
          </Form.Item>

          <label htmlFor="password" className=" text-[16px] ">
            Password
          </label>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              placeholder="Enter password"
              className="h-[48px] px-4 border-gray-300 rounded-md mt-1"
            />
          </Form.Item>

          <div className="flex items-center justify-between ">
            <Form.Item>
              <Checkbox className="font-poppins">Remember Password</Checkbox>
            </Form.Item>

            <div className="text-center mb-5">
              <Link
                to={`/forget-password`}
                className="text-[#6C63FF] underline underline-offset-2 hover:text-[#6C63FF] text-sm font-poppins"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-[#6C63FF] text-white h-[48px] hover:!bg-[#5a52f1] rounded-md font-poppins "
            >
              {isLoading ? "Loading..." : "Sign In"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

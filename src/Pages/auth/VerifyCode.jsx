import { Form, Button } from "antd";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  useForgetPasswordOTPMutation,
  useVerifyEmailOtpMutation,
} from "../../Redux/authApis";

const VerifyCode = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm(); // Add this
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value[0];
    setOtp(newOtp);

    // Update form field value
    form.setFieldsValue({ otp: newOtp.join("") });

    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
        form.setFieldsValue({ otp: newOtp.join("") }); 
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
        form.setFieldsValue({ otp: newOtp.join("") }); 
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!paste) return;

    const pasteArray = paste.split("").slice(0, 6);
    const newOtp = [...otp];

    pasteArray.forEach((char, i) => {
      newOtp[i] = char;
    });

    setOtp(newOtp);

    form.setFieldsValue({ otp: newOtp.join("") });

    const nextIndex = Math.min(pasteArray.length, 5);
    setTimeout(() => {
      inputRefs.current[nextIndex]?.focus();
    }, 0);
  };

  const [postVerifyAccount, { isLoading: isVerifyLoading }] =
    useVerifyEmailOtpMutation();
  const [postResendOtp, { isLoading: isResendLoading }] =
    useForgetPasswordOTPMutation();

  const onFinishOtp = async () => {
    const email = localStorage.getItem("email") || "";
    if (!email) {
      navigate("/forget-password");
    }
    try {
      await postVerifyAccount({
        email: email,
        resetCode: parseInt(otp.join(""), 10),
      })
        .unwrap()
        .then((res) => {
          toast.success(res?.message);
          navigate("/reset-password");
        });
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleResendOtp = async () => {
    try {
      const result = await postResendOtp({
        email: localStorage.getItem("email"),
      });
      toast.success(result?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#F9FAFB] font-poppins">
      <div className=" bg-white flex flex-col justify-center items-center px-12 py-28 max-w-xl rounded-xl">
        <h1 className="text-3xl font-semibold mb-4">Check your email</h1>
        <div className="text-center mb-10">
          We sent a reset link to contact@dscode...com enter 6 digit code that
          mentioned in the email
        </div>
        <Form
          form={form} // Add this
          layout="vertical"
          onFinish={onFinishOtp}
          className="w-full max-w-sm"
        >
          <Form.Item
            name="otp"
            rules={[{ required: true, message: "Please enter the OTP!" }]}
            style={{ textAlign: "center" }}
          >
            <div className="flex gap-5 justify-center" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  maxLength={1}
                  className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 "
                />
              ))}
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-[#6C63FF] hover:!bg-[#635cf5] text-white  h-[48px] rounded-md font-poppins"
            >
              {isVerifyLoading ? "Verifying..." : "Verify"}
            </Button>
          </Form.Item>
        </Form>

        <div className="flex gap-1">
          <div>You have not received the email? </div>
          <div
            className="text-[#6C63FF] hover:text-blue-500 cursor-pointer"
            onClick={handleResendOtp}
          >
            {isResendLoading ? "Resending..." : "Resend"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;

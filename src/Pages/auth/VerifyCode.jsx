import { Form, Button } from "antd";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VerifyCode = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value[0];
    setOtp(newOtp);

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
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!paste) return;

    const pasteArray = paste.split("").slice(0, 6);
    const newOtp = [...otp];

    pasteArray.forEach((char, i) => {
      newOtp[i] = char;
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = char;
      }
    });

    setOtp(newOtp);

    const nextIndex = pasteArray.length < 6 ? pasteArray.length : 5;
    inputRefs.current[nextIndex]?.focus();
  };

  const onFinishOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      toast.error("Please enter full OTP");
      return;
    }
    console.log("Entered OTP:", enteredOtp);
    navigate("/reset-password");
  };

  const handleResendOtp = () => {
    toast.success("OTP sent successfully!");
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
              Verify
            </Button>
          </Form.Item>
        </Form>

        <div className="flex gap-1">
          <div>You have not received the email? </div>
          <div
            className="text-[#6C63FF] hover:text-blue-500 cursor-pointer"
            onClick={handleResendOtp}
          >
            Resend
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;

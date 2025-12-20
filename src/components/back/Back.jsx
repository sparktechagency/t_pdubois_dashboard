import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Back = ({ name }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(-1)} className="flex gap-2 cursor-pointer">
      <div className="flex items-center justify-center gap-2">
        <MdOutlineKeyboardBackspace />
        {name}
      </div>
    </div>
  );
};

export default Back;

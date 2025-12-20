import activeUser from "../../../../assets/active-user.svg";
import active from "../../../../assets/active.svg";
import blocked from "../../../../assets/blocked.svg";

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-md border h-[180px]  p-4 flex  gap-3 items-center justify-center font-poppins">
    <img src={icon} alt={title} className="w-28 h-28" />
    <div className="flex items-center flex-col mt-3">
      <span className="  text-[22px]">{title}</span>
      <div className={`text-2xl font-bold text-[#6C63FF]`}>{value}</div>
    </div>
  </div>
);

const OverView = () => {
  const stats = [
    {
      icon: activeUser,
      title: "Active User",
      value: "1576",
    },
    {
      icon: blocked,
      title: "Blocked User",
      value: "70",
    },
    {
      icon: active,
      title: "Active Post",
      value: "725",
    },
  ];

  return (
    <div className="w-full font-poppins">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            valueColor={stat.valueColor}
          />
        ))}
      </div>
    </div>
  );
};

export default OverView;

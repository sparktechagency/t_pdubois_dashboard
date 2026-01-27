import { useState } from "react";
import { Table, Button, Modal, Image, Dropdown, Space, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FaUserCircle } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import Back from "../../components/back/Back";
import {
  useGetAllUsersQuery,
  useUserBlockUnblockMutation,
} from "../../Redux/usersApis";
import { image_url } from "../../Redux/main/server";

const Users = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);

  const queryParams = {
    page: currentPage,
    limit: 10,
    searchTerm,
  };

  if (isBlocked !== null) {
    queryParams.isBlocked = isBlocked ? "true" : "false";
  }

  const { data: usersData, isLoading } = useGetAllUsersQuery(queryParams);

  const [userBlockUnblock] = useUserBlockUnblockMutation();

  const users =
    usersData?.data?.result.map((item) => ({
      key: item.user._id,
      image: item.user.profileImage,
      userName: item.user.fullName,
      email: item.user.email,
      joined: new Date(item.user.createdAt).toLocaleDateString(),
      activeBattles: item.other.activeBattle,
      earnedBadge: item.other.earnBadge,
      status: item.user.isBlocked ? "Blocked" : "Active",
      userData: item.user,
    })) || [];

  const columns = [
    {
      title: <div className="font-poppins">User Name</div>,
      dataIndex: "userName",
      key: "userName",
      render: (text, record) => (
        <div className="flex items-center space-x-3 font-poppins">
          <img
            src={`${image_url}/${record.image}`}
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="text-gray-900 font-medium">{text}</span>
        </div>
      ),
    },
    {
      title: <div className="font-poppins">Email</div>,
      dataIndex: "email",
      key: "email",
      render: (text) => <div className="font-poppins">{text}</div>,
    },
    {
      title: <div className="font-poppins">Joined</div>,
      dataIndex: "joined",
      key: "joined",
      render: (text) => <div className="font-poppins">{text}</div>,
    },
    {
      title: <div className="font-poppins">Active Battles</div>,
      dataIndex: "activeBattles",
      key: "activeBattles",
      render: (text) => <div className="font-poppins">{text}</div>,
    },
    {
      title: <div className="font-poppins">Earned Badge</div>,
      dataIndex: "earnedBadge",
      key: "earnedBadge",
      render: (text) => <div className="font-poppins">{text}</div>,
    },
    {
      title: <div className="font-poppins">Status</div>,
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <div
          className={`badge font-poppins ${
            text === "Active" ? "bg-green-500" : "bg-red-500"
          } text-white py-1 px-3 rounded w-[100px] flex items-center justify-center`}
        >
          {text}
        </div>
      ),
    },
    {
      title: <div className="font-poppins">Action</div>,
      key: "action",
      render: (_, record) => (
        <div className="flex space-x-2 font-poppins">
          <Button
            type="primary"
            icon={<FaUserCircle />}
            className="bg-[#6C63FF] hover:!bg-[#5d55f5] text-white font-poppins"
            onClick={() => handleViewProfile(record)}
          />
          <Button
            type="primary"
            icon={<MdBlock />}
            className="bg-red-500 hover:!bg-red-600 text-white"
            onClick={() => openStatusModal(record)}
          />
        </div>
      ),
    },
  ];

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const openStatusModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalVisible(true);
  };

  const handleStatusToggle = async () => {
    if (!selectedUser) return;

    try {
      await userBlockUnblock(selectedUser.key).unwrap();

      const updatedStatus =
        selectedUser.status === "Active" ? "Blocked" : "Active";
      setSelectedUser({ ...selectedUser, status: updatedStatus });

      setIsDeleteModalVisible(false);
    } catch (error) {
      console.error("Failed to block/unblock user:", error);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const dropdownItems = [
    {
      label: <div className="font-poppins">Active</div>,
      key: "active",
      value: false,
    },
    {
      label: <div className="font-poppins">All Users</div>,
      key: "all",
      value: null,
    },
    {
      label: <div className="font-poppins">Blocked</div>,
      key: "blocked",
      value: true,
    },
  ];
  const handleDropdownSelect = (value) => {
    setIsBlocked(value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-[#F9FAFB] h-screen p-10 !mb-64 !pb-20">
      <div className="flex items-center justify-between">
        <Back name="User Management " />
        <div className="flex gap-4 bg-white ">
          <div className="border p-1 pt-2 rounded-md">
            <Dropdown
              menu={{
                items: dropdownItems.map((item) => ({
                  key: item.key,
                  label: item.label,
                  onClick: () => handleDropdownSelect(item.value),
                })),
              }}
              trigger={["click"]}
              className="cursor-pointer"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {isBlocked === true
                    ? "Blocked"
                    : isBlocked === false
                    ? "Active"
                    : "All Users"}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search user"
              className="w-full rounded-md border p-2 px-4"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mb-20 bg-white p-5 mt-4 !pb-20">
        <Table
          columns={columns}
          dataSource={users}
          loading={isLoading}
          pagination={{
            position: ["bottomCenter"],
            current: currentPage,
            pageSize: 10,
            total: usersData?.data?.meta?.total,
            onChange: handlePageChange,
            showSizeChanger: false,
          }}
          className="mt-5"
        />

        {/* ---------------- Profile Modal ---------------- */}
        {selectedUser && (
          <Modal
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            centered
            width={480}
          >
            <div className="flex flex-col items-center text-center py-6 px-4 font-poppins">
              <div className="relative">
                <Image
                  src={selectedUser.image}
                  className="rounded-full shadow-lg border-4 border-white"
                  width={120}
                  height={120}
                  preview={false}
                />
                <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <h2 className="mt-4 text-2xl font-bold tracking-wide text-gray-800 font-poppins">
                {selectedUser.userName}
              </h2>
              <p className="text-gray-600 text-sm">{selectedUser.email}</p>
              <p
                className={`mt-2 px-3 py-1 text-xs rounded-full font-medium ${
                  selectedUser.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {selectedUser.status}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 w-full">
                <div className="p-4 rounded-xl bg-white/60 backdrop-blur shadow">
                  <p className="text-sm">Active Battles</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {selectedUser.activeBattles}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/60 backdrop-blur shadow">
                  <p className="text-sm">Earned Badges</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {selectedUser.earnedBadge}
                  </p>
                </div>
              </div>
            </div>
          </Modal>
        )}

        {/* ---------------- Block/Unblock Modal ---------------- */}
        <Modal
          open={isDeleteModalVisible}
          onCancel={() => setIsDeleteModalVisible(false)}
          onOk={handleStatusToggle}
          okText={
            selectedUser?.status === "Active" ? "Yes, block" : "Yes, unblock"
          }
          cancelText="Cancel"
          centered
          okButtonProps={{
            style: { backgroundColor: "red", borderColor: "red" },
          }}
          cancelButtonProps={{
            style: {
              backgroundColor: "blue",
              borderColor: "blue",
              color: "white",
            },
          }}
        >
          <div className="text-lg h-[150px] font-poppins">
            <div className="flex justify-center items-end">
              <IoIosWarning className="text-7xl text-yellow-400" />
            </div>
            <div className="font-semibold text-3xl text-center">Warning</div>
            <div className="mt-3 text-center text-red-700">
              Are you sure you want to{" "}
              {selectedUser?.status === "Active" ? "block" : "unblock"} this
              user?
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Users;

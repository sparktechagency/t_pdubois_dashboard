import { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Modal, Input, Button } from "antd";
import toast from "react-hot-toast";
import Back from "../../components/back/Back";

const FAQ = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [editingFaq, setEditingFaq] = useState(null);
  const [faqToDelete, setFaqToDelete] = useState(null);

  // Local FAQs (dummy data)
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "How can I create an account?",
      answer: "Click on sign up and fill in your details.",
    },
    {
      id: 2,
      question: "How to reset my password?",
      answer: "Go to login and tap 'Forgot password'.",
    },
  ]);

  const openModal = (faq = null) => {
    setEditingFaq(faq);
    setNewFaq(
      faq
        ? { question: faq.question, answer: faq.answer }
        : { question: "", answer: "" }
    );
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) {
      toast.error("Please fill out all fields");
      return;
    }

    if (editingFaq) {
      setFaqs((prev) =>
        prev.map((item) =>
          item.id === editingFaq.id ? { ...item, ...newFaq } : item
        )
      );
      toast.success("FAQ updated successfully!");
    } else {
      setFaqs((prev) => [
        ...prev,
        { id: Date.now(), question: newFaq.question, answer: newFaq.answer },
      ]);
      toast.success("FAQ added successfully!");
    }

    setModalVisible(false);
    setNewFaq({ question: "", answer: "" });
    setEditingFaq(null);
  };

  const handleDelete = (id) => {
    setFaqToDelete(id);
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setFaqs((prev) => prev.filter((item) => item.id !== faqToDelete));
    toast.success("FAQ deleted successfully!");
    setDeleteModalVisible(false);
  };

  return (
    <div className="bg-[#F9FAFB] px-10 py-10 h-screen">
      <Back name="FAQ" />

      <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-5">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold">FAQ List</h2>
            <p className="text-gray-600 text-sm">
              Manage frequently asked questions easily.
            </p>
          </div>
          <button
            className="p-2 !bg-[#6C63FF] text-white rounded-md px-3 shadow-md hover:!bg-[#6C63FF] flex items-center justify-center gap-2"
            onClick={() => openModal()}
          >
            <FaPlus size={14} /> Add New FAQ
          </button>
        </div>

        <div className="space-y-4">
          {faqs.length > 0 ? (
            faqs.map((faq) => (
              <div key={faq.id} className="p-4 border rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    <p className="text-gray-600 text-sm mt-1">{faq.answer}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="p-2 !bg-[#6C63FF] text-white rounded shadow-md hover:!bg-[#6C63FF]"
                      onClick={() => openModal(faq)}
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      className="p-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600"
                      onClick={() => handleDelete(faq.id)}
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-gray-500">
              No FAQs added yet.
            </div>
          )}
        </div>
      </div>

      {/* Add and Edit Modal */}
      <Modal
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        centered
        width={500}
      >
        <div className="p-5 font-poppins">
          <div className="text-2xl font-semibold text-center">
            {editingFaq ? "Edit FAQ" : "Add FAQ"}
          </div>

          <label className="font-semibold mt-5 block">Question</label>
          <Input
            placeholder="Enter the question"
            className="mb-5 h-[48px]"
            value={newFaq.question}
            onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
          />

          <label className="font-semibold ">Answer</label>
          <Input.TextArea
            placeholder="Enter the answer"
            className="mb-5 "
            value={newFaq.answer}
            onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
          />

          <Button
            type="primary"
            onClick={handleSave}
            style={{ display: "block", margin: "auto" }}
            className="h-[42px] w-full !bg-[#6C63FF] hover:!bg-[#6C63FF]"
          >
            {editingFaq ? "Update FAQ" : "Add FAQ"}
          </Button>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <Modal
        open={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onOk={handleConfirmDelete}
        okText="Delete"
        cancelText="Cancel"
        centered
      >
        <div className="p-5 text-center">
          <p className="font-bold text-2xl mb-2">Delete FAQ</p>
          <p className="text-red-700 text-lg">
            Are you sure you want to delete this FAQ?
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default FAQ;

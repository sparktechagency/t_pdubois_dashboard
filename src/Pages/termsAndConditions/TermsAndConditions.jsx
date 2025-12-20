import { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import Back from "../../components/back/Back";
import { useNavigate } from "react-router-dom";
import { useCreateTermsAndConditionMutation, useGetTermsAndConditionQuery } from "../../Redux/termsAndConditionsApis";

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const editor = useRef(null);

  const [content, setContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const {
    data: termsCondition,
    isLoading,
    isError,
  } = useGetTermsAndConditionQuery();
  const [updatePrivacy, { isLoading: isSaving }] =
    useCreateTermsAndConditionMutation();

  useEffect(() => {
    if (termsCondition?.data?.description) {
      setContent(termsCondition.data.description);
      setOriginalContent(termsCondition.data.description);
    }
  }, [termsCondition]);

  useEffect(() => {
    setHasChanges(content !== originalContent);
  }, [content, originalContent]);

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all content?")) {
      setContent("");
    }
  };

  const handleSave = async () => {
    try {
      await updatePrivacy({
        description: content,
      }).unwrap();

      toast.success("Terms and conditions saved successfully!");
      setOriginalContent(content);
      setHasChanges(false);
    } catch (error) {
      console.error("Failed to save terms and conditions:", error);
      toast.error("Failed to save terms and conditions. Please try again.");
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to discard them?"
        )
      ) {
        setContent(originalContent);
      }
    } else {
      navigate(-1);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">
          Failed to load terms and conditions. Please try again later.
        </div>
      </div>
    );
  }
  return (
    <div className="bg-[#F9FAFB] px-10 py-10">
      <Back name="Terms And Conditions" />
      <div className="mb-10  h-screen">
        <div className="flex items-center space-x-2 "></div>

        <div className="w-full px-6 py-8 bg-white rounded-lg mt-6">
          <h1 className="text-2xl font-semibold mb-5"> Terms And Conditions</h1>
          <div className="flex flex-col w-full">
            <JoditEditor
              ref={editor}
              value={content}
              onBlur={handleContentChange}
              config={{
                buttons:
                  "bold,italic,underline,|,ul,ol,|,h1,h2,paragraph,|,align,|,image,link,|,source",
                height: 500,
                placeholder: "Enter your terms and conditions content here...",
                toolbarAdaptive: false,
              }}
              className="border rounded-md"
            />

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={handleClear}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
                disabled={isSaving || !content}
              >
                Clear
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition"
                disabled={isSaving || !hasChanges}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

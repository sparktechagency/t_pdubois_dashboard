import { useGetPrivacyPolicyQuery } from "../../Redux/privacyPolicyApis";

const GetPrivacyPolicy = () => {
  const { data: privacyData, isLoading, isError } = useGetPrivacyPolicyQuery();

  if (isLoading) {
    return <div className="text-center mt-20">Loading privacy policy...</div>;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">
          Failed to load privacy policy. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="px-10 py-10 min-h-screen">
      <div className="w-full px-6   rounded-lg mt-6">
        <h1 className="text-2xl font-semibold mb-5 text-center">
          Privacy Policy
        </h1>
        <div
          className="prose max-w-full text-gray-800"
          dangerouslySetInnerHTML={{
            __html: privacyData?.data?.description || "",
          }}
        />
      </div>
    </div>
  );
};

export default GetPrivacyPolicy;

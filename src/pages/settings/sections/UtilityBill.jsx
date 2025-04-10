import { UploadUserDocuments } from "./UploadUserDocuments";
import { useMutation, useQuery } from "react-query";
import { getSettingsData, postDoc } from "../../../api/Settings";
import { useToastForRequest } from "ui-lib/ui-lib.hooks/useToast";
import { toastForError } from "utils/toastForErrors";

export const UtilityBill = ({ isAgent }) => {
  const toast = useToastForRequest();
  const documentsQuery = useQuery(['getSettingsData', 'profile'], () => getSettingsData({ profile: true }))
  const documentsData = documentsQuery?.data?.data?.data;

  const toDateFormat = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const { mutate, isLoading } = useMutation(postDoc,
    {
      onSuccess: (res) => {
        toast({
          description: `${res?.data?.message}`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        documentsQuery.refetch()
      },
      onError: (err) => {
       toastForError(err, true, toast)
      },
    }
  );

  const handleDocument = (data) => {
    mutate({
      utility_bill: data[0],
      profile_details: true
    });
  };

  return (
    <UploadUserDocuments
      noNeedForType
      displayText={
        documentsQuery?.isLoading ? 'Loading...' : documentsData?.utility_bill ? `Uploaded: ${toDateFormat(documentsData?.utility_bill_updated_at)}` : isAgent ? 'Upload Valid ID' : 'Click here to upload file'
      }
      isLoading={isLoading}
      handleDocument={handleDocument}
      type={{ "image/*": [], 'application/pdf': ['.pdf']  }}
    />
  );
};
export default UtilityBill;

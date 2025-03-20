import { Box, useToast } from "@chakra-ui/react";
import { UploadUserDocuments } from "./UploadUserDocuments";
import { useMutation, useQuery } from "react-query";
import { getSettingsData, postDoc } from "../../../api/Settings";
import { useToastForRequest } from "ui-lib/ui-lib.hooks/useToast";

export const Documents = ({ isAgent }) => {
  const toast = useToastForRequest();
  const documentsQuery = useQuery(['getSettingsData', 'documents'], () => getSettingsData({ documents: true }))
  const documentsData = documentsQuery?.data?.data?.data;
  const documentDetail = documentsData?.[documentsData?.length - 1];

  const toDateFormat = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const { mutate, isLoading } = useMutation(postDoc,
    {
      onSuccess: (res) => {
        documentsQuery.refetch()
      },
      onError: (err) => {
        toastForError(err, true, toast)
      },
    }
  );

  const handleDocument = (data) => {
    mutate({
      document_update: true,
      document: data.map((item) => item.replace("data:", "").replace(/^.+,/, "")),
      profile_details: true
    });
  };

  return (
    <UploadUserDocuments
      noNeedForType
      displayText={
        documentsQuery?.isLoading ? 'Uploading...' : documentDetail ? `Uploaded: ${toDateFormat(documentDetail?.created_at)}` : isAgent ? 'Upload Valid ID' : 'Click here to upload file'
      }
      isLoading={isLoading}
      handleDocument={handleDocument}
    />
  );
};
export default Documents;

import React, {useState} from 'react';
import {Box, Flex, SimpleGrid, Stack, Text, useTheme, useToast} from '@chakra-ui/react';
import {
  Button,
  FormInput,
  FormSelect,
  UploadProfilePicture,
} from '../../../ui-lib/ui-lib.components';
import {useMutation} from 'react-query';
import {useRouter} from 'next/router';
import {useFormik} from 'formik';
import {agentSignUp} from '../../../api/agents';
import default_avatar from '/src/images/icons/agent_profile_icon.svg';
import useLocalStorage from 'utils/hooks/useLocalStorage';
import UploadUserDocuments from 'pages/settings/sections/UploadUserDocuments';
import * as Yup from 'yup';
import { toastForError } from 'utils/toastForErrors';
import { useToastForRequest } from 'ui-lib/ui-lib.hooks/useToast';

const validationSchema = Yup.object().shape({
  highest_education: Yup.string().required('Highest Education Level is required'),
  marital_status: Yup.string().required('Marital Status is required'),
  address: Yup.string().required('Residential Address is required'),
});

const PersonalInfo = ({onAuthClose, email, setPage, ...rest}) => {
  const toast = useToastForRequest();
  const router = useRouter();
  const {ref_id} = router.query;
  const theme = useTheme();
  const [avatar, setAvatar] = useState(null);
  const [agentDetails] = useLocalStorage('agentDetails');
  const [doc, setDoc] = useState([]);

  const mutation = useMutation(
    formData => {
      return agentSignUp({...formData});
    },
    {
      onSuccess: res => {
        if (res?.code === 'ERR_NETWORK') {
          toastForError(res, true, toast);
        }
        if (res?.statusText === 'Created') {
          localStorage.removeItem('agentDetails');
          setPage('approvalPending')
        }
      },
      onError: err => {
        toast({
          title: 'Oops...',
          description: `${
            err?.response?.data?.message ?? err?.response?.message ?? 'Something went wrong'
          }`,
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  function formatDate(date, forBackEnd) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    let formattedDate = `${day}/${month}/${year}`;

    if (forBackEnd) {
      formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }

    return date;
  }

  const formik = useFormik({
    initialValues: {},
    validateOnChange: true,
    validateOnBlur: false,
    validateOnMount: true,
    validationSchema: validationSchema,
    onSubmit: () => {},
  });

  const isDarkMode = theme.theme_name !== 'light';
  const onAvatarChange = file => {
    setAvatar(file[0]?.preview);
    formik.setFieldValue('avatar', file[0]?.image.replace('data:', '').replace(/^.+,/, ''));
  };

  const handleDocument = file => {
    const document = file ? file.map(item => item.replace('data:', '').replace(/^.+,/, '')) : null;
    setDoc(document);
  };

  const handleUpdate = () => {
    const [d, m, y] = agentDetails?.date_of_birth?.split('/');
    const DOB = new Date(`${y}-${m}-${d}`);
    delete agentDetails?.title
    const payload = {
      ...formik.values,
      ...agentDetails,
      date_of_birth: formatDate(DOB, true),
      email: email,
      document_type: null,
      document_type: null,
      id_number: null,
      document: doc,
      country: '1',
    };

    mutation.mutate(payload);
  };

  return (
    <Box bg={{ md: "card_bg"}} maxW={{ md: "475px"}} w={`100%`} p={{ md: '24px'}} borderRadius={'0px'} {...rest}>
      <Flex h="full" direction="column" justify={'center'} align="center" gap={`16px`}>
        <Stack align={`start`} gap={`8px`} w="full">
          <Text
            color="text"
            fontSize={{base: '20px', md: '24px'}}
            fontWeight={600}
            mt="0px"
            letterSpacing="0.24px"
            fontFamily="Open Sans"
            textTransform="uppercase"
            whiteSpace={{md: 'nowrap'}}
          >
            Tell us more about yourself
          </Text>
        </Stack>
        <SimpleGrid columns={1} spacing="15px" w="full">
          <Stack align='start'>
            <Text color='#F04438' letterSpacing='0.18px'>Passport Photograph*</Text>
            <UploadProfilePicture
              containerStyle={{
                width: 'max-content',
                margin: 'auto',
              }}
              id="avatar"
              name="avatar"
              setFiles={onAvatarChange}
              avatar={avatar || formik.values.avatar || default_avatar.src}
              numOfFiles={1}
              isProfilePic
              imageStyle={{
                objectFit: avatar ? 'cover' : 'contain',
                boxSize: { base: '45px', md: '75px' },
                border: 'none',
                boxShadow: 'none',
                padding: avatar ? 0 : 2,
              }}
              bg="#F5F5F5"
              maxW="max-content"
              p={avatar ? 0 : 4}
              rounded="full"
              camera={{
                marginTop: { base: '30px !important', md: '45px !important'},
                marginLeft: { base: '35px !important', md: '60px !important'},
              }}
            />
          </Stack>
          <FormSelect
            type="text"
            onChange={formik.handleChange('highest_education')}
            value={formik.values.highest_education}
            placeholder="Highest Education Level"
            options={[
              'High School Diploma',
              `Bachelor's Degree`,
              'Post-Secondary Certificate',
              'Some college',
              `Master's Degree`,
              'PHD',
            ]}
            fontSize={15}
            h="61px"
            borderColor={isDarkMode ? 'matador_border_color.200' : 'matador_border_color.100'}
          />
          <FormSelect
            options={['Married', 'Single']}
            type="text"
            onChange={formik.handleChange('marital_status')}
            value={formik.values.marital_status}
            placeholder="Marital Status"
            fontSize={15}
            h="61px"
            borderColor={isDarkMode ? 'matador_border_color.200' : 'matador_border_color.100'}
          />
          <FormInput
            type="text"
            onChange={formik.handleChange('address')}
            value={formik.values.address}
            placeholder="Residential Address"
            fontSize={15}
            h="61px"
            borderColor={isDarkMode ? 'matador_border_color.200' : 'matador_border_color.100'}
          />
          <FormInput
            type="text"
            onChange={formik.handleChange('company_name')}
            value={formik.values.company_name}
            placeholder="Company Name (Optional)"
            fontSize={15}
            h="61px"
            borderColor={isDarkMode ? 'matador_border_color.200' : 'matador_border_color.100'}
          />
          <UploadUserDocuments
            displayText={
              doc?.[0]
                ? 
                  `Document Uploaded`
                : 'Upload Valid ID'
            }
            handleDocument={handleDocument}
          />
        </SimpleGrid>
        <Button
          mt={{base: '12px', md: 0}}
          type="submit"
          color="white"
          bg="primary"
          w="full"
          fontSize={'18px'}
          onClick={handleUpdate}
          isLoading={mutation.isLoading}
          p="26px"
          isDisabled={!formik.isValid || !avatar || !doc.length}
          h={{base: '46px', md: '64px'}}
          rounded={0}
          _active={{
            opacity: 1
          }}
        >
          <Text
            lineHeight={'28px'}
            letterSpacing="0.18px"
            textTransform="uppercase"
            fontWeight={400}
            fontSize={'18px'}
          >
            Proceed
          </Text>
        </Button>
      </Flex>
    </Box>
  );
};

export default PersonalInfo;
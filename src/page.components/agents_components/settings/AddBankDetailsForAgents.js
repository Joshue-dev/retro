import React, {useEffect, useState} from 'react';
import {Modal, ModalOverlay, ModalContent, ModalFooter, ModalHeader, ModalBody, FormControl, VStack, HStack, Box, SlideFade, Text, Select, Image, useToast, Input, Button} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import {ErrorMessage, useFormik} from 'formik';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {fetchBanksForAgents, updateAgentSettingsInfo} from '../../../api/agents';

import {DropDown} from '../../../components/profileStyles';
import {toastForError} from '../../../utils/toastForErrors';
import successIcon from '/src/images/icons/check-icon-unscreen.gif';
import axios from 'axios';
import useLocalStorage from 'utils/hooks/useLocalStorage';
import {store_name} from 'constants/routes';

export const AddBankDetailsForAgents = ({refetch, isOpen, onClose, type, bank}) => {
	const toast = useToast();
	const queryClient = useQueryClient();
	const [successful, setSuccessful] = useState(false);
	const [isClicked, setIsClicked] = useState(false);
	const [shouldVerify, setShouldVerify] = useState(false);
	const [agentBank, setAgentBank] = useState(null);
	const [bankLoading, setBankLoading] = useState(null);
	const [bankError, setBankError] = useState(null);

	const storeName = store_name();

	const handleAdd = () => {
		setIsClicked(!isClicked);
		return formik.handleSubmit();
	};
	const {data, isError, error, isLoading: loading} = useQuery(['fetchBanksforAgents'], () => fetchBanksForAgents());

	const validateForm = (values) => {
		const errors = {};

		if (!Boolean(values.bank_code)) {
			errors.bank_code = 'Please Select The Bank !';
		}

		if (!values.account_number || values.account_number.length != 10) {
			errors.account_number = 'Please Enter the 10 digit Account Number !';
		} else if (!/^[0-9]+$/.test(values.account_number)) {
			errors.account_number = 'Please Enter the Digit Only !';
		}
		return errors;
	};

	const displayError = () => (formik.touched.account_number && formik.errors.account_number ? formik.errors.account_number : null);

	const formik = useFormik({
		initialValues: {
			bank_code: '',
			account_number: '',
		},
		onSubmit: (values) => {
			mutate({...values, store_name: storeName});
		},
		validate: validateForm,
		validateOnChange: true,
	});

	const {mutate, isLoading} = useMutation(
		(values) => {
			return updateAgentSettingsInfo(values);
		},
		{
			onSuccess: async (res) => {
				queryClient.invalidateQueries(['agents_settings_data']);
				await queryClient.refetchQueries(['agents_settings_data']);
				await refetch();
				formik.resetForm();
				setSuccessful(true);
				setIsClicked(false);
				setAgentBank(null);
			},
			onError: (err) => {
				formik.resetForm();
				onClose();
				setIsClicked(false);
				setAgentBank(null);
				toast({
					title: 'The name on this bank account does not match your registered name',
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'top-right',
				});
			},
		}
	);

	const VerifyBanksForAgents = async () => {
		try {
			setBankLoading(true);
			const response = await axios.get(`https://api.veritasihomes.com/v2/agents/settings/?resolve=true&account_number=${formik.values.account_number}&bank_code=${formik.values.bank_code}`);

			setAgentBank(response.data);
			setBankLoading(false);
		} catch (error) {
			console.error('Couldnt fetch bank info');
			setBankError(error.message);
			setBankLoading(false);
		}
	};

	useEffect(() => {
		if (formik.values.bank_code && formik.values.account_number.length === 10) {
			setShouldVerify(true);
			VerifyBanksForAgents();
		} else {
			setShouldVerify(false);
			setAgentBank(null);
			setBankError(null);
		}
	}, [formik.values.bank_code, formik.values.account_number]);

	return (
		<>
			<Modal
				isCentered
				motionPreset='slideInBottom'
				isOpen={isOpen}
				onClose={() => {
					formik.resetForm();
					setAgentBank(null);
					onClose();
				}}
				scrollBehavior='inside'
				blockScrollOnMount={'true'}
				size={{base: 'sm', md: 'lg'}}
				h={'550px'}>
				<ModalOverlay bg='rgba(0,0,0,0.65)' />
				<ModalContent px={'38px'} py={'15px'} pb='0px' shadow='lg' borderRadius='2xl'>
					{!successful ? (
						<>
							{' '}
							<ModalHeader px={'0px'} pb={'0px'}>
								<Text fontSize={'24px'} lineHeight={'30px'} fontWeight={'600'} textAlign='left' fontFamily={'Euclid Circular B'}>
									Link Your Bank Account
								</Text>
							</ModalHeader>
							<ModalBody px={'0px'} my={'10px'} py={'5px'} pb='0px'>
								<VStack>
									<Box bg='#F6F6FF' borderRadius='16px' px='1rem' py='1rem' mb='2rem'>
										<Text size='16px' fontWeight='300' color='#3D3D3D'>
											You can only link your own bank account and cannot add a third-party account.
										</Text>
									</Box>
									<FormControl as='form' onSubmit={formik.handleSubmit}>
										{loading ? (
											'loading'
										) : isError ? (
											<></>
										) : (
											<Select
												id='bank_code'
												name='bank_code'
												onChange={formik.handleChange}
												value={formik.values.bank_code}
												onBlur={formik.handleBlur}
												placeholder='Bank Name'
												_placeholder={{
													color: 'gray.400',
												}}
												icon={<DropDown forBank />}
												border='1px solid #CBCBCB'
												borderRadius='0.5rem'
												marginBottom='2rem'
												fontSize='16px'
												outline={'none'}
												boxShadow='none'
												_focus={{
													boxShadow: 'none',
													border: '1px solid #CBCBCB',
												}}>
												{data?.data?.message?.data.map((item) => (
													<option value={item.code} key={item.id}>
														{item.name}
													</option>
												))}
											</Select>
										)}
										{formik.touched.bank_code && formik.errors.bank_code ? (
											<Text color={'red'} fontSize={'14px'} mt='-5'>
												{formik.errors.bank_code}
											</Text>
										) : null}

										<VStack alignItems='flex-start' my={2} w='100%'>
											<Input
												as='input'
												color='#191919'
												py='6'
												outline='none'
												_placeholder={{
													fontSize: '16px',
													color: 'gray.500',
													fontWeight: '400',
												}}
												_active={{
													borderColor: 'grey',
												}}
												_visited={{
													borderColor: 'grey',
												}}
												type='input'
												id='account_number'
												name='account_number'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.account_number}
												placeholder='Account Number'
												fontSize={'16px'}
												borderColor={!!displayError() && 'red'}
												border='1px solid #CBCBCB'
												borderRadius='0.5rem'
												variant={'outline'}
												boxShadow='none'
												_focus={{
													boxShadow: 'none',
													border: '1px solid #CBCBCB',
												}}
											/>

											<SlideFade in={!!displayError()} offsetY='20px'>
												<Text textStyle='p-sm' color='red' fontSize={'14px'}>
													{displayError()}
												</Text>
											</SlideFade>
										</VStack>
										{agentBank || bankLoading || bankError ? (
											<Box bg='#F6F6FF' borderRadius='16px' px='1rem' py='1rem' mb='2'>
												{bankLoading ? 'Verifying bank info...' : !bankError ? agentBank?.message?.account_name : 'Incorrect account details'}
											</Box>
										) : (
											''
										)}
									</FormControl>
								</VStack>
							</ModalBody>
							<ModalFooter pb={'51px'} px={'0px'}>
								<VStack w={'100%'}>
									<Button
										borderRadius='12px'
										bg={'#4545FE'}
										disabled={isClicked}
										w={'100%'}
										color={'#FFFFFF'}
										fontWeight={'400'}
										fontSize={'18px'}
										lineHeight={'23px'}
										alignSelf='stretch'
										type='submit'
										isLoading={isLoading}
										onClick={handleAdd}
										_hover={{
											shadow: 'md',
										}}
										_active={{
											opacity: 0.8,
										}}
										minH={'55px'}>
										<motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
											{type ? 'Proceed' : 'Save'}
										</motion.button>
									</Button>
								</VStack>
							</ModalFooter>
						</>
					) : (
						<>
							<ModalBody my={'10px'} py={'20px'}>
								<VStack>
									<Image width='50%' src={successIcon.src} objectFit='cover' alt='commission request successful image' />

									<Text pb='54px' fontSize='1.5rem' fontWeight='600' as='h1'>
										Account Added Successfully
									</Text>
									<HStack
										borderRadius='12px'
										h='55px'
										color='white'
										w='full'
										cursor='pointer'
										py='16px'
										justify='center'
										bg='#4545FE'
										onClick={() => {
											onClose();
											setSuccessful(false);
										}}>
										<Text color='#Ffffff' fontSize='18px' fontWeight='400'>
											Ok
										</Text>
									</HStack>
								</VStack>
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};
export default AddBankDetailsForAgents;

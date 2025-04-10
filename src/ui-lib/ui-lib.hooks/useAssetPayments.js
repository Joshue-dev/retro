import { useState } from "react";
import { useMutation } from "react-query";
import {
  fetchBankDetails,
  makeEquityDeposit,
  makeEquityPayment,
} from "../../api/payment";
import { STORE__DOMAIN, storeName } from "../../constants/routes";
import openExternalUrl from "../../utils/openExternalLink";
import { getSession } from "utils/sessionmanagers";
import { useToastForRequest } from "./useToast";
import { toastForError } from "utils/toastForErrors";

export const useAssetPayment = ({
  paymentType,
  amountToPay,
  modal,
  paymentDetails,
  onSuccessful,
  refetch,
  auth_code,
  walletPay,
  asset_id,
}) => {
  const toast = useToastForRequest();
  const [authUrl, setAuthUrl] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [paymentStep, setPaymentStep] = useState("index");
  const [transferDetails, setTransferDetails] = useState(null);

  const depositMutation = useMutation(
    (formData) => makeEquityDeposit(formData),
    {
      onSettled: () => setLoading(false),
      onSuccess: (res) => {
        refetch ? refetch() : null;
        onSuccessful ? onSuccessful(res.data) : null;
        setAuthUrl(res?.data?.data?.data?.link ?? res?.data?.data?.link);
        const details = res?.data?.bank_details;
        const link =
          res?.data?.data?.link ||
          res?.data?.data?.data?.link ||
          res?.data?.data?.data?.data?.link;
        if (Array.isArray(details)) {
          setTransferDetails(res?.data?.bank_details?.data);
        }
        if (details) {
          setTransferDetails(details);
        }
        if (link) {
          modal?.onClose();
          openExternalUrl(link, "_blank");
        }
        if (walletPay) {
          toast({
            title: "Transaction Successful",
            status: "success",
            description: res?.data?.message,
          });
          modal.onClose()
        }
      },
      onError: (err) => {
        setError(true);
        if (walletPay) {
          toastForError(err, true, toast);
        }
      },
    }
  );

  const paymentMutation = useMutation(
    (formData) => makeEquityPayment(formData),
    {
      onSettled: () => setLoading(false),
      onSuccess: (res) => {
        refetch ? refetch() : null;

        onSuccessful ? onSuccessful(res.data) : null;
        setAuthUrl(res?.data?.data?.data?.link ?? res?.data?.data?.link);
        const details = res?.data?.bank_details;
        const link =
          res?.data?.data?.link ||
          res?.data?.data?.data?.link ||
          res?.data?.data?.data?.data?.link;
        if (walletPay) {
          toast({
            title: "Transaction Successful",
            status: "success",
            description: res?.data?.message,
          });
          modal.onClose()
        }
        if (Array.isArray(details)) {
          setTransferDetails(res?.data?.bank_details?.data);
        }
        if (details) {
          setTransferDetails(details);
        }
        if (link) {
          modal?.onClose();
          openExternalUrl(link, "_blank");
        }
      },
      onError: (err) => {
        setError(true);
        if (walletPay) {
          toastForError(err, true, toast);
        }
      },
    }
  );

  const BANK_TRANSFER = useMutation((id) => fetchBankDetails(id), {
    // onSettled: () => setLoading(false),
    retry: 0,
    onSuccess: async (res) => {
      const details = res?.data?.results;
      if (details?.length > 0) {
        setTransferDetails(details);
        setLoading(false);
      } else {
        const business_id = await getSession("businessId");
        const newPaymentDetails = {
          ...paymentDetails,
          auth_code,
          redirect_url: `https://${STORE__DOMAIN}`,
          payment_option: "virtual_bank",
          amount_to_pay: Number(amountToPay),
          store_name: storeName,
          from_store: true,
          business_id: JSON.parse(business_id),
          // ...(fractionPayloadForBankTransfer ? fractionPayloadForBankTransfer : {}),
        };

        switch (paymentType) {
          case "deposit":
            return depositMutation.mutate(newPaymentDetails);
          case "asset":
            return paymentMutation.mutate(newPaymentDetails);
          default:
            return;
        }
      }
    },
    onError: (err) => {
      toastForError(err, true, toast);
    },
  });

  const handlePaywithCard = async () => {
    const business_id = await getSession("businessId");
    setLoading(true);
    const newPaymentDetails = {
      ...paymentDetails,
      auth_code,
      redirect_url: `https://${STORE__DOMAIN}`,
      payment_option: "card",
      amount_to_pay: Number(amountToPay),
      store_name: storeName,
      from_store: true,
      business_id: JSON.parse(business_id),
    };

    switch (paymentType) {
      case "deposit":
        return depositMutation.mutate(newPaymentDetails);
      case "asset":
        return paymentMutation.mutate(newPaymentDetails);
      default:
        return;
    }
  };

  const handleBankTransfer = async () => {
    const business_id = await getSession("businessId");
    setPaymentStep("bankDetails");
    setLoading(true);
    if (asset_id) {
      BANK_TRANSFER.mutate(parseInt(asset_id));
    } else {
      const newPaymentDetails = {
        ...paymentDetails,
        auth_code,
        redirect_url: `https://${STORE__DOMAIN}`,
        payment_option: "virtual_bank",
        amount_to_pay: Number(amountToPay),
        store_name: storeName,
        from_store: true,
        business_id,
        // ...(fractionPayloadForBankTransfer ? fractionPayloadForBankTransfer : {}),
      };

      switch (paymentType) {
        case "deposit":
          return depositMutation.mutate(newPaymentDetails);
        case "asset":
          return paymentMutation.mutate(newPaymentDetails);
        default:
          return;
      }
    }
  };

  const handlePayFromWallet = async () => {
    const business_id = await getSession("businessId");
    setLoading(true);
    const newPaymentDetails = {
      ...paymentDetails,
      auth_code,
      redirect_url: `https://${STORE__DOMAIN}`,
      payment_option: "store_wallet",
      amount_to_pay: Number(amountToPay),
      store_name: storeName,
      from_store: true,
      business_id: JSON.parse(business_id),
    };
    switch (paymentType) {
      case "deposit":
        return depositMutation.mutate(newPaymentDetails);
      case "asset":
        return paymentMutation.mutate(newPaymentDetails);
      default:
        return;
    }
  };

  const handleEndTransaction = () => {
    depositMutation?.reset();
    paymentMutation?.reset();
  };

  const formattedAmount =
    amountToPay && amountToPay?.toString()?.replace(",", "");
  const isAboveLimit = parseInt(formattedAmount) > 500000;

  return {
    handleBankTransfer,
    handlePayFromWallet,
    handlePaywithCard,
    authUrl,
    setAuthUrl,
    isLoading,
    isError,
    setLoading,
    paymentStep,
    setPaymentStep,
    transferDetails,
    setTransferDetails,
    formattedAmount,
    isAboveLimit,
    paymentMutation,
    depositMutation,
    handleEndTransaction,
  };
};

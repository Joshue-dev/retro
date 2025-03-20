import { Box, useTheme } from "@chakra-ui/react";
import { useLightenHex } from "utils/lightenColorShade";

export const AssetPaymentWithBankSVG = ({ ...rest }) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  return (
    <Box width={`30px`} height={`30px`} {...rest}>
      <svg
        width={`100%`}
        height={`100%`}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle opacity="0.15" cx="15" cy="15" r="15" fill={primaryColor} />
        <g clip-path="url(#clip0_5996_595)">
          <path
            d="M22.3938 9.08094C22.8313 9.26875 23.075 9.7375 22.9781 10.2C22.8844 10.6656 22.475 11 22 11V11.25C22 11.6656 21.6656 12 21.25 12H8.75C8.33594 12 8 11.6656 8 11.25V11C7.52531 10.9719 7.11597 10.6656 7.02052 10.2C6.92506 9.7375 7.16978 9.26875 7.60625 9.08094L14.6063 6.08085C14.8563 5.97305 15.1438 5.97305 15.3938 6.08085L22.3938 9.08094ZM15 10C15.5531 10 16 9.55313 16 9C16 8.44782 15.5531 8 15 8C14.4469 8 14 8.44782 14 9C14 9.55313 14.4469 10 15 10Z"
            fill={primaryColor}
          />
          <path
            opacity="0.4"
            d="M10.972 19H12.222V13H14.222V19H15.7501V13H17.7501V19H19.0001V13H21.0001V19.1344C21.0189 19.1437 21.0376 19.1281 21.0564 19.1687L22.5564 20.1687C22.922 20.4125 23.0845 20.8687 22.9564 21.2906C22.8282 21.7125 22.4407 22 22.0001 22H7.972C7.5595 22 7.17068 21.7125 7.043 21.2906C6.91528 20.8687 7.07871 20.4125 7.44543 20.1687L8.94543 19.1687C8.96325 19.1281 8.98137 19.1437 8.972 19.1344V13H10.972V19Z"
            fill={primaryColor}
          />
        </g>
        <defs>
          <clipPath id="clip0_5996_595">
            <rect
              width="16"
              height="16"
              fill="white"
              transform="translate(7 6)"
            />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
};

export const CheckIconSVG = ({ ...rest }) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  return (
    <Box width={`16px`} height={`17px`} {...rest}>
      <svg
        width={`100%`}
        height={`100%`}
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Radio button">
          <circle
            id="Ellipse 38"
            cx="8"
            cy="8.5"
            r="7.5"
            stroke={primaryColor}
          />
          <circle id="Ellipse 39" cx="8" cy="8.5" r="5" fill={primaryColor} />
        </g>
      </svg>
    </Box>
  );
};

export const CreditCardShieldSVG = ({ ...rest }) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  return (
    <Box width={`24px`} height={`25px`} {...rest}>
      <svg
        width={`100%`}
        height={`100%`}
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="credit-card-shield">
          <path
            id="Icon"
            d="M22 10.5H2M22 11.5V8.7C22 7.5799 22 7.01984 21.782 6.59202C21.5903 6.2157 21.2843 5.90974 20.908 5.71799C20.4802 5.5 19.9201 5.5 18.8 5.5H5.2C4.0799 5.5 3.51984 5.5 3.09202 5.71799C2.7157 5.90973 2.40973 6.21569 2.21799 6.59202C2 7.01984 2 7.5799 2 8.7V16.3C2 17.4201 2 17.9802 2.21799 18.408C2.40973 18.7843 2.71569 19.0903 3.09202 19.282C3.51984 19.5 4.07989 19.5 5.2 19.5H11.5M18 21.5C18 21.5 21 20.0701 21 17.9252V15.4229L18.8124 14.6412C18.2868 14.4529 17.712 14.4529 17.1864 14.6412L15 15.4229V17.9252C15 20.0701 18 21.5 18 21.5Z"
            stroke={primaryColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </Box>
  );
};

export const DebitCardSVG = ({ ...rest }) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  return (
    <Box width={`30px`} height={`30px`} {...rest}>
      <svg
        width={`100%`}
        height={`100%`}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle opacity="0.12" cx="15" cy="15" r="15" fill={primaryColor} />
        <path d="M24 14H6V11H24V14Z" fill="white" />
        <path
          d="M22 8C23.1031 8 24 8.89531 24 10V11H6V10C6 8.89531 6.89531 8 8 8H22ZM24 20C24 21.1031 23.1031 22 22 22H8C6.89531 22 6 21.1031 6 20V14H24V20ZM9.5 18C9.225 18 9 18.225 9 18.5C9 18.775 9.225 19 9.5 19H11.5C11.775 19 12 18.775 12 18.5C12 18.225 11.775 18 11.5 18H9.5ZM13.5 19H17.5C17.775 19 18 18.775 18 18.5C18 18.225 17.775 18 17.5 18H13.5C13.225 18 13 18.225 13 18.5C13 18.775 13.225 19 13.5 19Z"
          fill={primaryColor}
        />
      </svg>
    </Box>
  );
};

export const PaymentWithBankSVG = ({ ...rest }) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  return (
    <Box width={`24px`} height={`25px`} {...rest}>
      <svg
        width={`100%`}
        height={`100%`}
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="building-columns-duotone 1" clip-path="url(#clip0_6047_4897)">
          <path
            id="Vector"
            d="M23.0906 5.12141C23.7469 5.40313 24.1125 6.10626 23.9672 6.80001C23.8266 7.49844 23.2125 8.00001 22.5 8.00001V8.37501C22.5 8.99844 21.9984 9.50001 21.375 9.50001H2.625C2.00391 9.50001 1.5 8.99844 1.5 8.37501V8.00001C0.78797 7.95782 0.173954 7.49844 0.0307792 6.80001C-0.112405 6.10626 0.254673 5.40313 0.909376 5.12141L11.4094 0.621271C11.7844 0.459576 12.2156 0.459576 12.5906 0.621271L23.0906 5.12141ZM12 6.50001C12.8297 6.50001 13.5 5.82969 13.5 5.00001C13.5 4.17172 12.8297 3.50001 12 3.50001C11.1703 3.50001 10.5 4.17172 10.5 5.00001C10.5 5.82969 11.1703 6.50001 12 6.50001Z"
            fill={primaryColor}
          />
          <path
            id="Vector_2"
            opacity="0.4"
            d="M5.95799 20H7.83299V11H10.833V20H13.1252V11H16.1252V20H18.0002V11H21.0002V20.2016C21.0283 20.2156 21.0564 20.1922 21.0846 20.2531L23.3346 21.7531C23.883 22.1187 24.1267 22.8031 23.9346 23.4359C23.7424 24.0687 23.1611 24.5 22.5002 24.5H1.45799C0.839243 24.5 0.256024 24.0687 0.0644931 23.4359C-0.127085 22.8031 0.118071 22.1187 0.668149 21.7531L2.91815 20.2531C2.94487 20.1922 2.97206 20.2156 2.95799 20.2016V11H5.95799V20Z"
            fill={primaryColor}
          />
        </g>
        <defs>
          <clipPath id="clip0_6047_4897">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(0 0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
};

export const PendingTransactionBarSVG = ({ color, ...rest }) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const { lightenHex } = useLightenHex(primaryColor);
  return (
    <Box width={`32px`} height={`32px`} {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 25 25"
        fill="none"
      >
        <path
          d="M5.33301 15.6602C4.39301 15.6602 3.52301 15.9902 2.83301 16.5402C1.91301 17.2702 1.33301 18.4002 1.33301 19.6602C1.33301 21.8702 3.12301 23.6602 5.33301 23.6602C6.34301 23.6602 7.26301 23.2802 7.97301 22.6602C8.80301 21.9302 9.33301 20.8602 9.33301 19.6602C9.33301 17.4502 7.54301 15.6602 5.33301 15.6602ZM6.33301 19.9102C6.33301 20.1702 6.19301 20.4202 5.97301 20.5502L4.72301 21.3002C4.60301 21.3802 4.46301 21.4102 4.33301 21.4102C4.08301 21.4102 3.83301 21.2802 3.69301 21.0502C3.48301 20.6902 3.59301 20.2302 3.95301 20.0202L4.84301 19.4902V18.4102C4.83301 18.0002 5.17301 17.6602 5.58301 17.6602C5.99301 17.6602 6.33301 18.0002 6.33301 18.4102V19.9102Z"
          fill={color ?? "#344054"}
        />
        <path
          d="M15.183 4.61094V8.41094H13.683V4.61094C13.683 4.34094 13.443 4.21094 13.283 4.21094C13.233 4.21094 13.183 4.22094 13.133 4.24094L5.20301 7.23094C4.67301 7.43094 4.33301 7.93094 4.33301 8.50094V9.17094C3.42301 9.85094 2.83301 10.9409 2.83301 12.1709V8.50094C2.83301 7.31094 3.56301 6.25094 4.67301 5.83094L12.613 2.83094C12.833 2.75094 13.063 2.71094 13.283 2.71094C14.283 2.71094 15.183 3.52094 15.183 4.61094Z"
          fill={color ?? "#344054"}
        />
        <path
          d="M21.8332 15.1602V16.1602C21.8332 16.4302 21.6232 16.6502 21.3432 16.6602H19.8832C19.3532 16.6602 18.8732 16.2702 18.8332 15.7502C18.8032 15.4402 18.9232 15.1502 19.1232 14.9502C19.3032 14.7602 19.5532 14.6602 19.8232 14.6602H21.3332C21.6232 14.6702 21.8332 14.8902 21.8332 15.1602Z"
          fill={color ?? "#344054"}
        />
        <path
          d="M19.813 13.6102H20.833C21.383 13.6102 21.833 13.1602 21.833 12.6102V12.1702C21.833 10.1002 20.143 8.41016 18.073 8.41016H6.59301C5.74301 8.41016 4.96301 8.69016 4.33301 9.17016C3.42301 9.85016 2.83301 10.9402 2.83301 12.1702V13.9502C2.83301 14.3302 3.23301 14.5702 3.59301 14.4502C4.15301 14.2602 4.74301 14.1602 5.33301 14.1602C8.36301 14.1602 10.833 16.6302 10.833 19.6602C10.833 20.3802 10.643 21.1702 10.343 21.8702C10.183 22.2302 10.433 22.6602 10.823 22.6602H18.073C20.143 22.6602 21.833 20.9702 21.833 18.9002V18.7102C21.833 18.1602 21.383 17.7102 20.833 17.7102H19.963C19.003 17.7102 18.083 17.1202 17.833 16.1902C17.633 15.4302 17.873 14.6902 18.373 14.2102C18.743 13.8302 19.253 13.6102 19.813 13.6102ZM14.333 13.4102H9.33301C8.92301 13.4102 8.58301 13.0702 8.58301 12.6602C8.58301 12.2502 8.92301 11.9102 9.33301 11.9102H14.333C14.743 11.9102 15.083 12.2502 15.083 12.6602C15.083 13.0702 14.743 13.4102 14.333 13.4102Z"
          fill={color ?? "#344054"}
        />
      </svg>
    </Box>
  );
};

export const WalletCardSVG = ({ ...rest }) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  return (
    <Box width={`30px`} height={`30px`} {...rest}>
      <svg
        width={`100%`}
        height={`100%`}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle opacity="0.12" cx="15" cy="15" r="15" fill={primaryColor} />
        <path
          d="M23.3329 15.5167V17.2333C23.3329 17.7 22.9495 18.0833 22.4745 18.0833H20.8662C19.9662 18.0833 19.1412 17.425 19.0662 16.525C19.0162 16 19.2162 15.5083 19.5662 15.1667C19.8745 14.85 20.2995 14.6667 20.7662 14.6667H22.4745C22.9495 14.6667 23.3329 15.05 23.3329 15.5167Z"
          fill={primaryColor}
        />
        <path
          d="M17.818 16.6333C17.743 15.7583 18.0596 14.9 18.693 14.275C19.2263 13.7333 19.968 13.4167 20.768 13.4167H21.243C21.4763 13.4167 21.668 13.225 21.6346 12.9917C21.4096 11.375 20.0096 10.125 18.3346 10.125H10.0013C8.15964 10.125 6.66797 11.6167 6.66797 13.4583V19.2917C6.66797 21.1333 8.15964 22.625 10.0013 22.625H18.3346C20.018 22.625 21.4096 21.375 21.6346 19.7583C21.668 19.525 21.4763 19.3333 21.243 19.3333H20.868C19.2846 19.3333 17.9513 18.15 17.818 16.6333ZM15.8346 14.9167H10.8346C10.493 14.9167 10.2096 14.6417 10.2096 14.2917C10.2096 13.9417 10.493 13.6667 10.8346 13.6667H15.8346C16.1763 13.6667 16.4596 13.95 16.4596 14.2917C16.4596 14.6333 16.1763 14.9167 15.8346 14.9167Z"
          fill={primaryColor}
        />
        <path
          d="M16.8429 8.31667C17.0595 8.54167 16.8679 8.875 16.5512 8.875H10.0262C9.11785 8.875 8.26785 9.14167 7.55952 9.6C7.23452 9.80833 6.79285 9.58333 6.95118 9.225C7.41785 8.13333 8.50952 7.375 9.76785 7.375H14.4512C15.4179 7.375 16.2762 7.71667 16.8429 8.31667Z"
          fill={primaryColor}
        />
      </svg>
    </Box>
  );
};

export const ChatIconForInspectionFeedback = ({ color, ...rest }) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const { lightenHex } = useLightenHex(primaryColor);
  return (
    <Box width={`32px`} height={`32px`} {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M18.9799 1.02084C18.1099 0.150836 16.8799 -0.189164 15.6899 0.110836L5.88986 2.56084C4.23986 2.97084 2.96986 4.25084 2.55986 5.89084L0.109859 15.7008C-0.190141 16.8908 0.149859 18.1208 1.01986 18.9908C1.67986 19.6408 2.54986 20.0008 3.44986 20.0008C3.72986 20.0008 4.01986 19.9708 4.29986 19.8908L14.1099 17.4408C15.7499 17.0308 17.0299 15.7608 17.4399 14.1108L19.8899 4.30084C20.1899 3.11084 19.8499 1.88084 18.9799 1.02084ZM9.99986 13.8808C7.85986 13.8808 6.11986 12.1408 6.11986 10.0008C6.11986 7.86084 7.85986 6.12084 9.99986 6.12084C12.1399 6.12084 13.8799 7.86084 13.8799 10.0008C13.8799 12.1408 12.1399 13.8808 9.99986 13.8808Z"
          fill={color ?? "#344054"}
        />
      </svg>
    </Box>
  );
};

export const OffersIcon = ({ color, ...rest }) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const { lightenHex } = useLightenHex(primaryColor);
  return (
    <Box width={`32px`} height={`32px`} {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M21.5309 10.8689L20.0109 9.34891C19.7509 9.08891 19.5409 8.57891 19.5409 8.21891V6.05891C19.5409 5.17891 18.8209 4.45891 17.9409 4.45891H15.7909C15.4309 4.45891 14.9209 4.24891 14.6609 3.98891L13.1409 2.46891C12.5209 1.84891 11.5009 1.84891 10.8809 2.46891L9.34086 3.98891C9.09086 4.24891 8.58086 4.45891 8.21086 4.45891H6.06086C5.18086 4.45891 4.46086 5.17891 4.46086 6.05891V8.20891C4.46086 8.56891 4.25086 9.07891 3.99086 9.33891L2.47086 10.8589C1.85086 11.4789 1.85086 12.4989 2.47086 13.1189L3.99086 14.6389C4.25086 14.8989 4.46086 15.4089 4.46086 15.7689V17.9189C4.46086 18.7989 5.18086 19.5189 6.06086 19.5189H8.21086C8.57086 19.5189 9.08086 19.7289 9.34086 19.9889L10.8609 21.5089C11.4809 22.1289 12.5009 22.1289 13.1209 21.5089L14.6409 19.9889C14.9009 19.7289 15.4109 19.5189 15.7709 19.5189H17.9209C18.8009 19.5189 19.5209 18.7989 19.5209 17.9189V15.7689C19.5209 15.4089 19.7309 14.8989 19.9909 14.6389L21.5109 13.1189C22.1609 12.5089 22.1609 11.4889 21.5309 10.8689ZM8.00086 8.99891C8.00086 8.44891 8.45086 7.99891 9.00086 7.99891C9.55086 7.99891 10.0009 8.44891 10.0009 8.99891C10.0009 9.54891 9.56086 9.99891 9.00086 9.99891C8.45086 9.99891 8.00086 9.54891 8.00086 8.99891ZM9.53086 15.5289C9.38086 15.6789 9.19086 15.7489 9.00086 15.7489C8.81086 15.7489 8.62086 15.6789 8.47086 15.5289C8.18086 15.2389 8.18086 14.7589 8.47086 14.4689L14.4709 8.46891C14.7609 8.17891 15.2409 8.17891 15.5309 8.46891C15.8209 8.75891 15.8209 9.23891 15.5309 9.52891L9.53086 15.5289ZM15.0009 15.9989C14.4409 15.9989 13.9909 15.5489 13.9909 14.9989C13.9909 14.4489 14.4409 13.9989 14.9909 13.9989C15.5409 13.9989 15.9909 14.4489 15.9909 14.9989C15.9909 15.5489 15.5509 15.9989 15.0009 15.9989Z"
          fill={color ?? "#344054"}
        />
      </svg>
    </Box>
  );
};

export const ValidateAssetHomeIcon = ({ color, ...rest }) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const { lightenHex } = useLightenHex(primaryColor);
  return (
    <Box {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 21 21"
        fill="none"
      >
        <path
          d="M18.7072 5.48571L12.9472 1.45571C11.3772 0.355709 8.96723 0.415709 7.45723 1.58571L2.44723 5.49571C1.44723 6.27571 0.657227 7.87571 0.657227 9.13571V16.0357C0.657227 18.5857 2.72723 20.6657 5.27723 20.6657H16.0572C18.6072 20.6657 20.6772 18.5957 20.6772 16.0457V9.26571C20.6772 7.91571 19.8072 6.25571 18.7072 5.48571ZM11.4172 16.6657C11.4172 17.0757 11.0772 17.4157 10.6672 17.4157C10.2572 17.4157 9.91723 17.0757 9.91723 16.6657V13.6657C9.91723 13.2557 10.2572 12.9157 10.6672 12.9157C11.0772 12.9157 11.4172 13.2557 11.4172 13.6657V16.6657Z"
          fill={color ?? "#344056"}
        />
      </svg>
    </Box>
  );
};

export const BankTransferCopyIcon = ({ ...rest }) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  return (
    <Box width={`38px`} height={`41px`} {...rest}>
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.6508 22.832H7.45078C3.54078 22.832 1.80078 21.092 1.80078 17.182V12.982C1.80078 9.07203 3.54078 7.33203 7.45078 7.33203H11.6508C15.5608 7.33203 17.3008 9.07203 17.3008 12.982V17.182C17.3008 21.092 15.5608 22.832 11.6508 22.832ZM7.45078 8.83203C4.35078 8.83203 3.30078 9.88203 3.30078 12.982V17.182C3.30078 20.282 4.35078 21.332 7.45078 21.332H11.6508C14.7508 21.332 15.8008 20.282 15.8008 17.182V12.982C15.8008 9.88203 14.7508 8.83203 11.6508 8.83203H7.45078Z"
          fill="#525252"
        />
        <path
          d="M17.6508 16.832H16.5508C16.1408 16.832 15.8008 16.492 15.8008 16.082V12.982C15.8008 9.88203 14.7508 8.83203 11.6508 8.83203H8.55078C8.14078 8.83203 7.80078 8.49203 7.80078 8.08203V6.98203C7.80078 3.07203 9.54078 1.33203 13.4508 1.33203H17.6508C21.5608 1.33203 23.3008 3.07203 23.3008 6.98203V11.182C23.3008 15.092 21.5608 16.832 17.6508 16.832ZM17.3008 15.332H17.6508C20.7508 15.332 21.8008 14.282 21.8008 11.182V6.98203C21.8008 3.88203 20.7508 2.83203 17.6508 2.83203H13.4508C10.3508 2.83203 9.30078 3.88203 9.30078 6.98203V7.33203H11.6508C15.5608 7.33203 17.3008 9.07203 17.3008 12.982V15.332Z"
          fill="#525252"
        />
      </svg>
    </Box>
  );
};

export const AssetImagePreviewIcon = ({ ...rest }) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  return (
    <Box width={`38px`} height={`41px`} {...rest}>
      <svg
        width="full"
        height="full"
        viewBox="0 0 23 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.953125"
          y="0.710938"
          width="21.2092"
          height="21.209"
          rx="3.53488"
          fill="black"
          fill-opacity="0.2"
        />
        <path
          d="M16.8583 6.01367L6.25391 16.6175"
          stroke="white"
          stroke-width="1.32551"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.859 9.54827V6.01367H13.3242"
          stroke="white"
          stroke-width="1.32551"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6.25391 13.084V16.6186H9.78872"
          stroke="white"
          stroke-width="1.32551"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6.25391 6.01367L16.8583 16.6175"
          stroke="white"
          stroke-width="1.32551"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6.25391 9.54827V6.01367H9.78872"
          stroke="white"
          stroke-width="1.32551"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.859 13.084V16.6186H13.3242"
          stroke="white"
          stroke-width="1.32551"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Box>
  );
};

export const CheckTermsSVG = ({ ...rest }) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  return (
    <Box {...rest}>
      <svg
        width="100%"
        height={"100%"}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.666667"
          y="0.666667"
          width="30.6667"
          height="30.6667"
          rx="10"
          fill={primaryColor}
          stroke="#F5F5F5"
          stroke-width="1.33333"
        />
        <path
          d="M8 16.0013L13.3355 21.3346L24.0023 10.668"
          stroke="white"
          stroke-width="2.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Box>
  );
};

export const WithdrawalIconSVG = ({ ...rest }) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  return (
    <Box {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 22 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="vuesax/bold/import">
          <g id="import">
            <path
              id="Vector"
              d="M2.81153 13.1992H10.3843V9.91409L8.97898 11.3194C8.71939 11.579 8.28973 11.579 8.03014 11.3194C7.77055 11.0599 7.77055 10.6302 8.03014 10.3706L10.5813 7.82843C10.8409 7.56884 11.2705 7.56884 11.5301 7.82843L14.0812 10.3706C14.2155 10.5049 14.2782 10.6749 14.2782 10.845C14.2782 11.0151 14.2065 11.1852 14.0723 11.3194C13.8127 11.579 13.383 11.579 13.1234 11.3194L11.727 9.92304V13.1992L19.1745 13.1992C19.6042 13.1992 19.9443 12.8591 19.9443 12.4294C19.9443 7.15708 16.2653 3.47809 10.993 3.47809C5.72071 3.47809 2.04172 7.15708 2.04172 12.4294C2.04172 12.8591 2.38187 13.1992 2.81153 13.1992Z"
              fill={primaryColor}
            />
            <path
              id="Vector_2"
              d="M10.3858 18.4888C10.3858 18.8558 10.6902 19.1602 11.0572 19.1602C11.4242 19.1602 11.7285 18.8558 11.7285 18.4888V13.2075H10.3858V18.4888Z"
              fill={primaryColor}
            />
          </g>
        </g>
      </svg>
    </Box>
  );
};

export const LinkedinIconSVG = ({ ...rest }) => {
  const theme = useTheme();
  const textColor = theme.colors.text;
  const inverseColor = theme.colors.inverse_text;
  return (
    <Box {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
      >
        <g clip-path="url(#clip0_4262_376)">
          <path
            d="M4.33854 21.8255H7.77604V11.4609H4.33854V21.8255ZM7.98438 8.28385C7.98438 7.76302 7.81076 7.34635 7.46354 7.03385C7.11632 6.68663 6.64757 6.51302 6.05729 6.51302C5.50174 6.51302 5.03299 6.68663 4.65104 7.03385C4.30382 7.34635 4.13021 7.76302 4.13021 8.28385C4.13021 8.80469 4.30382 9.23871 4.65104 9.58594C4.99826 9.89844 5.44965 10.0547 6.00521 10.0547H6.05729C6.61285 10.0547 7.0816 9.89844 7.46354 9.58594C7.81076 9.23871 7.98438 8.80469 7.98438 8.28385ZM16.6823 21.8255H20.1198V15.888C20.1198 14.3602 19.7552 13.197 19.026 12.3984C18.2969 11.6345 17.342 11.2526 16.1615 11.2526C14.8073 11.2526 13.7656 11.8255 13.0365 12.9714H13.0885V11.4609H9.65104C9.68576 12.1207 9.68576 15.5755 9.65104 21.8255H13.0885V16.0443C13.0885 15.6623 13.1233 15.3845 13.1927 15.2109C13.3316 14.8637 13.5573 14.5686 13.8698 14.3255C14.1476 14.0825 14.5122 13.9609 14.9635 13.9609C16.1094 13.9609 16.6823 14.7422 16.6823 16.3047V21.8255ZM23.6615 6.92969V21.2526C23.6615 22.4332 23.2448 23.4401 22.4115 24.2734C21.5781 25.1068 20.5712 25.5234 19.3906 25.5234H5.06771C3.88715 25.5234 2.88021 25.1068 2.04688 24.2734C1.21354 23.4401 0.796875 22.4332 0.796875 21.2526V6.92969C0.796875 5.74913 1.21354 4.74219 2.04688 3.90885C2.88021 3.07552 3.88715 2.65885 5.06771 2.65885H19.3906C20.5712 2.65885 21.5781 3.07552 22.4115 3.90885C23.2448 4.74219 23.6615 5.74913 23.6615 6.92969Z"
            fill={textColor}
          />
        </g>
        <defs>
          <clipPath id="clip0_4262_376">
            <rect
              width="26.6667"
              height="26.6667"
              fill={inverseColor}
              transform="matrix(1 0 0 -1 0.796875 27.1875)"
            />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
};

export const FacebookIconSVG = ({ ...rest }) => {
  const theme = useTheme();
  const textColor = theme.colors.text;
  const inverseColor = theme.colors.inverse_text;
  return (
    <Box {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
      >
        <g clip-path="url(#clip0_4262_379)">
          <path
            d="M18.6035 2.65885C19.7841 2.65885 20.791 3.07552 21.6243 3.90885C22.4577 4.74219 22.8743 5.74913 22.8743 6.92969V21.2526C22.8743 22.4332 22.4577 23.4401 21.6243 24.2734C20.791 25.1068 19.7841 25.5234 18.6035 25.5234H15.791V16.6693H18.7598L19.1764 13.2318H15.791V10.9922C15.791 10.4366 15.9125 10.02 16.1556 9.74219C16.3639 9.46441 16.8153 9.32552 17.5098 9.32552H19.3327V6.2526C18.7077 6.14844 17.8223 6.09635 16.6764 6.09635C15.3223 6.09635 14.2459 6.49566 13.4473 7.29427C12.6139 8.09288 12.1973 9.22135 12.1973 10.6797V13.2318H9.22852V16.6693H12.1973V25.5234H4.2806C3.10004 25.5234 2.0931 25.1068 1.25977 24.2734C0.426432 23.4401 0.00976562 22.4332 0.00976562 21.2526V6.92969C0.00976562 5.74913 0.426432 4.74219 1.25977 3.90885C2.0931 3.07552 3.10004 2.65885 4.2806 2.65885H18.6035Z"
            fill={textColor}
          />
        </g>
        <defs>
          <clipPath id="clip0_4262_376">
            <rect
              width="26.6667"
              height="26.6667"
              fill={inverseColor}
              transform="matrix(1 0 0 -1 0.796875 27.1875)"
            />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
};

import astridImg from '../images/astrid2.png';
import luxuryCondoImg from '../images/luxury_condo.png';
import imageTwo from '../images/landPark.png';
import nationalIdImg from '../images/national-id.png';
import utilityIcon from '../images/icons/utility.png';

export const MATADOR_CUSTOMER_BASIC_INFO = [
  {
    first_name: 'Daniel',
    last_name: 'Tanay',
    image: null,
    status: 'Employed',
    phone: '+2348166111593',
    email: 'danieltanay@gmail.com',
    gender: 'Male',
    blacklisted: false,
  },
];
export const MATADOR_CUSTOMER_PROPERTIES = [
  {
    id: 1,
    image: astridImg,
    name: 'Astrid 2.0',
    construction_status: 'Under construction',
    defaulting: false,
    outstanding_balance: '100,000.00',
    unit_title: `Governor's Consent`,
    payment_plan_type: 'Smart plan',
    total_paid: '120,000.00',
    unit_size: '400sqm',
  },
  {
    id: 2,
    image: imageTwo,
    name: 'LandPark Mall',
    construction_status: 'Completed',
    defaulting: true,
    outstanding_balance: '100,000.00',
    unit_title: `Governor's Consent`,
    payment_plan_type: 'Manual plan',
    total_paid: '120,000.00',
    unit_size: '400sqm',
  },
];

export const CUSTOMER_ADDITIONAL_INFO = {
  income_range: '2,200,000 - 4,500,000',
  occupation: 'Financial Advisory',
  marital_status: 'Single',
  company_name: 'Dexacong Nig Ltd',
  education: 'MBA',
  username: '@danlany',
  joined_date: 'Sep 04, 2021',
  bank: 'Zenith Bank Plc',
  account_number: '0951109090',
  first_name: 'Ashish',
  last_name: 'Tanay',
  relationship: 'Brother',
  email: 'ashishtanay02@gmail.com',
  phone: '+2348166111593',
  residential_address: 'W Webster Rd Kirkland, Arizona(AZ), County Rd 19 Mingo Junction, Ohio(OH)',
};

export const SENT_OFFERS = [
  {
    image: astridImg,
    fractions_available: '20,000',
    offer_duration: '1 Month',
    offer_price: '8,000.00',
    offer_discount: '2,000.00',
    price_per_fraction: '10,000.00',
    name: 'Astrid 2.0',
    offer_deadline: 'Sep 25, 2022',
    offer_type: 'Fractional offer',
    construction_status: 'Under construction',
  },
  {
    image: astridImg,
    unit_image: luxuryCondoImg,
    unit_qty: '1',
    unit_size: '20,000',
    unit_name: 'luxury condo',
    unit_price: '3,200,000.00',
    offer_duration: '1 Month',
    offer_price: '3,000,000.00',
    name: 'Astrid 2.0',
    offer_discount: '200,000.00',
    offer_deadline: 'Sep 25, 2022',
    offer_type: 'Whole unit offer',
    construction_status: 'Under construction',
  },
];

export const INSPECTIONS_BOOKED = [
  {
    month: 'August',
    day: '15',
    time: '10:00 AM',
    inspection_type: 'In-Person',
  },
  {
    month: 'August',
    day: '10',
    time: '12:00 PM',
    inspection_type: 'Video Chat',
  },
];

export const IDAndDOCS = [
  {
    image: nationalIdImg,
    type: 'National ID',
    issued_date: 'Jan 2019',
    exp_date: 'No Expiration Date',
  },
  {
    image: utilityIcon,
    type: 'Utility Bill',
  },
];

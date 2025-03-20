import {ChevronDownIcon} from '@chakra-ui/icons';
import {Button, HStack, Image, Progress, Tag, TagLabel, Text} from '@chakra-ui/react';
import Link from 'next/link';

export const LISTINGS_OVERVIEW_COLUMNS = [
  {
    Header: 'No.',
    accessor: 'id',
  },
  {
    Header: 'Image',
    accessor: row => {
      return (
        <Image
          alt={row.name}
          borderRadius="full"
          height="48px"
          width="47.29px"
          src={row.image.src}
        />
      );
    },
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Location',
    accessor: 'location',
  },
  {
    Header: 'No. of units',
    accessor: row => {
      const units = row.units;
      const value = units.substring(0, units.search('/'));
      const total = units.substring(units.search('/') + 1, units.length);
      const percentage = (value / total) * 100;
      let status = row.status.toLowerCase();
      const colorScheme = status === 'inactive' ? 'gray' : status === 'active' ? 'green' : 'red';
      return (
        <div>
          <Text mb={2}>{row.units}</Text>
          <Progress borderRadius="full" value={percentage} size="sm" colorScheme={colorScheme} />
        </div>
      );
    },
  },
  {
    Header: 'Created Date',
    accessor: 'created_date',
  },
  {
    Header: 'Status',
    accessor: row => {
      let status = row.status.toLowerCase();
      const colorScheme = status === 'inactive' ? 'gray' : status === 'active' ? 'green' : 'red';
      return (
        <Tag p={3} w="93px" size="lg" colorScheme={colorScheme} borderRadius="full">
          <TagLabel mx="auto">{row.status}</TagLabel>
        </Tag>
      );
    },
  },
  {
    Header: 'Action',
    accessor: row => {
      return (
        <Link prefetch={false} href={`/customers/customer_profile/${row.id}`}>
          <Button
            borderRadius="12px"
            w="115px"
            h="40px"
            color={themeStyles.color.primary}
            borderColor={themeStyles.color.primary}
            variant="outline"
          >
            View
          </Button>
        </Link>
      );
    },
  },
];

export const LISTINGS_OVERVIEW_DATA = [
  {
    id: 1,
    units: '24/38',
    image: '/images/table_img_1.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Lekki Lagos, Nigeria',
  },
  {
    id: 2,
    units: '24/38',
    image: '/images/table_img_2.png',
    status: 'Inactive',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Abuja, Nigeria',
  },
  {
    id: 3,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Ogun, Nigeria',
  },
  {
    id: 4,
    units: '24/38',
    image: '/images/table_img_4.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Jos, Nigeria',
  },
  {
    id: 5,
    units: '24/38',
    image: '/images/table_img_1.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Ikeja Lagos, Nigeria',
  },
  {
    id: 6,
    units: '38/38',
    image: '/images/table_img_5.png',
    status: 'Sold Out',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Kano, Nigeria',
  },
  {
    id: 7,
    units: '24/38',
    image: '/images/table_img_6.png',
    status: 'Inactive',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Jos, Nigeria',
  },
  {
    id: 8,
    units: '24/38',
    image: '/images/table_img_4.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Ikota Lagos, Nigeria',
  },
  {
    id: 9,
    units: '38/38',
    image: '/images/table_img_2.png',
    status: 'Sold Out',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Ajah Lagos, Nigeria',
  },
  {
    id: 10,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 11,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 12,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 13,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 14,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 15,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 16,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 17,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 18,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 19,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 20,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 21,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 22,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 23,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 24,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 25,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 26,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 27,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 28,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 29,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 30,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 31,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 32,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 33,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 34,
    name: 'lsidebottomx',
    first_name: 'Licha',
    last_name: 'Sidebottom',
    email: 'lsidebottomx@hubpages.com',
    units: 'Agender',
    status: '1 Jenna Junction',
    image: '/Columbia',
    location: 'United States',
    created_date: 'laser',
  },
  {
    id: 35,
    name: 'skrzyzowskiy',
    first_name: 'Siegfried',
    last_name: 'Krzyzowski',
    email: 'skrzyzowskiy@hubpages.com',
    units: 'Genderqueer',
    status: '02439 Algoma Terrace',
    image: '/Yangyu',
    location: 'China',
    created_date: 'mastercard',
  },
  {
    id: 36,
    name: 'dwhorltonz',
    first_name: 'Des',
    last_name: 'Whorlton',
    email: 'dwhorltonz@weebly.com',
    units: 'Polygender',
    status: '4609 Eastlawn Place',
    image: '/Neiguan',
    location: 'China',
    created_date: 'china-unionpay',
  },
  {
    id: 37,
    name: 'gdalgardno10',
    first_name: 'Garnette',
    last_name: 'Dalgardno',
    email: 'gdalgardno10@ask.com',
    units: 'Genderfluid',
    status: '68 Ronald Regan Drive',
    image: '/Buan',
    location: 'Philippines',
    created_date: 'jcb',
  },
  {
    id: 38,
    name: 'ehowroyd11',
    first_name: 'Elsbeth',
    last_name: 'Howroyd',
    email: 'ehowroyd11@slashdot.org',
    units: 'Bigender',
    status: '6 Forest Dale Hill',
    image: '/Danao',
    location: 'Philippines',
    created_date: 'jcb',
  },
  {
    id: 39,
    name: 'tdonohue12',
    first_name: 'Tally',
    last_name: 'Donohue',
    email: 'tdonohue12@xing.com',
    units: 'Agender',
    status: '3 Hollow Ridge Center',
    image: '/Shuanghekou',
    location: 'China',
    created_date: 'laser',
  },
  {
    id: 40,
    name: 'abremond13',
    first_name: 'Artemus',
    last_name: 'Bremond',
    email: 'abremond13@un.org',
    units: 'Genderqueer',
    status: '0992 Mallory Pass',
    image: '/Göteborg',
    location: 'Sweden',
    created_date: 'maestro',
  },
  {
    id: 41,
    name: 'ctownsley14',
    first_name: 'Chrysa',
    last_name: 'Townsley',
    email: 'ctownsley14@surveymonkey.com',
    units: 'Genderfluid',
    status: '5369 Everett Avenue',
    image: '/Kristiansand S',
    location: 'Norway',
    created_date: 'jcb',
  },
  {
    id: 42,
    name: 'nbusfield15',
    first_name: 'Noni',
    last_name: 'Busfield',
    email: 'nbusfield15@people.com.cn',
    units: 'Genderqueer',
    status: '60166 Banding Road',
    image: '/Žďár',
    location: 'Czech Republic',
    created_date: 'jcb',
  },
  {
    id: 43,
    name: 'mgifkins16',
    first_name: 'Moyna',
    last_name: 'Gifkins',
    email: 'mgifkins16@statcounter.com',
    units: 'Polygender',
    status: '031 Tony Crossing',
    image: '/Le Chambon-Feugerolles',
    location: 'France',
    created_date: 'jcb',
  },
  {
    id: 44,
    name: 'nperch17',
    first_name: 'Nealon',
    last_name: 'Perch',
    email: 'nperch17@ycombinator.com',
    units: 'Male',
    status: '226 Helena Junction',
    image: '/Brvenica',
    location: 'Macedonia',
    created_date: 'jcb',
  },
  {
    id: 45,
    name: 'rtothe18',
    first_name: 'Ruby',
    last_name: 'Tothe',
    email: 'rtothe18@skype.com',
    units: 'Bigender',
    status: '186 Westport Pass',
    image: '/Villa Consuelo',
    location: 'Dominican Republic',
    created_date: 'visa',
  },
  {
    id: 46,
    name: 'htackle19',
    first_name: 'Henrie',
    last_name: 'Tackle',
    email: 'htackle19@amazonaws.com',
    units: 'Male',
    status: '880 Stone Corner Circle',
    image: '/São Miguel',
    location: 'Portugal',
    created_date: 'jcb',
  },
  {
    id: 47,
    name: 'askeats1a',
    first_name: 'Augustin',
    last_name: 'Skeats',
    email: 'askeats1a@blogtalkradio.com',
    units: 'Female',
    status: '80663 Tomscot Park',
    image: '/Buenavista',
    location: 'Mexico',
    created_date: 'visa-electron',
  },
  {
    id: 48,
    name: 'wgiovannelli1b',
    first_name: 'Waiter',
    last_name: 'Giovannelli',
    email: 'wgiovannelli1b@wp.com',
    units: 'Genderfluid',
    status: '34 Mayer Terrace',
    image: '/Ceerigaabo',
    location: 'Somalia',
    created_date: 'jcb',
  },
  {
    id: 49,
    name: 'calcorn1c',
    first_name: 'Chelsie',
    last_name: 'Alcorn',
    email: 'calcorn1c@wiley.com',
    units: 'Bigender',
    status: '152 Pankratz Plaza',
    image: '/Jincun',
    location: 'China',
    created_date: 'mastercard',
  },
  {
    id: 50,
    name: 'bcabrara1d',
    first_name: 'Bernardo',
    last_name: 'Cabrara',
    email: 'bcabrara1d@seesaa.net',
    units: 'Non-binary',
    status: '30 Esker Hill',
    image: '/Peristerona',
    location: 'Cyprus',
    created_date: 'jcb',
  },
  {
    id: 51,
    name: 'mgoss1e',
    first_name: 'Madlin',
    last_name: 'Goss',
    email: 'mgoss1e@elegantthemes.com',
    units: 'Agender',
    status: '9 Dixon Way',
    image: '/Barbaza',
    location: 'Philippines',
    created_date: 'laser',
  },
  {
    id: 52,
    name: 'bcockshtt1f',
    first_name: 'Bobette',
    last_name: 'Cockshtt',
    email: 'bcockshtt1f@biglobe.ne.jp',
    units: 'Genderqueer',
    status: '03 International Crossing',
    image: '/Cantuk Kidul',
    location: 'Indonesia',
    created_date: 'jcb',
  },
  {
    id: 53,
    name: 'msymones1g',
    first_name: 'Muhammad',
    last_name: 'Symones',
    email: 'msymones1g@wp.com',
    units: 'Female',
    status: '4 Darwin Alley',
    image: '/Durrës',
    location: 'Albania',
    created_date: 'jcb',
  },
  {
    id: 54,
    name: 'rreye1h',
    first_name: 'Romain',
    last_name: 'Reye',
    email: 'rreye1h@google.it',
    units: 'Male',
    status: '94164 Dryden Alley',
    image: '/Ciklapa',
    location: 'Indonesia',
    created_date: 'switch',
  },
  {
    id: 55,
    name: 'lhumbey1i',
    first_name: 'Lotta',
    last_name: 'Humbey',
    email: 'lhumbey1i@craigslist.org',
    units: 'Genderfluid',
    status: '96 Heffernan Place',
    image: '/Gomunice',
    location: 'Poland',
    created_date: 'jcb',
  },
  {
    id: 56,
    name: 'dpressland1j',
    first_name: 'Debor',
    last_name: 'Pressland',
    email: 'dpressland1j@ebay.co.uk',
    units: 'Male',
    status: '35390 Lake View Plaza',
    image: '/Melissochóri',
    location: 'Greece',
    created_date: 'jcb',
  },
  {
    id: 57,
    name: 'cyukhnov1k',
    first_name: 'Courtnay',
    last_name: 'Yukhnov',
    email: 'cyukhnov1k@twitpic.com',
    units: 'Genderqueer',
    status: '41 John Wall Street',
    image: '/Gulong',
    location: 'China',
    created_date: 'maestro',
  },
  {
    id: 58,
    name: 'lwyllcock1l',
    first_name: 'Louella',
    last_name: 'Wyllcock',
    email: 'lwyllcock1l@shutterfly.com',
    units: 'Bigender',
    status: '44 Shoshone Terrace',
    image: '/Mino',
    location: 'Japan',
    created_date: 'switch',
  },
  {
    id: 59,
    name: 'gsallows1m',
    first_name: 'Gaylene',
    last_name: 'Sallows',
    email: 'gsallows1m@shop-pro.jp',
    units: 'Agender',
    status: '997 Sullivan Plaza',
    image: '/Mapalacsiao',
    location: 'Philippines',
    created_date: 'mastercard',
  },
  {
    id: 60,
    name: 'slangthorne1n',
    first_name: 'Sosanna',
    last_name: 'Langthorne',
    email: 'slangthorne1n@last.fm',
    units: 'Genderfluid',
    status: '7 Sunbrook Parkway',
    image: '/Orhon',
    location: 'Mongolia',
    created_date: 'mastercard',
  },
  {
    id: 61,
    name: 'abaszkiewicz1o',
    first_name: 'Arny',
    last_name: 'Baszkiewicz',
    email: 'abaszkiewicz1o@youtu.be',
    units: 'Non-binary',
    status: '9 Corscot Avenue',
    image: '/Quimilí',
    location: 'Argentina',
    created_date: 'mastercard',
  },
  {
    id: 62,
    name: 'kpetrov1p',
    first_name: 'Kipp',
    last_name: 'Petrov',
    email: 'kpetrov1p@intel.com',
    units: 'Male',
    status: '14 Vahlen Center',
    image: '/Nanhu',
    location: 'China',
    created_date: 'china-unionpay',
  },
  {
    id: 63,
    name: 'jposse1q',
    first_name: 'Johnette',
    last_name: 'Posse',
    email: 'jposse1q@live.com',
    units: 'Polygender',
    status: '223 Porter Park',
    image: '/Nevers',
    location: 'France',
    created_date: 'mastercard',
  },
  {
    id: 64,
    name: 'jfoyston1r',
    first_name: 'Jeannie',
    last_name: 'Foyston',
    email: 'jfoyston1r@salon.com',
    units: 'Genderqueer',
    status: '97265 Farwell Lane',
    image: '/Salcedo',
    location: 'Philippines',
    created_date: 'mastercard',
  },
  {
    id: 65,
    name: 'bhallworth1s',
    first_name: 'Bettine',
    last_name: 'Hallworth',
    email: 'bhallworth1s@blinklist.com',
    units: 'Agender',
    status: '16981 Veith Avenue',
    image: '/Klau',
    location: 'Indonesia',
    created_date: 'jcb',
  },
  {
    id: 66,
    name: 'blukes1t',
    first_name: 'Benjamen',
    last_name: 'Lukes',
    email: 'blukes1t@t.co',
    units: 'Male',
    status: '13 Forest Parkway',
    image: '/Além Paraíba',
    location: 'Brazil',
    created_date: 'mastercard',
  },
  {
    id: 67,
    name: 'fapplin1u',
    first_name: 'Farris',
    last_name: 'Applin',
    email: 'fapplin1u@t-online.de',
    units: 'Agender',
    status: '44 Spenser Lane',
    image: '/Stockholm',
    location: 'Sweden',
    created_date: 'diners-club-carte-blanche',
  },
  {
    id: 68,
    name: 'ogaze1v',
    first_name: 'Ortensia',
    last_name: 'Gaze',
    email: 'ogaze1v@mapy.cz',
    units: 'Female',
    status: '12319 Vahlen Avenue',
    image: '/Guizi',
    location: 'China',
    created_date: 'jcb',
  },
  {
    id: 69,
    name: 'bwilliscroft1w',
    first_name: 'Branden',
    last_name: 'Williscroft',
    email: 'bwilliscroft1w@edublogs.org',
    units: 'Female',
    status: '17554 Lighthouse Bay Avenue',
    image: '/Guyancourt',
    location: 'France',
    created_date: 'jcb',
  },
  {
    id: 70,
    name: 'epeto1x',
    first_name: 'Emanuele',
    last_name: 'Peto',
    email: 'epeto1x@bing.com',
    units: 'Polygender',
    status: '687 Arizona Junction',
    image: '/Māwiyah',
    location: 'Yemen',
    created_date: 'maestro',
  },
  {
    id: 71,
    name: 'tskypp1y',
    first_name: 'Theodor',
    last_name: 'Skypp',
    email: 'tskypp1y@typepad.com',
    units: 'Bigender',
    status: '374 Aberg Trail',
    image: '/Siquisique',
    location: 'Venezuela',
    created_date: 'jcb',
  },
  {
    id: 72,
    name: 'bdudlestone1z',
    first_name: 'Brigitta',
    last_name: 'Dudlestone',
    email: 'bdudlestone1z@mail.ru',
    units: 'Genderfluid',
    status: '9 Pennsylvania Way',
    image: '/Calubcub Dos',
    location: 'Philippines',
    created_date: 'visa-electron',
  },
  {
    id: 73,
    name: 'rlightbourne20',
    first_name: 'Robinet',
    last_name: 'Lightbourne',
    email: 'rlightbourne20@samsung.com',
    units: 'Bigender',
    status: '4 Maryland Parkway',
    image: '/Oslo',
    location: 'Norway',
    created_date: 'americanexpress',
  },
  {
    id: 74,
    name: 'hmingardi21',
    first_name: 'Hephzibah',
    last_name: 'Mingardi',
    email: 'hmingardi21@elpais.com',
    units: 'Bigender',
    status: '889 Nelson Trail',
    image: '/Datong',
    location: 'China',
    created_date: 'jcb',
  },
  {
    id: 75,
    name: 'rcoplestone22',
    first_name: 'Rodger',
    last_name: 'Coplestone',
    email: 'rcoplestone22@un.org',
    units: 'Agender',
    status: '127 Forest Run Place',
    image: '/Petropavlovka',
    location: 'Russia',
    created_date: 'visa-electron',
  },
  {
    id: 76,
    name: 'eparmeter23',
    first_name: 'Euphemia',
    last_name: 'Parmeter',
    email: 'eparmeter23@huffingtonpost.com',
    units: 'Bigender',
    status: '3 Farmco Way',
    image: '/Sakerta Timur',
    location: 'Indonesia',
    created_date: 'jcb',
  },
  {
    id: 77,
    name: 'cowtram24',
    first_name: 'Cammy',
    last_name: 'Owtram',
    email: 'cowtram24@admin.ch',
    units: 'Male',
    status: '08217 Knutson Point',
    image: '/Laem Sing',
    location: 'Thailand',
    created_date: 'jcb',
  },
  {
    id: 78,
    name: 'regleton25',
    first_name: 'Ritchie',
    last_name: 'Egleton',
    email: 'regleton25@blogger.com',
    units: 'Polygender',
    status: '0161 Manitowish Circle',
    image: '/Richmond',
    location: 'United States',
    created_date: 'maestro',
  },
  {
    id: 79,
    name: 'ndugmore26',
    first_name: 'Niki',
    last_name: 'Dugmore',
    email: 'ndugmore26@pen.io',
    units: 'Male',
    status: '9272 Oriole Drive',
    image: '/Inhumas',
    location: 'Brazil',
    created_date: 'jcb',
  },
  {
    id: 80,
    name: 'ajone27',
    first_name: 'Abbot',
    last_name: 'Jone',
    email: 'ajone27@elegantthemes.com',
    units: 'Non-binary',
    status: '20 Arizona Park',
    image: '/Shumyachi',
    location: 'Russia',
    created_date: 'mastercard',
  },
  {
    id: 81,
    name: 'karthurs28',
    first_name: 'Kala',
    last_name: 'Arthurs',
    email: 'karthurs28@hud.gov',
    units: 'Bigender',
    status: '40 Cody Way',
    image: '/Sulyukta',
    location: 'Kyrgyzstan',
    created_date: 'maestro',
  },
  {
    id: 82,
    name: 'pmcmorland29',
    first_name: 'Phillie',
    last_name: 'McMorland',
    email: 'pmcmorland29@youtube.com',
    units: 'Non-binary',
    status: '021 Rowland Point',
    image: '/Tianzishan',
    location: 'China',
    created_date: 'mastercard',
  },
  {
    id: 83,
    name: 'hgianilli2a',
    first_name: 'Hanni',
    last_name: 'Gianilli',
    email: 'hgianilli2a@tinypic.com',
    units: 'Agender',
    status: '67 Gina Circle',
    image: '/São João dos Patos',
    location: 'Brazil',
    created_date: 'jcb',
  },
  {
    id: 84,
    name: 'jbeat2b',
    first_name: 'Jone',
    last_name: 'Beat',
    email: 'jbeat2b@hc360.com',
    units: 'Female',
    status: '185 Monument Pass',
    image: '/Cornillon',
    location: 'Haiti',
    created_date: 'switch',
  },
  {
    id: 85,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 86,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 87,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 88,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 89,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 90,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 91,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 92,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 93,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 94,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 95,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 96,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 97,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 98,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 99,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 100,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 101,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 102,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
  {
    id: 103,
    units: '24/38',
    image: '/images/table_img_3.png',
    status: 'Active',
    name: 'Astrid 2.0',
    created_date: 'July 15, 2022',
    location: 'Aba, Nigeria',
  },
];

import { icons, images, SIZES, COLORS, FONTS } from '../constants';

export const userData = {
  firstName: 'John Benedict',
  lastName: 'Geli',
  location: {
    address: '016 Dadison St., Baramgay 56 Real. Tacloban City',
    latitude: 1233,
    longitude: 123123,
  },
};




export const userData5 = {
  firstName: 'Steven',
  lastName: 'Alba',
  imageUrl: require('../assets/images/steven.png'),
  Id: 'ExpressWashMachine002',
  nameOfShop: 'Tacloban Prime Wash',
  email: 'marksteven.webdev@gmail.com',
  phone: '09058591443',
  address: 'Brgy 56 Real. Tacloban City',
  review: 'Sobrang linis talaga ng Laundry Shop na to, Well package, mababait yung nag dedelivery gwapo pa'
};
export const Rider1 = {
  firstName: 'Steven',
  lastName: 'Alba',
  imageUrl: require('../assets/images/steven.png'),
  Id: 'ExpressWashMachine002',
  nameOfShop: 'Tacloban Prime Wash',
  email: 'marksteven.webdev@gmail.com',
  phone: '09058591443',
  address: 'Brgy 56 Real. Tacloban City',
  orders: [
    {
      orderId: 0,
      itemName: 'TShirt',
      qty: 2,
      rate: 5,
      pricingType: 'pc',
      status: 'Ongoing',
      serviceTimeType: 'EXPRESS',
    },
    {
      orderId: 1,
      itemName: 'Comforter',
      qty: 6,
      rate: 5,
      pricingType: 'pc',
      status: 'Incoming',
      serviceTimeType: 'EXPRESS',
    },
    {
      orderId: 2,
      itemName: 'Coat',
      qty: 6,
      rate: 5,
      pricingType: 'pc',
      status: 'Completed',
      serviceTimeType: 'STANDARD',
    },
  ],
};

export const myAccount = [

  {
    name: 'Terms And Condition',

  },
  {
    name: 'Privacy Policy',
    screen: '',

  },
  {
    name: 'Contact Us',
    screen: 'MerchantMyAccount',

  },
  {
    name: 'Logout',
    screen: 'Main',

  },
];
export const CustomerMyAccount = [
  {
    name: 'Notification',
    screen: 'NotificationScreen'
  },
  {
    name: 'Terms And Condition',

  },
  {
    name: 'Privacy Policy',
    screen: '',

  },
  {
    name: 'Contact Us',
    screen: 'MerchantMyAccount',

  },
  {
    name: 'Logout',
    screen: 'Main',

  },
];

export const merchantMyAccount = [
  {
    name: 'My Earnings',
    screen: 'MerchantEarnings',
  },
  {
    name: 'Update Services List',
    screen: 'LaundryService',
    iconUrl: icons.laundryBasket,
  },
  {
    name: 'Update Price Per Services',
    screen: 'TypePricing',
    iconUrl: icons.laundryBasket,
  },
  {
    name: 'Account Settings',
    screen: 'MerchantMyAccount',
    iconUrl: icons.account,
  },
  {
    name: 'Terms And Condition',
    iconUrl: icons.account,
  },
  {
    name: 'Privacy Policy',
    screen: '',
    iconUrl: icons.account,
  },
  {
    name: 'Contact Us',
    screen: 'MerchantMyAccount',
    iconUrl: icons.account,
  },
  {
    name: 'Logout',
    screen: 'Main',
    iconUrl: icons.logout,
  },

];


export const RiderAccount = [
  {
    name: 'My Orders',
    screen: 'OrderSummary',
    iconUrl: icons.list,
  },
  {
    name: 'My Earnings',
    screen: 'MyEarnings',
    iconUrl: icons.list,
  },
  {
    name: 'Account Settings',
    screen: 'RiderSettings',
    iconUrl: icons.account,
  },
  {
    name: 'Logout',
    screen: 'Main',
    iconUrl: icons.myLogout,
  },
];

export const featuredList = [
  {
    shop_name: 'Laundry Express',
    bannerUrl: '1.jpg',
    location: {
      address: '016 Dadison St., Baramgay 56 Real. Tacloban City',
      latitude: 1233,
      longitude: 123123,
    },
  },
  {
    shop_name: '24x7 Direct Express',
    bannerUrl: '2.jpg',
    location: {
      address: '016 Dadison St., Baramgay 56 Real. Tacloban City',
      latitude: 1233,
      longitude: 123123,
    },
  },
  {
    shop_name: 'Alayon Express',
    bannerUrl: '3.jpg',
    location: {
      address: '016 Dadison St., Baramgay 56 Real. Tacloban City',
      latitude: 1233,
      longitude: 123123,
    },
  },
  {
    shop_name: 'Laundy Shop',
    bannerUrl: '4.jpg',
    location: {
      address: '016 Dadison St., Baramgay 56 Real. Tacloban City',
      latitude: 1233,
      longitude: 123123,
    },
  },
];

export const nearbyList = [
  {
    name: 'Laundry Express',
    bannerUrl: images.shop5,
    closeAt: '8:00 PM',
    range: '1.2 km Away',
    services: [{ name: 'Dry Wash' }, { name: 'Steam Iron' }, { name: 'Dry Fold' }],
    ratings: '4.0',
    location: {
      address: '016 Dadison St., Baramgay 56 Real. Tacloban City',
      latitude: 11.231431379722427,
      longitude: 125.00317985191941,
    },
  },
  {
    name: '24x7 Direct Express',
    bannerUrl: images.shop6,
    range: '3 km Away',
    ratings: '3.8',
    closeAt: '11:00 PM',
    services: [{ name: 'Dry Wash' }, { name: 'Steam Iron' }, { name: 'Dry Fold' }],
    location: {
      address: '016 Dadison St., Baramgay 56 Real. Tacloban City',
      latitude: 11.231504714393166,
      longitude: 125.00201007351279,
    },
  },
  {
    name: 'Alayon Express',
    bannerUrl: images.shop7,
    ratings: '4.5',
    closeAt: '9:00 PM',
    range: '1 km Away',
    services: [{ name: 'Dry Wash' }, { name: 'Steam Iron' }, { name: 'Dry Fold' }],
    location: {
      address: '016 Dadison St., Baramgay 56 Real. Tacloban City',
      latitude: 11.228759091069914,
      longitude: 124.99916424974798,
    },
  },
  {
    name: 'Laundy Shop',
    bannerUrl: images.shop8,
    range: '1 km Away',
    ratings: '3.5',
    closeAt: '10:00 PM',
    services: [{ name: 'Dry Wash' }, { name: 'Steam Iron' }, { name: 'Dry Fold' }],
    location: {
      address: '016 Dadison St., Baramgay 56 Real. Tacloban City',
      latitude: 11.233974075899926,
      longitude: 125.00235406681895,
    },
  },
];

export const notifications = [
  {
    name: 'New Incoming Order!',
    id: 'BleachWash005',
    customerName: 'Brix Vallespin Delute',
    date: 'Jan, 19 2023|8:30PM',
  },
  {
    name: 'New Incoming Order!',
    id: 'BleachWash005',
    customerName: 'Brix Vallespin Delute',
    date: 'June, 19 2023|8:30PM',
  },
  {
    name: 'New Incoming Order!',
    id: 'BleachWash005',
    customerName: 'Brix Vallespin Delute',
    date: 'March, 19 2023|8:30PM',
  },
  {
    name: 'New Incoming Order!',
    id: 'BleachWash005',
    customerName: 'Brix Vallespin Delute',
    date: 'May, 19 2023|8:30PM',
  },
  {
    name: 'New Incoming Order!',
    id: 'BleachWash005',
    customerName: 'Brix Vallespin Delute',
    date: 'July, 19 2023|8:30PM',
  },
  {
    name: 'New Incoming Order!',
    id: 'BleachWash005',
    customerName: 'Brix Vallespin Delute',
    date: 'August, 19 2023|8:30PM',
  },
  {
    name: 'New Incoming Order!',
    id: 'BleachWash005',
    customerName: 'Brix Vallespin Delute',
    date: 'December, 19 2023|8:30PM',
  },
  {
    name: 'New Incoming Order!',
    id: 'BleachWash005',
    customerName: 'Brix Vallespin Delute',
    date: 'April, 19 2023|8:30PM',
  },
  {
    name: 'New Incoming Order!',
    id: 'BleachWash005',
    time: '8:00 PM',
    date: 'April, 19 2023',
  },
  {
    name: 'New Incoming Order!',
    id: 'BleachWash005',
    time: '8:00 PM',
    date: 'April, 19 2023',
  },
  {
    name: 'New Incoming Order!',
    id: 'BleachWash005',
    time: '8:00 PM',
    date: 'April, 19 2023',
  },
];

export const workingHours = [
  {
    name: 'Mon',
    isOpen: false,
  },
  {
    name: 'Tue',
    isOpen: false,
  },
  {
    name: 'Wed',
    isOpen: false,
  },
  {
    name: 'Thu',
    isOpen: false,
  },
  {
    name: 'Fri',
    isOpen: false,
  },
  {
    name: 'Sat',
    isOpen: false,
  },
  {
    name: 'Sun',
    isOpen: false,
  },
];

export const servicesProvided = [
  {
    id: 0,
    name: 'Dry Wash',
    isStandard: true,
    isExpress: true,
    isPerPiece: false,
    isPerKilo: false,
    isBatch: false,
    isSelected: false,
  },
  {
    id: 1,
    name: 'Wash & Fold',
    isStandard: true,
    isExpress: false,
    isPerPiece: false,
    isPerKilo: false,
    isBatch: false,
    isSelected: false,
  },
  {
    id: 2,
    name: 'Steam Iron',
    isStandard: true,
    isExpress: true,
    isPerPiece: false,
    isPerKilo: false,
    isBatch: false,
    isSelected: false,
  },
  {
    id: 3,
    name: 'Ironing',
    isStandard: true,
    isExpress: true,
    isPerPiece: false,
    isPerKilo: false,
    isBatch: false,
    isSelected: false,
  },
  {
    id: 4,
    name: 'Dye',
    isStandard: true,
    isExpress: false,
    isPerPiece: false,
    isPerKilo: false,
    isBatch: false,
    isSelected: false,
  },
  {
    id: 5,
    name: 'Petrol Wash',
    isStandard: true,
    isExpress: false,
    isPerPiece: false,
    isPerKilo: false,
    isBatch: false,
    isSelected: false,
  },
  {
    id: 6,
    name: 'Bleach Wash',
    isStandard: true,
    isExpress: true,
    isPerPiece: false,
    isPerKilo: false,
    isBatch: false,
    isSelected: false,
  },
];

export const averageRatings = [
  {
    id: '1',
    value: '1',
    label: '1.0 and Above',
  },
  {
    id: '2',
    value: '2',
    label: '2.0 and Above',
  },
  {
    id: '3',
    value: '3',
    label: '3.0 and Above',
  },
  {
    id: '4',
    value: '4',
    label: '4.0 and Above',
  },
  {
    id: '5',
    value: '5',
    label: '5.0',
  },
];

export const deliveryType = [
  {
    name: 'Express Delivery',
    isExpress: true,
  },
  {
    name: 'Standard Delivery',
    isExpress: false,
  },
];

export const savedAddress = [
  {
    id: 1,
    address: 'Real St. Pericohon Barangay 56',
    lat: 123123,
    long: 123123,
    isDefault: true,
  },
  {
    id: 2,
    address: 'Sampaguita St. Real Tacloban',
    lat: 123123,
    long: 123123,
    isDefault: false,
  },
];

export const termsAndCondition = [
  {
    id: 0,
    title: 'Introduction',
    description:
      'Welcome to Bugtech Solutions Laundry Service On-Demand Mobile App. These terms and conditions govern your use of the mobile app and the services provided by Bugtech Solutions. By accessing or using the app, you agree to comply with these terms and conditions. Please read them carefully before proceeding.',
  },
  {
    id: 1,
    title: 'Acceptance of Terms',
    description:
      'By downloading, installing, or using the Laundry Service On-Demand Mobile App, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions, as well as our Privacy Policy.',
  },
  {
    id: 2,
    title: 'Services',
    description:
      'Bugtech Solutions provides a platform that connects users (Customers) with laundry service providers (Service Providers) through the mobile app. The app allows Customers to request laundry services, view Service Providers profiles and reviews, and make payments for the services rendered.',
  },
  {
    id: 3,
    title: 'User Obligations',
    description:
      '(A): Customers: As a Customer, you are responsible for providing accurate and complete information when creating an account, submitting laundry service requests, and making payments. You must comply with any additional guidelines or requirements set by the Service Providers. \n \n(B): Service Providers: As a Service Provider, you agree to provide high-quality laundry services to Customers in a timely and professional manner. You must maintain accurate information on your profile, including pricing, availability, and service offerings. You are responsible for ensuring the safety and security of your equipment and premises.',
  },
  {
    id: 4,
    title: 'Service Requests and Payments',
    description:
      '(A): Customers can submit laundry service requests through the mobile app, including details such as service type, pick-up and delivery preferences, and special instructions. Service Providers will review and accept or decline the requests based on their availability. \n \n(B): Customers will be informed of the service fee, including any applicable taxes or additional charges, before confirming the request. Payments can be made through the app using the provided payment methods. Bugtech Solutions acts as a facilitator for the payment process and may collect a service fee for this service. \n \n(C): In case of any disputes regarding service quality or payments, Bugtech Solutions may assist in mediating between Customers and Service Providers to reach a resolution',
  },
  {
    id: 5,
    title: 'Ratings and Reviews',
    description:
      'Customers have the option to rate and provide reviews for the Service Providers based on their experience. Service Providers should strive to maintain a high level of service quality and address any customer concerns promptly. Bugtech Solutions reserves the right to monitor and moderate ratings and reviews to ensure they comply with our guidelines.',
  },
  {
    id: 6,
    title: 'Intellectual Property',
    description:
      'Bugtech Solutions retains all rights, title, and interest in the Laundry Service On-Demand Mobile App, including its design, logos, trademarks, and content. You may not copy, modify, distribute, or reproduce any part of the app without prior written consent from Bugtech Solutions.',
  },
  {
    id: 7,
    title: 'Termination',
    description:
      'Bugtech Solutions reserves the right to suspend or terminate your access to the Laundry Service On-Demand Mobile App at any time without prior notice, if it believes you have violated these terms and conditions or engaged in any fraudulent or inappropriate activities.',
  },
  {
    id: 8,
    title: 'Limitation of Liability',
    description:
      'Bugtech Solutions is not responsible for any losses, damages, or liabilities arising from the use of the app or the services provided by the Service Providers. Bugtech Solutions acts as a platform for connecting Customers with Service Providers and does not guarantee the quality, availability, or timeliness of the laundry services.',
  },
  {
    id: 9,
    title: 'Modifications',
    description:
      'Bugtech Solutions may update or modify these terms and conditions from time to time. Any changes will be effective upon posting the revised terms on the app. It is your responsibility to review the terms periodically and continue using the app constitutes acceptance of the modified terms.',
  },
  {
    id: 10,
    title: 'Governing Law',
    description:
      '(A): These terms and conditions are governed by the laws of the jurisdiction in which Bugtech Solutions is based. If you have any questions or concerns regarding these terms and conditions or the Laundry Service On-Demand Mobile App, please contact Bugtech Solutions customer support. We will be happy to assist you and address any inquiries you may have. \n \n(B): By using the Laundry Service On-Demand Mobile App, you agree to abide by these terms and conditions, as well as any additional guidelines or policies provided by Bugtech Solutions. Failure to comply with these terms may result in the termination of your access to the app and its services. \n \n(C): Bugtech Solutions is committed to providing a seamless and reliable experience for both Customers and Service Providers. We strive to maintain a trusted and efficient platform that facilitates convenient and high-quality laundry services. Thank you for choosing Bugtech Solutions Laundry Service On-Demand Mobile App. We look forward to serving you and meeting your laundry needs. Last updated: May 31, 2023. \n \nNote: This is a general template for Terms and Conditions and may require customization to suit the specific requirements and legal regulations of your laundry service on-demand mobile app. It is recommended to consult with legal professionals to ensure compliance with applicable laws and regulations.',
  },
];

export const clothTypes = [
  'T-Shirt',
  'Vests',
  'Shirts',
  'Caps',
  'Dress',
  'Bath Robes',
  'Shorts',
  'Pants',
];

export const selectedShop = {
  _id: '6464cd26f01e163a3d3ead0f',
  bannerUrl: '4.jpg',
  business_hours: [
    { _id: '6464cd26f01e163a3d3ead10', isOpen: true, name: 'Mon' },
    { _id: '6464cd26f01e163a3d3ead11', isOpen: true, name: 'Tue' },
    { _id: '6464cd26f01e163a3d3ead12', isOpen: true, name: 'Wed' },
    { _id: '6464cd26f01e163a3d3ead13', isOpen: false, name: 'Thu' },
    { _id: '6464cd26f01e163a3d3ead14', isOpen: true, name: 'Fri' },
    { _id: '6464cd26f01e163a3d3ead15', isOpen: true, name: 'Sat' },
    { _id: '6464cd26f01e163a3d3ead16', isOpen: true, name: 'Sun' },
  ],
  closing: '2023-05-17T12:48:23.582Z',
  createdAt: '2023-05-17T12:48:38.427Z',
  earnings: [],
  isDeleted: false,
  location: {
    address: '18 El Reposo St, Tacloban City, Leyte, Philippines',
    latitude: 11.231655932685346,
    longitude: 125.00178979709744,
  },
  mobile: '9774461641',
  opening: '2023-05-17T12:48:20.699Z',
  orders: [],
  services: [
    {
      _id: '64703ad10affe905e95e4fa1',
      isPerBatch: true,
      isPerKilo: true,
      isPerPiece: true,
      name: 'Wash & Fold',
      service: '64616d85b54c812a22aabbe1',
    },
    {
      _id: '64703ad10affe905e95e4fa2',
      isPerBatch: true,
      isPerKilo: true,
      isPerPiece: false,
      name: 'Steam Iron',
      service: '64616d85b54c812a22aabbe4',
    },
    {
      _id: '64703ad10affe905e95e4fa3',
      isPerBatch: true,
      isPerKilo: true,
      isPerPiece: true,
      name: 'Dye',
      service: '64616d85b54c812a22aabbea',
    },
    {
      _id: '64703ad10affe905e95e4fa4',
      isPerBatch: true,
      isPerKilo: true,
      isPerPiece: false,
      name: 'Bleach Wash',
      service: '64616d85b54c812a22aabbf0',
    },
    {
      _id: '64703ad10affe905e95e4fa5',
      isPerBatch: false,
      isPerKilo: true,
      isPerPiece: false,
      name: 'Ironing',
      service: '64616d85b54c812a22aabbe7',
    },
    {
      _id: '64703ad10affe905e95e4fa6',
      isPerBatch: true,
      isPerKilo: true,
      isPerPiece: true,
      name: 'Dry Wash',
      service: '64616d85b54c812a22aabbde',
    },
    {
      _id: '64703ad10affe905e95e4fa7',
      isPerBatch: true,
      isPerKilo: true,
      isPerPiece: false,
      name: 'Petrol Wash',
      service: '64616d85b54c812a22aabbed',
    },
  ],
  shop_name: 'Rays Launderer Express',
  updatedAt: '2023-05-26T04:51:29.786Z',
  user_id: '6464ccf7f01e163a3d3ead04',
};

export const filterData = [
  // {name:"Ride",image: require('../../assets/ride.png'), id:"0"},
  // {name:"Food",image:require("../../assets/food.png"),id:"1"},
  // {name:"Package",image:require("../../assets/package.png"),id:"2"},
  // {name:"Reserve",image:require("../../assets/reserve.png"),id:"3"}
];

export const rideData = [
  { street: '32 Olivia Rd', area: 'Klipfontein 83-Ir,Boksburg', id: '0' },
  { street: 'Hughes Industrial Park', area: 'Hughes,Boksburg', id: '1' },
  {
    street: '32 Olivia Road',
    area: ' East Rand,Ekurhuleni,Gauteng,1459',
    id: '2',
  },
  { street: 'Total Boksburg', area: '35 Atlas Rd,Anderbolt,Boksburg', id: '3' },
  { street: '179 8th Ave', area: 'Bezuidenhout Valley,Johannesburg', id: '4' },
];

export const carTypeData = [
  {
    title: 'Popular',
    data: [
      // {name:"Uber Go",group :2, price:7,image: require('../../assets/uberGo.png'),note:"Affordable.compact rides",promotion:5 ,time:"20:19",id:"0"},
      // {name:"UberX",group :3, price:5.5,image: require('../../assets/uberX.png'),note:"Affordable everyday trips",promotion:0,time:"20:20", id:"1"},
      // {name:"Connect", group:0, price:12.6,image: require('../../assets/uberConnect.png'),note:"Send and receive packages",promotion:10,time:"20:33", id:"2"}
    ],
  },

  {
    title: 'Premium',
    data: [
      //    {name:"Black",group :3, price:17.4,image: require('../../assets/uberBlack.png'),note:"Premium trips in luxury cars",promotion:0,time:"20:31",id:"3"},
      //    {name:"Van", group:6, price:22.3,image: require('../../assets/uberVan.png'),note:"Rides for groups up to 6",promotion:12,time:"20:31", id:"4"},
    ],
  },

  {
    title: 'More',
    data: [
      //   {name:"Assist",group :3, price:35.3,image: require('../../assets/uberAssist.png'),note:"Special assistance from certified drivers",promotion:26,time:"20:25",id:"5"},
    ],
  },
];

export const requestData = [
  {
    name: 'For Me',
    id: 0,
  },
  {
    name: 'For Someone',
    id: 1,
  },
];

export const rideOptions = [
  { name: 'Personal', icon: 'account', id: '0' },
  { name: 'Business', icon: 'briefcase', id: '1' },
];

// export const paymentOptions = [{image:require('../../assets/visaIcon.png'),text:"Visa ...0476"},
//                                 {image:require('../../assets/cashIcon.png'),text:"Cash"}]

export const availableServices = [
  'Uber Go',
  'UberX',
  'Uber connect',
  'Uber Black',
  'Uber Van',
  'Uber Assist',
];

export const carsAround = [
  { latitude: -26.207487, longitude: 28.236226 },
  { latitude: -26.202616, longitude: 28.227718 },
  { latitude: -26.202424, longitude: 28.236612 },
  { latitude: -26.208565, longitude: 28.237191 },
  { latitude: -26.203598, longitude: 28.239509 },
];


export const conversationHistory = [
  {
    shopId: 0,
    latestChat: 'How are you!',
    thread: [
      {
        id: 1001,
        role: 'shop',
        senderId: 'Laundry Express',
        message: 'How are you!',
        date: '06/17/23',
        time: '05:25 PM',
        isViewed: false
      },
      {
        id: 1002,
        senderId: 'USER',
        role: 'user',
        message: 'Good Morning!',
        date: '06/17/23',
        time: '05:26 PM',
        isViewed: false
      },
      {
        id: 1003,
        senderId: 'Laundry Express',
        role: 'shop',
        message: `Your have Booked incorrect count of T-shirts.`,
        date: '06/17/23',
        time: '02:25 AM',
        isViewed: false
      },
      {
        id: 1004,
        role: 'shop',
        senderId: 'Laundry Express',
        message: `CANCELLED`,
        date: '06/17/23',
        time: '02:25 AM',
        isViewed: false
      },
      {
        id: 1005,
        role: 'user',
        senderId: 'USER',
        message: 'Okay po. Thanks!',
        date: '06/17/23',
        time: '02:25 AM',
        isViewed: false
      },
      {
        id: 1006,
        role: 'user',
        senderId: 'USER',
        message: 'Mag book nalang ako sa ibang Laundry Store! 😀',
        date: '06/17/23',
        time: '02:25 AM',
        isViewed: false
      }
    ]

  },
  {
    shopId: 1,
    latestChat: 'How are you!',
    thread: [
      {
        id: 1001,
        role: 'shop',
        senderId: '24x7 Direct Express',
        message: 'How are you!',
        date: '06/17/23',
        time: '05:25 PM',
        isViewed: false
      },
      {
        id: 1002,
        senderId: 'USER',
        role: 'user',
        message: 'Good Morning!',
        date: '06/17/23',
        time: '05:26 PM',
        isViewed: false
      },
      {
        id: 1003,
        senderId: '24x7 Direct Express',
        role: 'shop',
        message: `Your have Booked incorrect count of T-shirts.`,
        date: '06/17/23',
        time: '02:25 AM',
        isViewed: false
      },
      {
        id: 1004,
        role: 'shop',
        senderId: '24x7 Direct Express',
        message: `CANCELLED`,
        date: '06/17/23',
        time: '02:25 AM',
        isViewed: false
      },
      {
        id: 1005,
        role: 'user',
        senderId: 'USER',
        message: 'Okay po. Thanks!',
        date: '06/17/23',
        time: '02:25 AM',
        isViewed: false
      },
      {
        id: 1006,
        role: 'user',
        senderId: 'USER',
        message: 'Mag book nalang ako sa ibang Laundry Store! 😀',
        date: '06/17/23',
        time: '02:25 AM',
        isViewed: false
      }
    ]

  },
  {
    shopId: 2,
    latestChat: 'How are you!',
    thread: [
      {
        id: 1001,
        role: 'shop',
        senderId: 'Alayon Express',
        message: `Online na ak?`,
        date: '06/17/23',
        time: '05:25 PM',
        isViewed: false
      },
      {
        id: 1002,
        senderId: 'USER',
        role: 'user',
        message: 'Good Morning!',
        date: '06/17/23',
        time: '05:26 PM',
        isViewed: false
      },
      {
        id: 1003,
        senderId: 'Alayon Express',
        role: 'shop',
        message: `Rapi?`,
        date: '06/17/23',
        time: '02:25 AM',
        isViewed: false
      },
      {
        id: 1004,
        role: 'shop',
        senderId: 'Alayon Express',
        message: `K1 la available`,
        date: '06/17/23',
        time: '02:25 AM',
        isViewed: false
      },
      {
        id: 1005,
        role: 'user',
        senderId: 'USER',
        message: 'Okay po. Thanks!',
        date: '06/17/23',
        time: '02:25 AM',
        isViewed: false
      },
      {
        id: 1006,
        role: 'user',
        senderId: 'USER',
        message: 'Pwedi hingit? 😀',
        date: '06/17/23',
        time: '02:25 AM',
        isViewed: false
      },
      {
        id: 1006,
        role: 'shop',
        senderId: 'Alayon Express',
        message: 'HAHAHA PASS 😀',
        date: '06/17/23',
        time: '02:25 AM',
        isViewed: false
      }
    ]

  }
]
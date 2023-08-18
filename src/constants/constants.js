const onboarding_screens = [
  {
    id: 1,
    backgroundImage: require('../assets/images/background_02.png'),
    // bannerImage: require('../assets/images/hot_delivery.png'),
    title: 'Take charge of \nyour time!',
    // description:
    // 'When you oder Eat Steet, we’ll hook you up with exclusive coupon, specials and rewards',
  },
  {
    id: 2,
    backgroundImage: require('../assets/images/background_01.png'),
    // bannerImage: require('../assets/images/hot_delivery.png'),
    title: 'Have your Laundry pick up by our licensed riders!',
    backgroundIcon: require('../assets/icons/OnboardBackground-01.png'),
    // description:
    // 'We make food ordering fast, simple and free-no matter if you order online or cash',
  },
  {
    id: 3,
    backgroundImage: require('../assets/images/background_02.png'),
    // bannerImage: require('../assets/images/great_food.png'),
    backgroundIcon: require('../assets/icons/OnboardBackground-02.png'),
    title: 'Choose from among the top local shops nearby.',
    // description:
    // 'You’ll receive the great food within a hour. And get free delivery credits for every order.',
  },
  {
    id: 4,
    backgroundImage: require('../assets/images/background_01.png'),
    backgroundIcon: require('../assets/icons/OnboardBackground-03.png'),
    // bannerImage: require('../assets/images/great_food.png'),
    title: 'Get real-time updates while you wait using Live Track.',
    // description:
    // 'You’ll receive the great food within a hour. And get free delivery credits for every order.',
  },
  {
    id: 5,
    backgroundImage: require('../assets/images/background_02.png'),
    // bannerImage: require('../assets/images/great_food.png'),
    backgroundIcon: require('../assets/icons/OnboardBackground-04.png'),
    title: 'Have it delivered right back to you once it’s done.',
    // description:
    // 'You’ll receive the great food within a hour. And get free delivery credits for every order.',
  },
];

const permission_process = ['notification', 'location'];


const deliveryOptions = [
  {
    id: 1,
    name: "STANDARD",
    description: "1 Day Normal Pick-up and Return.",
    price: 50
  },
  {
    id: 2,
    name: "EXPRESS",
    description: "3-5 Hours High Priority Pick-up and Return.",
    price: 100
  }
]

const varEnv = {
  //API URLS
  //Local
  // socket: 'http://192.168.1.100:42005',
  // host: 'http://192.168.1.100:42005',
  // apiUrl: 'http://192.168.1.100:42005/api/v1',
  // defaultToken:
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTE1OTcyMWJhYmQwNGJlODc1ODhkZCIsImlhdCI6MTY4NzkxNDM4MiwiZXhwIjoxNjkwNTA2MzgyfQ.ri5Jm6-dbIdt_XFkY7zJSOjk8iBRzHtg8fU9JkvoPnk',
  // shopId: '6492af74fb498149c8c29d0a',
  //Live
  socket: 'https://alayon.bugtech.solutions',
  host: 'https://alayon.bugtech.solutions',
  apiUrl: 'https://alayon.bugtech.solutions/api/v1',
  defaultToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWM3YTk3MzRjYWQ2MzU3ODc2OTk0YyIsImlhdCI6MTY4OTI1NjMyMSwiZXhwIjoxNjkxODQ4MzIxfQ.pnQdNMextZkCb19_OPcG_V0RxCiuTrm03xBLBoDwb2E',
  shopId: '649d90fc72f48c26a0e72ce2',
  //STATIC FILES URL
};

const addressLabels = [{ _id: 0, name: 'Work' }, { _id: 1, name: 'Home 1' }, { _id: 2, name: 'Home 2' }]

const addressLocations = [{ _id: 0, "latitude": 11.2317012, "longitude": 125.0024682, "address": "62J2+MXW, Tacloban City, Leyte, Philippines", name: "John Benedict", mobile: "9774461641", postalCode: "6500", label: 1 }, { _id: 1, "longitude": 125.00254014506935, "latitude": 11.234456830480326, "address": "62M2+RXV, Real St, Downtown, Tacloban City, Leyte, Philippines", name: "Marty Pabello", mobile: "9878423422", postalCode: "6500", isDefault: true, label: 0 }]
const basketOrder = { orders: [] }

const servicePricing = {
  standard: 50,
  express: 100,
};

const clothAndPricing = [
  {
    _id: 111,
    serviceId: 0,
    itemName: 'TShirt',
    qty: 2,
    rate: 5,
    pricingType: 'pc',
    TotalPrice: 333,
  },
  {
    _id: 1,
    serviceId: 0,
    itemName: 'Short',
    qty: 5,
    rate: 4,
    pricingType: 'pc',
    TotalPrice: 523,
  },
  {
    _id: 2,
    serviceId: 1,
    itemName: 'Brep',
    qty: 5,
    rate: 8,
    pricingType: 'pc',
    TotalPrice: 453,
  },
  {
    _id: 3,
    serviceId: 0,
    itemName: 'Taklap',
    qty: 3,
    rate: 9,
    pricingType: 'kls',
    TotalPrice: 312,
  },
  {
    _id: 4,
    serviceId: 1,
    itemName: 'Mantel',
    qty: 9,
    rate: 5,
    pricingType: 'kls',
    TotalPrice: 332,
  },
  {
    _id: 5,
    serviceId: 0,
    itemName: 'Comforter',
    qty: 3,
    rate: 50,
    pricingType: 'kls',
    TotalPrice: 564,
  },
  {
    _id: 6,
    serviceId: 1,
    itemName: 'Coat',
    qty: 10,
    rate: 5,
    pricingType: 'kls',
    TotalPrice: 300,
  },
  {
    _id: 7,
    serviceId: 0,
    itemName: 'Scarf',
    qty: 3,
    rate: 50,
    pricingType: 'kls',
    TotalPrice: 921,
  },
  {
    _id: 8,
    serviceId: 1,
    itemName: 'Bed-sheet Cover For long Text Testing',
    qty: 10,
    rate: 5,
    pricingType: 'kls',
    TotalPrice: 420,
  },
  {
    _id: 9,
    serviceId: 1,
    itemName: 'Boots',
    qty: 10,
    rate: 5,
    pricingType: 'kls',
    TotalPrice: 189,
  },
  {
    _id: 10,
    serviceId: 0,
    itemName: 'TShirt',
    qty: 2,
    rate: 5,
    pricingType: 'pc',
    TotalPrice: 230,
  },
  {
    _id: 11,
    serviceId: 0,
    itemName: 'Short',
    qty: 5,
    rate: 4,
    pricingType: 'pc',
    TotalPrice: 342,
  },
  {
    _id: 12,
    serviceId: 1,
    itemName: 'Brep',
    qty: 5,
    rate: 8,
    pricingType: 'pc',
    TotalPrice: 664,
  },
  {
    _id: 13,
    serviceId: 0,
    itemName: 'Taklap',
    qty: 3,
    rate: 9,
    pricingType: 'kls',
    TotalPrice: 534,
  },
  {
    _id: 14,
    serviceId: 1,
    itemName: 'Mantel',
    qty: 9,
    rate: 5,
    pricingType: 'kls',
    TotalPrice: 166,
  },
  {
    _id: 15,
    serviceId: 0,
    itemName: 'Comforter',
    qty: 3,
    rate: 50,
    pricingType: 'kls',
    TotalPrice: 402,
  },
  {
    _id: 16,
    serviceId: 1,
    itemName: 'Coat',
    qty: 10,
    rate: 5,
    pricingType: 'kls',
    TotalPrice: 332,
  },
  {
    _id: 17,
    serviceId: 0,
    itemName: 'Scarf',
    qty: 3,
    rate: 50,
    pricingType: 'kls',
    TotalPrice: 542,
  },
  {
    _id: 18,
    serviceId: 1,
    itemName: 'Bed-sheet Cover For long Text Testing',
    qty: 10,
    rate: 5,
    pricingType: 'kls',
    TotalPrice: 452,
  },
  {
    _id: 19,
    serviceId: 1,
    itemName: 'Boots',
    qty: 10,
    rate: 5,
    pricingType: 'kls',
    TotalPrice: 223,
  },
];

const clothAndPricing1 = [
  {
    id: 0,
    serviceId: 0,
    itemName: 'TShirt',
    qty: 2,
    rate: 5,
    pricingType: 'pc',
    TotalPrice: 100,
  },
  {
    id: 0,
    serviceId: 0,
    itemName: 'Shorts',
    qty: 2,
    rate: 5,
    pricingType: 'pc',
    TotalPrice: 100,
  },
  {
    id: 0,
    serviceId: 0,
    itemName: 'Blouse',
    qty: 2,
    rate: 5,
    pricingType: 'pc',
    TotalPrice: 100,
  },
  {
    id: 0,
    serviceId: 0,
    itemName: 'Towels',
    qty: 2,
    rate: 5,
    pricingType: 'pc',
    TotalPrice: 100,
  },
  {
    id: 0,
    serviceId: 0,
    itemName: 'panties',
    qty: 2,
    rate: 5,
    pricingType: 'pc',
    TotalPrice: 100,
  },
];

const myEarnings = [
  {
    id: 0,
    serviceId: 0,
    itemName: 'JAN',
    qty: 2,
    rate: 5,
    pricingType: 'pc',
    TotalPrice: 100,
  },
  {
    id: 1,
    serviceId: 0,
    itemName: 'FEB',
    qty: 5,
    rate: 4,
    pricingType: 'pc',
    TotalPrice: 100,
  },
  {
    id: 2,
    serviceId: 1,
    itemName: 'MAR',
    qty: 5,
    rate: 8,
    pricingType: 'pc',
    TotalPrice: 100,
  },
  {
    id: 0,
    serviceId: 0,
    itemName: 'JULY',
    qty: 3,
    rate: 9,
    pricingType: 'kls',
    TotalPrice: 100,
  },
];

const homeMenu = [
  {
    id: 0,
    name: 'Incoming',
  },
  {
    id: 1,
    name: 'Ongoing',
  },
  {
    id: 2,
    name: 'Completed',
    isExpress: true,
    isStandard: true,
  },
];

const orderDetails = [
  {
    id: 0,
    orderId: 420230,
    services: [
      {
        id: 0,
        name: 'Ironing',
      },
      {
        id: 1,
        name: 'Dry Cleaning',
        isExpress: true,
        isStandard: true,
      },
    ],
    orderItems: [
      {
        id: 0,
        serviceId: 0,
        itemName: 'TShirt',
        qty: 2,
        rate: 5,
        pricingType: 'pc',
      },
      {
        id: 1,
        serviceId: 0,
        itemName: 'Short',
        qty: 5,
        rate: 15,
        pricingType: 'pc',
      },
      {
        id: 2,
        serviceId: 1,
        itemName: 'Brep',
        qty: 5,
        rate: 10,
        pricingType: 'pc',
      },
    ],
  },
  {
    id: 1,
    orderId: 420222,
    services: [
      {
        id: 0,
        name: 'Steam Iron',
        isExpress: true,
        isStandard: true,
      },
      {
        id: 1,
        name: 'Petrol Wash',
        isExpress: false,
        isStandard: true,
      },
    ],
    orderItems: [
      {
        id: 0,
        serviceId: 0,
        itemName: 'Taklap',
        qty: 3,
        rate: 50,
        pricingType: 'kls',
      },
      {
        id: 1,
        serviceId: 1,
        itemName: 'Mantel',
        qty: 10,
        rate: 5,
        pricingType: 'kls',
      },
    ],
  },
  {
    id: 2,
    orderId: 420223,
    services: [
      {
        id: 0,
        name: 'Steam Iron',
        isExpress: true,
        isStandard: true,
      },
      {
        id: 1,
        name: 'Petrol Wash',
        isExpress: false,
        isStandard: true,
      },
      {
        id: 2,
        name: 'Ironing',
        isExpress: false,
        isStandard: true,
      },
    ],
    orderItems: [
      {
        id: 0,
        serviceId: 0,
        itemName: 'Taklap',
        qty: 3,
        rate: 50,
        pricingType: 'kls',
      },
      {
        id: 1,
        serviceId: 1,
        itemName: 'Mantel',
        qty: 10,
        rate: 5,
        pricingType: 'kls',
      },
      {
        id: 2,
        serviceId: 2,
        itemName: 'Pants',
        qty: 10,
        rate: 5,
        pricingType: 'kls',
      },
    ],
  },
];

const orders = [
  {
    id: 0,
    customerName: 'Benjamin Hemmings',
    orderId: 420230,
    deliveryBy: 'Lillian Fisher',
    TotalAmmount: 1000,
    status: 0,
    serviceTimeType: 'standard',
    bookedAt: 'Mon, 23 June 2021',
    serviceDuration: '24 hours.',
    itemName: 'T-Shirt',
    qty: 2,
    rate: 5,
    pricingType: 'pc',
    price: 40,
    address: 'Brgy. 93 Bagacay Peerless Village, Tacloban City',
  },
  {
    id: 1,
    customerName: 'Jason Statham',
    orderId: 230420,
    deliveryBy: 'Lillian Fisher',
    TotalAmmount: 1000,
    status: 0,
    serviceTimeType: 'express',
    bookedAt: 'Mon, 23 June 2021',
    serviceDuration: '3 hours.',
    itemName: 'Shorts',
    qty: 6,
    rate: 5,
    pricingType: 'pc',
    price: 120,
  },
  {
    id: 2,
    customerName: 'Jeff Ly',
    orderId: 420222,
    deliveryBy: 'Lillian Fisher',
    TotalAmmount: 1000,
    status: 1,
    serviceTimeType: 'express',
    bookedAt: 'Mon, 23 June 2021',
    serviceDuration: '3 hours.',
    itemName: 'Comforter',
    qty: 1,
    rate: 5,
    pricingType: 'pc',
    price: 50,
    address: 'Brgy. 92 Apitong, Tacloban City',
  },
  {
    id: 3,
    customerName: 'Jackie Chua',
    orderId: 420223,
    deliveryBy: 'Lillian Fisher',
    TotalAmmount: 1100,
    status: 1,
    serviceTimeType: 'standard',
    bookedAt: 'Mon, 23 June 2021',
    serviceDuration: '24 hours.',
    itemName: 'Bed sheets',
    qty: 6,
    rate: 5,
    pricingType: 'pc',
    price: 20,
    address: 'Brgy. 56-A, Tacloban City',
  },
  {
    id: 4,
    customerName: 'Jeborin Santiago',
    orderId: 421000,
    deliveryBy: 'Lil Fisher',
    TotalAmmount: 2000,
    status: 2,
    serviceTimeType: 'express',
    bookedAt: 'Mon, 23 June 2021',
    serviceDuration: '3 Hrs.',
    itemName: 'Curtain',
    qty: 6,
    rate: 5,
    pricingType: 'pc',
    price: 35,
  },
];



const featuredSkeleton = [1, 2, 3, 4, 5, 6];


const ShopSkeleton = [1, 2, 3, 4, 5, 6];


// image carousel data
const imagesCarousel = [
  "https://media.istockphoto.com/id/1247884083/vector/laundry-service-room-vector-illustration-washing-and-drying-machines-with-cleansers-on-shelf.jpg?s=612x612&w=0&k=20&c=myaNEKlqX7R--bzWGDoMI7PhdxG_zdQTKYEBlymJQGk=",
  "https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=800",
];

// view prop types error -> code to paste
// get ColorPropType(): $FlowFixMe {
//     return require('deprecated-react-native-prop-types').ColorPropType;
//   },

//   get EdgeInsetsPropType(): $FlowFixMe {
//     return require('deprecated-react-native-prop-types').EdgeInsetsPropType;
//   },

//   get PointPropType(): $FlowFixMe {
//     return require('deprecated-react-native-prop-types').PointPropType;
//   },

//   get ViewPropTypes(): $FlowFixMe {
//     return require('deprecated-react-native-prop-types').ViewPropTypes;
//   },

// services data code
const services = [
  {
    id: "0",
    image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
    name: "Washing",
  },
  {
    id: "11",
    image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
    name: "Laundry",
  },
  {
    id: "12",
    image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
    name: "Wash & Iron",
  },
  {
    id: "13",
    image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
    name: "Cleaning",
  },
];

// products data 
const services1 = [
  {
    id: "0",
    image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
    name: "shirt",
    quantity: 0,
    price: 10,
  },
  {
    id: "11",
    image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
    name: "T-shirt",
    quantity: 0,
    price: 10,
  },
  {
    id: "12",
    image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
    name: "dresses",
    quantity: 0,
    price: 10,
  },
  {
    id: "13",
    image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
    name: "jeans",
    quantity: 0,
    price: 10,
  },
  {
    id: "14",
    image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
    name: "Sweater",
    quantity: 0,
    price: 10,
  },
  {
    id: "15",
    image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
    name: "shorts",
    quantity: 0,
    price: 10,
  },
  {
    id: "16",
    image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
    name: "Sleeveless",
    quantity: 0,
    price: 10,
  },
];



export default {
  services,
  services1,
  imagesCarousel,
  onboarding_screens,
  varEnv,
  clothAndPricing,
  homeMenu,
  orderDetails,
  orders,
  basketOrder,
  featuredSkeleton,
  ShopSkeleton,
  servicePricing,
  myEarnings,
  clothAndPricing1,
  deliveryOptions,
  addressLocations,
  addressLabels,
  permission_process
};

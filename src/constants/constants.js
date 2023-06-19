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








const deliveryOptions = [
  {
    id: 0,
    name: "STANDARD",
    description: "1-2 Days Normal Pick-up and Return.",
    price: 50
  },
  {
    id: 1,
    name: "EXPRESS",
    description: "3-5 Hours High Priority Pick-up and Return.",
    price: 100
  }
]

const varEnv = {
  //API URLS
  //Local
  apiUrl: 'http://192.168.1.100:42005/api/v1',
  defaultToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2Q0MmExZGZlMmRkMTJlOGFhYjAwMSIsImlhdCI6MTY4NjE3OTM5MiwiZXhwIjoxNjg4NzcxMzkyfQ.KIO6Op_ce3cwzzpUxgvmCBLAqIcibZRXnxTI94nP3jk',
  shopId: '647d4319dfe2dd12e8aab00c',
  //Live
  // apiUrl: 'https://alayon.bugtech.solutions/api/v1',
  // defaultToken:
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2QyM2I3NzNiMzFhNTRkNDczOGE4OCIsImlhdCI6MTY4NjE3ODExNywiZXhwIjoxNjg4NzcwMTE3fQ.hCKBMQy8zHRYlopXIUyzKK9p1bvywp31iZFXMTlls6s',
  // shopId: '647d23d973b31a54d4738a93',
  //STATIC FILES URL
};

const addressLabels = [{ _id: 0, name: 'Work' }, { _id: 1, name: 'Home 1' }, { _id: 2, name: 'Home 2' }]

const addressLocations = [{ _id: 0, "latitude": 11.2317012, "longitude": 125.0024682, "address": "62J2+MXW, Tacloban City, Leyte, Philippines", name: "John Benedict", mobile: "9774461641", postalCode: "6500", label: 1 }, { _id: 1, "longitude": 125.00254014506935, "latitude": 11.234456830480326, "address": "62M2+RXV, Real St, Downtown, Tacloban City, Leyte, Philippines", name: "Marty Pabello", mobile: "9878423422", postalCode: "6500", isDefault: true, label: 0 }]


const basketOrder = {
  orders: [{ "qty": 1, "totalServices": 0, "totalAddons": 88, "pricing": "Piece", "service": "647d4289dfe2dd12e8aaafeb", "shop": { "location": { "latitude": 11.2317012, "longitude": 125.0024682, "address": "62J2+MXW, Tacloban City, Leyte, Philippines" }, "opening": "2023-06-05T02:06:02.409Z", "closing": "2023-06-05T14:06:00.000Z", "earnings": [], "orders": [], "cloths": [], "isDeleted": false, "_id": "647d4319dfe2dd12e8aab00c", "business_hours": [{ "_id": "647d4319dfe2dd12e8aab00d", "name": "Mon", "isOpen": true }, { "_id": "647d4319dfe2dd12e8aab00e", "name": "Tue", "isOpen": true }, { "_id": "647d4319dfe2dd12e8aab00f", "name": "Wed", "isOpen": true }, { "_id": "647d4319dfe2dd12e8aab010", "name": "Thu", "isOpen": true }, { "_id": "647d4319dfe2dd12e8aab011", "name": "Fri", "isOpen": true }, { "_id": "647d4319dfe2dd12e8aab012", "name": "Sat", "isOpen": true }, { "_id": "647d4319dfe2dd12e8aab013", "name": "Sun", "isOpen": false }], "shop_name": "jj Launderer", "mobile": null, "imgUrl": null, "bannerUrl": "http://bugtech.solutions:42005/api/v1/static/banners/7.jpg", "user_id": "647d42a1dfe2dd12e8aab001", "services": [{ "isPerPiece": true, "isPerKilo": true, "isPerBatch": true, "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "cloths": [{ "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9ab8384d4170344fdd", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "647d4350dfe2dd12e8aab028", "shop": "647d4319dfe2dd12e8aab00c", "name": "T-Shirt", "__v": 0 }, { "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9bb8384d4170344fe1", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "647d4359dfe2dd12e8aab02b", "shop": "647d4319dfe2dd12e8aab00c", "name": "Pants", "__v": 0 }, { "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9bb8384d4170344fe5", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "647d4382dfe2dd12e8aab02e", "shop": "647d4319dfe2dd12e8aab00c", "name": "Shorts", "__v": 0 }, { "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9bb8384d4170344fe9", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "6481bbccebcbd72eb8ac154e", "shop": "647d4319dfe2dd12e8aab00c", "name": "Brep", "__v": 0 }, { "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9bb8384d4170344fed", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "6481bbddebcbd72eb8ac1551", "shop": "647d4319dfe2dd12e8aab00c", "name": "Mantel", "__v": 0 }, { "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9bb8384d4170344ff1", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "6481bc15ebcbd72eb8ac155a", "shop": "647d4319dfe2dd12e8aab00c", "name": "Socks", "__v": 0 }, { "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9bb8384d4170344ff5", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "6481bc25ebcbd72eb8ac155d", "shop": "647d4319dfe2dd12e8aab00c", "name": "Coat", "__v": 0 }, { "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9bb8384d4170344ff9", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "6481bc2cebcbd72eb8ac1560", "shop": "647d4319dfe2dd12e8aab00c", "name": "Jacket", "__v": 0 }, { "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9bb8384d4170344ffd", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "6481bc33ebcbd72eb8ac1563", "shop": "647d4319dfe2dd12e8aab00c", "name": "Sando", "__v": 0 }], "isDeleted": false, "_id": "6485bca187339e2f4806236d", "service": "647d4289dfe2dd12e8aaafeb", "name": "Dry Wash" }, { "isPerPiece": true, "isPerKilo": true, "isPerBatch": true, "pricePiece": 15, "priceKilo": 40, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "cloths": [{ "pricePiece": 15, "priceKilo": 40, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "6488faa8b8384d417034501a", "service": "647d4289dfe2dd12e8aaafee", "cloth": "647d4350dfe2dd12e8aab028", "shop": "647d4319dfe2dd12e8aab00c", "name": "T-Shirt", "__v": 0 }, { "pricePiece": 15, "priceKilo": 40, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "6488faa8b8384d417034501e", "service": "647d4289dfe2dd12e8aaafee", "cloth": "647d4359dfe2dd12e8aab02b", "shop": "647d4319dfe2dd12e8aab00c", "name": "Pants", "__v": 0 }, { "pricePiece": 15, "priceKilo": 40, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "6488faa8b8384d4170345022", "service": "647d4289dfe2dd12e8aaafee", "cloth": "647d4382dfe2dd12e8aab02e", "shop": "647d4319dfe2dd12e8aab00c", "name": "Shorts", "__v": 0 }, { "pricePiece": 15, "priceKilo": 40, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "6488faa8b8384d4170345026", "service": "647d4289dfe2dd12e8aaafee", "cloth": "6481bbccebcbd72eb8ac154e", "shop": "647d4319dfe2dd12e8aab00c", "name": "Brep", "__v": 0 }, { "pricePiece": 15, "priceKilo": 40, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "6488faa8b8384d417034502a", "service": "647d4289dfe2dd12e8aaafee", "cloth": "6481bbddebcbd72eb8ac1551", "shop": "647d4319dfe2dd12e8aab00c", "name": "Mantel", "__v": 0 }, { "pricePiece": 15, "priceKilo": 40, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "6488faa8b8384d417034502e", "service": "647d4289dfe2dd12e8aaafee", "cloth": "6481bc15ebcbd72eb8ac155a", "shop": "647d4319dfe2dd12e8aab00c", "name": "Socks", "__v": 0 }, { "pricePiece": 15, "priceKilo": 40, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "6488faa8b8384d4170345032", "service": "647d4289dfe2dd12e8aaafee", "cloth": "6481bc25ebcbd72eb8ac155d", "shop": "647d4319dfe2dd12e8aab00c", "name": "Coat", "__v": 0 }, { "pricePiece": 15, "priceKilo": 40, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "6488faa8b8384d4170345036", "service": "647d4289dfe2dd12e8aaafee", "cloth": "6481bc2cebcbd72eb8ac1560", "shop": "647d4319dfe2dd12e8aab00c", "name": "Jacket", "__v": 0 }, { "pricePiece": 15, "priceKilo": 40, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "6488faa8b8384d417034503a", "service": "647d4289dfe2dd12e8aaafee", "cloth": "6481bc33ebcbd72eb8ac1563", "shop": "647d4319dfe2dd12e8aab00c", "name": "Sando", "__v": 0 }], "isDeleted": false, "_id": "6485bca187339e2f4806236e", "service": "647d4289dfe2dd12e8aaafee", "name": "Wash & Fold" }, { "isPerPiece": true, "isPerKilo": true, "isPerBatch": false, "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "cloths": [{ "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "6488faa8b8384d417034503e", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "647d4350dfe2dd12e8aab028", "shop": "647d4319dfe2dd12e8aab00c", "name": "T-Shirt", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "6488faa8b8384d4170345042", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "647d4359dfe2dd12e8aab02b", "shop": "647d4319dfe2dd12e8aab00c", "name": "Pants", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "6488faa8b8384d4170345046", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "647d4382dfe2dd12e8aab02e", "shop": "647d4319dfe2dd12e8aab00c", "name": "Shorts", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "6488faa8b8384d417034504a", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "6481bbccebcbd72eb8ac154e", "shop": "647d4319dfe2dd12e8aab00c", "name": "Brep", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "6488faa8b8384d417034504e", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "6481bbddebcbd72eb8ac1551", "shop": "647d4319dfe2dd12e8aab00c", "name": "Mantel", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "6488faa8b8384d4170345052", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "6481bc15ebcbd72eb8ac155a", "shop": "647d4319dfe2dd12e8aab00c", "name": "Socks", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "6488faa8b8384d4170345056", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "6481bc25ebcbd72eb8ac155d", "shop": "647d4319dfe2dd12e8aab00c", "name": "Coat", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "6488faa8b8384d417034505a", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "6481bc2cebcbd72eb8ac1560", "shop": "647d4319dfe2dd12e8aab00c", "name": "Jacket", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "6488faa8b8384d417034505e", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "6481bc33ebcbd72eb8ac1563", "shop": "647d4319dfe2dd12e8aab00c", "name": "Sando", "__v": 0 }], "isDeleted": false, "_id": "648787b40e10432d70f22d6a", "service": "647d4289dfe2dd12e8aaaff1", "name": "Steam Iron" }], "createdAt": "2023-06-05T02:06:17.334Z", "updatedAt": "2023-06-13T23:24:24.748Z", "__v": 90, "addons": [{ "price": 10, "isDeleted": false, "isAvailable": true, "_id": "64811c146684c051e48a359a", "name": "Downy", "description": "Downy Isang banlaw passion" }, { "price": 8, "isDeleted": false, "isAvailable": true, "_id": "64811ee76684c051e48a362a", "name": "Conditioner", "description": "Fabric Conditioner" }, { "price": 50, "isDeleted": false, "isAvailable": true, "_id": "6483171f1d1de14670feba53", "name": "Laundry Bag", "description": "Alayon Laundry Bag" }, { "price": 20, "isDeleted": false, "isAvailable": true, "_id": "64856ac587339e2f48062283", "name": "Perfume", "description": "Downy Perfume" }, { "price": 50, "isDeleted": false, "isAvailable": true, "_id": "6487347fc102695298e6c0b5", "name": "Eco bag", "description": "Customized Laundry Bag" }] }, "cloths": [{ "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9ab8384d4170344fdd", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "647d4350dfe2dd12e8aab028", "shop": "647d4319dfe2dd12e8aab00c", "name": "T-Shirt", "__v": 0, "qty": 3 }, { "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9bb8384d4170344fe1", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "647d4359dfe2dd12e8aab02b", "shop": "647d4319dfe2dd12e8aab00c", "name": "Pants", "__v": 0, "qty": 2 }, { "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9bb8384d4170344fe9", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "6481bbccebcbd72eb8ac154e", "shop": "647d4319dfe2dd12e8aab00c", "name": "Brep", "__v": 0, "qty": 2 }, { "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9bb8384d4170344fe5", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "647d4382dfe2dd12e8aab02e", "shop": "647d4319dfe2dd12e8aab00c", "name": "Shorts", "__v": 0, "qty": 2 }], "addons": [{ "price": 10, "isDeleted": false, "isAvailable": true, "_id": "64811c146684c051e48a359a", "name": "Downy", "description": "Downy Isang banlaw passion", "qty": 3 }, { "price": 8, "isDeleted": false, "isAvailable": true, "_id": "64811ee76684c051e48a362a", "name": "Conditioner", "description": "Fabric Conditioner", "qty": 1 }, { "price": 50, "isDeleted": false, "isAvailable": true, "_id": "6483171f1d1de14670feba53", "name": "Laundry Bag", "description": "Alayon Laundry Bag", "qty": 1 }], "hasAddons": true, "deliveryOption": 0, "totalService": 90 }, { "qty": 4, "totalServices": 0, "totalAddons": 88, "pricing": "Kilo", "service": "647d4289dfe2dd12e8aaafee", "shop": { "location": { "latitude": 11.2317012, "longitude": 125.0024682, "address": "62J2+MXW, Tacloban City, Leyte, Philippines" }, "opening": "2023-06-05T02:06:02.409Z", "closing": "2023-06-05T14:06:00.000Z", "earnings": [], "orders": [], "cloths": [], "isDeleted": false, "_id": "647d4319dfe2dd12e8aab00c", "business_hours": [{ "_id": "647d4319dfe2dd12e8aab00d", "name": "Mon", "isOpen": true }, { "_id": "647d4319dfe2dd12e8aab00e", "name": "Tue", "isOpen": true }, { "_id": "647d4319dfe2dd12e8aab00f", "name": "Wed", "isOpen": true }, { "_id": "647d4319dfe2dd12e8aab010", "name": "Thu", "isOpen": true }, { "_id": "647d4319dfe2dd12e8aab011", "name": "Fri", "isOpen": true }, { "_id": "647d4319dfe2dd12e8aab012", "name": "Sat", "isOpen": true }, { "_id": "647d4319dfe2dd12e8aab013", "name": "Sun", "isOpen": false }], "shop_name": "jj Launderer", "mobile": null, "imgUrl": null, "bannerUrl": "http://bugtech.solutions:42005/api/v1/static/banners/7.jpg", "user_id": "647d42a1dfe2dd12e8aab001", "services": [{ "isPerPiece": true, "isPerKilo": true, "isPerBatch": true, "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "cloths": [{ "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9ab8384d4170344fdd", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "647d4350dfe2dd12e8aab028", "shop": "647d4319dfe2dd12e8aab00c", "name": "T-Shirt", "__v": 0 }, { "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9bb8384d4170344fe1", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "647d4359dfe2dd12e8aab02b", "shop": "647d4319dfe2dd12e8aab00c", "name": "Pants", "__v": 0 }, { "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9bb8384d4170344fe5", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "647d4382dfe2dd12e8aab02e", "shop": "647d4319dfe2dd12e8aab00c", "name": "Shorts", "__v": 0 }, { "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9bb8384d4170344fe9", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "6481bbccebcbd72eb8ac154e", "shop": "647d4319dfe2dd12e8aab00c", "name": "Brep", "__v": 0 }, { "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9bb8384d4170344fed", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "6481bbddebcbd72eb8ac1551", "shop": "647d4319dfe2dd12e8aab00c", "name": "Mantel", "__v": 0 }, { "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9bb8384d4170344ff1", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "6481bc15ebcbd72eb8ac155a", "shop": "647d4319dfe2dd12e8aab00c", "name": "Socks", "__v": 0 }, { "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9bb8384d4170344ff5", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "6481bc25ebcbd72eb8ac155d", "shop": "647d4319dfe2dd12e8aab00c", "name": "Coat", "__v": 0 }, { "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9bb8384d4170344ff9", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "6481bc2cebcbd72eb8ac1560", "shop": "647d4319dfe2dd12e8aab00c", "name": "Jacket", "__v": 0 }, { "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9bb8384d4170344ffd", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "6481bc33ebcbd72eb8ac1563", "shop": "647d4319dfe2dd12e8aab00c", "name": "Sando", "__v": 0 }], "isDeleted": false, "_id": "6485bca187339e2f4806236d", "service": "647d4289dfe2dd12e8aaafeb", "name": "Dry Wash" }, { "isPerPiece": true, "isPerKilo": true, "isPerBatch": true, "pricePiece": 15, "priceKilo": 40, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "cloths": [{ "pricePiece": 15, "priceKilo": 40, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "6488faa8b8384d417034501a", "service": "647d4289dfe2dd12e8aaafee", "cloth": "647d4350dfe2dd12e8aab028", "shop": "647d4319dfe2dd12e8aab00c", "name": "T-Shirt", "__v": 0 }, { "pricePiece": 15, "priceKilo": 40, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "6488faa8b8384d417034501e", "service": "647d4289dfe2dd12e8aaafee", "cloth": "647d4359dfe2dd12e8aab02b", "shop": "647d4319dfe2dd12e8aab00c", "name": "Pants", "__v": 0 }, { "pricePiece": 15, "priceKilo": 40, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "6488faa8b8384d4170345022", "service": "647d4289dfe2dd12e8aaafee", "cloth": "647d4382dfe2dd12e8aab02e", "shop": "647d4319dfe2dd12e8aab00c", "name": "Shorts", "__v": 0 }, { "pricePiece": 15, "priceKilo": 40, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "6488faa8b8384d4170345026", "service": "647d4289dfe2dd12e8aaafee", "cloth": "6481bbccebcbd72eb8ac154e", "shop": "647d4319dfe2dd12e8aab00c", "name": "Brep", "__v": 0 }, { "pricePiece": 15, "priceKilo": 40, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "6488faa8b8384d417034502a", "service": "647d4289dfe2dd12e8aaafee", "cloth": "6481bbddebcbd72eb8ac1551", "shop": "647d4319dfe2dd12e8aab00c", "name": "Mantel", "__v": 0 }, { "pricePiece": 15, "priceKilo": 40, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "6488faa8b8384d417034502e", "service": "647d4289dfe2dd12e8aaafee", "cloth": "6481bc15ebcbd72eb8ac155a", "shop": "647d4319dfe2dd12e8aab00c", "name": "Socks", "__v": 0 }, { "pricePiece": 15, "priceKilo": 40, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "6488faa8b8384d4170345032", "service": "647d4289dfe2dd12e8aaafee", "cloth": "6481bc25ebcbd72eb8ac155d", "shop": "647d4319dfe2dd12e8aab00c", "name": "Coat", "__v": 0 }, { "pricePiece": 15, "priceKilo": 40, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "6488faa8b8384d4170345036", "service": "647d4289dfe2dd12e8aaafee", "cloth": "6481bc2cebcbd72eb8ac1560", "shop": "647d4319dfe2dd12e8aab00c", "name": "Jacket", "__v": 0 }, { "pricePiece": 15, "priceKilo": 40, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "6488faa8b8384d417034503a", "service": "647d4289dfe2dd12e8aaafee", "cloth": "6481bc33ebcbd72eb8ac1563", "shop": "647d4319dfe2dd12e8aab00c", "name": "Sando", "__v": 0 }], "isDeleted": false, "_id": "6485bca187339e2f4806236e", "service": "647d4289dfe2dd12e8aaafee", "name": "Wash & Fold" }, { "isPerPiece": true, "isPerKilo": true, "isPerBatch": false, "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "cloths": [{ "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "6488faa8b8384d417034503e", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "647d4350dfe2dd12e8aab028", "shop": "647d4319dfe2dd12e8aab00c", "name": "T-Shirt", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "6488faa8b8384d4170345042", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "647d4359dfe2dd12e8aab02b", "shop": "647d4319dfe2dd12e8aab00c", "name": "Pants", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "6488faa8b8384d4170345046", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "647d4382dfe2dd12e8aab02e", "shop": "647d4319dfe2dd12e8aab00c", "name": "Shorts", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "6488faa8b8384d417034504a", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "6481bbccebcbd72eb8ac154e", "shop": "647d4319dfe2dd12e8aab00c", "name": "Brep", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "6488faa8b8384d417034504e", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "6481bbddebcbd72eb8ac1551", "shop": "647d4319dfe2dd12e8aab00c", "name": "Mantel", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "6488faa8b8384d4170345052", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "6481bc15ebcbd72eb8ac155a", "shop": "647d4319dfe2dd12e8aab00c", "name": "Socks", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "6488faa8b8384d4170345056", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "6481bc25ebcbd72eb8ac155d", "shop": "647d4319dfe2dd12e8aab00c", "name": "Coat", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "6488faa8b8384d417034505a", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "6481bc2cebcbd72eb8ac1560", "shop": "647d4319dfe2dd12e8aab00c", "name": "Jacket", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "6488faa8b8384d417034505e", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "6481bc33ebcbd72eb8ac1563", "shop": "647d4319dfe2dd12e8aab00c", "name": "Sando", "__v": 0 }], "isDeleted": false, "_id": "648787b40e10432d70f22d6a", "service": "647d4289dfe2dd12e8aaaff1", "name": "Steam Iron" }], "createdAt": "2023-06-05T02:06:17.334Z", "updatedAt": "2023-06-13T23:24:24.748Z", "__v": 90, "addons": [{ "price": 10, "isDeleted": false, "isAvailable": true, "_id": "64811c146684c051e48a359a", "name": "Downy", "description": "Downy Isang banlaw passion" }, { "price": 8, "isDeleted": false, "isAvailable": true, "_id": "64811ee76684c051e48a362a", "name": "Conditioner", "description": "Fabric Conditioner" }, { "price": 50, "isDeleted": false, "isAvailable": true, "_id": "6483171f1d1de14670feba53", "name": "Laundry Bag", "description": "Alayon Laundry Bag" }, { "price": 20, "isDeleted": false, "isAvailable": true, "_id": "64856ac587339e2f48062283", "name": "Perfume", "description": "Downy Perfume" }, { "price": 50, "isDeleted": false, "isAvailable": true, "_id": "6487347fc102695298e6c0b5", "name": "Eco bag", "description": "Customized Laundry Bag" }] }, "cloths": [{ "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9bb8384d4170344fe5", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "647d4382dfe2dd12e8aab02e", "shop": "647d4319dfe2dd12e8aab00c", "name": "Shorts", "__v": 0, "qty": 2 }, { "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9bb8384d4170344fe9", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "6481bbccebcbd72eb8ac154e", "shop": "647d4319dfe2dd12e8aab00c", "name": "Brep", "__v": 0, "qty": 2 }, { "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9bb8384d4170344fed", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "6481bbddebcbd72eb8ac1551", "shop": "647d4319dfe2dd12e8aab00c", "name": "Mantel", "__v": 0, "qty": 2 }, { "pricePiece": 10, "priceKilo": 50, "priceBatch": 130, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "6488fa9bb8384d4170344ff1", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "6481bc15ebcbd72eb8ac155a", "shop": "647d4319dfe2dd12e8aab00c", "name": "Socks", "__v": 0, "qty": 2 }], "addons": [{ "price": 10, "isDeleted": false, "isAvailable": true, "_id": "64811c146684c051e48a359a", "name": "Downy", "description": "Downy Isang banlaw passion", "qty": 3 }, { "price": 8, "isDeleted": false, "isAvailable": true, "_id": "64811ee76684c051e48a362a", "name": "Conditioner", "description": "Fabric Conditioner", "qty": 1 }, { "price": 50, "isDeleted": false, "isAvailable": true, "_id": "6483171f1d1de14670feba53", "name": "Laundry Bag", "description": "Alayon Laundry Bag", "qty": 1 }], "hasAddons": true, "totalService": 160, "deliveryOption": 0 }, { "qty": 2, "totalServices": 0, "totalAddons": 56, "pricing": "Batch", "service": "647d4289dfe2dd12e8aaaff1", "shop": { "location": { "longitude": 125.00254014506935, "latitude": 11.234456830480326, "address": "62M2+RXV, Real St, Downtown, Tacloban City, Leyte, Philippines" }, "opening": "2023-06-17T03:51:00.000Z", "closing": "2023-06-17T15:51:36.283Z", "earnings": [], "orders": [], "cloths": [], "isDeleted": false, "_id": "648dd69ba2138f52143b7cae", "shop_name": "Labada Express", "business_hours": [{ "_id": "648dd7eca2138f52143b7cff", "name": "Mon", "isOpen": true }, { "_id": "648dd7eca2138f52143b7d00", "name": "Tue", "isOpen": true }, { "_id": "648dd7eca2138f52143b7d01", "name": "Wed", "isOpen": true }, { "_id": "648dd7eca2138f52143b7d02", "name": "Thu", "isOpen": true }, { "_id": "648dd7eca2138f52143b7d03", "name": "Fri", "isOpen": true }, { "_id": "648dd7eca2138f52143b7d04", "name": "Sat", "isOpen": false }, { "_id": "648dd7eca2138f52143b7d05", "name": "Sun", "isOpen": false }], "mobile": "5512345672", "imgUrl": "http://bugtech.solutions:42005/api/v1/static/1687017111665-IMG_20230617_152308.jpg", "bannerUrl": "http://bugtech.solutions:42005/api/v1/static/banners/8.jpg", "user_id": "648dceaba2138f52143b7c80", "services": [{ "isPerPiece": true, "isPerKilo": true, "isPerBatch": false, "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "cloths": [{ "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "648dd83da2138f52143b7d21", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "647d4350dfe2dd12e8aab028", "shop": "648dd69ba2138f52143b7cae", "name": "T-Shirt", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "648dd83da2138f52143b7d25", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "647d4359dfe2dd12e8aab02b", "shop": "648dd69ba2138f52143b7cae", "name": "Pants", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "648dd83da2138f52143b7d29", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "647d4382dfe2dd12e8aab02e", "shop": "648dd69ba2138f52143b7cae", "name": "Shorts", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "648dd83da2138f52143b7d2d", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "6481bbccebcbd72eb8ac154e", "shop": "648dd69ba2138f52143b7cae", "name": "Brep", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "648dd83da2138f52143b7d31", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "6481bbddebcbd72eb8ac1551", "shop": "648dd69ba2138f52143b7cae", "name": "Mantel", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "648dd83da2138f52143b7d35", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "6481bc15ebcbd72eb8ac155a", "shop": "648dd69ba2138f52143b7cae", "name": "Socks", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "648dd83da2138f52143b7d39", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "6481bc25ebcbd72eb8ac155d", "shop": "648dd69ba2138f52143b7cae", "name": "Coat", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "648dd83da2138f52143b7d3d", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "6481bc2cebcbd72eb8ac1560", "shop": "648dd69ba2138f52143b7cae", "name": "Jacket", "__v": 0 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "648dd83da2138f52143b7d41", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "6481bc33ebcbd72eb8ac1563", "shop": "648dd69ba2138f52143b7cae", "name": "Sando", "__v": 0 }], "isDeleted": false, "_id": "648dd81da2138f52143b7d11", "service": "647d4289dfe2dd12e8aaafeb", "name": "Dry Wash" }, { "isPerPiece": false, "isPerKilo": true, "isPerBatch": true, "pricePiece": 0, "priceKilo": 20, "priceBatch": 120, "batchUnit": "kilo", "batchQty": 8, "cloths": [{ "pricePiece": 0, "priceKilo": 20, "priceBatch": 120, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7d45", "service": "647d4289dfe2dd12e8aaafee", "cloth": "647d4350dfe2dd12e8aab028", "shop": "648dd69ba2138f52143b7cae", "name": "T-Shirt", "__v": 0 }, { "pricePiece": 0, "priceKilo": 20, "priceBatch": 120, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7d49", "service": "647d4289dfe2dd12e8aaafee", "cloth": "647d4359dfe2dd12e8aab02b", "shop": "648dd69ba2138f52143b7cae", "name": "Pants", "__v": 0 }, { "pricePiece": 0, "priceKilo": 20, "priceBatch": 120, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7d4d", "service": "647d4289dfe2dd12e8aaafee", "cloth": "647d4382dfe2dd12e8aab02e", "shop": "648dd69ba2138f52143b7cae", "name": "Shorts", "__v": 0 }, { "pricePiece": 0, "priceKilo": 20, "priceBatch": 120, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7d51", "service": "647d4289dfe2dd12e8aaafee", "cloth": "6481bbccebcbd72eb8ac154e", "shop": "648dd69ba2138f52143b7cae", "name": "Brep", "__v": 0 }, { "pricePiece": 0, "priceKilo": 20, "priceBatch": 120, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7d55", "service": "647d4289dfe2dd12e8aaafee", "cloth": "6481bbddebcbd72eb8ac1551", "shop": "648dd69ba2138f52143b7cae", "name": "Mantel", "__v": 0 }, { "pricePiece": 0, "priceKilo": 20, "priceBatch": 120, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7d59", "service": "647d4289dfe2dd12e8aaafee", "cloth": "6481bc15ebcbd72eb8ac155a", "shop": "648dd69ba2138f52143b7cae", "name": "Socks", "__v": 0 }, { "pricePiece": 0, "priceKilo": 20, "priceBatch": 120, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7d5d", "service": "647d4289dfe2dd12e8aaafee", "cloth": "6481bc25ebcbd72eb8ac155d", "shop": "648dd69ba2138f52143b7cae", "name": "Coat", "__v": 0 }, { "pricePiece": 0, "priceKilo": 20, "priceBatch": 120, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7d61", "service": "647d4289dfe2dd12e8aaafee", "cloth": "6481bc2cebcbd72eb8ac1560", "shop": "648dd69ba2138f52143b7cae", "name": "Jacket", "__v": 0 }, { "pricePiece": 0, "priceKilo": 20, "priceBatch": 120, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7d65", "service": "647d4289dfe2dd12e8aaafee", "cloth": "6481bc33ebcbd72eb8ac1563", "shop": "648dd69ba2138f52143b7cae", "name": "Sando", "__v": 0 }], "isDeleted": false, "_id": "648dd81da2138f52143b7d12", "service": "647d4289dfe2dd12e8aaafee", "name": "Wash & Fold" }, { "isPerPiece": false, "isPerKilo": true, "isPerBatch": true, "pricePiece": 0, "priceKilo": 35, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "cloths": [{ "pricePiece": 0, "priceKilo": 35, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "648dd83da2138f52143b7d69", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "647d4350dfe2dd12e8aab028", "shop": "648dd69ba2138f52143b7cae", "name": "T-Shirt", "__v": 0 }, { "pricePiece": 0, "priceKilo": 35, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "648dd83da2138f52143b7d6d", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "647d4359dfe2dd12e8aab02b", "shop": "648dd69ba2138f52143b7cae", "name": "Pants", "__v": 0 }, { "pricePiece": 0, "priceKilo": 35, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "648dd83da2138f52143b7d71", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "647d4382dfe2dd12e8aab02e", "shop": "648dd69ba2138f52143b7cae", "name": "Shorts", "__v": 0 }, { "pricePiece": 0, "priceKilo": 35, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "648dd83da2138f52143b7d75", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "6481bbccebcbd72eb8ac154e", "shop": "648dd69ba2138f52143b7cae", "name": "Brep", "__v": 0 }, { "pricePiece": 0, "priceKilo": 35, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "648dd83da2138f52143b7d79", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "6481bbddebcbd72eb8ac1551", "shop": "648dd69ba2138f52143b7cae", "name": "Mantel", "__v": 0 }, { "pricePiece": 0, "priceKilo": 35, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "648dd83da2138f52143b7d7d", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "6481bc15ebcbd72eb8ac155a", "shop": "648dd69ba2138f52143b7cae", "name": "Socks", "__v": 0 }, { "pricePiece": 0, "priceKilo": 35, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "648dd83da2138f52143b7d81", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "6481bc25ebcbd72eb8ac155d", "shop": "648dd69ba2138f52143b7cae", "name": "Coat", "__v": 0 }, { "pricePiece": 0, "priceKilo": 35, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "648dd83da2138f52143b7d85", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "6481bc2cebcbd72eb8ac1560", "shop": "648dd69ba2138f52143b7cae", "name": "Jacket", "__v": 0 }, { "pricePiece": 0, "priceKilo": 35, "priceBatch": 100, "batchUnit": "kilo", "batchQty": 10, "isDeleted": false, "_id": "648dd83da2138f52143b7d89", "service": "647d4289dfe2dd12e8aaaff1", "cloth": "6481bc33ebcbd72eb8ac1563", "shop": "648dd69ba2138f52143b7cae", "name": "Sando", "__v": 0 }], "isDeleted": false, "_id": "648dd81da2138f52143b7d13", "service": "647d4289dfe2dd12e8aaaff1", "name": "Steam Iron" }, { "isPerPiece": false, "isPerKilo": true, "isPerBatch": true, "pricePiece": 0, "priceKilo": 35, "priceBatch": 110, "batchUnit": "kilo", "batchQty": 8, "cloths": [{ "pricePiece": 0, "priceKilo": 35, "priceBatch": 110, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7d8d", "service": "647d4289dfe2dd12e8aaaff4", "cloth": "647d4350dfe2dd12e8aab028", "shop": "648dd69ba2138f52143b7cae", "name": "T-Shirt", "__v": 0 }, { "pricePiece": 0, "priceKilo": 35, "priceBatch": 110, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7d91", "service": "647d4289dfe2dd12e8aaaff4", "cloth": "647d4359dfe2dd12e8aab02b", "shop": "648dd69ba2138f52143b7cae", "name": "Pants", "__v": 0 }, { "pricePiece": 0, "priceKilo": 35, "priceBatch": 110, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7d95", "service": "647d4289dfe2dd12e8aaaff4", "cloth": "647d4382dfe2dd12e8aab02e", "shop": "648dd69ba2138f52143b7cae", "name": "Shorts", "__v": 0 }, { "pricePiece": 0, "priceKilo": 35, "priceBatch": 110, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7d99", "service": "647d4289dfe2dd12e8aaaff4", "cloth": "6481bbccebcbd72eb8ac154e", "shop": "648dd69ba2138f52143b7cae", "name": "Brep", "__v": 0 }, { "pricePiece": 0, "priceKilo": 35, "priceBatch": 110, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7d9d", "service": "647d4289dfe2dd12e8aaaff4", "cloth": "6481bbddebcbd72eb8ac1551", "shop": "648dd69ba2138f52143b7cae", "name": "Mantel", "__v": 0 }, { "pricePiece": 0, "priceKilo": 35, "priceBatch": 110, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7da1", "service": "647d4289dfe2dd12e8aaaff4", "cloth": "6481bc15ebcbd72eb8ac155a", "shop": "648dd69ba2138f52143b7cae", "name": "Socks", "__v": 0 }, { "pricePiece": 0, "priceKilo": 35, "priceBatch": 110, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7da5", "service": "647d4289dfe2dd12e8aaaff4", "cloth": "6481bc25ebcbd72eb8ac155d", "shop": "648dd69ba2138f52143b7cae", "name": "Coat", "__v": 0 }, { "pricePiece": 0, "priceKilo": 35, "priceBatch": 110, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7da9", "service": "647d4289dfe2dd12e8aaaff4", "cloth": "6481bc2cebcbd72eb8ac1560", "shop": "648dd69ba2138f52143b7cae", "name": "Jacket", "__v": 0 }, { "pricePiece": 0, "priceKilo": 35, "priceBatch": 110, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7dad", "service": "647d4289dfe2dd12e8aaaff4", "cloth": "6481bc33ebcbd72eb8ac1563", "shop": "648dd69ba2138f52143b7cae", "name": "Sando", "__v": 0 }], "isDeleted": false, "_id": "648dd81da2138f52143b7d14", "service": "647d4289dfe2dd12e8aaaff4", "name": "Ironing" }, { "isPerPiece": false, "isPerKilo": true, "isPerBatch": true, "pricePiece": 0, "priceKilo": 15, "priceBatch": 150, "batchUnit": "kilo", "batchQty": 8, "cloths": [{ "pricePiece": 0, "priceKilo": 15, "priceBatch": 150, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7db1", "service": "647d4289dfe2dd12e8aaaff7", "cloth": "647d4350dfe2dd12e8aab028", "shop": "648dd69ba2138f52143b7cae", "name": "T-Shirt", "__v": 0 }, { "pricePiece": 0, "priceKilo": 15, "priceBatch": 150, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7db5", "service": "647d4289dfe2dd12e8aaaff7", "cloth": "647d4359dfe2dd12e8aab02b", "shop": "648dd69ba2138f52143b7cae", "name": "Pants", "__v": 0 }, { "pricePiece": 0, "priceKilo": 15, "priceBatch": 150, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7db9", "service": "647d4289dfe2dd12e8aaaff7", "cloth": "647d4382dfe2dd12e8aab02e", "shop": "648dd69ba2138f52143b7cae", "name": "Shorts", "__v": 0 }, { "pricePiece": 0, "priceKilo": 15, "priceBatch": 150, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7dbd", "service": "647d4289dfe2dd12e8aaaff7", "cloth": "6481bbccebcbd72eb8ac154e", "shop": "648dd69ba2138f52143b7cae", "name": "Brep", "__v": 0 }, { "pricePiece": 0, "priceKilo": 15, "priceBatch": 150, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7dc1", "service": "647d4289dfe2dd12e8aaaff7", "cloth": "6481bbddebcbd72eb8ac1551", "shop": "648dd69ba2138f52143b7cae", "name": "Mantel", "__v": 0 }, { "pricePiece": 0, "priceKilo": 15, "priceBatch": 150, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7dc5", "service": "647d4289dfe2dd12e8aaaff7", "cloth": "6481bc15ebcbd72eb8ac155a", "shop": "648dd69ba2138f52143b7cae", "name": "Socks", "__v": 0 }, { "pricePiece": 0, "priceKilo": 15, "priceBatch": 150, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7dc9", "service": "647d4289dfe2dd12e8aaaff7", "cloth": "6481bc25ebcbd72eb8ac155d", "shop": "648dd69ba2138f52143b7cae", "name": "Coat", "__v": 0 }, { "pricePiece": 0, "priceKilo": 15, "priceBatch": 150, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7dcd", "service": "647d4289dfe2dd12e8aaaff7", "cloth": "6481bc2cebcbd72eb8ac1560", "shop": "648dd69ba2138f52143b7cae", "name": "Jacket", "__v": 0 }, { "pricePiece": 0, "priceKilo": 15, "priceBatch": 150, "batchUnit": "kilo", "batchQty": 8, "isDeleted": false, "_id": "648dd83da2138f52143b7dd1", "service": "647d4289dfe2dd12e8aaaff7", "cloth": "6481bc33ebcbd72eb8ac1563", "shop": "648dd69ba2138f52143b7cae", "name": "Sando", "__v": 0 }], "isDeleted": false, "_id": "648dd81da2138f52143b7d15", "service": "647d4289dfe2dd12e8aaaff7", "name": "Dye" }], "addons": [{ "price": 12, "isDeleted": false, "isAvailable": true, "_id": "648dd74ba2138f52143b7cbf", "name": "Poweder", "description": "Tide poweder." }, { "price": 10, "isDeleted": false, "isAvailable": true, "_id": "648dd762a2138f52143b7cc5", "name": "Softener", "description": "Fabric Conditioner" }], "createdAt": "2023-06-17T15:51:55.924Z", "updatedAt": "2023-06-17T16:00:33.845Z", "__v": 5 }, "cloths": [{ "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "648dd83da2138f52143b7d21", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "647d4350dfe2dd12e8aab028", "shop": "648dd69ba2138f52143b7cae", "name": "T-Shirt", "__v": 0, "qty": 2 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "648dd83da2138f52143b7d25", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "647d4359dfe2dd12e8aab02b", "shop": "648dd69ba2138f52143b7cae", "name": "Pants", "__v": 0, "qty": 2 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "648dd83da2138f52143b7d29", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "647d4382dfe2dd12e8aab02e", "shop": "648dd69ba2138f52143b7cae", "name": "Shorts", "__v": 0, "qty": 2 }, { "pricePiece": 10, "priceKilo": 25, "priceBatch": 0, "batchUnit": "kilo", "batchQty": 0, "isDeleted": false, "_id": "648dd83da2138f52143b7d2d", "service": "647d4289dfe2dd12e8aaafeb", "cloth": "6481bbccebcbd72eb8ac154e", "shop": "648dd69ba2138f52143b7cae", "name": "Brep", "__v": 0, "qty": 1 }], "addons": [{ "price": 12, "isDeleted": false, "isAvailable": true, "_id": "648dd74ba2138f52143b7cbf", "name": "Poweder", "description": "Tide poweder.", "qty": 3 }, { "price": 10, "isDeleted": false, "isAvailable": true, "_id": "648dd762a2138f52143b7cc5", "name": "Softener", "description": "Fabric Conditioner", "qty": 2 }], "hasAddons": true, "totalService": 200, "deliveryOption": 0 }]

}

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

export default {
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
  addressLabels
};

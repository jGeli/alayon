import { constants } from '../constants';
import { decode } from "@mapbox/polyline"; //please install this package before running!
import { gapikey } from '../globals/env';
import axios from 'axios';


const isEmpty = string => {
  if (!string) return true;
  if (String(string).trim() === '') return true;
  else return false;
};

export const cutString = (str, len) => {
  let newStr = '';
  if (str) {
    newStr = String(str).slice(0, len);
    newStr = newStr + `${str.length > len ? '..' : ''}`;
  }

  return newStr;
};

export const validatePhone = phone => {
  let errorMsg = '';
  let isValid = false;
  if (String(phone).length !== 10) errorMsg = 'Invalid Phone Number';
  if (isEmpty(phone)) errorMsg = 'Phone cannot be Empty';

  if (errorMsg === '') {
    isValid = true;
  }

  return { isValid, errorMsg };
};

export const getFormattedPhone = phone => {
  let formattedPhone = '';

  formattedPhone = String(phone)
    .replace(/[-+()\s]/g, '')
    .substring(2, 12);

  return formattedPhone;
};


export const groupShopOrders = (data) => {
  let group = Object.entries(
    data.reduce((group, item) => {
      let fld = item.shop._id;
      group[fld] = group[fld] ?? {
        shop: item.shop,
        data: [],
        length: 0,
        deliveryOption: item.deliveryOption ? item.deliveryOption : null
      };

      group[fld].length++;
      group[fld].data.push(item);
      return group;
    }, {})
  ).map(([key, value]) => {
    return value;
  });
  return group;
};

export const groupPricing = (data) => {
  console.log(data, 'CLOTHSS')
  let group = Object.entries(
    data.reduce((group, item) => {

      // if (item.pricePiece) {
      group['Piece'] = group['Piece'] ?? {
        name: 'Piece',
        description: 'Price of laundry per piece.',
        range: [],
      };

      group['Piece'].range.push(item.pricePiece)
      // }


      // if (item.priceKilo) {

      group['Kilo'] = group['Kilo'] ?? {
        name: 'Kilo',
        description: 'Price of laundry per Kilo(1000g).',
        range: [],
      };

      group['Kilo'].range.push(item.priceKilo)
      // }

      // if (item.priceBatch) {


      group['Batch'] = group['Batch'] ?? {
        name: 'Batch/Load',
        description: 'Price of laundry per Batch or Load. Cannot be mix with blanket or carpet.',
        range: [],
      };

      group['Batch'].range.push(item.priceBatch)
      // }


      // group[fld].length++;
      // group[fld].data.push(item);
      return group;
    }, {})
  ).map(([key, value]) => {
    let price = '';
    let { highest, lowest } = findHighestAndLowest(value.range)
    if (highest === lowest || lowest === 0) {
      price = `For ${highest > 0 ? `₱${highest}` : 'Free'}`;
    } else {
      price = `From ₱${lowest} - ₱${highest}`
    }



    return { ...value, price }
  });
  return group;
};


export const totalOrders = (values) => {
  let grandTotal = 0;

  for (let orders of values) {
    let { shop, data, deliveryOption } = orders;

    let totalOrder = 0;

    let delivery = constants.deliveryOptions.find(a => a.id === deliveryOption)
    let deliveryOpt = delivery ? delivery : { price: 0 }


    for (let order of data) {
      let { pricing, qty, service, addons, cloths } = order;
      let totalService = 0;
      let totalAddons = 0;
      let price = 0
      const orderService = shop.services.find(a => a.service === service);


      if (orderService) {

        if (pricing === 'Kilo') {
          price = (orderService.priceKilo
            ? orderService.priceKilo
            : orderService.cloths[0].priceKilo)
          totalService += price * order.qty;

        }
        if (pricing === 'Batch') {
          price = (orderService.priceBatch
            ? orderService.priceBatch
            : orderService.cloths[0].priceBatch)
          totalService +=
            (orderService.priceBatch
              ? orderService.priceBatch
              : orderService.cloths[0].priceBatch) * order.qty;
        }

        if (pricing === 'Piece') {
          cloths.map((a, index) => {
            price = a.pricePiece;
            totalService += a.pricePiece * a.qty;
          });
        }

        addons.map((a, index) => {
          totalAddons += a.price * a.qty;
        });

        totalOrder += totalService + totalAddons;

      }



    }
    grandTotal += totalOrder + deliveryOpt.price;
  }

  return grandTotal;
};

export const statusIndexing = (status) => {

  let ind = [{ status: "pending", index: 0 }, { status: "shop_confirmed", index: 0 }, { status: "rider_confirmed", index: 1 }, { status: "rider_pickup", index: 1 }, { status: "shop_processing", index: 2 }, { status: "ready_pickup", index: 2 }, { status: "rider_delivery", index: 3 }, { status: "customer_received", index: 4 }, { status: "cancelled", index: 0 }, { status: "completed", index: 6 }, { status: "rate", index: 5 }].find(a => a.status == status)?.index
  return ind

}


export const getDirections = async (start, destination) => {
  try {
    const KEY = gapikey; //put your API key here.
    const startLoc = `${start.latitude},${start.longitude}`;
    const destinationLoc = `${destination.latitude},${destination.longitude}`
    console.log(startLoc, destinationLoc)
    //otherwise, you'll have an 'unauthorized' error.
    let resp = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`
    );

    let respJson = resp.data;
    let points = decode(respJson.routes[0].overview_polyline.points);
    console.log(points);
    let coords = points.map((point, index) => {
      return {
        latitude: point[0],
        longitude: point[1]
      };
    });
    return coords
  } catch (error) {
    return error;
  }
};


export const interpolatedPoint = (from, to, fraction) => {
  if (fraction < 0 || fraction > 1) {
    throw new Error('Fraction must be a number between 0 and 1 (inclusive).');
  }

  const latitude = from.latitude + (to.latitude - from.latitude) * fraction;
  const longitude = from.longitude + (to.longitude - from.longitude) * fraction;

  return { latitude, longitude };
}


export const computeHeading = (from, to) => {
  const fromLatRad = toRadians(from?.latitude);
  const toLatRad = toRadians(to?.latitude);
  const deltaLng = toRadians(to?.longitude - from?.longitude);

  const y = Math.sin(deltaLng) * Math.cos(toLatRad);
  const x =
    Math.cos(fromLatRad) * Math.sin(toLatRad) -
    Math.sin(fromLatRad) * Math.cos(toLatRad) * Math.cos(deltaLng);

  let heading = toDegrees(Math.atan2(y, x));
  heading = (heading + 360) % 360; // Convert to positive degrees

  return heading;
}

// Helper function to convert degrees to radians
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Helper function to convert radians to degrees
function toDegrees(radians) {
  return radians * (180 / Math.PI);
}

function findHighestAndLowest(numbers) {
  if (numbers.length === 0) {
    return { highest: undefined, lowest: undefined };
  }

  let highest = numbers[0];
  let lowest = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > highest) {
      highest = numbers[i];
    }
    if (numbers[i] < lowest) {
      lowest = numbers[i];
    }
  }

  return { highest, lowest };
}
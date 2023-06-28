import { constants } from '../constants';


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
        deliveryOption: item.deliveryOption
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
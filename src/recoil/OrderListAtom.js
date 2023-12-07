import { atom } from "recoil";
import { selector } from "recoil";

export const OrderListAtom = atom({
  key: "OrderListAtom",
  default: [],
});

export const TotalOrderPriceSelector = selector({
  key: "TotalOrderPriceSelector",
  get: ({ get }) => {
    const orderList = get(OrderListAtom);

    if (!Array.isArray(orderList) || orderList.length === 0) return 0;

    return orderList.reduce((acc, item) => {
      return acc + item.menuItemPrice * item.orderDetailQuantity;
    }, 0);
  },
});

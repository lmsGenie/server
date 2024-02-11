import couponService from "@/services/coupon.service";

interface IItem {
  price: number;
}

export const calculateTotalAmount = async (
  items: IItem[],
  couponCode?: string,
) => {
  let totalAmount = 0;

  for (const item of items) {
    totalAmount += Number(item.price);
  }

  if (couponCode) {
    const isValid = await couponService.validate(couponCode);

    if (isValid) {
      const applicableDiscount = await couponService.apply(
        couponCode,
        totalAmount,
      );

      totalAmount = applicableDiscount.amount;
    }
  }

  return totalAmount;
};

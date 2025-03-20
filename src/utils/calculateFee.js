import { formatToCurrency } from "./formatAmount";

export const calculateFee = (amount) => {
    let fee = amount ? amount?.toString()?.replaceAll('₦', '').replaceAll(',', '') : '';;

    fee = `${Math.ceil(fee)}.00`
    return formatToCurrency(fee)
}

export const calculateSharedValue = (totalValue, equityValue) => {
    return Number(totalValue) * (Number(equityValue) / 100);
};

export const percentagePaid = (totalAmount, amountPaid) => {
    let percentPaid;
    try {
        percentPaid = ((Number(amountPaid) / Number(totalAmount)) * 100).toFixed(2);
        return `${percentPaid}%`;
    } catch (error) {
        return '-';
    }
};
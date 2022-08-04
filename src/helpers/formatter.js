export function CardNumberFormatter(value) {
  return value
    .replace(/\s+/g, "")
    .split("")
    .map((v, i) => {
      if (i > 0 && i % 4 === 0) {
        return " " + v;
      }
      return v;
    })
    .join("");
}

export function ExpiryDateFormatter(value) {
  return value
    .replace(/[^0-9]/g, "")
    .replace(/^([2-9])$/g, "0$1")
    .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
    .replace(/^0{1,}/g, "0")
    .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
}

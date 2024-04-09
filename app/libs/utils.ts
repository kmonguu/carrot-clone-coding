export function priceKRFormatter(price: number) {
  return price.toLocaleString("ko-KR");
}

export function dateFormatter(date: string): string {
  const TIME_ZONE = 9 * 60 * 60 * 1000;

  const formattedDate = new Date(new Date(date).getTime() + TIME_ZONE)
    .toISOString()
    .split("T")[0];
  return formattedDate.toString();
}

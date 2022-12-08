export const formatNumber = (number: number) => {
    if (!number) return console.error("No Number!");
    const formatter = Intl.NumberFormat("en", {notation: "compact"});
    return formatter.format(number);
}

export const formatCurrency = (number: number, currency: string) => {
    if (!number) return console.error("No Number!");
    if (!currency) currency = "USD";
    const formatter = Intl.NumberFormat("en", {notation: "compact", style: "currency", currency: currency});
    return formatter.format(number);
}


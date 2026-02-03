import { useQuery } from "@tanstack/react-query";
import type { Settings } from "@shared/schema";

export function useSettings() {
  const { data: settings, isLoading } = useQuery<Settings>({
    queryKey: ["/api/settings"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const formatCurrency = (amount: string | number) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    const currency = settings?.currencySymbol || "₾";
    return `${numAmount.toLocaleString('ka-GE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
  };

  const defaultSettings = { 
    currency: "₾", 
    currencySymbol: "₾", 
    siteName: "QBIDS.GE", 
    language: "ka",
    headerTagline: "პენი-აუქციონები საქართველოში",
    footerDescription: "პირველი პენი-აუქციონის პლატფორმა საქართველოში. მოიგეთ პრემიუმ ნივთები ფრთხილებად ჩვენი სამართლიანი და გამჭვირვალე აუქციონის სისტემით."
  };
  const currentSettings = settings || defaultSettings;

  return {
    settings: currentSettings,
    isLoading,
    formatCurrency,
    siteName: currentSettings.siteName,
    currency: currentSettings.currency,
    currencySymbol: currentSettings.currencySymbol,
    language: currentSettings.language,
    headerTagline: currentSettings.headerTagline,
    footerDescription: currentSettings.footerDescription,
  };
}

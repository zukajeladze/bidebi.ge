import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/hooks/use-language';
import { useAuth } from '@/hooks/use-auth';
import { Header } from '@/components/header';
import { trackTopUp } from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Coins } from 'lucide-react';

// Bid packages data (prices only - titles/descriptions come from translations)
const bidPackages = [
  {
    id: 1,
    titleKey: 'package50Title' as const,
    descKey: 'package50Desc' as const,
    bids: 50,
    price: 5,
    originalPrice: 1000,
    savings: 250,
    popular: false,
  },
  {
    id: 2,
    titleKey: 'package100Title' as const,
    descKey: 'package100Desc' as const,
    bids: 100,
    price: 10,
    originalPrice: 2000,
    savings: 500,
    popular: false,
  },
  {
    id: 3,
    titleKey: 'package250Title' as const,
    descKey: 'package250Desc' as const,
    bids: 250,
    price: 20,
    originalPrice: 5000,
    savings: 1250,
    popular: true,
  },
  {
    id: 4,
    titleKey: 'package500Title' as const,
    descKey: 'package500Desc' as const,
    bids: 500,
    price: 40,
    originalPrice: 10000,
    savings: 2500,
    popular: false,
  },
  {
    id: 5,
    titleKey: 'package1000Title' as const,
    descKey: 'package1000Desc' as const,
    bids: 1000,
    price: 50,
    originalPrice: 20000,
    savings: 5000,
    popular: false,
  },
];

export default function TopUp() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Set page title
    document.title = `${t('topUpBalance')} - QBIDS.GE`;

    // Set viewport meta tag
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1';
      document.head.appendChild(meta);
    }

    // Set description meta tag
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', t('topUpPageSubtitle'));
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = t('topUpPageSubtitle');
      document.head.appendChild(meta);
    }
  }, [t]);

  const handleBuyPackage = (packageId: number) => {
    // Check if user is logged in
    if (!user) {
      toast({
        title: t('authRequired'),
        description: t('authRequiredDesc'),
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }

    // Find the package
    const selectedPackage = bidPackages.find((pkg) => pkg.id === packageId);
    if (selectedPackage) {
      // Track the purchase initiation
      trackTopUp(selectedPackage.price);
    }

    // Static Digiseller payment URLs with user ID passed as parameter
    const basePaymentUrls: { [key: number]: string } = {
      1: 'https://oplata.info/asp2/pay_wm.asp?id_d=5484776&lang=ru-RU',
      2: 'https://oplata.info/asp2/pay_wm.asp?id_d=5487610&lang=ru-RU',
      3: 'https://oplata.info/asp2/pay_wm.asp?id_d=5355203&lang=ru-RU',
      4: 'https://oplata.info/asp2/pay_wm.asp?id_d=5355213&lang=ru-RU',
      5: 'https://oplata.info/asp2/pay_wm.asp?id_d=5355214&lang=ru-RU',
    };

    const baseUrl = basePaymentUrls[packageId];
    if (baseUrl) {
      // Add user ID as custom parameter - Digiseller will pass it back in Through parameter
      const paymentUrl = `${baseUrl}&userid=${user.id}`;

      // Open Digiseller payment page in new tab
      window.open(paymentUrl, '_blank', 'noopener,noreferrer');

      // Show info message
      toast({
        title: t('paymentPageOpened'),
        description: t('paymentPageOpenedDesc'),
        duration: 7000,
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} ${t('currency') || 'GEL'}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <div className="max-w-[1504px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            {t('topUpBalance')}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('topUpPageSubtitle')}
          </p>
        </div>

        {/* Bid Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {bidPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-3xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                pkg.popular
                  ? 'border-gradient-to-r from-yellow-400 to-amber-500 ring-4 ring-yellow-100'
                  : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-1">
                    <span>&#11088;</span>
                    <span>{t('popularBadge')}</span>
                  </div>
                </div>
              )}

              <div className="p-6">
                {/* Gold Coins Icon */}
                <div className="w-24 h-24 mx-auto mb-6 relative flex items-center justify-center bg-gradient-to-br from-yellow-100 to-amber-200 rounded-full">
                  <Coins className="w-12 h-12 text-amber-600" />
                </div>

                {/* Package Title */}
                <h3 className="text-xl font-bold text-slate-900 text-center mb-2">
                  {t(pkg.titleKey)}
                </h3>

                {/* Bids Count */}
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {pkg.bids}
                  </div>
                  <div className="text-sm text-slate-500 font-medium">
                    {pkg.bids === 1 ? t('bidsSingular') : t('bidsPlural')}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 text-center mb-4">
                  {t(pkg.descKey)}
                </p>

                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-slate-900 mb-1">
                    {formatCurrency(pkg.price)}
                  </div>
                  <div className="text-sm text-slate-400 line-through">
                    {formatCurrency(pkg.originalPrice)}
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold mt-2">
                    {t('savings')} {formatCurrency(pkg.savings)}
                  </div>
                </div>

                {/* Buy Button */}
                <Button
                  onClick={() => handleBuyPackage(pkg.id)}
                  className={`w-full h-12 rounded-xl font-semibold transition-all duration-200 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white shadow-lg'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                  }`}
                >
                  <i className="fas fa-shopping-cart mr-2"></i>
                  {t('buyNow')}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-shield-alt text-green-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {t('securePayment')}
            </h3>
            <p className="text-slate-600">{t('securePaymentDesc')}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-bolt text-blue-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {t('instantCredit')}
            </h3>
            <p className="text-slate-600">{t('instantCreditDesc')}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-headset text-purple-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {t('support247')}
            </h3>
            <p className="text-slate-600">{t('support247Desc')}</p>
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">
            {t('howItWorksTopUp')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                1
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {t('step1TopUp')}
              </h3>
              <p className="text-slate-600">{t('step1TopUpDesc')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                2
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {t('step2TopUp')}
              </h3>
              <p className="text-slate-600">{t('step2TopUpDesc')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                3
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {t('step3TopUp')}
              </h3>
              <p className="text-slate-600">{t('step3TopUpDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

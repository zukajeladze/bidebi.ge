import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import { XCircle } from 'lucide-react';

export default function PaymentCancel() {
  const { t } = useLanguage();
  const [, navigate] = useLocation();

  useEffect(() => {
    document.title = `${t('paymentCancelled')} - bidebi.ge`;
  }, [t]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          {/* Cancel Icon */}
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-16 h-16 text-orange-600" />
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Оплата отменена
          </h1>

          {/* Message */}
          <p className="text-lg text-slate-600 mb-8">
            Вы отменили процесс оплаты. Не беспокойтесь, с вашего счета не было
            списано средств.
          </p>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <i className="fas fa-question-circle text-blue-600 text-xl mt-1"></i>
              <div className="text-left">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Нужна помощь?
                </h3>
                <p className="text-sm text-slate-600 mb-2">
                  Если у вас возникли проблемы с оплатой, наша служба поддержки
                  всегда готова помочь.
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>📧 Email: info@bidebi.ge</li>
                  <li>📱 Телефон: +7 (495) 123-4567</li>
                  <li>💬 Онлайн-чат доступен 24/7</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/topup')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
            >
              <i className="fas fa-redo mr-2"></i>
              Попробовать снова
            </Button>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="px-8 py-3 rounded-xl font-semibold"
            >
              <i className="fas fa-home mr-2"></i>
              На главную
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

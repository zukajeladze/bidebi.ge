import { useDocumentTitle } from "@/hooks/use-document-title";
import { Header } from "@/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Support() {
  useDocumentTitle("მხარდაჭერის სამსახური - QBIDS.GE | დახმარება და მხარდაჭერა");

  const supportMethods = [
    {
      icon: "fas fa-envelope",
      title: "ელექტრონული ფოსტა",
      description: "მოგვწერეთ ელ-ფოსტაზე დეტალური დახმარების მისაღებად",
      contact: "support@qbids.ge",
      responseTime: "24 საათის განმავლობაში",
      action: "დაკავშირება",
      color: "blue"
    },
    {
      icon: "fab fa-whatsapp",
      title: "WhatsApp",
      description: "სწრაფი დახმარება WhatsApp მესენჯერის საშუალებით",
      contact: "+995 593 09 00 00",
      responseTime: "სამუშაო საათებში",
      action: "დაკავშირება",
      color: "green"
    },
    {
      icon: "fab fa-telegram",
      title: "Telegram",
      description: "დაგვიკავშირდით Telegram-ის საშუალებით ოპერატიული მხარდაჭერისთვის",
      contact: "@qbids_support",
      responseTime: "სამუშაო საათებში",
      action: "დაკავშირება",
      color: "blue"
    }
  ];

  const faqItems = [
    {
      question: "როგორ დავიწყო აუქციონებში მონაწილეობა?",
      answer: "დარეგისტრირდით საიტზე, შეავსეთ ფსონების ბალანსი და აირჩიეთ თქვენთვის საინტერესო აუქციონი. თითოეული ფსონი ღირს ერთი ფსონი."
    },
    {
      question: "რა არის პენი-აუქციონი?",
      answer: "პენი-აუქციონი არის აუქციონის ტიპი, სადაც პროდუქტის ფასი იზრდება მცირე თანხით ყოველი ფსონის შემდეგ, ხოლო აუქციონის დრო გრძელდება."
    },
    {
      question: "როგორ შევავსო ფსონების ბალანსი?",
      answer: "გადადით თქვენს პროფილში და აირჩიეთ 'ბალანსის შევსება'. ხელმისაწვდომია გადახდის სხვადასხვა საშუალებები: საბანკო ბარათები, ელექტრონული საფულეები."
    },
    {
      question: "რა ხდება აუქციონში გამარჯვების შემთხვევაში?",
      answer: "გილოცავთ! გამარჯვების შემდეგ თქვენთან დაკავშირდება ჩვენი მხარდაჭერის სამსახური პროდუქტის მიწოდების ან მიღების ორგანიზებისთვის."
    },
    {
      question: "შესაძლებელია თუ არა დახარჯული ფსონების დაბრუნება?",
      answer: "აუქციონის დროს დახარჯული ფსონები არ ბრუნდება. ეს არის პენი-აუქციონების სტანდარტული წესი."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-[1504px] mx-auto py-8 px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-headset text-white text-3xl"></i>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">მხარდაჭერის სამსახური</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ჩვენ მზად ვართ დაგეხმაროთ ნებისმიერ დროს. აირჩიეთ კომუნიკაციის სასურველი საშუალება ან იპოვეთ პასუხები ხშირად დასმულ კითხვებზე.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {supportMethods.map((method, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow" data-testid={`card-support-${method.title.toLowerCase()}`}>
              <CardHeader>
                <div className={`w-16 h-16 bg-${method.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <i className={`${method.icon} text-${method.color}-600 text-2xl`}></i>
                </div>
                <CardTitle className="text-xl">{method.title}</CardTitle>
                <CardDescription>{method.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900" data-testid={`text-contact-${index}`}>{method.contact}</p>
                  <p className="text-sm text-gray-600">{method.responseTime}</p>
                  <Button className="w-full mt-4" variant="outline" data-testid={`button-contact-${index}`}>
                    {method.action}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <i className="fas fa-question-circle text-blue-600 mr-3"></i>
              ხშირად დასმული კითხვები
            </CardTitle>
            <CardDescription>
              პასუხები ყველაზე პოპულარულ კითხვებზე QBIDS.GE-ს მუშაობის შესახებ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} data-testid={`faq-item-${index}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                  {index < faqItems.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Working Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <i className="fas fa-clock text-blue-600 mr-3"></i>
              მხარდაჭერის სამუშაო საათები
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">ონლაინ მხარდაჭერა</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>ორშაბათი - პარასკევი:</span>
                    <span className="font-medium">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>შაბათი:</span>
                    <span className="font-medium">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>კვირა:</span>
                    <span className="font-medium">დასვენება</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">ელ-ფოსტის მხარდაჭერა</h3>
                <div className="space-y-2 text-gray-600">
                  <p>მუშაობს 24/7</p>
                  <p>პასუხი 24 საათის განმავლობაში</p>
                  <p>კვირის ყველა დღე</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

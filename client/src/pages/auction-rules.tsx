import { useDocumentTitle } from "@/hooks/use-document-title";
import { useSettings } from "@/hooks/use-settings";
import { useLanguage } from "@/hooks/use-language";
import { Header } from "@/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function AuctionRules() {
  useDocumentTitle("აუქციონის წესები - QBIDS.GE | პენი-აუქციონების პირობები");
  const { formatCurrency } = useSettings();
  const { t } = useLanguage();

  const rulesSections = [
    {
      icon: "fas fa-play-circle",
      title: "როგორ დავიწყოთ მონაწილეობა",
      color: "green",
      rules: [
        "დარეგისტრირდით QBIDS.GE-ზე",
        "შეავსეთ ფსონების ბალანსი მოსახერხებელი გადახდის მეთოდით",
        "აირჩიეთ სასურველი აუქციონი",
        "დაელოდეთ აუქციონის დაწყებას და დაიწყეთ ფსონების დადება"
      ]
    },
    {
      icon: "fas fa-gavel",
      title: "ფსონების წესები",
      color: "blue",
      rules: [
        "თითოეული ფსონი ღირს 1 ფსონი თქვენი ბალანსიდან",
        "ფსონი ზრდის პროდუქტის ფასს 0.01 ₾-ით",
        "აუქციონის დრო გრძელდება 10-15 წამით ყოველი ფსონის შემდეგ",
        "ფსონების გაუქმება შეუძლებელია მათი განთავსების შემდეგ",
        "მინიმალური ინტერვალი ერთი მომხმარებლის ფსონებს შორის - 1 წამი"
      ]
    },
    {
      icon: "fas fa-trophy",
      title: "გამარჯვებულის განსაზღვრა",
      color: "yellow",
      rules: [
        "იმარჯვებს მომხმარებელი, რომელმაც ბოლო ფსონი დადო",
        "აუქციონი სრულდება, როდესაც ტაიმერი მიაღწევს 0-ს",
        "გამარჯვებული იხდის პროდუქტის საბოლოო ფასს",
        "პროდუქტი რეზერვირებულია გამარჯვებულისთვის 48 საათის განმავლობაში",
        "შესყიდვაზე უარის თქმის შემთხვევაში პროდუქტი გადადის წინა მონაწილეზე"
      ]
    },
    {
      icon: "fas fa-coins",
      title: "ფსონები და გადახდა",
      color: "orange",
      rules: [
        "ფსონები ჩამოიჭრება ფსონის განთავსებისთანავე",
        "დახარჯული ფსონები არ ბრუნდება შედეგის მიუხედავად",
        "მინიმალური შესყიდვა - 10 ფსონი",
        "ფსონები მოქმედებს 365 დღის განმავლობაში შეძენის მომენტიდან",
        "გამოუყენებელი ფსონები არ ექვემდებარება ფულად ანაზღაურებას"
      ]
    }
  ];

  const prohibitedActions = [
    "ავტომატური პროგრამებისა და ბოტების გამოყენება",
    "ერთი მომხმარებლის მიერ მრავალი ანგარიშის შექმნა",
    "საიტის გატეხვის ან მუშაობის დარღვევის მცდელობები",
    "შეურაცხმყოფელი ქცევა სხვა მონაწილეების მიმართ",
    "თაღლითობის ან სისტემის მოტყუების მცდელობები",
    "ანგარიშის გაყიდვა ან გადაცემა მესამე პირებზე"
  ];

  const deliveryRules = [
    {
      title: "თვითგატანა",
      description: "უფასოდ ოფისიდან თბილისში",
      time: "სამუშაო დღეებში 9:00-დან 18:00-მდე"
    },
    {
      title: "მიწოდება თბილისში",
      description: "კურიერის მიწოდება",
      time: "10 ლარი, 1-2 სამუშაო დღე"
    },
    {
      title: "მიწოდება საქართველოს რეგიონებში",
      description: "საქართველოს ფოსტა ან სატრანსპორტო კომპანიები",
      time: "15-25 ლარი, 2-3 სამუშაო დღე"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-[1504px] mx-auto py-8 px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-balance-scale text-white text-3xl"></i>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4" data-testid="heading-rules">აუქციონის წესები</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            გაეცანით პენი-აუქციონების წესებს და მონაწილეობის პირობებს
          </p>
        </div>

        {/* Main Rules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {rulesSections.map((section, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow" data-testid={`card-rules-${index}`}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className={`w-12 h-12 bg-${section.color}-100 rounded-lg flex items-center justify-center mr-4`}>
                    <i className={`${section.icon} text-${section.color}-600 text-xl`}></i>
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.rules.map((rule, ruleIndex) => (
                    <li key={ruleIndex} className="flex items-start" data-testid={`rule-${index}-${ruleIndex}`}>
                      <i className="fas fa-check-circle text-green-500 mr-3 mt-1 flex-shrink-0"></i>
                      <span className="text-gray-700">{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Prohibited Actions */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <i className="fas fa-ban mr-3"></i>
              აკრძალული ქმედებები
            </CardTitle>
            <CardDescription>
              ამ წესების დარღვევა გამოიწვევს ანგარიშის დაბლოკვას თანხის დაბრუნების გარეშე
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prohibitedActions.map((action, index) => (
                <div key={index} className="flex items-start p-3 bg-red-50 rounded-lg border border-red-100" data-testid={`prohibited-${index}`}>
                  <i className="fas fa-times-circle text-red-500 mr-3 mt-1 flex-shrink-0"></i>
                  <span className="text-red-700">{action}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Delivery Rules */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <i className="fas fa-shipping-fast text-blue-600 mr-3"></i>
              მიწოდების წესები
            </CardTitle>
            <CardDescription>
              მოგებული პროდუქტების მიღების პირობები
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {deliveryRules.map((delivery, index) => (
                <div key={index} className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow" data-testid={`delivery-${index}`}>
                  <h3 className="font-semibold text-gray-900 mb-2">{delivery.title}</h3>
                  <p className="text-gray-600 mb-2">{delivery.description}</p>
                  <Badge variant="outline" className="text-sm">
                    {delivery.time}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <i className="fas fa-exclamation-triangle text-yellow-600 mr-3"></i>
              მნიშვნელოვანი შენიშვნები
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg" data-testid="note-responsibility">
                <h3 className="font-semibold text-yellow-800 mb-2">მონაწილის პასუხისმგებლობა</h3>
                <p className="text-yellow-700">
                  აუქციონებში მონაწილეობით თქვენ ეთანხმებით, რომ გესმით პენი აუქციონების მუშაობის პრინციპი და იღებთ შესაძლო რისკებს.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg" data-testid="note-support">
                <h3 className="font-semibold text-blue-800 mb-2">ტექნიკური მხარდაჭერა</h3>
                <p className="text-blue-700">
                  აუქციონის დროს ტექნიკური პრობლემების შემთხვევაში დაუყოვნებლივ დაუკავშირდით მხარდაჭერის სამსახურს. კომპენსაცია შესაძლებელია მხოლოდ დადასტურებული ტექნიკური პრობლემების შემთხვევაში.
                </p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg" data-testid="note-fairplay">
                <h3 className="font-semibold text-green-800 mb-2">სამართლიანი თამაში</h3>
                <p className="text-green-700">
                  QBIDS.GE ცდილობს უზრუნველყოს სამართლიანი და გამჭვირვალე აუქციონები ყველა მონაწილისთვის. ჩვენ მუდმივად ვაკონტროლებთ სისტემას თაღლითობის თავიდან ასაცილებლად.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

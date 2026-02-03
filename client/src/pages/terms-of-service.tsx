import { useDocumentTitle } from "@/hooks/use-document-title";
import { Header } from "@/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function TermsOfService() {
  useDocumentTitle("მომსახურების პირობები - QBIDS.GE | მომხმარებლის შეთანხმება");

  const termsSections = [
    {
      title: "1. საერთო წესები - რა არის პენი-აუქციონი",
      content: [
        "პენი-აუქციონი არის ონლაინ აუქციონის სპეციალური ფორმატი, სადაც მონაწილეები ('მომხმარებლები') აკეთებენ ბიდებს (დადებენ ფსონს) მცირე საფასურის გადახდით, ხოლო ყოველი ბიდი ზრდის საქონლის ფასს მცირე ოდენობით (როგორც წესი 1 თეთრით).",
        "აუქციონის გამარჯვებულია ის მომხმარებელი, ვინც ბოლო ბიდს განათავსებს დადგენილ ვადაში.",
        "აუცილებლად აღსანიშნავია, რომ მომხმარებლებს არ აქვთ უფლება შექმნან საკუთარი აუქციონები. აუქციონებზე საქონლის განთავსება შეუძლია მხოლოდ საიტის ოპერატორს ('ოპერატორი'), რომელიც უზრუნველყოფს პროცესის სანდოობას და გამჭვირვალობას.",
        "ეს წესები რეგულირებს ურთიერთობებს საიტის ოპერატორს (შემდგომ — 'ოპერატორი', 'საიტი') და მომხმარებელს (შემდგომ — 'მომხმარებელი'), რომელიც გამოიყენებს საიტსა და მის სერვისებს."
      ]
    },
    {
      title: "2. ზოგადი პირობები",
      content: [
        "საიტის გამოყენება ნიშნავს, რომ მომხმარებელმა წაიკითხა და მიიღო წესები. თუ მომხმარებელი არ ეთანხმება წესებს, ის ვალდებულია შეწყვიტოს საიტის გამოყენება.",
        "ოპერატორს აქვს უფლება შეცვალოს წესები. ცვლილებები იდება საიტზე და ძალაში შედის გამოქვეყნებიდან, თუ სხვა არ არის მითითებული.",
        "QBIDS.GE არის პენი-აუქციონების პლატფორმა საქართველოში, რომელიც უზრუნველყოფს გამჭვირვალე და სანდო აუქციონების ჩატარებას.",
        "სერვისი საშუალებას აძლევს მომხმარებლებს მონაწილეობა მიიღონ აუქციონებში, განათავსონ ფსონები და შეიძინონ პროდუქტები მომგებიანი ფასებით."
      ]
    },
    {
      title: "3. მომხმარებლის უფლებები",
      content: [
        "სანდო ინფორმაციის მიღების უფლება - მომხმარებელს აქვს უფლება მიიღოს სრული, ზუსტი და დროული ინფორმაცია პროდუქციის, სერვისების, აუქციონის პირობების, ფასებისა და სხვა მნიშვნელოვანი საკითხების შესახებ.",
        "ყველა პროდუქტი, რომელიც აუქციონზეა წარმოდგენილი, სრულიად შეესაბამება თავის აღწერილობას, რადგან პლატფორმა იღებს აღწერებს იმ ტექნიკის მაღაზიებიდან, სადაც თავად ყიდულობს ამ პროდუქტებს.",
        "თუ აღმოჩნდება, რომ პროდუქტი არ შეესაბამება აღწერილობას, მომხმარებელს უფლება აქვს მიმართოს მხარდაჭერის სამსახურს და მოითხოვოს საქონლის გაცვლა ან მის მიერ დახარჯული ბიდების დაბრუნება ანგარიშის ბალანსზე.",
        "პროდუქცია და სერვისები უნდა შეესაბამებოდეს აღწერილობას და საქართველოს კანონმდებლობით დადგენილ სტანდარტებს."
      ]
    },
    {
      title: "4. უსაფრთხოება და მონაწილეობის პირობები",
      content: [
        "პროდუქცია არ უნდა საფრთხობდეს მომხმარებლის სიცოცხლეს, ჯანმრთელობას ან ქონებას.",
        "მომხმარებელს შეუძლია თავისუფლად მონაწილეობა აუქციონებში, თუ შეესაბამება საიტის წესებს და საქართველოს კანონმდებლობას.",
        "მომხმარებლის პირადი მონაცემები დაცულია საქართველოს 'პირადი მონაცემების დაცვის შესახებ' კანონის მიხედვით.",
        "მომხმარებელს აქვს უფლება ითხოვოს მონაცემების წაშლა, შეცვლა და სხვა უფლებები."
      ]
    },
    {
      title: "5. მიწოდების პირობები",
      content: [
        "თუ მომხმარებელი არის თბილისში — უფასო მიწოდებას ახორციელებენ ოპერატორის თანამშრომლები.",
        "თუ მომხმარებელი არის რეგიონებში — მიწოდება ხორციელდება საქართველოს ფოსტის მეშვეობით მოქმედი წესების შესაბამისად.",
        "იმ შემთხვევაში, თუ კურიერმა ვერ მიაწოდა გამარჯვებული პროდუქტი და გამარჯვებულს იგი არ მიუღია, პასუხისმგებლობას სრულად იღებს პლატფორმა.",
        "მომხმარებელს შეუძლია მიმართოს მხარდაჭერის სამსახურს ან საქართველოს შესაბამის ორგანოებს, თუ მისი უფლებები დარღვეულია."
      ]
    },
    {
      title: "6. პასუხისმგებლობა და სპეციალური პირობები",
      content: [
        "მომხმარებელი ვალდებულია გამოიყენოს მხოლოდ კანონიერი, საკუთარ ან უფლებამოსილების მქონე პირის მიერ ნებადართული გადახდის საშუალებები (ბარათები, ანგარიშები და ა.შ.).",
        "ოპერატორი არ აგებს პასუხისმგებლობას იმ შემთხვევაში, თუ მომსახურება შეძენილია მოპარული, მოჩვენებითი ან არასანქცირებული გადახდის საშუალებით.",
        "მომხმარებელი თავად არის პასუხისმგებელი გადახდის საშუალების ლეგიტიმურობაზე.",
        "ოპერატორს აქვს უფლება შეწყვიტოს ან გააუქმოს მომსახურება, თუ არსებობს საფუძვლიანი ეჭვი უკანონო ქმედებაზე."
      ]
    }
  ];

  const prohibitions = [
    "ავტომატური პროგრამებისა და სკრიპტების გამოყენება",
    "საიტის გატეხვის ან მუშაობის დარღვევის მცდელობები",
    "მავნე კონტენტის განთავსება",
    "თაღლითური ქმედებები და სხვა მომხმარებლების მოტყუება",
    "მესამე პირთა საავტორო უფლებების დარღვევა",
    "სპამისა და რეკლამის გავრცელება",
    "შეურაცხმყოფელი ქცევა სხვა მომხმარებლების მიმართ",
    "საიტის ტექნიკური შეზღუდვების გვერდის ავლის მცდელობები"
  ];

  const liabilityItems = [
    {
      title: "პასუხისმგებლობის შეზღუდვა",
      description: "QBIDS.GE არ არის პასუხისმგებელი არაპირდაპირ ზარალზე, მიუღებელ შემოსავალზე ან მორალურ ზიანზე."
    },
    {
      title: "პროდუქტების ხარისხი",
      description: "ადმინისტრაცია ცდილობს მიაწოდოს ზუსტი ინფორმაცია პროდუქტების შესახებ, მაგრამ არ იძლევა შეცდომების არარსებობის გარანტიას."
    },
    {
      title: "ტექნიკური შეფერხებები",
      description: "ტექნიკური პრობლემების შემთხვევაში ადმინისტრაცია იღებს ზომებს მათ უმოკლეს ვადებში აღმოსაფხვრელად."
    },
    {
      title: "მომხმარებელთა ქმედებები",
      description: "თითოეული მომხმარებელი პირადად არის პასუხისმგებელი თავის ქმედებებზე პლატფორმაზე."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-[1504px] mx-auto py-8 px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-file-contract text-white text-3xl"></i>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4" data-testid="heading-terms">მომსახურების პირობები</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            მომხმარებლის შეთანხმება განსაზღვრავს QBIDS.GE პლატფორმის გამოყენების წესებსა და პირობებს.
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>ძალაში შევიდა: 01.01.2025</span>
            <Separator orientation="vertical" className="h-4" />
            <span>ბოლო განახლება: 10/29/2025</span>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8 mb-12">
          {termsSections.map((section, index) => (
            <Card key={index} data-testid={`section-${index}`}>
              <CardHeader>
                <CardTitle className="text-xl">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Prohibited Actions */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <i className="fas fa-exclamation-triangle mr-3"></i>
              აკრძალული ქმედებები
            </CardTitle>
            <CardDescription>
              შემდეგი ქმედებები მკაცრად აკრძალულია და შეიძლება გამოიწვიოს ანგარიშის დაბლოკვა
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prohibitions.map((prohibition, index) => (
                <div key={index} className="flex items-start p-3 bg-red-50 rounded-lg border border-red-100" data-testid={`prohibition-${index}`}>
                  <i className="fas fa-times-circle text-red-500 mr-3 mt-1 flex-shrink-0"></i>
                  <span className="text-red-700 text-sm">{prohibition}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Liability and Warranties */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <i className="fas fa-balance-scale text-blue-600 mr-3"></i>
              პასუხისმგებლობა და გარანტიები
            </CardTitle>
            <CardDescription>
              მნიშვნელოვანი ინფორმაცია პასუხისმგებლობის შეზღუდვებისა და გარანტიების შესახებ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {liabilityItems.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow" data-testid={`liability-${index}`}>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dispute Resolution */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <i className="fas fa-handshake text-green-600 mr-3"></i>
              დავების გადაწყვეტა
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">სასამართლომდელი მოგვარება</h3>
                <p className="text-blue-700 text-sm">
                  ყველა დავა პირველ რიგში განიხილება მოლაპარაკებების გზით. კონფლიქტური სიტუაციების გადასაჭრელად მიმართეთ მხარდაჭერის სამსახურს.
                </p>
              </div>
              
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">გამოსაყენებელი სამართალი</h3>
                <p className="text-orange-700 text-sm">
                  ეს პირობები რეგულირდება საქართველოს კანონმდებლობით. დავები განიხილება საქართველოს სასამართლოებში.
                </p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">მიმართვის ვადები</h3>
                <p className="text-green-700 text-sm">
                  პრეტენზიები უნდა გაიგზავნოს სადავო სიტუაციის წარმოშობიდან 30 დღის განმავლობაში.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact and Changes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-envelope text-blue-600 mr-3"></i>
                საკონტაქტო ინფორმაცია
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600" data-testid="contact-email">
                  <i className="fas fa-envelope w-5 mr-3"></i>
                  <span>legal@qbids.ge</span>
                </div>
                <div className="flex items-center text-gray-600" data-testid="contact-phone">
                  <i className="fas fa-phone w-5 mr-3"></i>
                  <span>+995 593 09 00 00</span>
                </div>
                <div className="flex items-center text-gray-600" data-testid="contact-location">
                  <i className="fas fa-map-marker-alt w-5 mr-3"></i>
                  <span>თბილისი, საქართველო</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-edit text-purple-600 mr-3"></i>
                პირობების ცვლილებები
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600">
                <p>ადმინისტრაციას უფლება აქვს შეცვალოს მომსახურების პირობები ნებისმიერ დროს.</p>
                <p>ცვლილებები ძალაში შედის საიტზე გამოქვეყნებისთანავე.</p>
                <p>სერვისის გამოყენების გაგრძელება ნიშნავს თანხმობას ახალ პირობებზე.</p>
                <Badge variant="outline" className="mt-2">
                  ვერსია 1.0
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

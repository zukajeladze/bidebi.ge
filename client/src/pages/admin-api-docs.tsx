import { Header } from "@/components/header";
import { useAuth } from "@/hooks/use-auth";
import { useLocation, Link } from "wouter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export default function AdminApiDocs() {
  const { isAdmin, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      setLocation("/");
    }
  }, [isAdmin, isLoading, setLocation]);

  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const baseUrl = "https://qbids.ge";

  const EndpointCard = ({ 
    method, 
    endpoint, 
    title, 
    description, 
    auth = false,
    requestBody,
    responseExample,
    headers
  }: { 
    method: string;
    endpoint: string;
    title: string;
    description: string;
    auth?: boolean;
    requestBody?: any;
    responseExample?: any;
    headers?: Record<string, string>;
  }) => {
    const methodColor = {
      GET: "bg-green-100 text-green-700 border-green-300",
      POST: "bg-blue-100 text-blue-700 border-blue-300",
      PUT: "bg-yellow-100 text-yellow-700 border-yellow-300",
      PATCH: "bg-orange-100 text-orange-700 border-orange-300",
      DELETE: "bg-red-100 text-red-700 border-red-300",
    }[method];

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4 hover:shadow-md transition-shadow" data-testid={`api-endpoint-${endpoint}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-md text-sm font-bold border ${methodColor}`}>
                {method}
              </span>
              <code className="text-sm bg-gray-100 px-3 py-1 rounded font-mono text-gray-800">
                {endpoint}
              </code>
              {auth && (
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded border border-purple-300">
                  🔒 Auth Required
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-600 mt-1">{description}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(`${baseUrl}${endpoint}`, endpoint)}
            className="ml-2"
            data-testid={`button-copy-${endpoint}`}
          >
            {copiedEndpoint === endpoint ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        {headers && (
          <div className="mt-4">
            <h4 className="font-semibold text-sm text-gray-700 mb-2">Headers:</h4>
            <div className="bg-gray-50 rounded p-3 text-sm font-mono">
              {Object.entries(headers).map(([key, value]) => (
                <div key={key} className="text-gray-800">
                  <span className="text-blue-600">{key}</span>: {value}
                </div>
              ))}
            </div>
          </div>
        )}

        {requestBody && (
          <div className="mt-4">
            <h4 className="font-semibold text-sm text-gray-700 mb-2">Request Body:</h4>
            <pre className="bg-gray-900 text-gray-100 rounded p-3 text-xs overflow-x-auto">
              {JSON.stringify(requestBody, null, 2)}
            </pre>
          </div>
        )}

        {responseExample && (
          <div className="mt-4">
            <h4 className="font-semibold text-sm text-gray-700 mb-2">Response Example:</h4>
            <pre className="bg-gray-900 text-gray-100 rounded p-3 text-xs overflow-x-auto">
              {JSON.stringify(responseExample, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-[1504px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/admin">
            <Button variant="ghost" className="mb-4" data-testid="button-back-admin">
              <i className="fas fa-arrow-left mr-2"></i>
              Назад к панели администратора
            </Button>
          </Link>

          <h1 className="text-3xl font-bold text-slate-900">
            <i className="fas fa-code text-blue-600 mr-3"></i>
            API Documentation
          </h1>
          <p className="text-slate-600 mt-2">
            Полная документация REST API для мобильных приложений
          </p>

          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Base URL</h3>
            <code className="text-sm bg-white px-3 py-2 rounded border border-blue-200 inline-block">
              {baseUrl}
            </code>
          </div>
        </div>

        {/* Authentication Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <i className="fas fa-lock mr-3 text-blue-600"></i>
            Аутентификация
          </h2>

          {/* JWT Authentication Guide */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center">
              <i className="fas fa-key mr-2"></i>
              JWT Token Authentication (Рекомендуется для мобильных приложений)
            </h3>
            <p className="text-gray-700 mb-4">
              API поддерживает два метода аутентификации:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded p-4 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">🍪 Cookie-Based (Session)</h4>
                <p className="text-sm text-gray-600">Для веб-приложений. Автоматическая обработка сессий через cookies.</p>
              </div>
              <div className="bg-white rounded p-4 border border-indigo-200">
                <h4 className="font-semibold text-gray-900 mb-2">🔑 JWT Token (Stateless)</h4>
                <p className="text-sm text-gray-600">Для мобильных приложений. Токены в заголовке Authorization.</p>
              </div>
            </div>
            
            <h4 className="font-semibold text-gray-800 mb-2">Как использовать JWT:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 mb-4">
              <li>Вызовите <code className="bg-gray-800 text-white px-2 py-1 rounded text-xs">POST /api/auth/login</code> или <code className="bg-gray-800 text-white px-2 py-1 rounded text-xs">POST /api/auth/register</code></li>
              <li>Получите <code className="bg-gray-800 text-white px-2 py-1 rounded text-xs">accessToken</code> и <code className="bg-gray-800 text-white px-2 py-1 rounded text-xs">refreshToken</code></li>
              <li>Сохраните токены в безопасном хранилище (Keychain, SharedPreferences)</li>
              <li>Добавляйте заголовок ко всем защищенным запросам: <code className="bg-gray-800 text-white px-2 py-1 rounded text-xs">Authorization: Bearer {"{accessToken}"}</code></li>
              <li>Когда accessToken истечет (через 1 час), используйте <code className="bg-gray-800 text-white px-2 py-1 rounded text-xs">POST /api/auth/refresh</code> с refreshToken</li>
            </ol>

            <div className="bg-gray-900 rounded p-4">
              <p className="text-xs text-gray-400 mb-2">Пример запроса с JWT:</p>
              <pre className="text-xs text-green-400">
{`GET /api/users/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json`}
              </pre>
            </div>
          </div>
          
          <EndpointCard
            method="POST"
            endpoint="/api/auth/register"
            title="Регистрация пользователя"
            description="Создание новой учетной записи пользователя. Возвращает user data + JWT tokens"
            headers={{
              "Content-Type": "application/json",
              "Accept-Language": "ka | ru | en"
            }}
            requestBody={{
              username: "johndoe",
              email: "john@example.com",
              password: "securePassword123",
              phone: "+995593090000",
              firstName: "John",
              lastName: "Doe"
            }}
            responseExample={{
              user: {
                id: "550e8400-e29b-41d4-a716-446655440000",
                username: "johndoe",
                email: "john@example.com",
                role: "user",
                bidBalance: 5
              },
              tokens: {
                accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                tokenType: "Bearer",
                expiresIn: 3600
              }
            }}
          />

          <EndpointCard
            method="POST"
            endpoint="/api/auth/login"
            title="Вход в систему"
            description="Аутентификация пользователя с помощью username и password. Возвращает user data + JWT tokens"
            headers={{
              "Content-Type": "application/json",
              "Accept-Language": "ka | ru | en"
            }}
            requestBody={{
              username: "johndoe",
              password: "securePassword123"
            }}
            responseExample={{
              user: {
                id: "550e8400-e29b-41d4-a716-446655440000",
                username: "johndoe",
                email: "john@example.com",
                role: "user",
                bidBalance: 50,
                phone: "+995593090000"
              },
              tokens: {
                accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                tokenType: "Bearer",
                expiresIn: 3600
              }
            }}
          />

          <EndpointCard
            method="POST"
            endpoint="/api/auth/validate-username"
            title="Проверка username"
            description="Проверить доступность имени пользователя"
            requestBody={{
              username: "johndoe"
            }}
            responseExample={{
              available: true
            }}
          />

          <EndpointCard
            method="POST"
            endpoint="/api/auth/validate-email"
            title="Проверка email"
            description="Проверить доступность email адреса"
            requestBody={{
              email: "john@example.com"
            }}
            responseExample={{
              available: true
            }}
          />

          <EndpointCard
            method="POST"
            endpoint="/api/auth/validate-phone"
            title="Проверка телефона"
            description="Проверить доступность номера телефона"
            headers={{
              "Content-Type": "application/json"
            }}
            requestBody={{
              phone: "+995593090000"
            }}
            responseExample={{
              valid: true,
              message: "Phone number is available"
            }}
          />

          <EndpointCard
            method="POST"
            endpoint="/api/auth/send-otp"
            title="Отправить OTP код"
            description="Отправить 4-значный OTP код верификации на указанный номер телефона через SMS (SMSOffice). Код действителен 10 минут. Возвращает verificationId для stateless проверки (работает с мобильными приложениями без сессий)."
            headers={{
              "Content-Type": "application/json",
              "Accept-Language": "ka | ru | en"
            }}
            requestBody={{
              phone: "+995593090000"
            }}
            responseExample={{
              success: true,
              message: "OTP sent successfully",
              verificationId: "550e8400-e29b-41d4-a716-446655440000",
              expiresIn: 600
            }}
          />

          <EndpointCard
            method="POST"
            endpoint="/api/auth/verify-otp"
            title="Проверить OTP код"
            description="Верифицировать 4-значный OTP код используя verificationId от send-otp. Stateless проверка с использованием hashed OTP кодов в базе данных. Работает для веб (сессии) и мобильных приложений (JWT tokens). После успешной верификации используйте verificationId для регистрации."
            headers={{
              "Content-Type": "application/json",
              "Accept-Language": "ka | ru | en"
            }}
            requestBody={{
              verificationId: "550e8400-e29b-41d4-a716-446655440000",
              code: "1234",
              phone: "+995593090000"
            }}
            responseExample={{
              success: true,
              message: "Phone number verified successfully",
              verifiedPhone: "+995593090000"
            }}
          />

          <EndpointCard
            method="POST"
            endpoint="/api/auth/register"
            title="Регистрация пользователя"
            description="Создать новый аккаунт. Для мобильных приложений: отправьте verificationId от verify-otp для подтверждения телефона. Для веб: телефон проверяется через сессию. Возвращает JWT токены для stateless аутентификации."
            headers={{
              "Content-Type": "application/json",
              "Accept-Language": "ka | ru | en"
            }}
            requestBody={{
              username: "user123",
              email: "user@example.com",
              phone: "+995593090000",
              password: "securePassword123",
              verificationId: "550e8400-e29b-41d4-a716-446655440000"
            }}
            responseExample={{
              user: {
                id: "user-uuid",
                username: "user123",
                bidBalance: 5,
                role: "user"
              },
              tokens: {
                accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                tokenType: "Bearer",
                expiresIn: 3600
              }
            }}
          />

          <EndpointCard
            method="GET"
            endpoint="/api/auth/me"
            title="Получить текущего пользователя"
            description="Получить информацию о залогиненном пользователе"
            auth={true}
            responseExample={{
              id: "550e8400-e29b-41d4-a716-446655440000",
              username: "johndoe",
              email: "john@example.com",
              role: "user",
              bidsBalance: 50,
              phone: "+995593090000"
            }}
          />

          <EndpointCard
            method="POST"
            endpoint="/api/auth/refresh"
            title="Обновить Access Token"
            description="Получить новый access token используя refresh token (для продления сессии без повторного логина)"
            headers={{
              "Content-Type": "application/json"
            }}
            requestBody={{
              refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            }}
            responseExample={{
              tokens: {
                accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                tokenType: "Bearer",
                expiresIn: 3600
              }
            }}
          />

          <EndpointCard
            method="POST"
            endpoint="/api/auth/logout"
            title="Выход из системы"
            description="Завершить текущую сессию пользователя (только для session-based auth)"
            auth={true}
            responseExample={{
              success: true
            }}
          />
        </section>

        {/* Auctions Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <i className="fas fa-gavel mr-3 text-blue-600"></i>
            Аукционы
          </h2>

          <EndpointCard
            method="GET"
            endpoint="/api/auctions"
            title="Получить список аукционов"
            description="Получить все аукционы с фильтрацией по статусу"
            responseExample={{
              live: [
                {
                  id: 1,
                  title: "iPhone 15 Pro",
                  description: "Новый iPhone 15 Pro 256GB",
                  imageUrl: "https://example.com/iphone.jpg",
                  retailPrice: "4500.00",
                  currentPrice: "12.40",
                  status: "active",
                  startTime: "2025-01-15T10:00:00Z",
                  endTime: "2025-01-15T11:00:00Z",
                  bidIncrement: "0.20",
                  timerDuration: 30,
                  currentBidder: {
                    id: "user123",
                    username: "winner99"
                  },
                  bidsCount: 62
                }
              ],
              upcoming: [],
              finished: []
            }}
          />

          <EndpointCard
            method="GET"
            endpoint="/api/auctions/:id"
            title="Получить аукцион по ID"
            description="Получить детальную информацию об аукционе"
            responseExample={{
              id: 1,
              title: "iPhone 15 Pro",
              description: "Новый iPhone 15 Pro 256GB",
              retailPrice: "4500.00",
              currentPrice: "12.40",
              status: "active",
              bidsCount: 62
            }}
          />

          <EndpointCard
            method="GET"
            endpoint="/api/auctions/slug/:slug"
            title="Получить аукцион по slug"
            description="Получить детальную информацию об аукционе по URL slug"
            responseExample={{
              id: 1,
              slug: "iphone-15-pro-256gb",
              title: "iPhone 15 Pro",
              description: "Новый iPhone 15 Pro 256GB",
              status: "active"
            }}
          />

          <EndpointCard
            method="POST"
            endpoint="/api/auctions/:id/bid"
            title="Сделать ставку"
            description="Разместить ставку на аукционе"
            auth={true}
            requestBody={{}}
            responseExample={{
              success: true,
              newPrice: "12.60",
              newBidsBalance: 49,
              bid: {
                id: 123,
                auctionId: 1,
                userId: "user123",
                amount: "12.60",
                timestamp: "2025-01-15T10:30:45Z"
              }
            }}
          />

          <EndpointCard
            method="POST"
            endpoint="/api/auctions/:id/prebid"
            title="Сделать пребид"
            description="Разместить автоматическую ставку на предстоящий аукцион"
            auth={true}
            requestBody={{}}
            responseExample={{
              success: true,
              prebid: {
                id: 456,
                auctionId: 1,
                userId: "user123",
                timestamp: "2025-01-15T09:30:00Z"
              }
            }}
          />

          <EndpointCard
            method="GET"
            endpoint="/api/auctions/:id/bids"
            title="Получить ставки аукциона"
            description="Получить историю ставок конкретного аукциона"
            responseExample={[
              {
                id: 123,
                auctionId: 1,
                userId: "user123",
                username: "winner99",
                amount: "12.60",
                timestamp: "2025-01-15T10:30:45Z"
              }
            ]}
          />

          <EndpointCard
            method="GET"
            endpoint="/api/auctions/:id/stats"
            title="Статистика аукциона"
            description="Получить статистику по аукциону"
            responseExample={{
              totalBids: 62,
              uniqueBidders: 15,
              averageBidTime: 8.5,
              topBidders: [
                { username: "winner99", bidsCount: 12 },
                { username: "bidmaster", bidsCount: 8 }
              ]
            }}
          />

          <EndpointCard
            method="GET"
            endpoint="/api/timers"
            title="Таймеры всех аукционов (Real-Time)"
            description="Получить детальную информацию о таймерах для всех аукционов (upcoming, live, finished). Возвращает время до старта, оставшееся время и время с момента завершения."
            responseExample={{
              timestamp: "2025-11-11T19:35:42.123Z",
              auctions: [
                {
                  auctionId: "39e1be82-1a58-42af-a634-3",
                  title: "iPhone 15 Pro 256GB",
                  status: "upcoming",
                  startTime: "2025-11-11T21:30:00.000Z",
                  endTime: null,
                  currentPrice: 0.20,
                  retailPrice: 4899.00,
                  imageUrl: "https://images.unsplash.com/photo-...",
                  timeUntilStart: 7258,
                  timeLeft: 0,
                  timeSinceEnded: 0,
                  isActive: false,
                  hasStarted: false,
                  hasEnded: false
                },
                {
                  auctionId: "live-auction-123",
                  title: "MacBook Air M3",
                  status: "live",
                  startTime: "2025-11-11T19:00:00.000Z",
                  endTime: null,
                  currentPrice: 45.60,
                  retailPrice: 5499.00,
                  imageUrl: "https://images.unsplash.com/photo-...",
                  timeUntilStart: 0,
                  timeLeft: 8,
                  timeSinceEnded: 0,
                  isActive: true,
                  hasStarted: true,
                  hasEnded: false
                },
                {
                  auctionId: "finished-auction-456",
                  title: "iPad Pro 12.9\"",
                  status: "finished",
                  startTime: "2025-11-11T10:00:00.000Z",
                  endTime: "2025-11-11T10:15:30.000Z",
                  currentPrice: 45.80,
                  retailPrice: 4299.00,
                  imageUrl: "https://images.unsplash.com/photo-...",
                  timeUntilStart: 0,
                  timeLeft: 0,
                  timeSinceEnded: 33012,
                  isActive: false,
                  hasStarted: true,
                  hasEnded: true
                }
              ]
            }}
          />
        </section>

        {/* User Profile Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <i className="fas fa-user mr-3 text-blue-600"></i>
            Профиль пользователя
          </h2>

          <EndpointCard
            method="GET"
            endpoint="/api/users/profile"
            title="Получить профиль"
            description="Получить информацию профиля текущего пользователя"
            auth={true}
            responseExample={{
              id: "user123",
              username: "johndoe",
              email: "john@example.com",
              phone: "+995593090000",
              fullName: "John Doe",
              bidsBalance: 50,
              role: "user"
            }}
          />

          <EndpointCard
            method="PUT"
            endpoint="/api/users/profile"
            title="Обновить профиль"
            description="Обновить информацию профиля пользователя"
            auth={true}
            requestBody={{
              fullName: "John Doe Updated",
              phone: "+995593090001",
              email: "newemail@example.com"
            }}
            responseExample={{
              id: "user123",
              username: "johndoe",
              fullName: "John Doe Updated",
              phone: "+995593090001",
              email: "newemail@example.com"
            }}
          />

          <EndpointCard
            method="GET"
            endpoint="/api/users/stats"
            title="Статистика пользователя"
            description="Получить статистику участия пользователя"
            auth={true}
            responseExample={{
              totalBids: 145,
              auctionsWon: 3,
              auctionsParticipated: 28,
              totalSpent: "₾29.00"
            }}
          />

          <EndpointCard
            method="GET"
            endpoint="/api/users/won-auctions"
            title="Выигранные аукционы"
            description="Получить список выигранных аукционов"
            auth={true}
            responseExample={[
              {
                id: 5,
                title: "Samsung Galaxy S24",
                wonAt: "2025-01-10T14:30:00Z",
                finalPrice: "₾18.40",
                retailPrice: "₾3200.00"
              }
            ]}
          />

          <EndpointCard
            method="GET"
            endpoint="/api/users/recent-bids"
            title="Последние ставки"
            description="Получить последние ставки пользователя"
            auth={true}
            responseExample={[
              {
                id: 789,
                auctionId: 1,
                auctionTitle: "iPhone 15 Pro",
                amount: "₾12.60",
                timestamp: "2025-01-15T10:30:45Z"
              }
            ]}
          />
        </section>

        {/* Bids Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <i className="fas fa-list mr-3 text-blue-600"></i>
            Ставки
          </h2>

          <EndpointCard
            method="GET"
            endpoint="/api/bids/recent"
            title="Последние ставки"
            description="Получить последние ставки по всем аукционам"
            responseExample={[
              {
                id: 123,
                auctionId: 1,
                username: "winner99",
                amount: "₾12.60",
                timestamp: "2025-01-15T10:30:45Z"
              }
            ]}
          />

          <EndpointCard
            method="GET"
            endpoint="/api/bids/user"
            title="Ставки пользователя"
            description="Получить все ставки текущего пользователя"
            auth={true}
            responseExample={[
              {
                id: 123,
                auctionId: 1,
                auctionTitle: "iPhone 15 Pro",
                amount: "₾12.60",
                timestamp: "2025-01-15T10:30:45Z"
              }
            ]}
          />

          <EndpointCard
            method="GET"
            endpoint="/api/prebids/user"
            title="Пребиды пользователя"
            description="Получить все автоматические ставки пользователя"
            auth={true}
            responseExample={[
              {
                id: 456,
                auctionId: 2,
                auctionTitle: "MacBook Pro M3",
                timestamp: "2025-01-15T09:30:00Z"
              }
            ]}
          />
        </section>

        {/* WebSocket Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <i className="fas fa-broadcast-tower mr-3 text-purple-600"></i>
            WebSocket (Socket.IO)
          </h2>

          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
            <h3 className="text-lg font-semibold mb-3">Подключение к WebSocket</h3>
            <code className="text-sm bg-gray-900 text-gray-100 px-4 py-2 rounded block mb-4">
              const socket = io("{baseUrl}");
            </code>

            <h4 className="font-semibold text-sm text-gray-700 mb-2 mt-4">События от сервера:</h4>
            <ul className="space-y-2">
              <li className="bg-gray-50 p-3 rounded">
                <code className="text-blue-600">auction:update</code> - Обновление аукциона (новая ставка, таймер)
              </li>
              <li className="bg-gray-50 p-3 rounded">
                <code className="text-blue-600">auction:ended</code> - Аукцион завершен
              </li>
              <li className="bg-gray-50 p-3 rounded">
                <code className="text-blue-600">bid:placed</code> - Новая ставка размещена
              </li>
              <li className="bg-gray-50 p-3 rounded">
                <code className="text-blue-600">timer:tick</code> - Обновление таймера
              </li>
            </ul>

            <h4 className="font-semibold text-sm text-gray-700 mb-2 mt-4">События от клиента:</h4>
            <ul className="space-y-2">
              <li className="bg-gray-50 p-3 rounded">
                <code className="text-green-600">join:auction</code> - Присоединиться к аукциону
                <pre className="text-xs mt-2 bg-gray-900 text-gray-100 p-2 rounded">
socket.emit("join:auction", {"{"}auctionId: 1{"}"});
                </pre>
              </li>
              <li className="bg-gray-50 p-3 rounded">
                <code className="text-green-600">leave:auction</code> - Покинуть аукцион
                <pre className="text-xs mt-2 bg-gray-900 text-gray-100 p-2 rounded">
socket.emit("leave:auction", {"{"}auctionId: 1{"}"});
                </pre>
              </li>
            </ul>
          </div>
        </section>

        {/* Error Handling */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <i className="fas fa-exclamation-circle mr-3 text-orange-600"></i>
            Обработка ошибок
          </h2>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-3">HTTP Status Codes</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded font-mono text-sm">200</span>
                <span>OK - Успешный запрос</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded font-mono text-sm">201</span>
                <span>Created - Ресурс создан</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded font-mono text-sm">400</span>
                <span>Bad Request - Неверные данные</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded font-mono text-sm">401</span>
                <span>Unauthorized - Требуется авторизация</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded font-mono text-sm">403</span>
                <span>Forbidden - Нет прав доступа</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded font-mono text-sm">404</span>
                <span>Not Found - Ресурс не найден</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded font-mono text-sm">500</span>
                <span>Internal Server Error - Ошибка сервера</span>
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3">Формат ошибок</h3>
            <pre className="bg-gray-900 text-gray-100 rounded p-4 text-xs">
{JSON.stringify({
  error: "Описание ошибки",
  message: "Детальное сообщение"
}, null, 2)}
            </pre>
          </div>
        </section>

        {/* Multilingual Support */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <i className="fas fa-language mr-3 text-green-600"></i>
            Поддержка языков
          </h2>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-700 mb-4">
              API поддерживает мультиязычные сообщения об ошибках. Используйте заголовок <code className="bg-gray-100 px-2 py-1 rounded">Accept-Language</code>:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <code className="bg-gray-100 px-3 py-1 rounded text-sm">ka</code>
                <span>Грузинский (по умолчанию)</span>
              </li>
              <li className="flex items-center gap-3">
                <code className="bg-gray-100 px-3 py-1 rounded text-sm">ru</code>
                <span>Русский</span>
              </li>
              <li className="flex items-center gap-3">
                <code className="bg-gray-100 px-3 py-1 rounded text-sm">en</code>
                <span>Английский</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

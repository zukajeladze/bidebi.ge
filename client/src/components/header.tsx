import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useSettings } from "@/hooks/use-settings";
import { useLanguage } from "@/hooks/use-language";
import { Link, useLocation } from "wouter";
import { AuthModal } from "@/components/auth-modal";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useSocket } from "@/hooks/use-socket";

export function Header() {
  const { user, isAuthenticated, logout, refetch } = useAuth();
  const { settings } = useSettings();
  const { t } = useLanguage();
  const [location, setLocation] = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { socket } = useSocket();

  // Listen for bid balance updates
  useEffect(() => {
    if (!socket || !isAuthenticated || !user) return;

    const handleBidBalanceUpdate = (data: { userId: string; newBalance: number }) => {
      if (data.userId === user.id) {
        // Refetch user data to get updated bid balance
        refetch();
      }
    };

    socket.on("bidBalanceUpdate", handleBidBalanceUpdate);

    return () => {
      socket.off("bidBalanceUpdate", handleBidBalanceUpdate);
    };
  }, [socket, isAuthenticated, user, refetch]);

  const handleLogout = () => {
    logout();
    setLocation("/");
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { href: "/", icon: "fas fa-home", label: t("home") },
    { href: "/auctions", icon: "fas fa-gavel", label: t("auctions") },
    { href: "/how-it-works", icon: "fas fa-question-circle", label: t("howItWorks") },
  ];

  return (
    <>
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-[1504px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                <i className="fas fa-gavel text-white text-lg"></i>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-white">
                  {settings?.siteName || "QBIDS.GE"}
                </h1>
                <p className="text-xs text-gray-300">
                  {settings?.headerTagline || "პენი-აუქციონები საქართველოში"}
                </p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-xl font-bold text-white">{settings?.siteName || "QBIDS.GE"}</h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${
                    location === item.href 
                      ? "bg-blue-600 text-white shadow-md" 
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  data-testid={`link-${item.label.toLowerCase()}`}
                >
                  <i className={`${item.icon} mr-2 text-xs`}></i>
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop User Section */}
            <div className="hidden lg:flex items-center space-x-4">
              {isAuthenticated && user ? (
                <>
                  {/* Balance and Top Up */}
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-2 rounded-xl shadow-md">
                      <div className="flex items-center space-x-2 text-sm">
                        <i className="fas fa-coins text-blue-300"></i>
                        <span className="font-semibold text-white" data-testid="text-bid-balance">{user.bidBalance} {t("bids")}</span>
                      </div>
                    </div>
                    <Link href="/topup">
                      <Button 
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                        data-testid="button-topup"
                      >
                        <i className="fas fa-plus mr-2 text-xs"></i>
                        {t("topUpBalance")}
                      </Button>
                    </Link>
                  </div>

                  {/* Username with Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-blue-400 rounded-xl h-11 px-4 transition-all" data-testid="button-user-menu">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <i className="fas fa-user text-white text-xs"></i>
                          </div>
                          <span className="font-semibold text-white" data-testid="text-username">{user.username}</span>
                          <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-gray-800 border-gray-700">
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center cursor-pointer text-gray-300 hover:text-white hover:bg-gray-700" data-testid="link-profile">
                          <i className="fas fa-user mr-2 text-blue-400"></i>
                          {t("profile")}
                        </Link>
                      </DropdownMenuItem>
                      {user?.role === 'admin' && (
                        <DropdownMenuItem asChild>
                          <Link href="/admin" className="flex items-center cursor-pointer text-gray-300 hover:text-white hover:bg-gray-700" data-testid="link-admin">
                            <i className="fas fa-cog mr-2 text-blue-400"></i>
                            {t("adminPanel")}
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator className="bg-gray-700" />
                      <DropdownMenuItem 
                        onClick={handleLogout}
                        className="text-red-400 hover:text-red-300 hover:bg-gray-700 cursor-pointer"
                        data-testid="button-logout"
                      >
                        <i className="fas fa-sign-out-alt mr-2"></i>
                        {t("logout")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg rounded-lg h-10 px-6 font-medium transition-all duration-200"
                  data-testid="button-login"
                >
                  <i className="fas fa-sign-in-alt mr-2 text-sm"></i>
                  {t("login")}
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden text-white hover:bg-gray-700" data-testid="button-mobile-menu">
                  <i className="fas fa-bars text-xl"></i>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0 bg-gray-800 border-gray-700">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <SheetHeader className="p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                        <i className="fas fa-gavel text-white text-xl"></i>
                      </div>
                      <div>
                        <SheetTitle className="text-white text-xl font-bold">{settings?.siteName || "QBIDS.GE"}</SheetTitle>
                        <p className="text-gray-300 text-sm">
                          {settings?.language === "ru" && "Пენი-აუქციონები"}
                          {settings?.language === "en" && "Penny Auctions"}
                          {settings?.language === "ka" && "პენი აუქციონები"}
                          {!settings?.language && "პენი აუქციონები"}
                        </p>
                      </div>
                    </div>
                  </SheetHeader>

                  {/* User Section */}
                  <div className="p-6">
                    {isAuthenticated && user ? (
                      <div className="space-y-4">
                        {/* User Info */}
                        <Link href="/profile" onClick={handleNavClick}>
                          <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-xl border border-gray-600 hover:border-blue-400 hover:bg-gray-600 transition-all duration-200 cursor-pointer">
                            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                              <i className="fas fa-user text-white text-lg"></i>
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-white">{user.username}</p>
                              <div className="flex items-center space-x-2 text-sm text-gray-300">
                                <i className="fas fa-coins text-blue-400"></i>
                                <span>{user.bidBalance} {t("bids")}</span>
                              </div>
                            </div>
                            <i className="fas fa-chevron-right text-gray-400"></i>
                          </div>
                        </Link>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-green-900 bg-opacity-30 border border-green-700 rounded-lg text-center">
                            <i className="fas fa-trophy text-green-400 text-lg mb-1"></i>
                            <p className="text-xs text-gray-400">{t("wonAuctions")}</p>
                            <p className="font-semibold text-green-400">0</p>
                          </div>
                          <div className="p-3 bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg text-center">
                            <i className="fas fa-gavel text-blue-400 text-lg mb-1"></i>
                            <p className="text-xs text-gray-400">{t("bids")}</p>
                            <p className="font-semibold text-blue-400">-</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-center p-6 bg-gray-700 rounded-xl border border-gray-600">
                          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                            <i className="fas fa-user text-white text-2xl"></i>
                          </div>
                          <h3 className="font-semibold text-white mb-2">
                            {settings?.language === "ru" && "Добро пожаловать!"}
                            {settings?.language === "en" && "Welcome!"}
                            {settings?.language === "ka" && "კეთილი იყოს თქვენი მობრძანება!"}
                            {!settings?.language && "კეთილი იყოს თქვენი მობრძანება!"}
                          </h3>
                          <p className="text-sm text-gray-300 mb-4">
                            {settings?.language === "ru" && "Войдите, чтобы начать участвовать в аукционах"}
                            {settings?.language === "en" && "Login to start participating in auctions"}
                            {settings?.language === "ka" && "შედით აუქციონებში მონაწილეობისთვის"}
                            {!settings?.language && "შედით აუქციონებში მონაწილეობისთვის"}
                          </p>
                          <Button 
                            onClick={() => {
                              setShowAuthModal(true);
                              setIsMobileMenuOpen(false);
                            }}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                          >
                            <i className="fas fa-sign-in-alt mr-2"></i>
                            {t("login")} / {t("register")}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator className="bg-gray-700" />

                  {/* Navigation */}
                  <div className="flex-1 p-6">
                    <nav className="space-y-2">
                      {navItems.map((item) => (
                        <Link key={item.href} href={item.href} onClick={handleNavClick}>
                          <div className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                            location === item.href 
                              ? "bg-blue-600 text-white shadow-md" 
                              : "hover:bg-gray-700 text-gray-300"
                          }`}>
                            <i className={`${item.icon} w-5 text-sm`}></i>
                            <span className="font-medium">{item.label}</span>
                            {location === item.href && (
                              <i className="fas fa-chevron-right ml-auto text-white"></i>
                            )}
                          </div>
                        </Link>
                      ))}
                    </nav>

                    {/* Top Up Link for authenticated users */}
                    {isAuthenticated && (
                      <>
                        <Separator className="my-4 bg-gray-700" />
                        <div className="space-y-2">
                          <Link href="/topup" onClick={handleNavClick}>
                            <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-900 bg-opacity-30 hover:bg-opacity-50 text-green-300 border border-green-700 hover:border-green-500 transition-all duration-200">
                              <i className="fas fa-plus w-5 text-sm"></i>
                              <span className="font-medium">{t("topUpBalance")}</span>
                              <i className="fas fa-chevron-right ml-auto text-green-500"></i>
                            </div>
                          </Link>
                        </div>
                      </>
                    )}

                    {isAuthenticated && user?.role === 'admin' && (
                      <>
                        <Separator className="my-4 bg-gray-700" />
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide px-3">{t("admin")}</h4>
                          <Link href="/admin" onClick={handleNavClick}>
                            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 text-gray-300 transition-all duration-200">
                              <i className="fas fa-cog w-5 text-sm"></i>
                              <span className="font-medium">{t("controlPanel")}</span>
                            </div>
                          </Link>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Footer Actions */}
                  {isAuthenticated && (
                    <div className="p-6 border-t border-gray-700 bg-gray-900">
                      <Button 
                        variant="outline" 
                        onClick={handleLogout}
                        className="w-full border-red-600 text-red-400 hover:bg-red-900 hover:bg-opacity-30 hover:border-red-500 rounded-lg h-11"
                      >
                        <i className="fas fa-sign-out-alt mr-2"></i>
                        {t("logoutFromAccount")}
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={() => {
          refetch();
          setShowAuthModal(false);
        }}
      />
    </>
  );
}

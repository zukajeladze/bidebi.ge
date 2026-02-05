import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import { useSettings } from "@/hooks/use-settings";
import { apiRequest } from "@/lib/queryClient";
import type { Auction } from "@/types/auction";

interface BidDetail {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  bidAmount: string;
  createdAt: string;
  isBot: boolean;
}

interface AuctionStats {
  totalBids: number;
  botBids: number;
  userBids: number;
  adminBids: number;
  bids: BidDetail[];
}

export default function AdminFinishedAuctions() {
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const { formatCurrency } = useSettings();
  const queryClient = useQueryClient();
  
  const { data: finishedAuctions = [], isLoading } = useQuery<Auction[]>({
    queryKey: ["/api/admin/finished-auctions"],
  });

  const { data: auctionStats, isLoading: statsLoading } = useQuery<AuctionStats>({
    queryKey: ["/api/admin/auction-stats", selectedAuction?.id],
    enabled: !!selectedAuction?.id,
  });

  const deleteAuctionMutation = useMutation({
    mutationFn: async (auctionId: string) => {
      return apiRequest("DELETE", `/api/admin/auctions/${auctionId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/finished-auctions"] });
      toast({
        title: t("success"),
        description: t("auctionDeleted"),
      });
    },
    onError: (error: any) => {
      toast({
        title: t("error"),
        description: error.message || t("auctionDeleteError"),
        variant: "destructive",
      });
    },
  });

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const localeMap = {
      'ru': 'ru-RU',
      'en': 'en-US', 
      'ka': 'ka-GE'
    };
    return date.toLocaleString(localeMap[language as keyof typeof localeMap] || 'en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-[1504px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">{t("loadingAuctions")}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-[1504px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <i className="fas fa-trophy mr-3"></i>
            {t("finishedAuctions")}
          </h1>
          <p className="text-gray-600">{t("viewFinishedAuctions")}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <i className="fas fa-list mr-2"></i>
                {t("listFinishedAuctions")}
              </div>
              <Badge variant="secondary" className="text-sm">
                {t("total")}: {finishedAuctions.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("image")}</TableHead>
                    <TableHead>{t("title")}</TableHead>
                    <TableHead>{t("finalPrice")}</TableHead>
                    <TableHead>{t("retailPrice")}</TableHead>
                    <TableHead>{t("winner")}</TableHead>
                    <TableHead>{t("endTime")}</TableHead>
                    <TableHead>{t("savings")}</TableHead>
                    <TableHead>{t("actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {finishedAuctions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12 text-gray-500">
                        <div className="flex flex-col items-center">
                          <i className="fas fa-trophy text-gray-300 text-4xl mb-4"></i>
                          <h3 className="text-lg font-medium mb-2">{t("noFinishedAuctions")}</h3>
                          <p className="text-sm">{t("finishedAuctionsWillAppear")}</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    finishedAuctions
                      .sort((a, b) => new Date(b.endTime || b.createdAt).getTime() - new Date(a.endTime || a.createdAt).getTime())
                      .map((auction) => {
                        const savings = parseFloat(auction.retailPrice) - parseFloat(auction.currentPrice);
                        const savingsPercent = ((savings / parseFloat(auction.retailPrice)) * 100).toFixed(1);
                        
                        return (
                          <TableRow key={auction.id}>
                            <TableCell>
                                  <img
                                    src={auction.imageUrl}
                                    alt={auction.title}
                                    className="w-16 h-16 rounded-lg object-cover"
                                  />
                                </TableCell>
                                <TableCell className="font-medium">
                                  <div>
                                    <div className="font-semibold text-gray-900">{auction.title}</div>
                                    <div className="text-sm text-gray-500 max-w-xs truncate">
                                      {auction.description}
                                    </div>
                                    {auction.displayId && (
                                      <div className="text-xs text-blue-600 font-mono mt-1">
                                        {auction.displayId}
                                      </div>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <span className="font-bold text-green-600 text-lg">
                                    {formatCurrency(auction.currentPrice)}
                                  </span>
                                </TableCell>
                                <TableCell className="text-gray-600">
                                  <span className="line-through">
                                    {formatCurrency(auction.retailPrice)}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                                      <i className="fas fa-crown text-white text-sm"></i>
                                    </div>
                                    <div>
                                      <div className="font-medium text-gray-900">
                                        {auction.winner?.username || t("unknown")}
                                      </div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="text-sm text-gray-600">
                                  {formatDateTime(auction.endTime || auction.createdAt)}
                                </TableCell>
                                <TableCell>
                                  <div className="text-right">
                                    <div className="font-bold text-green-600">
                                      -{formatCurrency(savings)}
                                    </div>
                                    <div className="text-xs text-green-500">
                                      -{savingsPercent}%
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        setSelectedAuction(auction);
                                        setIsModalOpen(true);
                                      }}
                                    >
                                      <i className="fas fa-eye mr-2"></i>
                                      {t("view")}
                                    </Button>
                                    
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button
                                          size="sm"
                                          variant="destructive"
                                          disabled={deleteAuctionMutation.isPending}
                                        >
                                          <i className="fas fa-trash mr-2"></i>
                                          {t("delete")}
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>{t("confirmDelete")}</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            {t("deleteAuctionConfirm").replace("{title}", auction.title)}
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={() => deleteAuctionMutation.mutate(auction.id)}
                                            disabled={deleteAuctionMutation.isPending}
                                            className="bg-red-600 hover:bg-red-700"
                                          >
                                            {deleteAuctionMutation.isPending ? t("deleting") : t("delete")}
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                </TableCell>
                              </TableRow>
                        );
                      })
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Auction Details Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <i className="fas fa-chart-bar mr-2"></i>
                {t("auctionStats")}: {selectedAuction?.title}
              </DialogTitle>
            </DialogHeader>
            
            {statsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-3"></div>
                <span>{t("loadingStats")}</span>
              </div>
            ) : auctionStats ? (
              <div className="space-y-6">
                {/* Overview Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{auctionStats.totalBids}</div>
                      <div className="text-sm text-gray-600">{t("totalBids")}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">{auctionStats.botBids}</div>
                      <div className="text-sm text-gray-600">{t("botBids")}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{auctionStats.userBids}</div>
                      <div className="text-sm text-gray-600">{t("userBids")}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">{auctionStats.adminBids}</div>
                      <div className="text-sm text-gray-600">{t("adminBids")}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Winner Info */}
                {selectedAuction?.winner && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <i className="fas fa-crown mr-2 text-yellow-500"></i>
                        {t("winnerInfo")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center">
                          <i className="fas fa-crown text-white"></i>
                        </div>
                        <div>
                          <div className="font-semibold text-lg">
                            {selectedAuction.winner.firstName && selectedAuction.winner.lastName
                              ? `${selectedAuction.winner.firstName} ${selectedAuction.winner.lastName}`
                              : selectedAuction.winner.username}
                          </div>
                          <div className="text-sm text-gray-600">
                            @{selectedAuction.winner.username}
                          </div>
                          <Badge 
                            variant={selectedAuction.winner.role === 'admin' ? 'destructive' : 'default'}
                            className="mt-1"
                          >
                            {selectedAuction.winner.role === 'admin' ? t("administrator") : t("user")}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Bid History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <i className="fas fa-history mr-2"></i>
                      {t("bidHistory")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="max-h-96 overflow-y-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>№</TableHead>
                            <TableHead>{t("participant")}</TableHead>
                            <TableHead>{t("type")}</TableHead>
                            <TableHead>{t("amount")}</TableHead>
                            <TableHead>{t("time")}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {auctionStats.bids.map((bid, index) => (
                            <TableRow key={bid.id}>
                              <TableCell className="font-mono text-sm">
                                #{auctionStats.totalBids - index}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                    bid.userRole === 'admin' ? 'bg-red-100' : 'bg-blue-100'
                                  }`}>
                                    <i className={`text-xs ${
                                      bid.userRole === 'admin' ? 'fas fa-user-shield text-red-600' : 'fas fa-user text-blue-600'
                                    }`}></i>
                                  </div>
                                  <span className="text-sm">{bid.userName}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant={bid.userRole === 'admin' ? 'destructive' : 'default'}
                                  className="text-xs"
                                >
                                  {bid.userRole === 'admin' ? t("admin") : t("user")}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-mono text-sm">
                                {formatCurrency(bid.bidAmount)}
                              </TableCell>
                              <TableCell className="text-sm text-gray-600">
                                {formatDateTime(bid.createdAt)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <i className="fas fa-exclamation-circle text-4xl mb-4"></i>
                <p>{t("failedToLoadStats")}</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
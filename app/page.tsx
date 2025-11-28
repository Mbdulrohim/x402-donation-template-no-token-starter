"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletOverlay } from "@/components/wallet-overlay-provider";
import { useX402Payment } from "@/hooks/use-x402-payment";
import { Snowfall } from "@/components/Snowfall";
import { ChristmasCard } from "@/components/ChristmasCard";
import { OrnamentButton } from "@/components/OrnamentButton";
import { Gift, Heart, Sparkles, TreePine, CheckCircle2, ArrowRight } from "lucide-react";

interface DonationStats {
  totalDonations: number;
  totalAmount: number;
  biggestDonor: {
    donor_name: string | null;
    donor_address: string | null;
    amount_usd: number;
  } | null;
}

export default function Home() {
  const { connected, publicKey } = useWallet();
  const walletOverlay = useWalletOverlay();
  const { initiatePayment, isProcessing } = useX402Payment();

  const [amount, setAmount] = useState("10");
  const [donorName, setDonorName] = useState("");
  const [donorMessage, setDonorMessage] = useState("");
  const [stats, setStats] = useState<DonationStats | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/messages?page=1&limit=1");
        const data = await response.json();
        if (data.success) {
          setStats(data.data.stats);
        }
      } catch (error) {
        console.error("Failed to fetch donation stats:", error);
      }
    };

    fetchStats();
  }, []);

  const handleConnectWallet = () => {
    walletOverlay.open();
  };

  const handleDonate = async () => {
    if (!connected || !amount) return;

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount < 0.01) {
      alert("Minimum donation is $0.01");
      return;
    }

    try {
      await initiatePayment("/api/write-message", {
        amount: numAmount,
        name: donorName || undefined,
        message: donorMessage || undefined,
      });

      // Show success view instead of alert
      setShowSuccess(true);

      setAmount("10");
      setDonorName("");
      setDonorMessage("");

      // Refresh stats after donation
      const response = await fetch("/api/messages?page=1&limit=1");
      const data = await response.json();
      if (data.success) {
        setStats(data.data.stats);
      }
    } catch (error) {
      console.error("Donation failed:", error);
      alert("Donation failed. Please try again.");
    }
  };

  const handleReset = () => {
    setShowSuccess(false);
  };

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-4">
      <Snowfall />

      {/* Decorative Background Elements */}
      <div className="fixed top-10 left-10 text-christmas-gold/20 pointer-events-none animate-pulse">
        <Sparkles size={48} />
      </div>
      <div className="fixed bottom-10 right-10 text-christmas-gold/20 pointer-events-none animate-pulse delay-700">
        <Sparkles size={64} />
      </div>

      <div className="z-10 w-full max-w-4xl flex flex-col items-center gap-8">

        {/* Header Section */}
        <div className="text-center space-y-4 mb-4">
          <div className="inline-block p-3 rounded-full bg-christmas-green/20 border border-christmas-green/40 mb-2 backdrop-blur-sm">
            <TreePine className="w-10 h-10 text-christmas-green" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-christmas-gold via-white to-christmas-gold drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] font-serif">
            Christmas Magic
          </h1>
          <p className="text-xl text-blue-100 max-w-lg mx-auto font-light">
            Spread joy and warmth this holiday season. Your contribution makes a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

          {/* Left Column: Stats & Info */}
          <div className="space-y-6">
            <ChristmasCard title="Santa's List" className="h-full flex flex-col justify-center">
              {stats ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="p-3 bg-christmas-red/20 rounded-full">
                      <Gift className="w-6 h-6 text-christmas-red" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wider">Total Raised</p>
                      <p className="text-3xl font-bold text-white">${stats.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="p-3 bg-christmas-green/20 rounded-full">
                      <Heart className="w-6 h-6 text-christmas-green" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wider">Donations</p>
                      <p className="text-3xl font-bold text-white">{stats.totalDonations}</p>
                    </div>
                  </div>

                  {stats.biggestDonor && (
                    <div className="p-4 rounded-lg bg-gradient-to-r from-christmas-gold/10 to-transparent border border-christmas-gold/30">
                      <p className="text-sm text-christmas-gold uppercase tracking-wider mb-1 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" /> Top Supporter
                      </p>
                      <p className="text-xl font-bold text-white">
                        ${stats.biggestDonor.amount_usd.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-300 truncate">
                        {stats.biggestDonor.donor_name || "Anonymous Elf"}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-400 py-10">
                  Loading Santa's list...
                </div>
              )}
            </ChristmasCard>
          </div>

          {/* Right Column: Donation Form or Success View */}
          <ChristmasCard title={showSuccess ? "Thank You!" : "Send a Gift"}>
            {showSuccess ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-6 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-christmas-green/20 rounded-full flex items-center justify-center border-2 border-christmas-green/40 mb-2">
                  <CheckCircle2 className="w-12 h-12 text-christmas-green" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-christmas-gold">Donation Received!</h3>
                  <p className="text-gray-300">
                    Your gift has been successfully sent. Thank you for spreading the holiday cheer!
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="mt-4 flex items-center gap-2 py-3 px-6 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white transition-all group"
                >
                  Send Another Gift
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ) : (
              <div className="space-y-6">

                {/* Wallet Connection Status */}
                <div className="flex justify-center">
                  {!connected ? (
                    <button
                      onClick={handleConnectWallet}
                      className="w-full py-3 px-6 bg-gradient-to-r from-christmas-green to-emerald-600 hover:from-emerald-600 hover:to-christmas-green text-white font-bold rounded-lg shadow-lg transform transition-all hover:-translate-y-1 border border-emerald-400/30"
                    >
                      Connect Wallet to Give
                    </button>
                  ) : (
                    <div className="w-full py-2 px-4 bg-christmas-green/20 border border-christmas-green/40 rounded-lg text-center text-emerald-300 text-sm">
                      Connected: {publicKey?.toString().slice(0, 8)}...
                    </div>
                  )}
                </div>

                {/* Amount Selection */}
                <div className="space-y-3">
                  <label className="text-sm text-gray-300 uppercase tracking-wider font-semibold">Select Amount</label>
                  <div className="flex justify-between gap-2">
                    {["1", "5", "10", "15"].map((val) => (
                      <OrnamentButton
                        key={val}
                        amount={val}
                        onClick={() => setAmount(val)}
                        selected={amount === val}
                      />
                    ))}
                  </div>
                </div>

                {/* Custom Amount Input */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-300 uppercase tracking-wider font-semibold">Custom Amount ($)</label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-christmas-gold focus:ring-1 focus:ring-christmas-gold outline-none transition-all"
                  />
                </div>

                {/* Donor Details */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300 uppercase tracking-wider font-semibold">Name (Optional)</label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Santa Claus"
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-christmas-gold focus:ring-1 focus:ring-christmas-gold outline-none transition-all placeholder:text-gray-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-300 uppercase tracking-wider font-semibold">Message (Optional)</label>
                    <textarea
                      value={donorMessage}
                      onChange={(e) => setDonorMessage(e.target.value)}
                      placeholder="Merry Christmas!"
                      rows={2}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-christmas-gold focus:ring-1 focus:ring-christmas-gold outline-none transition-all placeholder:text-gray-600 resize-none"
                    />
                  </div>
                </div>

                {/* Donate Button */}
                <button
                  onClick={handleDonate}
                  disabled={!connected || isProcessing}
                  className={`
                    w-full py-4 px-6 rounded-lg font-bold text-lg shadow-xl transition-all transform hover:-translate-y-1
                    ${!connected || isProcessing
                      ? "bg-gray-600 cursor-not-allowed opacity-50"
                      : "bg-gradient-to-r from-christmas-red to-red-600 hover:from-red-600 hover:to-christmas-red text-white border-2 border-christmas-gold/50"}
                  `}
                >
                  {isProcessing ? "Processing..." : "Donate Now"}
                </button>

              </div>
            )}
          </ChristmasCard>
        </div>

        <footer className="text-gray-500 text-sm mt-8">
          Powered by x402 Protocol
        </footer>
      </div>
    </main>
  );
}

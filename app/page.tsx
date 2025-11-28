"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletOverlay } from "@/components/wallet-overlay-provider";
import { useX402Payment } from "@/hooks/use-x402-payment";
import { FallingLeaves } from "@/components/FallingLeaves";
import { ThanksgivingCard } from "@/components/ThanksgivingCard";
import { PieButton } from "@/components/PieButton";
import { Heart, CheckCircle2, ArrowRight, Wheat, Utensils, Leaf } from "lucide-react";

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

      setShowSuccess(true);
      setAmount("10");
      setDonorName("");
      setDonorMessage("");

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
    <main className="min-h-screen relative flex flex-col items-center justify-center p-4 overflow-hidden">
      <FallingLeaves />

      <div className="z-10 w-full max-w-5xl flex flex-col items-center gap-8">

        {/* Header Section */}
        <div className="text-center space-y-4 mb-4">
          <div className="inline-block p-4 rounded-full bg-thanksgiving-orange/10 border-2 border-thanksgiving-orange/30 mb-2 backdrop-blur-sm">
            <Wheat className="w-12 h-12 text-thanksgiving-orange" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-thanksgiving-brown font-serif tracking-tight drop-shadow-sm">
            Harvest of Gratitude
          </h1>
          <p className="text-xl text-thanksgiving-brown/80 max-w-lg mx-auto font-medium italic">
            "Gratitude turns what we have into enough."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

          {/* Left Column: Stats & Info */}
          <div className="space-y-6">
            <ThanksgivingCard title="Our Bounty" className="h-full flex flex-col justify-center">
              {stats ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-thanksgiving-orange/5 border border-thanksgiving-orange/20">
                    <div className="p-3 bg-thanksgiving-orange/20 rounded-full">
                      <Wheat className="w-8 h-8 text-thanksgiving-orange" />
                    </div>
                    <div>
                      <p className="text-sm text-thanksgiving-brown/60 uppercase tracking-wider font-bold">Total Harvested</p>
                      <p className="text-4xl font-serif font-bold text-thanksgiving-brown">${stats.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-lg bg-thanksgiving-brown/5 border border-thanksgiving-brown/20">
                    <div className="p-3 bg-thanksgiving-brown/20 rounded-full">
                      <Heart className="w-8 h-8 text-thanksgiving-brown" />
                    </div>
                    <div>
                      <p className="text-sm text-thanksgiving-brown/60 uppercase tracking-wider font-bold">Generous Souls</p>
                      <p className="text-4xl font-serif font-bold text-thanksgiving-brown">{stats.totalDonations}</p>
                    </div>
                  </div>

                  {stats.biggestDonor && (
                    <div className="p-6 rounded-lg bg-gradient-to-br from-thanksgiving-yellow/20 to-transparent border border-thanksgiving-yellow/40 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 opacity-10">
                        <Leaf size={64} />
                      </div>
                      <p className="text-sm text-thanksgiving-brown/80 uppercase tracking-wider mb-2 flex items-center gap-2 font-bold">
                        <Utensils className="w-4 h-4" /> Top Contributor
                      </p>
                      <p className="text-2xl font-bold text-thanksgiving-brown font-serif">
                        ${stats.biggestDonor.amount_usd.toFixed(2)}
                      </p>
                      <p className="text-md text-thanksgiving-brown/70 italic">
                        — {stats.biggestDonor.donor_name || "Anonymous Friend"}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-thanksgiving-brown/50 py-10 italic">
                  Gathering the harvest...
                </div>
              )}
            </ThanksgivingCard>
          </div>

          {/* Right Column: Donation Form or Success View */}
          <ThanksgivingCard title={showSuccess ? "Blessings Sent" : "Share a Meal"}>
            {showSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-6 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-thanksgiving-orange/20 rounded-full flex items-center justify-center border-4 border-thanksgiving-orange/40 mb-4">
                  <CheckCircle2 className="w-12 h-12 text-thanksgiving-orange" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-3xl font-serif font-bold text-thanksgiving-brown">Thank You!</h3>
                  <p className="text-thanksgiving-brown/80 text-lg max-w-xs mx-auto">
                    Your generosity has added to our table. May your holiday be filled with warmth.
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="mt-6 flex items-center gap-2 py-3 px-8 bg-thanksgiving-brown hover:bg-thanksgiving-brown/90 text-white rounded-full transition-all shadow-lg hover:shadow-xl"
                >
                  Give Again
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-8">

                {/* Wallet Connection Status */}
                <div className="flex justify-center">
                  {!connected ? (
                    <button
                      onClick={handleConnectWallet}
                      className="w-full py-4 px-6 bg-gradient-to-r from-thanksgiving-orange to-red-700 hover:from-red-700 hover:to-thanksgiving-orange text-white font-bold rounded-xl shadow-lg transform transition-all hover:-translate-y-1 border-b-4 border-red-900"
                    >
                      Connect Wallet to Share
                    </button>
                  ) : (
                    <div className="w-full py-3 px-4 bg-thanksgiving-brown/10 border border-thanksgiving-brown/20 rounded-lg text-center text-thanksgiving-brown font-medium">
                      Connected: {publicKey?.toString().slice(0, 8)}...
                    </div>
                  )}
                </div>

                {/* Amount Selection */}
                <div className="space-y-4">
                  <label className="text-sm text-thanksgiving-brown/60 uppercase tracking-wider font-bold flex items-center gap-2">
                    <span className="w-8 h-px bg-thanksgiving-brown/20"></span>
                    Choose Your Slice
                    <span className="w-8 h-px bg-thanksgiving-brown/20"></span>
                  </label>
                  <div className="flex justify-center gap-4 flex-wrap">
                    {["5", "10", "20", "50"].map((val) => (
                      <PieButton
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
                  <label className="text-sm text-thanksgiving-brown/60 uppercase tracking-wider font-bold">Custom Portion ($)</label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white border-2 border-thanksgiving-brown/20 rounded-lg p-4 text-thanksgiving-brown text-lg font-serif focus:border-thanksgiving-orange focus:ring-0 outline-none transition-all"
                  />
                </div>

                {/* Donor Details */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-thanksgiving-brown/60 uppercase tracking-wider font-bold">Your Name (Optional)</label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Kind Stranger"
                      className="w-full bg-white border-2 border-thanksgiving-brown/20 rounded-lg p-4 text-thanksgiving-brown focus:border-thanksgiving-orange focus:ring-0 outline-none transition-all placeholder:text-thanksgiving-brown/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-thanksgiving-brown/60 uppercase tracking-wider font-bold">Note of Thanks (Optional)</label>
                    <textarea
                      value={donorMessage}
                      onChange={(e) => setDonorMessage(e.target.value)}
                      placeholder="Happy Thanksgiving!"
                      rows={2}
                      className="w-full bg-white border-2 border-thanksgiving-brown/20 rounded-lg p-4 text-thanksgiving-brown focus:border-thanksgiving-orange focus:ring-0 outline-none transition-all placeholder:text-thanksgiving-brown/30 resize-none"
                    />
                  </div>
                </div>

                {/* Donate Button */}
                <button
                  onClick={handleDonate}
                  disabled={!connected || isProcessing}
                  className={`
                    w-full py-4 px-6 rounded-xl font-bold text-xl shadow-xl transition-all transform hover:-translate-y-1 font-serif
                    ${!connected || isProcessing
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-thanksgiving-brown text-white hover:bg-[#4e342e] border-b-4 border-[#3e2723]"}
                  `}
                >
                  {isProcessing ? "Preparing..." : "Give Thanks"}
                </button>

              </div>
            )}
          </ThanksgivingCard>
        </div>

        <footer className="text-thanksgiving-brown/40 text-sm mt-12 font-medium">
          Powered by x402 Protocol
        </footer>
      </div>
    </main>
  );
}

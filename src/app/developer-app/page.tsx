import { WalletHeader } from "@/components/wallet/wallet-header"
import { FooterNav } from "@/components/wallet/footer-nav"
import Link from "next/link"

export default function DeveloperAppPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <WalletHeader />

      <main className="flex-1 w-full max-w-md mx-auto p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-8 mt-4">Developer App Wallet</h1>

        <p className="text-gray-700 mb-6">
          This is a special wallet for Pi Network developers to test their applications.
        </p>

        <Link
          href="/"
          className="w-full bg-[#7b2cbf] hover:bg-[#6a24a6] text-white py-4 rounded-md text-center font-medium"
        >
          Back to Main Wallet
        </Link>
      </main>

      <FooterNav />
    </div>
  )
}


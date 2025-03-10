import Link from "next/link"

export function WalletInfo() {
  return (
    <div className="w-full max-w-md mx-auto mt-8 text-center">
      <Link href="/developer-app" className="text-pi-purple font-medium">
        Unlock a Developer App Wallet
      </Link>

      <p className="mt-6 text-gray-700 text-left">
        As a non-custodial wallet, your wallet passphrase is exclusively accessible only to you. Recovery of passphrase
        is currently impossible.
      </p>

      <div className="mt-4 text-left">
        <span className="text-gray-700">Lost your passphrase? </span>
        <Link href="/new-wallet" className="text-blue-500">
          You can create a new wallet
        </Link>
        <span className="text-gray-700">, but all your π in your previous wallet will be inaccessible.</span>
      </div>
    </div>
  )
}


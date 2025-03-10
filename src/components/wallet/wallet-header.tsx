import { ArrowLeft, ChevronDown } from "lucide-react"
import Link from "next/link"

export function WalletHeader() {
  return (
    <header className="flex items-center justify-between w-full p-4 bg-pi-purple text-white">
      <div className="flex items-center gap-4">
        <Link href="#" className="text-white">
          <ArrowLeft size={24} />
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-pi-gold rounded-md">
            <span className="font-bold text-pi-purple">π</span>
          </div>
          <span className="text-xl font-semibold">Wallet</span>
        </div>
      </div>
      <button className="text-white">
        <ChevronDown size={24} />
      </button>
    </header>
  )
}


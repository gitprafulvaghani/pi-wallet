"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

interface PassphraseInputProps {
  onSubmit: (passphrase: string) => void
}

export function PassphraseInput({ onSubmit }: PassphraseInputProps) {
  const [passphrase, setPassphrase] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = () => {
    if (!passphrase.trim()) {
      setError("Please enter your passphrase")
      return
    }

    const words = passphrase.trim().split(/\s+/)
    if (words.length !== 24) {
      setError("Invalid Passphrase")
      return
    }

    setError(null)
    onSubmit(passphrase)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative mb-2">
        <Textarea
          placeholder="Enter your 24-word passphrase here"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          className={`min-h-[200px] border ${
            error ? "border-red-500" : "border-pi-gold"
          } rounded-md p-4 resize-none w-full`}
        />
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>

      {/* Use a regular <button> */}
      <button
        onClick={handleSubmit}
        className="w-full bg-pi-purple hover:bg-pi-purple/90 text-white py-3 rounded-md mt-4"
      >
        UNLOCK WITH PASSPHRASE
      </button>

      <button
        className="w-full border border-pi-purple text-pi-purple hover:bg-pi-purple/10 py-3 rounded-md mt-4"
      >
        UNLOCK WITH FINGERPRINT
      </button>
    </div>
  )
}

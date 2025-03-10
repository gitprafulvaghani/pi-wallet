export function validatePassphrase(passphrase: string): { isValid: boolean; error?: string } {
    if (!passphrase.trim()) {
      return { isValid: false, error: "Please enter your passphrase" }
    }
  
    // Check if it has 24 words
    const words = passphrase.trim().split(/\s+/)
    if (words.length !== 24) {
      return { isValid: false, error: "Invalid Passphrase" }
    }
  
    // In a real app, you would check if the words are from the BIP39 wordlist
    // and validate the checksum, but for this demo we'll just check the word count
  
    return { isValid: true }
  }
  
  
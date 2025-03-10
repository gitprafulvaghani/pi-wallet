// This is a mock service that would be replaced with actual API calls to your Node.js backend

export interface WalletData {
    address: string
    balance: number
    transactions: Transaction[]
  }
  
  export interface Transaction {
    id: string
    type: "send" | "receive"
    amount: number
    timestamp: number
    status: "pending" | "completed" | "failed"
    counterparty: string
  }
  
  // Mock data
  const mockWalletData: WalletData = {
    address: "pi1q2w3e4r5t6y7u8i9o0p1a2s3d4f5g6h7j8k9l",
    balance: 1234.56,
    transactions: [
      {
        id: "tx1",
        type: "receive",
        amount: 100,
        timestamp: Date.now() - 86400000, // 1 day ago
        status: "completed",
        counterparty: "PiNetwork",
      },
      {
        id: "tx2",
        type: "send",
        amount: 25,
        timestamp: Date.now() - 172800000, // 2 days ago
        status: "completed",
        counterparty: "Friend",
      },
    ],
  }
  
  export async function unlockWallet(
    passphrase: string,
  ): Promise<{ success: boolean; data?: WalletData; error?: string }> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // For demo purposes, always fail authentication
    // In a real app, this would validate the passphrase with your backend
    return {
      success: false,
      error: "Invalid passphrase",
    }
  
    // When connected to a real backend, successful authentication would return:
    // return { success: true, data: mockWalletData };
  }
  
  export async function createNewWallet(): Promise<{ success: boolean; passphrase?: string; error?: string }> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // In a real app, this would generate a new wallet on your backend
    const mockPassphrase =
      "word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12 word13 word14 word15 word16 word17 word18 word19 word20 word21 word22 word23 word24"
  
    return {
      success: true,
      passphrase: mockPassphrase,
    }
  }
  
  
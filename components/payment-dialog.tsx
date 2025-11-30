"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Copy, Check, ExternalLink, Wallet, Lock, Unlock, FileText, ArrowRight, Loader2 } from "lucide-react"
import Image from "next/image"
import { isConnected, requestAccess, getNetworkDetails, signTransaction } from "@stellar/freighter-api"
import * as StellarSdk from "@stellar/stellar-sdk"

interface PaymentDialogProps {
  isOpen: boolean
  onClose: () => void
}

type PaymentStep = 'connect' | 'pay' | 'processing_payment' | 'unlocked'

export function PaymentDialog({ isOpen, onClose }: PaymentDialogProps) {
  const [step, setStep] = useState<PaymentStep>('connect')
  const [copied, setCopied] = useState(false)
  const [connectedPublicKey, setConnectedPublicKey] = useState<string>("")
  const [paymentError, setPaymentError] = useState<string>("")
  
  // Payment destination from stellarx402integrationdocs.md
  const PAYMENT_DESTINATION = "GC63PSERYMUUUJKYSSFQ7FKRAU5UPIP3XUC6X7DLMZUB7SSCPW5BSIRT"
  
  const walletAddress = connectedPublicKey || "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  const displayAddress = `${walletAddress.slice(0, 8)}...${walletAddress.slice(-8)}`
  const amount = "1"  // 1 XLM as per x402 protocol
  const network = "Stellar Testnet"

  const copyAddress = async () => {
    await navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleConnect = async () => {
    try {
      console.log("Attempting to connect to Freighter...")
      
      // Check if Freighter is installed using the official API
      const isFreighterConnected = await isConnected()
      
      if (!isFreighterConnected) {
        console.error("Freighter is not installed")
        alert("Freighter wallet not found. Please install the Freighter browser extension to continue.")
        window.open("https://www.freighter.app/", "_blank")
        return
      }
      
      console.log("Freighter found, requesting access...")
      
      // Request access - this will trigger the Freighter popup
      const address = await requestAccess()
      
      if (address) {
        console.log("Connected with public key:", address)
        setConnectedPublicKey(address)
        setStep('pay')
      }
    } catch (error) {
      console.error("Error connecting to Freighter:", error)
      alert("Connection rejected or failed. Please approve the connection in Freighter and try again.")
    }
  }

  const handlePayment = async () => {
    setStep('processing_payment')
    setPaymentError("")
    
    try {
      console.log("Starting x402 payment process...")
      
      // Step 1: Get network details from Freighter
      const networkDetails = await getNetworkDetails()
      console.log("Network details:", networkDetails)
      
      // Determine if we're on testnet or mainnet
      const isTestnet = networkDetails.network === "TESTNET" || networkDetails.networkPassphrase.includes("Test")
      const server = new StellarSdk.Horizon.Server(
        isTestnet 
          ? "https://horizon-testnet.stellar.org"
          : "https://horizon.stellar.org"
      )
      
      console.log("Loading source account...")
      // Step 2: Load the source account
      const sourceAccount = await server.loadAccount(connectedPublicKey)
      
      console.log("Building x402 payment transaction...")
      // Step 3: Build the payment transaction (x402 protocol)
      // This follows the x402 specification: XDR transaction format with native XLM
      const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: networkDetails.networkPassphrase,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: PAYMENT_DESTINATION,
            asset: StellarSdk.Asset.native(), // Native XLM as per x402-stellar
            amount: amount,
          })
        )
        .setTimeout(180) // 3 minutes timeout
        .build()
      
      console.log("Requesting signature from Freighter (x402 flow)...")
      
      // Step 4: Sign with Freighter - this implements the x402 browser flow
      // As per stellarx402integrationdocs.md: "Freighter will prompt user to approve payment"
      const signedResult = await signTransaction(transaction.toXDR(), {
        networkPassphrase: networkDetails.networkPassphrase,
      })
      
      console.log("Transaction signed, submitting to Stellar network...")
      
      // Step 5: Parse the signed transaction
      const signedTransaction = StellarSdk.TransactionBuilder.fromXDR(
        signedResult,
        networkDetails.networkPassphrase
      )
      
      // Step 6: Submit to Stellar network (x402 settlement)
      // This is the "Submit to Stellar" step in the x402 architecture
      const result = await server.submitTransaction(signedTransaction as StellarSdk.Transaction)
      
      console.log("x402 payment successful!", result)
      console.log("Transaction hash:", result.hash)
      
      // Step 7: Payment successful - unlock content (x402 protocol complete)
      setStep('unlocked')
      
    } catch (error) {
      console.error("x402 payment error:", error)
      setPaymentError(error instanceof Error ? error.message : "Payment failed")
      
      // Show error alert
      alert(`Payment failed: ${error instanceof Error ? error.message : "Unknown error"}. Please try again.`)
      
      // Go back to payment step
      setStep('pay')
    }
  }

  const handleAccess = () => {
    // Currently just closes, but could be used for download
    onClose()
  }

  const resetFlow = () => {
    setStep('connect')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl w-full p-6 border border-border transition-all duration-500 ease-in-out
          ${step === 'unlocked' ? 'max-w-4xl h-[85vh]' : 'max-w-md'}`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content based on step */}
        <div className={`mt-2 h-full flex flex-col ${step === 'unlocked' ? 'h-full' : ''}`}>
          {step === 'connect' && (
            <div className="text-center space-y-6 animate-in fade-in zoom-in duration-300">
              <div className="h-16 w-16 mx-auto bg-stellar-navy/10 rounded-full flex items-center justify-center">
                <Wallet className="h-8 w-8 text-stellar-navy" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-stellar-navy mb-2">Connect Wallet</h2>
                <p className="text-sm text-muted-foreground">
                  Connect your Freighter wallet to continue with the payment flow.
                </p>
              </div>

              <Button 
                onClick={handleConnect}
                className="w-full bg-stellar-navy hover:bg-stellar-navy/90 text-white h-12 font-semibold"
              >
                Connect Freighter
              </Button>
              
              <p className="text-xs text-muted-foreground">
                Don't have Freighter? <a href="https://www.freighter.app/" target="_blank" rel="noopener noreferrer" className="text-stellar-gold hover:underline">Download here</a>
              </p>
            </div>
          )}

          {step === 'pay' && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
              <div className="text-center">
                <div className="h-16 w-16 mx-auto bg-stellar-gold/10 rounded-full flex items-center justify-center mb-4">
                  <Lock className="h-8 w-8 text-stellar-gold" />
                </div>
                <h2 className="text-2xl font-bold text-stellar-navy mb-2">Payment Required</h2>
                <p className="text-sm text-muted-foreground">
                  Pay {amount} XLM to unlock exclusive content.
                </p>
              </div>

              <div className="space-y-3 p-4 rounded-xl bg-muted/30 border border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Wallet:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-foreground">{displayAddress}</span>
                    <button onClick={copyAddress} className="p-1 hover:bg-background rounded">
                      {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Amount:</span>
                  <span className="text-sm font-semibold text-stellar-navy">{amount} XLM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Network:</span>
                  <span className="text-sm font-medium">{network}</span>
                </div>
              </div>

              <Button 
                onClick={handlePayment}
                className="w-full bg-stellar-navy hover:bg-stellar-navy/90 text-white h-12 font-semibold"
              >
                Pay {amount} XLM
              </Button>
            </div>
          )}

          {step === 'processing_payment' && (
            <div className="text-center space-y-6 py-8 animate-in fade-in duration-300">
              <Loader2 className="h-12 w-12 mx-auto text-stellar-navy animate-spin" />
              <div>
                <h3 className="text-xl font-semibold text-stellar-navy">Processing Payment...</h3>
                <p className="text-sm text-muted-foreground mt-2">Please wait while we confirm your transaction.</p>
              </div>
            </div>
          )}

          {step === 'unlocked' && (
            <div className="flex flex-col h-full animate-in slide-in-from-right duration-500">
              <div className="flex items-center justify-between mb-4 pr-8">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Unlock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-stellar-navy">x402 Whitepaper</h2>
                    <p className="text-xs text-muted-foreground">Content successfully unlocked</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                   <a href="https://www.x402.org/x402-whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                     Open in new tab <ExternalLink className="h-3 w-3" />
                   </a>
                </Button>
              </div>

              <div className="flex-1 bg-muted/10 rounded-xl border border-border overflow-hidden relative">
                <iframe 
                  src="https://www.x402.org/x402-whitepaper.pdf"
                  className="w-full h-full"
                  title="x402 Whitepaper"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

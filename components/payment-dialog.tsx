"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Copy, Check, ExternalLink, Wallet, Lock, Unlock, FileText, ArrowRight, Loader2 } from "lucide-react"
import Image from "next/image"

interface PaymentDialogProps {
  isOpen: boolean
  onClose: () => void
}

type PaymentStep = 'connect' | 'pay' | 'processing_payment' | 'unlocked'

export function PaymentDialog({ isOpen, onClose }: PaymentDialogProps) {
  const [step, setStep] = useState<PaymentStep>('connect')
  const [copied, setCopied] = useState(false)
  
  const walletAddress = "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  const displayAddress = `${walletAddress.slice(0, 8)}...${walletAddress.slice(-8)}`
  const amount = "0.01"
  const network = "Stellar"

  const copyAddress = async () => {
    await navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleConnect = () => {
    // Simulate wallet connection
    setTimeout(() => {
      setStep('pay')
    }, 800)
  }

  const handlePayment = () => {
    setStep('processing_payment')
    // Simulate payment processing
    setTimeout(() => {
      setStep('unlocked')
    }, 2000)
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

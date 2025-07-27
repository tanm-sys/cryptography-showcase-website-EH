import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'
import { sha256 } from '@/lib/crypto'
import { toast } from 'sonner'
import HashVisualization from './hash-visualization'
import { gsap } from 'gsap'

export default function Sha256Interactive() {
  const [input, setInput] = useState('Hello, world!')
  const [hash, setHash] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const hashContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const calculateHash = async () => {
      const result = await sha256(input)
      
      if (hashContainerRef.current) {
        gsap.timeline()
          .to(hashContainerRef.current, { opacity: 0, y: -5, duration: 0.15, ease: 'power2.in' })
          .add(() => setHash(result))
          .set(hashContainerRef.current, { y: 5 })
          .to(hashContainerRef.current, { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' });
      } else {
        setHash(result)
      }
    }
    calculateHash()
  }, [input])

  const handleCopy = () => {
    if (!hash) return;
    navigator.clipboard.writeText(hash)
    setIsCopied(true)
    toast.success('Hash copied to clipboard!')
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Card className="w-full max-w-6xl mx-auto neumorphism-card">
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-wider">SHA-256 Hash Generator</CardTitle>
        <p className="text-muted-foreground pt-1">
          Experience the avalanche effect. A tiny change in the input creates a completely different hash.
        </p>
      </CardHeader>
      <CardContent className="space-y-8 pt-4">
        <div className="grid lg:grid-cols-2 lg:gap-12 space-y-8 lg:space-y-0">
          <div className="grid w-full gap-3">
            <Label htmlFor="message" className="text-base font-semibold">Input Data</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[200px] lg:min-h-[400px] bg-background/50 text-lg p-4 rounded-lg border-2 border-transparent focus:border-primary transition-colors duration-300"
            />
          </div>
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold">SHA-256 Output (Hex)</Label>
              <div className="relative mt-2">
                <div ref={hashContainerRef} className="w-full p-4 font-mono text-sm break-all rounded-lg bg-background/50 min-h-[90px] flex items-center">
                  {hash}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleCopy}
                  aria-label="Copy hash"
                >
                  {isCopied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div>
              <Label className="text-base font-semibold">Hash Visualization (256 bits)</Label>
              <p className="text-sm text-muted-foreground mb-2">Each square represents a single bit of the hash output.</p>
              <HashVisualization hash={hash} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

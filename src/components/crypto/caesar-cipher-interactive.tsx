import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { caesarCipher } from '@/lib/crypto'
import AnimatedText from './animated-text'
import AlphabetMapping from './alphabet-mapping'

export default function CaesarCipherInteractive() {
  const [input, setInput] = useState('Hello, World! This is a test of the Caesar Cipher animation.')
  const [shift, setShift] = useState(3)

  const encryptedText = useMemo(() => caesarCipher(input, shift), [input, shift])

  return (
    <Card className="w-full max-w-5xl mx-auto neumorphism-card">
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-wider">Caesar Cipher Playground</CardTitle>
        <p className="text-muted-foreground pt-1">A fluent, interactive encryption experience.</p>
      </CardHeader>
      <CardContent className="space-y-10 pt-4">
        <div className="grid w-full gap-3">
          <Label htmlFor="message" className="text-base font-semibold">Plaintext</Label>
          <Textarea
            id="message"
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[120px] bg-background/50 text-lg p-4 rounded-lg border-2 border-transparent focus:border-primary transition-colors duration-300"
          />
        </div>

        <AlphabetMapping shift={shift} />

        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <Label htmlFor="shift" className="text-base font-semibold">Shift Value</Label>
            <span className="flex items-center justify-center w-20 h-12 rounded-lg bg-primary/10 text-primary font-mono text-2xl font-bold shadow-inner">{shift}</span>
          </div>
          <Slider
            id="shift"
            min={-25}
            max={25}
            step={1}
            value={[shift]}
            onValueChange={(value) => setShift(value[0])}
          />
        </div>

        <div className="space-y-3">
          <Label className="text-base font-semibold">Ciphertext</Label>
          <div className="w-full p-4 font-mono text-xl sm:text-2xl break-all rounded-lg bg-background/50 min-h-[120px] border border-dashed border-border/50">
            <AnimatedText text={encryptedText} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

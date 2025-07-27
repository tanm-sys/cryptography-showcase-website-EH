import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Lock, KeyRound, ShieldAlert } from 'lucide-react'

const encryptionTypes = [
  {
    title: 'Caesar Cipher',
    description: 'The simplest substitution cipher. Shift letters by a certain number of places down the alphabet.',
    icon: <ShieldAlert className="h-8 w-8 text-primary" />,
    link: '/encryption/caesar',
    status: 'active',
  },
  {
    title: 'AES Encryption',
    description: 'The modern standard for symmetric encryption used globally to secure data.',
    icon: <Lock className="h-8 w-8 text-primary" />,
    link: '#',
    status: 'coming_soon',
  },
  {
    title: 'RSA Encryption',
    description: 'The foundation of public-key cryptography for secure data transmission.',
    icon: <KeyRound className="h-8 w-8 text-primary" />,
    link: '#',
    status: 'coming_soon',
  },
]

export default function EncryptionPage() {
  return (
    <div className="space-y-16">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Encryption Algorithms
        </h1>
        <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
          Explore the world of encryption, from ancient ciphers to modern standards.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {encryptionTypes.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full glass-card hover:border-primary/60 transition-colors duration-300 flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between space-y-4">
                <p className="text-muted-foreground">{feature.description}</p>
                {feature.status === 'active' ? (
                  <Button variant="secondary" asChild>
                    <Link to={feature.link}>
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" disabled>
                    Coming Soon
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

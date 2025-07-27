import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Lock, Hash, KeyRound } from 'lucide-react'
import HeroAnimation from '@/components/visualizations/hero-animation'

const features = [
  {
    title: 'Hashing Algorithms',
    description: 'Explore SHA-256 and other hashing functions. See how data is transformed into a fixed-size hash.',
    icon: <Hash className="h-8 w-8 text-primary" />,
    link: '/hashing',
  },
  {
    title: 'Symmetric & Asymmetric Encryption',
    description: 'Visualize AES and RSA encryption. Understand the difference between shared keys and public/private key pairs.',
    icon: <Lock className="h-8 w-8 text-primary" />,
    link: '/encryption',
  },
  {
    title: 'Digital Signatures',
    description: 'Learn how digital signatures provide authenticity and integrity. Create and verify your own signatures.',
    icon: <KeyRound className="h-8 w-8 text-primary" />,
    link: '/signatures',
  },
]

export default function HomePage() {
  return (
    <div className="space-y-16 md:space-y-24">
      <section className="relative flex flex-col items-center justify-center text-center min-h-[60vh] overflow-hidden">
        <HeroAnimation />
        <div className="relative z-10 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Unlock the Secrets of Cryptography
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl md:text-2xl"
          >
            An interactive, visual platform for learning and experimenting with modern cryptographic algorithms.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button asChild size="lg">
              <Link to="/hashing">
                Start Exploring <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full glass-card hover:border-primary/60 transition-colors duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                  {feature.icon}
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{feature.description}</p>
                  <Button variant="secondary" asChild>
                    <Link to={feature.link}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

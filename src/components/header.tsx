import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import Nav from './nav'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">CryptoVault</span>
        </Link>
        <Nav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

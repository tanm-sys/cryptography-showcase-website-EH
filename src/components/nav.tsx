import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Lock, KeyRound, ShieldAlert } from 'lucide-react'

const components: { title: string; href: string; description: string, icon: React.ReactElement }[] = [
  {
    title: "Caesar Cipher",
    href: "/encryption/caesar",
    description: "An interactive visualization of the classic substitution cipher.",
    icon: <ShieldAlert className="h-6 w-6" />
  },
  {
    title: "AES (Coming Soon)",
    href: "/encryption",
    description: "The Advanced Encryption Standard used worldwide.",
    icon: <Lock className="h-6 w-6" />
  },
  {
    title: "RSA (Coming Soon)",
    href: "/encryption",
    description: "The cornerstone of modern public-key cryptography.",
    icon: <KeyRound className="h-6 w-6" />
  },
]

export default function Nav() {
  const location = useLocation()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/hashing">
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), location.pathname.startsWith('/hashing') ? 'text-primary' : 'text-muted-foreground')}>
              Hashing
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(location.pathname.startsWith('/encryption') ? 'text-primary' : 'text-muted-foreground')}>Encryption</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  icon={component.icon}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/signatures">
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), location.pathname.startsWith('/signatures') ? 'text-primary' : 'text-muted-foreground')}>
              Signatures
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: React.ReactElement }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          to={props.href || '#'}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-x-2">
            <div className="text-primary">{icon}</div>
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

import * as React from "react"
import { Link } from "react-router-dom"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Menu, X } from "lucide-react"

const Nav = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2 font-bold">
            CardOnly.de
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a
              href="https://blog.cardonly.de"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-primary-foreground/80"
            >
              Blog
            </a>
            <Link
              to="/contact"
              className="transition-colors hover:text-primary-foreground/80"
            >
              Kontakt
            </Link>
          </nav>
          <Button
            className="md:hidden"
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col space-y-4 p-4">
            <a
              href="https://blog.cardonly.de"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-primary-foreground/80"
            >
              Blog
            </a>
            <Link
              to="/contact"
              className="transition-colors hover:text-primary-foreground/80"
              onClick={() => setIsOpen(false)}
            >
              Kontakt
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export { Nav }
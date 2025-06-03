"use client" // Keep if using Next.js App Router, otherwise optional

import * as React from "react"
import { Button } from "./Button" // Adjusted path
import { Input } from "./Input"   // Adjusted path
// import { Switch } from "./Switch" // Adjusted path - Removed for simplification
// import { Textarea } from "./Textarea" // Adjusted path - Not used in this specific footer
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./Tooltip" // Adjusted path
import { Facebook, Instagram, Linkedin, Send, Twitter } from "lucide-react"
import { Link } from "react-router-dom"; // Use react-router-dom Link
// Assuming useTheme hook is available from a shared location
import { useThemeToggle } from "./BiosphereComponents"; // Import useThemeToggle from where it's defined

function FooterSection() { // Renamed component
  const { theme } = useThemeToggle();
  console.log('Current theme:', theme); // Use the theme variable to satisfy linter
  // const [isDarkMode, setIsDarkMode] = React.useState(true) // Removed dark mode state
  // const [isChatOpen, setIsChatOpen] = React.useState(false) // Removed chat state

  // Removed dark mode effect
  // React.useEffect(() => {
  //   if (isDarkMode) {
  //     document.documentElement.classList.add("dark")
  //   } else {
  //     document.documentElement.classList.remove("dark")
  //   }
  // }, [isDarkMode])

  return (
    <footer className="relative border-t bg-white text-textDark dark:bg-gray-900 dark:text-gray-200 border-gray-200 dark:border-gray-700"> {/* Use project colors */}
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter */}
          <div className="relative">
            <h2 className="mb-4 text-xl font-bold tracking-tight text-primaryRed dark:text-primaryRed/90">Stay Connected</h2>
            <p className="mb-6 text-textLight dark:text-gray-400">
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="relative" onSubmit={(e: React.FormEvent) => e.preventDefault()}> {/* Added type for e */}
              <Input
                type="email"
                placeholder="Enter your email"
                className="pr-12 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                // Removed backdrop-blur - might not be needed/desired
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primaryRed text-white transition-transform hover:scale-105 dark:bg-primaryRed/80 dark:hover:bg-primaryRed" // Use project colors
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            {/* Removed blur effect div */}
          </div>
          {/* Quick Links - Updated */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-primaryRed dark:text-primaryRed/90">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <Link to="/" className="block transition-colors hover:text-accentGreen dark:hover:text-accentGreen/80">
                Home
              </Link>
              <Link to="/about" className="block transition-colors hover:text-accentGreen dark:hover:text-accentGreen/80">
                About Us
              </Link>
              <Link to="/products" className="block transition-colors hover:text-accentGreen dark:hover:text-accentGreen/80">
                Products
              </Link>
              <Link to="/contact" className="block transition-colors hover:text-accentGreen dark:hover:text-accentGreen/80">
                Contact
              </Link>
            </nav>
          </div>
          {/* Contact Us - Updated */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-primaryRed dark:text-primaryRed/90">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic text-textLight dark:text-gray-400">
              <p>Tatu Milk, Kiambaa</p>
              <p>Nairobi, Kenya</p>
              <p>Phone: +254 700 123 456</p>
              <p>Email: info@boganiyogurt.com</p>
            </address>
          </div>
          {/* Follow Us - Simplified */}
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold text-primaryRed dark:text-primaryRed/90">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              {/* Placeholder Social Links - Replace # with actual URLs */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" asChild className="rounded-full border-primaryRed text-primaryRed hover:bg-primaryRed/10 dark:border-primaryRed/80 dark:text-primaryRed/80 dark:hover:bg-primaryRed/20">
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Facebook className="h-4 w-4" />
                        <span className="sr-only">Facebook</span>
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
               <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" asChild className="rounded-full border-primaryRed text-primaryRed hover:bg-primaryRed/10 dark:border-primaryRed/80 dark:text-primaryRed/80 dark:hover:bg-primaryRed/20">
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4" />
                        <span className="sr-only">Twitter</span>
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" asChild className="rounded-full border-primaryRed text-primaryRed hover:bg-primaryRed/10 dark:border-primaryRed/80 dark:text-primaryRed/80 dark:hover:bg-primaryRed/20">
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-4 w-4" />
                        <span className="sr-only">Instagram</span>
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                     <Button variant="outline" size="icon" asChild className="rounded-full border-primaryRed text-primaryRed hover:bg-primaryRed/10 dark:border-primaryRed/80 dark:text-primaryRed/80 dark:hover:bg-primaryRed/20">
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                        <span className="sr-only">LinkedIn</span>
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {/* Removed Dark Mode Switch */}
          </div>
        </div>
        {/* Bottom Bar - Updated */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row border-gray-200 dark:border-gray-700">
          <p className="text-sm text-textLight dark:text-gray-400">
            © {new Date().getFullYear()} Bogani by Tatu Milk. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            {/* Placeholder policy links */}
            <a href="#" className="transition-colors hover:text-accentGreen dark:hover:text-accentGreen/80">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-accentGreen dark:hover:text-accentGreen/80">
              Terms of Service
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { FooterSection } // Export with new name 
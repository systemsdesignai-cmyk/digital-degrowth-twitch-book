import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  scrolled: boolean;
}

const Navbar = ({ scrolled }: NavbarProps) => {
  const navItems = ["About", "Praise", "News", "Author"];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "py-3 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "py-6 bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <div className="brand-mark flex items-center gap-2 text-lg md:text-xl font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-deep)]">
          <span className="brand-mark__block px-2 py-1 rounded-md bg-[color:var(--accent)] text-[color:var(--accent-deep)] shadow-sm">
            Digital
          </span>
          <span>Degrowth</span>
        </div>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-2">
            {navItems.map((item) => (
              <NavigationMenuItem key={item}>
                <a href={`#${item.toLowerCase()}`}>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent hover:bg-accent/10 hover:text-accent-deep text-ink-soft uppercase tracking-[0.2em] text-[10px]"
                    )}
                  >
                    {item}
                  </NavigationMenuLink>
                </a>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <Button
            asChild
            variant="default"
            className="bg-[color:var(--accent)] text-[color:var(--accent-deep)] hover:bg-[color:var(--accent-strong)] rounded-xl uppercase tracking-widest text-[10px] font-bold px-6"
          >
            <a href="#buy">Buy Now</a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

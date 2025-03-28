import { shadow } from "@/app/styles/utils"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button";
import DarkModeToggle from "./ui/darkmodetoggle";
import LogOutButton from "./LogOutButton";
import { getUser } from "@/auth/server";

const Header = async () => {
  const user = await getUser();

  return (
    <header className="bg-popover relative flex h-24 w-full items-center justify-between px-3 sm:px-8"
      style={{
        boxShadow: shadow,
      }}
    >
      <Link className="flex items-end gap-2" href="/">
        <Image
          className="rounded-full"
          src="/logo.png"
          alt="logo"
          width={60}
          height={60}
          priority
        />
        <h1 className="flex flex-col pb-1 text-2xl font-semibold leading-6">Notes <span>GPT</span></h1>
      </Link>

      <div className="flex gap-4">
        {user ? (
          <LogOutButton />
        ) : (
          <>
            <Button asChild>
              <Link href="/sign-up" className="hidden sm:block">Sign Up</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          </>
        )}
        <DarkModeToggle />
      </div>

    </header>
  )
}

export default Header
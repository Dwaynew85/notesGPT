"use client";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { logOutAction } from "@/actions/users";

const LogOutButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true)

    const { errorMessage } = await logOutAction();

    if (!errorMessage) {
      toast.success("Logged out successfully")
      router.push("/")
    } else {
      toast.error(errorMessage)
    }

    setLoading(false)

  }

  return (
    <Button
      className="w-24"
      variant="outline"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  )
}

export default LogOutButton
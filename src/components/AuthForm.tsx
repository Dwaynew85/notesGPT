"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { loginAction, signUpAction } from "@/actions/users";

type AuthFormProps = {
  type: 'login' | 'signUp';
}
const AuthForm = ({ type }: AuthFormProps) => {
  const isLoginForm = type === 'login';

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      let errorMessage;
      let title;
      let description;

      if (isLoginForm) {
        errorMessage = (await loginAction(email, password)).errorMessage;
        title = "Logged in! ";
        description = "You have logged in successfully";
      } else {
        errorMessage = (await signUpAction(email, password)).errorMessage;
        title = "Signed up! ";
        description = "Check your email for confirmation link";
      }

      if (!errorMessage) {
        toast.success(title + description);
        router.replace("/");
      } else {
        toast.error(errorMessage);
      }
    })
  };

  return (
    <form action={handleSubmit}>
      <CardContent className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5 mb-3">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            disabled={isPending}
          />
        </div>
      </CardContent>
      <CardContent>
        <div className="flex flex-col space-y-1.5 mb-3">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Enter your password"
            disabled={isPending}
          />
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex flex-col gap-6">
        <Button className="w-full">
          {isPending ? <Loader2 className="animate-spin" /> : isLoginForm ? 'Login' : 'Sign Up'}
        </Button>
        <p className="text-xs">
          {isLoginForm ? "Don't have an account? " : "Already have an account? "}
          <Link
            href={isLoginForm ? "/sign-up" : "/login"}
            className={`text-blue-500 hover:underline ${isPending ? "pointer-events-none opacity-50" : ""}`}
          >
            {isLoginForm ? "Sign Up" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  )
}

export default AuthForm
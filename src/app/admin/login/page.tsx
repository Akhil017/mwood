"use client";

import ImageBackground from "@/components/image-background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginData, LoginSchema } from "@/lib/schema";
import { login } from "../_actions/auth";
import { prismaErrHandler } from "@/lib/utils";
import { useState } from "react";
import { Loader } from "lucide-react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginData) {
    setIsLoading(true);
    try {
      await login(data);
    } catch (error) {
      console.log({ error });
      prismaErrHandler(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ImageBackground>
      <div className="flex flex-col w-full sm:max-w-sm items-center justify-center h-[80vh] mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <div>
              <h2 className="text-2xl font-semibold">Admin Login</h2>
              <p className="text-muted-foreground text-xs">
                Enter your email and password below to login to your account.
              </p>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </div>
              ) : (
                "Log in"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </ImageBackground>
  );
}

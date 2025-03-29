'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Here you would normally redirect after successful login
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-black py-8 px-4 flex items-center justify-center">
      {/* Background effects - more subtle */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0,rgba(0,0,0,0)_70%)]" />
        
        {/* Grid pattern - more subtle */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      <div className="max-w-md w-full mx-auto relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
              Welcome Back
            </span>
          </h1>
          <p className="text-gray-400 text-sm">
            Login to your Clarylisk account to manage your creator profile<br />and track donations
          </p>
        </div>

        <Card className="bg-gray-900/70 border border-gray-800 shadow-xl overflow-hidden">
          <CardHeader className="border-b border-gray-800 bg-gray-900/80 py-4">
            <CardTitle className="text-white text-lg">Login</CardTitle>
            <CardDescription className="text-gray-400 text-sm">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="pt-6 pb-4 space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="username" className="text-white text-sm">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                  <Input 
                    id="username" 
                    placeholder="Enter your username" 
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white h-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-white text-sm">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password" 
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white h-10"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" className="border-gray-600 data-[state=checked]:bg-blue-600" />
                <Label htmlFor="remember" className="text-gray-300 text-xs font-normal">
                  Remember me for 30 days
                </Label>
              </div>
            </CardContent>

            <CardFooter className="border-t border-gray-800 bg-gray-900/80 pt-4 pb-5 flex flex-col">
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-10 mb-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>Login</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>
              
              <div className="text-center text-gray-400 text-xs">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-blue-400 hover:text-blue-300">
                  Register as Creator
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-6 text-center">
          <Link href="/">
            <Button 
              variant="outline" 
              className="bg-gray-900/50 border border-gray-800 text-gray-300 hover:bg-gray-800/50 text-sm px-4 py-2 h-9"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
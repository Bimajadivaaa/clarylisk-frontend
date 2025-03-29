'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Wallet, User, FileText, AtSign, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export default function RegisterPage() {
  const [formStep, setFormStep] = useState(0);

  const nextStep = () => {
    setFormStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setFormStep((prev) => prev - 1);
  };

  return (
    <main className="min-h-screen bg-black py-20 px-4 relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0,rgba(0,0,0,0)_70%)]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 mt-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
              Register as Creator
            </span>
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Join Clarylisk as a verified creator and start tracking your donations on the blockchain with complete transparency.
          </p>
        </div>

        <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-lg shadow-xl overflow-hidden">
          <CardHeader className="border-b border-white/10 bg-white/5">
            <CardTitle className="text-white">Creator Registration</CardTitle>
            <CardDescription className="text-white/60">
              Complete the form below to create your creator account
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <Tabs defaultValue="account" value={formStep === 0 ? "account" : formStep === 1 ? "profile" : "social"} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-800/50">
                <TabsTrigger 
                  value="account" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-700 data-[state=active]:to-blue-700 data-[state=active]:text-white"
                  onClick={() => setFormStep(0)}
                >
                  Account
                </TabsTrigger>
                <TabsTrigger 
                  value="profile" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-700 data-[state=active]:to-blue-700 data-[state=active]:text-white"
                  onClick={() => setFormStep(1)}
                >
                  Profile
                </TabsTrigger>
                <TabsTrigger 
                  value="social" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-700 data-[state=active]:to-blue-700 data-[state=active]:text-white"
                  onClick={() => setFormStep(2)}
                >
                  Social
                </TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username" className="text-white">
                      Username
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input 
                        id="username" 
                        placeholder="Enter your username" 
                        className="pl-10 bg-gray-800/50 border-white/10 text-white" 
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-white">
                      Password
                    </Label>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="Create a password" 
                        className="pl-10 bg-gray-800/50 border-white/10 text-white" 
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password" className="text-white">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input 
                        id="confirm-password" 
                        type="password" 
                        placeholder="Confirm your password" 
                        className="pl-10 bg-gray-800/50 border-white/10 text-white" 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={nextStep} 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    Next Step
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="profile" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="description" className="text-white">
                      Description
                    </Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Textarea 
                        id="description" 
                        placeholder="Tell us about yourself" 
                        className="pl-10 pt-2 bg-gray-800/50 border-white/10 min-h-32 text-white resize-none" 
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="wallet-address" className="text-white">
                      Wallet Address
                    </Label>
                    <div className="relative">
                      <Wallet className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input 
                        id="wallet-address" 
                        placeholder="Your ETH wallet address" 
                        className="pl-10 bg-gray-800/50 border-white/10 text-white" 
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="profile-image" className="text-white">
                      Profile Image URL
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input 
                        id="profile-image" 
                        placeholder="Link to your profile image" 
                        className="pl-10 bg-gray-800/50 border-white/10 text-white" 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button 
                    onClick={prevStep} 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Previous
                  </Button>
                  <Button 
                    onClick={nextStep} 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    Next Step
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="social" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="facebook" className="text-white">
                      Facebook
                    </Label>
                    <div className="relative">
                      <Facebook className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input 
                        id="facebook" 
                        placeholder="Your Facebook profile URL" 
                        className="pl-10 bg-gray-800/50 border-white/10 text-white" 
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="instagram" className="text-white">
                      Instagram
                    </Label>
                    <div className="relative">
                      <Instagram className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input 
                        id="instagram" 
                        placeholder="Your Instagram profile URL" 
                        className="pl-10 bg-gray-800/50 border-white/10 text-white" 
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="twitter" className="text-white">
                      Twitter
                    </Label>
                    <div className="relative">
                      <Twitter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input 
                        id="twitter" 
                        placeholder="Your Twitter profile URL" 
                        className="pl-10 bg-gray-800/50 border-white/10 text-white" 
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="youtube" className="text-white">
                      YouTube
                    </Label>
                    <div className="relative">
                      <Youtube className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input 
                        id="youtube" 
                        placeholder="Your YouTube channel URL" 
                        className="pl-10 bg-gray-800/50 border-white/10 text-white" 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button 
                    onClick={prevStep} 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Previous
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    Complete Registration
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="border-t border-white/10 bg-white/5 flex justify-between">
            <div className="text-white/60 text-sm mt-5">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-400 hover:underline">
                Login here
              </Link>
            </div>
            <div className="text-white/60 text-sm mt-5">
              Step {formStep + 1} of 3
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
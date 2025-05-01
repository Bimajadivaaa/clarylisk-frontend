"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wallet,
  User,
  FileText,
  AtSign,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useRegister } from "@/hooks/API/useRegister";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const {
    formData,
    formStep,
    isLoading,
    error,
    success,
    validationErrors,
    handleChange,
    handleImageChange,
    nextStep,
    prevStep,
    submitRegistration,
    setFormStep,
  } = useRegister();

  // Handle file upload for profile image
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Type assertion to string since we know it will be a string
        handleImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const result = await submitRegistration();
    if (result) {
      // Registration successful, redirect after a short delay
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
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
            Join Clarylisk as a verified creator and start tracking your
            donations on the blockchain with complete transparency.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-md text-white">
            Registration successful! Redirecting to login page...
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-md text-white">
            {error}
          </div>
        )}

        <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-lg shadow-xl overflow-hidden">
          <CardHeader className="border-b border-white/10 bg-white/5">
            <CardTitle className="text-white">Creator Registration</CardTitle>
            <CardDescription className="text-white/60">
              Complete the form below to create your creator account
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <Tabs
              defaultValue="account"
              value={
                formStep === 0
                  ? "account"
                  : formStep === 1
                    ? "profile"
                    : "social"
              }
              className="w-full"
            >
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
                        className={`pl-10 bg-gray-800/50 border-white/10 text-white ${validationErrors.username ? "border-red-500" : ""}`}
                        value={formData.username}
                        onChange={handleChange}
                      />
                    </div>
                    {validationErrors.username && (
                      <p className="text-sm text-red-500">
                        {validationErrors.username}
                      </p>
                    )}
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
                        className={`pl-10 bg-gray-800/50 border-white/10 text-white ${validationErrors.password ? "border-red-500" : ""}`}
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    {validationErrors.password && (
                      <p className="text-sm text-red-500">
                        {validationErrors.password}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword" className="text-white">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        className={`pl-10 bg-gray-800/50 border-white/10 text-white ${validationErrors.confirmPassword ? "border-red-500" : ""}`}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                    {validationErrors.confirmPassword && (
                      <p className="text-sm text-red-500">
                        {validationErrors.confirmPassword}
                      </p>
                    )}
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
                        className={`pl-10 pt-2 bg-gray-800/50 border-white/10 min-h-32 text-white resize-none ${validationErrors.description ? "border-red-500" : ""}`}
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                    {validationErrors.description && (
                      <p className="text-sm text-red-500">
                        {validationErrors.description}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="walletAddress" className="text-white">
                      Wallet Address
                    </Label>
                    <div className="relative">
                      <Wallet className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="walletAddress"
                        placeholder="Your ETH wallet address"
                        className={`pl-10 bg-gray-800/50 border-white/10 text-white ${validationErrors.walletAddress ? "border-red-500" : ""}`}
                        value={formData.walletAddress}
                        onChange={handleChange}
                      />
                    </div>
                    {validationErrors.walletAddress && (
                      <p className="text-sm text-red-500">
                        {validationErrors.walletAddress}
                      </p>
                    )}
                  </div>

                  {/* Enhanced Image Upload Component */}
                  <div className="grid gap-3">
                    <Label htmlFor="image" className="text-white">
                      Profile Image
                    </Label>

                    <div className="relative">
                      {formData.image ? (
                        <div className="mb-3 flex items-center gap-4">
                          <div className="h-24 w-24 rounded-full border-2 border-purple-500 overflow-hidden bg-gray-800 flex items-center justify-center">
                            <img
                              src={formData.image}
                              alt="Profile preview"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-green-400 text-sm">
                              Image uploaded successfully
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleImageChange("")}
                              className="border-white/20 text-black hover:bg-gray-800 hover:text-white mt-1 w-32"
                            >
                              Remove Image
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-3 flex items-center justify-center">
                          <div className="h-24 w-24 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center bg-gray-800/50">
                            <User className="h-10 w-10 text-gray-400" />
                          </div>
                        </div>
                      )}

                      <label htmlFor="image-upload" className="cursor-pointer">
                        <div className="flex items-center gap-2 p-4 border border-dashed border-white/30 rounded-md bg-gray-800/50 hover:bg-gray-800/80 transition-colors">
                          <div className="bg-gray-700/50 rounded-full p-2">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-purple-400"
                            >
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="17 8 12 3 7 8"></polyline>
                              <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white">
                              Upload your profile image
                            </p>
                            <p className="text-xs text-gray-400">
                              Click to browse or drag and drop
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              JPG, PNG, GIF up to 5MB
                            </p>
                          </div>
                        </div>
                      </label>

                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    className="border-white/20 text-black hover:bg-gray-800 hover:text-white"
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
                        placeholder="Your Facebook profile URL (optional)"
                        className="pl-10 bg-gray-800/50 border-white/10 text-white"
                        value={formData.facebook}
                        onChange={handleChange}
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
                        placeholder="Your Instagram profile URL (optional)"
                        className="pl-10 bg-gray-800/50 border-white/10 text-white"
                        value={formData.instagram}
                        onChange={handleChange}
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
                        placeholder="Your Twitter profile URL (optional)"
                        className="pl-10 bg-gray-800/50 border-white/10 text-white"
                        value={formData.twitter}
                        onChange={handleChange}
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
                        placeholder="Your YouTube channel URL (optional)"
                        className="pl-10 bg-gray-800/50 border-white/10 text-white"
                        value={formData.youtube}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    className="border-white/20 text-black hover:bg-gray-800 hover:text-white"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Complete Registration"
                    )}
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

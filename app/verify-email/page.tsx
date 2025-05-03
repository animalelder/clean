"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function VerifyEmailPage(): JSX.Element {
  // State for managing the resend email functionality
  const [isResending, setIsResending] = useState<boolean>(false)
  const [resendSuccess, setResendSuccess] = useState<boolean>(false)

  /**
   * Handles the resending of verification email
   * Simulates an API call with loading state and success feedback
   */
  const handleResendEmail = async (): Promise<void> => {
    setIsResending(true)

    try {
      // Simulate API call delay
      await new Promise<void>((resolve) => setTimeout(resolve, 1500))
      
      setIsResending(false)
      setResendSuccess(true)

      // Reset success message after 5 seconds
      setTimeout(() => setResendSuccess(false), 5000)
    } catch (error) {
      // In a real application, you'd handle errors here
      setIsResending(false)
      console.error('Failed to resend verification email:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md overflow-hidden">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50">
              <Mail className="w-8 h-8 text-blue-500" />
            </div>
            <CardTitle className="text-2xl font-bold">Verify your email</CardTitle>
            <CardDescription className="text-gray-500">
              We&#39;ve sent a verification link to your email address
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="text-sm text-center text-gray-600">
              <p>Before continuing, please check your email inbox and click on the verification link we sent you.</p>
              <p className="mt-2">
                If you don&#39;t see the email, check your spam folder or request a new verification link.
              </p>
            </div>

            {resendSuccess && (
              <Alert className="text-green-800 border-green-200 bg-green-50">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <AlertDescription>Verification email resent successfully!</AlertDescription>
              </Alert>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-3">
            <Button
              onClick={handleResendEmail}
              disabled={isResending || resendSuccess}
              className="w-full text-white bg-primary-red hover:bg-red-700"
            >
              {isResending ? "Sending..." : "Resend verification email"}
            </Button>
            
            <Link href="/signin" className="w-full">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to sign in
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
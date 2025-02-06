"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PaymentForm = () => {
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiration, setCardExpiration] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardPostal, setCardPostal] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [saveCardInfo, setSaveCardInfo] = useState(false);

  const originalPrice = 99;
  const [finalPrice, setFinalPrice] = useState(originalPrice);
  const [isDiscounted, setIsDiscounted] = useState(false);

  useEffect(() => {
    // Initialize Square
    initializeSquare();
  }, []);

  const initializeSquare = async () => {
    if (!window.Square) {
      const script = document.createElement("script");
      script.src = "https://sandbox.web.squarecdn.com/v1/square.js";
      script.onload = () => console.log("Square SDK loaded");
      document.body.appendChild(script);
    }
  };

  const validateDiscountCode = (code) => {
    const discountCodes = {
      ZION: 100,
      CLEAN50: 50,
      SALE25: 25,
      WELCOME10: 10,
      DONOVAN: 59.6,
    };

    const upperCode = code.toUpperCase();
    if (discountCodes.hasOwnProperty(upperCode)) {
      const discountPercent = discountCodes[upperCode];
      const discountedPrice = Number(
        originalPrice * ((100 - discountPercent) / 100),
      ).toFixed(2);
      setFinalPrice(discountedPrice);
      setIsDiscounted(true);
    } else {
      setFinalPrice(originalPrice);
      setIsDiscounted(false);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentStatus("");

    try {
      // In a real implementation, you would use Square's SDK to tokenize the card
      // and send the token to your server. For this example, we'll simulate the process.

      const simulatePayment = () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() > 0.2) {
              resolve({ status: "success" });
            } else {
              reject(new Error("Payment failed"));
            }
          }, 2000);
        });
      };

      const result = await simulatePayment();

      if (result.status === "success") {
        setPaymentStatus("Payment successful!");
        setEmail("");
        setCardNumber("");
        setCardExpiration("");
        setCardCvv("");
        setCardPostal("");
        setDiscountCode("");
      } else {
        setPaymentStatus("Payment failed. Please try again.");
      }
    } catch (error) {
      setPaymentStatus("Payment failed: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 mt-20 bg-gray-50">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Complete Your Purchase & Sign Up!</CardTitle>
          <CardDescription>
            Secure payment processing with Square
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handlePayment} className="space-y-6">
            <Label className="text-xl">User Information</Label>
            <p>
              This is the login information you will use to access the online
              platform once the payment is processed
            </p>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Y0uC@nG3tCl3@n2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">Confirm Password</Label>
              <Input
                id="passwordConfirm"
                type="password"
                placeholder="Y0uC@nG3tCl3@n2"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="p-1 border rounded-md bg-primary-red"></div>

            <div className="space-y-4">
              <Label className="text-xl">Card Details</Label>
              <p>
                This is the card information you will use to pay for the plan;
                please check the box if you&apos;d like to save the card for
                future donations.
              </p>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="card-expiration">Expiration Date</Label>
                    <Input
                      id="card-expiration"
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiration}
                      onChange={(e) => setCardExpiration(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="card-cvv">CVV</Label>
                    <Input
                      id="card-cvv"
                      type="text"
                      placeholder="123"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="card-postal">ZIP Code</Label>
                  <Input
                    id="card-postal"
                    type="text"
                    placeholder="12345"
                    value={cardPostal}
                    onChange={(e) => setCardPostal(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount">Discount Code</Label>
              <Input
                id="discount"
                type="text"
                placeholder="Enter code"
                value={discountCode}
                onChange={(e) => {
                  setDiscountCode(e.target.value);
                  validateDiscountCode(e.target.value);
                }}
                className="w-full"
              />
            </div>

            <div className="mt-6 text-center">
              <p className="text-lg font-semibold">
                {isDiscounted ? (
                  <>
                    <span className="text-gray-400 line-through">
                      ${originalPrice}
                    </span>
                    <span className="ml-2 text-green-600">${finalPrice}</span>
                  </>
                ) : (
                  <span>${originalPrice}</span>
                )}
              </p>
            </div>

            {paymentStatus && (
              <div
                className={`text-center ${paymentStatus.includes("successful") ? "text-green-600" : "text-red-600"}`}
              >
                {paymentStatus}
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={setAgreedToTerms}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link href="/Terms">
                  <span className="text-primary-red hover:text-red-800 hover:underline hover:underline-offset-2 hover:decoration-primary-red ">
                    terms and conditions
                  </span>
                </Link>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={setSaveCardInfo}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I&apos;d like to save my card info for future donations.
              </label>
            </div>
          </form>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-primary-red hover:bg-red-800 "
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentForm;

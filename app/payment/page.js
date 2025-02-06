"use client";

import React, { useState } from "react";
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

const PaymentForm = () => {
  // State management for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Price management
  const originalPrice = 99;
  const [finalPrice, setFinalPrice] = useState(originalPrice);
  const [isDiscounted, setIsDiscounted] = useState(false);

  // Simulated discount code validation
  const validateDiscountCode = (code) => {
    // Create an object to store valid discount codes and their corresponding discount percentages
    const discountCodes = {
      ZION: 100, // 100% off - makes it free
      CLEAN50: 50, // 50% off
      SALE25: 25, // 25% off
      WELCOME10: 10, // 10% off
      DONOVAN: 59.6,
    };

    // Convert the input code to uppercase to make validation case-insensitive
    const upperCode = code.toUpperCase();

    // Check if the entered code exists in our valid codes
    if (discountCodes.hasOwnProperty(upperCode)) {
      // Calculate the discounted price
      // First get the discount percentage from our object
      const discountPercent = discountCodes[upperCode];

      // Calculate the final price by subtracting the discount
      // For example, if discount is 25%, multiply price by (100-25)/100 = 0.75
      const discountedPrice = Number(
        originalPrice * ((100 - discountPercent) / 100),
      ).toFixed(2);

      // Update the state with the new price and mark as discounted
      setFinalPrice(discountedPrice);
      setIsDiscounted(true);
    } else {
      // If code isn't valid, reset to original price
      setFinalPrice(originalPrice);
      setIsDiscounted(false);
    }
  };

  // Simulated payment processing
  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate API call to payment processor
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real application, you would make an API call here
      console.log("Payment processed", {
        email,
        amount: finalPrice,
        discountApplied: isDiscounted,
      });

      // Reset form
      setEmail("");
      setPassword("");
      setDiscountCode("");
      setIsProcessing(false);
    } catch (error) {
      console.error("Payment failed:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Complete Your Purchase</CardTitle>
          <CardDescription>Secure payment processing</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handlePayment} className="space-y-6">
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
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
          </form>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full"
          >
            {isProcessing ? "Processing..." : "Confirm Payment"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentForm;

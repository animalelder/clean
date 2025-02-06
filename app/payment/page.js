"use client";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const originalPrice = 99;
  const [finalPrice, setFinalPrice] = useState(originalPrice);
  const [isDiscounted, setIsDiscounted] = useState(false);

  // Discount code validation logic remains the same
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
      const response = await fetch(
        "https://connect.squareupsandbox.com/v2/payments",
        {
          method: "POST",
          headers: {
            "Square-Version": "2025-01-23",
            Authorization:
              "Bearer EAAAl4mdsMBgGm3kqrw4TnDWU8CmwqGutwczivJD1VqmmX_5aLY8fpdM_9U7VEUt",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount_money: {
              amount: Math.round(finalPrice * 100), // Convert to cents
              currency: "USD",
            },
            idempotency_key: uuidv4(),
            source_id: "cnon:card-nonce-ok", // In production, this would come from Square.js
            email: email,
          }),
        },
      );

      const result = await response.json();

      if (response.ok) {
        setPaymentStatus("Payment successful!");
        // Reset form
        setEmail("");
        setCardNumber("");
        setExpiryDate("");
        setCvv("");
        setDiscountCode("");
      } else {
        setPaymentStatus(
          `Payment failed: ${result.errors?.[0]?.detail || "Unknown error"}`,
        );
      }
    } catch (error) {
      setPaymentStatus("Payment failed: Network error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Complete Your Purchase</CardTitle>
          <CardDescription>
            Secure payment processing with Square
          </CardDescription>
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
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                  className="w-full"
                />
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
                className={`text-center ${
                  paymentStatus.includes("successful")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {paymentStatus}
              </div>
            )}
          </form>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-primary-red hover:bg-red-800"
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentForm;

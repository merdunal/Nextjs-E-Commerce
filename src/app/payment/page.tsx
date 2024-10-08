"use client";
// src/app/payment/page.tsx
import React, { useState } from "react";
import OrderSummary from "@/components/OrderSummary";
import DeliveryInfoForm from "@/components/DeliveryInformationForm";
import FormPayment from "@/components/FormPayment"; // Import your FormPayment component

const PaymentPage = () => {
  const [isDeliveryInfoSubmitted, setIsDeliveryInfoSubmitted] = useState(false);

  // Function to handle the submission of the delivery info
  const handleDeliveryInfoSubmit = () => {
    setIsDeliveryInfoSubmitted(true);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Delivery Info Form or FormPayment based on state */}
        <div className="lg:col-span-7">
          {isDeliveryInfoSubmitted ? (
            <FormPayment />
          ) : (
            <DeliveryInfoForm onSubmit={handleDeliveryInfoSubmit} />
          )}
        </div>

        {/* Right column: Order Summary */}
        <div className="lg:col-span-5">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

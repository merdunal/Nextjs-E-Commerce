"use client"
// src/app/payment/page.tsx
import OrderSummary from "@/components/OrderSummary";
import DeliveryInfoForm from "@/components/DeliveryInformationForm";

const PaymentPage = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Delivery Info Form */}
        <div className="lg:col-span-7">
          <DeliveryInfoForm />
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

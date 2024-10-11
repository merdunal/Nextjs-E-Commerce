'use client';

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { useRouter } from 'next/navigation'; // Import useRouter

const FormPayment = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expireMonth, setExpireMonth] = useState('');
    const [expireYear, setExpireYear] = useState('');
    const [cvc, setCvc] = useState('');
    const [holderName, setHolderName] = useState('');
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter(); // Initialize useRouter

    const paymentMutation = trpc.payment.createPayment.useMutation({
        onSuccess: (data) => {
            setResponse(data);
            setError(null);
            toast.success("Ödeme Başarılı!");
            router.push("/thank-you"); // Redirect to success page on success
        },
        onError: (err) => {
            setError(err.message);
            toast.error("Ödeme Başarısız.");
        }
    });

    const handlePayment = async () => {
        const paymentCard = {
            cardHolderName: holderName,
            cardNumber: cardNumber,
            expireMonth: expireMonth,
            expireYear: expireYear,
            cvc: cvc,
            registerCard: '0'
        };

        const paymentData = {
            price: '0.3',
            paidPrice: '0.3',
            currency: 'TRY',
            basketId: 'B67832',
            paymentCard: paymentCard,
            buyer: {
                id: 'BY789',
                name: holderName,
                surname: 'Akkaya',
                gsmNumber: '+905350000000',
                email: 'john.doe@example.com',
                identityNumber: '74300864791',
                lastLoginDate: '2015-10-05 12:43:35',
                registrationDate: '2013-04-21 15:12:09',
                registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                ip: '85.34.78.112',
                city: 'Istanbul',
                country: 'Turkey',
                zipCode: '34732'
            },
            shippingAddress: {
                contactName: 'Jane Doe',
                city: 'Istanbul',
                country: 'Turkey',
                address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                zipCode: '34742'
            },
            billingAddress: {
                contactName: 'Jane Doe',
                city: 'Istanbul',
                country: 'Turkey',
                address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                zipCode: '34742'
            },
            basketItems: [
                {
                    id: 'BI101',
                    name: 'Binocular',
                    category1: 'Collectibles',
                    category2: 'Accessories',
                    itemType: 'PHYSICAL',
                    price: '0.3'
                }
            ]
        };

        await paymentMutation.mutateAsync(paymentData);
    };

    return (
        <div className="space-y-4 p-6 bg-gray-50 border shadow-lg rounded-lg">
            <h2 className="text-lg font-medium text-gray-900">Ödeme Formu</h2>
            <div className="flex flex-col gap-4">
                <Input
                    type="text"
                    placeholder="Kart Sahibi"
                    value={holderName}
                    onChange={(e) => setHolderName(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Kart Numarası"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                />
                <div className="flex gap-4">
                    <Input
                        type="text"
                        placeholder="Son Kullanma Ayı"
                        value={expireMonth}
                        onChange={(e) => setExpireMonth(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Son Kullanma Yılı"
                        value={expireYear}
                        onChange={(e) => setExpireYear(e.target.value)}
                    />
                </div>
                <Input
                    type="text"
                    placeholder="CVC"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                />
                <div className="mt-6 flex justify-center">
                    <Button onClick={handlePayment}>Ödeme Yap</Button>
                </div>
            </div>
            {error && (
                <div className="bg-red-200 border-2 rounded-lg p-4">
                    <h2>Hata:</h2>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}

export default FormPayment;

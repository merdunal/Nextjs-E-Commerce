// src/components/DeliveryInformationForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DeliveryInfoValidator,
  TDeliveryInfoValidator,
} from "@/lib/validators/delivery-info-validator"; // Import the Delivery Info Validator
import * as z from "zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button } from "@/components/ui/button";

// Define the props interface
interface DeliveryInfoFormProps {
  onSubmit: (data: TDeliveryInfoValidator) => void; // Accept form data
}

const DeliveryInfoForm: React.FC<DeliveryInfoFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TDeliveryInfoValidator>({
    resolver: zodResolver(DeliveryInfoValidator),
  });

  const citiesOfTurkey = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara",
    "Antalya", "Ardahan", "Artvin", "Aydın", "Balıkesir", "Bartın", "Batman",
    "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa",
    "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce",
    "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep",
    "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta", "İstanbul",
    "İzmir", "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu",
    "Kayseri", "Kırıkkale", "Kırklareli", "Kırşehir", "Kilis", "Kocaeli",
    "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla",
    "Muş", "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya",
    "Samsun", "Siirt", "Sinop", "Sivas", "Şanlıurfa", "Şırnak", "Tekirdağ",
    "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak",
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)} // Pass onSubmit function to handleSubmit
      className="space-y-4 p-6 bg-gray-50 border shadow-lg rounded-lg"
    >
      <h2 className="text-lg font-medium text-gray-900">Teslimat Bilgileri</h2>

      {/* Name and Surname Side by Side */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            İsim
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Adınızı girin"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
            Soyisim
          </label>
          <input
            type="text"
            id="surname"
            {...register("surname")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Soyadınızı girin"
          />
          {errors.surname && (
            <p className="text-red-600 text-sm">{errors.surname.message}</p>
          )}
        </div>
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Telefon Numarası
        </label>
        <PhoneInput
          country={"tr"}
          inputProps={{
            name: "phone",
            required: true,
          }}
          onChange={(value) => setValue("phone", value)}
          containerClass="mt-1"
          inputClass="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        {errors.phone && (
          <p className="text-red-600 text-sm">{errors.phone.message}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Adres
        </label>
        <input
          type="text"
          id="address"
          {...register("address")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="Adresinizi girin"
        />
        {errors.address && (
          <p className="text-red-600 text-sm">{errors.address.message}</p>
        )}
      </div>

      {/* City Dropdown */}
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          Şehir
        </label>
        <select
          id="city"
          {...register("city")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="">Şehir seçin</option>
          {citiesOfTurkey.map((cityName) => (
            <option key={cityName} value={cityName}>
              {cityName}
            </option>
          ))}
        </select>
        {errors.city && (
          <p className="text-red-600 text-sm">{errors.city.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-center">
        <Button type="submit">
          Devam Et
        </Button>
      </div>
    </form>
  );
};

export default DeliveryInfoForm;

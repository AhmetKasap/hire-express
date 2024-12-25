"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm, Controller } from "react-hook-form";
import Cookies from "js-cookie";
import { createHostService } from "@/services/Host";

const AddHost = () => {
  const token = Cookies.get("token");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [images, setImages] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog kontrolü

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));

    images.forEach((image) => formData.append("images", image));

    const result = await createHostService(formData, token);
    if (result.success) {
      setIsDialogOpen(false); // Dialog'u kapat
      window.location.reload(); // Sayfayı yenile
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        className="bg-black hover:bg-white hover:text-black border text-white px-4 p-3 rounded-lg xsm:w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/10 xl:w-1/8"
        onClick={() => setIsDialogOpen(true)}
      >
        Yeni Bir Host Ekle
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yeni Bir Host Ekle</DialogTitle>
          <DialogDescription>
            Hostinginizi listelemek için aşağıdaki bilgileri doldurun.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Ülke</label>
            <input
              type="text"
              {...register("location.country", {
                required: "ülke is required",
              })}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.location?.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.country.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Şehir</label>
            <input
              type="text"
              {...register("location.city", {
                required: "şehir is required",
              })}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.location?.city && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.city.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">İlçe</label>
            <input
              type="text"
              {...register("location.state", {
                required: "ilçe is required",
              })}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.location?.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.state.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Host Tipi
            </label>
            <Controller
              name="hostType"
              control={control}
              defaultValue=""
              rules={{ required: "Host Type is required" }}
              render={({ field }) => (
                <select
                  {...field}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Host Tipi Seçin</option>
                  <option value="ev">Ev</option>
                  <option value="otel">Otel</option>
                  <option value="oda">Oda</option>
                </select>
              )}
            />
            {errors.hostType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.hostType.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kaç Kişi Konaklayabilir
            </label>
            <input
              type="number"
              {...register("numberOfGuests", {
                required: "Number of Guests is required",
                min: {
                  value: 1,
                  message: "At least one guest is required",
                },
              })}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.numberOfGuests && (
              <p className="text-red-500 text-sm mt-1">
                {errors.numberOfGuests.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ücret</label>
            <input
              type="number"
              {...register("price", {
                required: "Price is required",
                min: {
                  value: 0,
                  message: "Price cannot be negative",
                },
              })}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Açıklama</label>
            <textarea
              {...register("explanation", {
                required: "Explanation is required",
              })}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.explanation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.explanation.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fotoğraflar
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-red-500"
          >
            İlanı Oluşturun
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddHost;

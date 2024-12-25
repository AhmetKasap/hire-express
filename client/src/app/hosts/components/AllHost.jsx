'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const AllHost = () => {
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/v1/hosts');
        if (response.data.success) {
          setHosts(response.data.data); // Hosts data'yı al
        } else {
          setError("Host verileri alınamadı.");
        }
      } catch (err) {
        setError("Host verileri alınırken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchHosts();
  }, []);

  if (loading) {
    return <div className="text-center py-6">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Hostlar</h1>
      {hosts.length === 0 ? (
        <p className="text-center text-gray-500">Herhangi bir host bulunamadı.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hosts.map((host) => (
            <div
              key={host._id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="relative">
                <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
                  {host.images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={`http://localhost:5000/uploads/hosts/${image}`}
                        alt={`Host Image ${index + 1}`}
                        className="w-full object-cover h-64"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {host.location.city}, {host.location.country}
                </h2>
                <p className="text-gray-600 text-sm">
                  <span className="font-bold">İlçe:</span> {host.location.state}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-bold">Host Tipi:</span> {host.hostType}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-bold">Kişi Sayısı:</span> {host.numberOfGuests}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-bold">Ücret:</span> {host.price}₺ / Gece
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-bold">Açıklama:</span> {host.explanation}
                </p>
                <p
                  className={`mt-2 inline-block rounded px-3 py-1 text-sm font-medium ${
                    host.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {host.status === 'active' ? 'Aktif' : 'Pasif'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllHost;

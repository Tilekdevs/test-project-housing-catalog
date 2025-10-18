import { useState } from 'react';

interface ListingPhotosProps {
  photos: string[];
}

export function ListingPhotos({ photos }: ListingPhotosProps) {
  const [mainPhoto, setMainPhoto] = useState(photos[0] || null);

  return (
    <div>
      <img
        src={mainPhoto ? `http://localhost:4000${mainPhoto}` : 'https://placehold.co/600x400'}
        alt="Main photo"
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {photos.map((photo, i) => (
            <img
              key={i}
              src={`http://localhost:4000${photo}`}
              alt={`Photo ${i + 1}`}
              onClick={() => setMainPhoto(photo)}
              className={`w-24 h-16 object-cover rounded cursor-pointer border 
                ${mainPhoto === photo ? 'border-blue-500' : 'border-transparent'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
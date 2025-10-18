export interface Listing {
  id: string;
  title: string;
  city: string;
  rating: number;
  pricePerNight: number;
  description: string;
  photos: string[];
  amenities: string[];
  bookingsCount: number;
  thumbnailUrl: string;
  price: number;
}

export interface Booking {
  checkIn: string;
  checkOut: string;
  listingId: string;
  guests: number;
}
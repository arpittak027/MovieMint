export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  date: string;
  userName?: string; 
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  language: string;
  duration: string;
  rating: string; 
  category: string;
  cast: string[];
  director: string;
  releaseDate: string;
  posterUrl: string;
  backdrop?: string;
  genres?: string[];
  trailer?: string;
  reviews: Review[];
  prices?: PriceStructure;
}

export interface PriceStructure {
  standard: number;
  vip: number;
  premium: number;
}

export interface MovieShowtime {
  movieId: string;
  showTimes: string[];
  price: PriceStructure;
}

export interface CinemaHall {
  id: string;
  name: string;
  features: string[];
  movies: MovieShowtime[];
}

export interface City {
  id: string;
  name: string;
  cinemaHalls: CinemaHall[];
}

export interface State {
  id: string;
  name: string;
  cities: City[];
}

export interface MovieCategory {
  id: string;
  name: string;
  movies: Movie[];
}

export interface Seat {
  id: string;
  row: number;
  number: number;
  type: 'standard' | 'vip' | 'premium';
  isBooked: boolean;
  price: number;
}

export interface LocationState {
  selectedState: string;
  selectedCity: string;
  selectedCinemaHall: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  wishlist: string[];
  bookings: Array<{
    bookingId: string;
    movieTitle: string;
    showtime: string;
    selectedSeats: Array<{
      id: string;
      row: number;
      number: number;
      type: string;
      price: number;
    }>;
    totalAmount: number;
    paymentInfo: {
      paymentId: string;
      timestamp: string;
      cardNumber: string;
      phone: string;
    };
  }>;
}

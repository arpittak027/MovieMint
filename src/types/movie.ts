export interface Movie {
  id: string;
  title: string;
  description: string;
  language: string;
  cast: string[];
  price: {
    standard: number;
    vip: number;
    premium: number;
  };
  category: MovieCategory;
  showTimes: string[];
  posterUrl?: string;
  trailerUrl?: string;
  rating?: number;
  duration?: string;
  releaseDate?: string;
}

export type MovieCategory = 'Action' | 'Drama' | 'Comedy' | 'Horror' | 'Romance';

export interface CinemaHall {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
    address: string;
  };
  screens: number;
  amenities: string[];
  movies: Movie[];
}

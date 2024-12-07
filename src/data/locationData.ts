import { State, Movie } from '../types/movieTypes';
import { movies } from './moviesData';

export const states: State[] = [
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    cities: [
      {
        id: 'mumbai',
        name: 'Mumbai',
        cinemaHalls: [
          {
            id: 'pvr-juhu',
            name: 'PVR Cinemas, Juhu',
            features: ['IMAX', 'Dolby Atmos', 'Recliner'],
            movies: [
              {
                movieId: '1',
                showTimes: ['10:00 AM', '1:30 PM', '5:00 PM', '8:30 PM'],
                price: {
                  standard: 250,
                  vip: 450,
                  premium: 650,
                },
              },
              {
                movieId: '2',
                showTimes: ['9:30 AM', '12:30 PM', '4:00 PM', '7:30 PM'],
                price: {
                  standard: 220,
                  vip: 350,
                  premium: 550,
                },
              },
            ],
          },
          {
            id: 'inox-malad',
            name: 'INOX Malad',
            features: ['4DX', 'Dolby Atmos'],
            movies: [
              {
                movieId: '1',
                showTimes: ['11:00 AM', '2:30 PM', '6:00 PM', '9:30 PM'],
                price: {
                  standard: 200,
                  vip: 400,
                  premium: 600,
                },
              },
              {
                movieId: '2',
                showTimes: ['10:30 AM', '2:00 PM', '5:30 PM', '9:00 PM'],
                price: {
                  standard: 180,
                  vip: 380,
                  premium: 580,
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

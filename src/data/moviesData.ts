import { Movie, State } from '../types/movieTypes';

export const movies: Movie[] = [
  // Action Movies
  {
    id: 'action-1',
    title: 'Avengers: Endgame',
    description: 'The epic conclusion to the Infinity Saga that became a global phenomenon.',
    language: 'English',
    duration: 182, // 3h 2m converted to 182 minutes
    rating: 4.9,
    category: 'Action',
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo'],
    director: 'Russo Brothers',
    releaseDate: '2019-04-26',
    posterUrl: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=TcMBFSGVi1c',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    reviews: [
      {
        id: 'rev-a1-1',
        userId: 'SuperHeroFan99',
        rating: 5,
        comment: 'A perfect conclusion to the saga. The action, the emotions, and the way everything came together was just spectacular. Truly a masterpiece.',
        date: '2023-01-01'
      },
      {
        id: 'rev-a1-2',
        userId: 'MovieBuff_123',
        rating: 4.8,
        comment: 'The final battle was absolutely thrilling! The visual effects were beyond impressive, and the stakes were sky-high. A must-watch for any Marvel fan.',
        date: '2023-01-02'
      }
    ]
  },
  {
    id: 'action-2',
    title: 'Mad Max: Fury Road',
    description: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search of her homeland.',
    language: 'English',
    duration: 120, // 2h converted to 120 minutes
    rating: 4.8,
    category: 'Action',
    cast: ['Tom Hardy', 'Charlize Theron'],
    director: 'George Miller',
    releaseDate: '2015-05-15',
    posterUrl: 'https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=hEJnMQG9ev8',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    reviews: [
      {
        id: 'rev-a2-1',
        userId: 'RoadWarriorX',
        rating: 4.9,
        comment: 'Intense, adrenaline-pumping action from start to finish. Furiosa is an absolute badass, and the world-building is incredible.',
        date: '2023-01-03'
      },
      {
        id: 'rev-a2-2',
        userId: 'ChaosKing',
        rating: 4.7,
        comment: 'Visually stunning and raw. This film is a rollercoaster of action with no time to breathe. A must-see for fans of post-apocalyptic cinema.',
        date: '2023-01-04'
      }
    ]
  },
  {
    id: 'action-3',
    title: 'RRR',
    description: 'A tale of two legendary revolutionaries and their journey far away from home.',
    language: 'Telugu',
    duration: 182, // 3h 2m converted to 182 minutes
    rating: 4.8,
    category: 'Action',
    cast: ['N.T. Rama Rao Jr.', 'Ram Charan'],
    director: 'S.S. Rajamouli',
    releaseDate: '2022-03-24',
    posterUrl: 'https://image.tmdb.org/t/p/w500/nEufeZlyAOLqO2brrs0yeF1lgXO.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=QD5AeAeQc7I',
    genres: ['Action', 'Drama'],
    reviews: [
      {
        id: 'rev-a3-1',
        userId: 'IndianCinemaLover',
        rating: 5,
        comment: 'RRR is a true cinematic spectacle! The fight sequences were jaw-dropping, and the emotional depth was surprisingly powerful. A fantastic film!',
        date: '2023-01-05'
      },
      {
        id: 'rev-a3-2',
        userId: 'Suryan_123',
        rating: 4.6,
        comment: 'A celebration of Indian cinema! The action scenes were incredibly well-choreographed, and the bond between the two leads was heartwarming.',
        date: '2023-01-06'
      }
    ]
  },
  {
    id: 'action-4',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    language: 'English',
    duration: 152, // 2h 32m converted to 152 minutes
    rating: 4.9,
    category: 'Action',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    director: 'Christopher Nolan',
    releaseDate: '2008-07-18',
    posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
    genres: ['Action', 'Crime', 'Drama'],
    reviews: [
      {
        id: 'rev-a4-1',
        userId: 'GothamKnight',
        rating: 5,
        comment: 'Heath Ledger\'s portrayal of the Joker is iconic. This film perfectly balances action and deep storytelling. One of the greatest superhero films ever made.',
        date: '2023-01-07'
      },
      {
        id: 'rev-a4-2',
        userId: 'BatmanFanX',
        rating: 4.9,
        comment: 'An absolute masterpiece! Christopher Nolan brings a darker, more grounded version of Batman, and it works brilliantly. Ledger\'s Joker is unforgettable.',
        date: '2023-01-08'
      }
    ]
  },
  {
    id: 'action-5',
    title: 'John Wick: Chapter 4',
    description: 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy.',
    language: 'English',
    duration: 169, // 2h 49m converted to 169 minutes
    rating: 4.7,
    category: 'Action',
    cast: ['Keanu Reeves', 'Donnie Yen', 'Bill Skarsgård'],
    director: 'Chad Stahelski',
    releaseDate: '2023-03-24',
    posterUrl: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=UvH_0c8aKQk',
    genres: ['Action', 'Thriller', 'Crime'],
    reviews: [
      {
        id: 'rev-a5-1',
        userId: 'KeanuFan89',
        rating: 4.8,
        comment: 'Keanu Reeves delivers once again. The fight choreography is unreal, and the world-building continues to impress. The action just never stops!',
        date: '2023-01-09'
      },
      {
        id: 'rev-a5-2',
        userId: 'BulletStorm',
        rating: 4.7,
        comment: 'Intense and thrilling. The action in John Wick 4 is the best in the series. Every fight scene is perfectly executed, and the stakes keep rising.',
        date: '2023-01-10'
      }
    ]
  },
  // Comedy Movies
  {
    id: 'comedy-1',
    title: 'The Hangover',
    description: 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing.',
    language: 'English',
    duration: 100, // 1h 40m converted to 100 minutes
    rating: 4.6,
    category: 'Comedy',
    cast: ['Bradley Cooper', 'Ed Helms', 'Zach Galifianakis'],
    director: 'Todd Phillips',
    releaseDate: '2009-06-05',
    posterUrl: 'https://image.tmdb.org/t/p/w500/uluhlXubGu1VxU63X9VHCLWDAYP.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=vhFVZognoGw',
    genres: ['Comedy'],
    reviews: [
      {
        id: 'rev-c1-1',
        userId: 'PartyManiac',
        rating: 4.7,
        comment: 'Hilarious from start to finish. The entire premise of the movie is absurd, but it\'s the perfect comedy for anyone in need of a good laugh.',
        date: '2023-01-11'
      },
      {
        id: 'rev-c1-2',
        userId: 'FunnyGal',
        rating: 4.5,
        comment: 'I couldn\'t stop laughing! This movie is full of unexpected twists, and the chemistry between the actors makes it one of the funniest films ever.',
        date: '2023-01-12'
      }
    ]
  },
  {
    id: 'comedy-2',
    title: '3 Idiots',
    description: 'Two friends embark on a quest for a lost buddy. On this journey, they encounter a long forgotten bet, a wedding they must crash, and a funeral that goes impossibly out of control.',
    language: 'Hindi',
    duration: 170, // 2h 50m converted to 170 minutes
    rating: 4.9,
    category: 'Comedy',
    cast: ['Aamir Khan', 'R. Madhavan', 'Sharman Joshi'],
    director: 'Rajkumar Hirani',
    releaseDate: '2009-12-25',
    posterUrl: 'https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=xvszmNXdM4w',
    genres: ['Comedy', 'Drama'],
    reviews: [
      {
        id: 'rev-c2-1',
        userId: 'EducationRevolution',
        rating: 4.8,
        comment: 'A beautiful blend of comedy and life lessons. The humor is spot on, and the message about following your passion is inspiring.',
        date: '2023-01-13'
      },
      {
        id: 'rev-c2-2',
        userId: 'StudentLife',
        rating: 5,
        comment: 'This movie spoke to my heart! The humor was light-hearted but the underlying message about not stressing over grades is something everyone needs to hear.',
        date: '2023-01-14'
      }
    ]
  },
  {
    id: 'comedy-3',
    title: 'Golmaal Again',
    description: 'The gang encounters supernatural elements and mystery as they reunite at their orphanage.',
    language: 'Hindi',
    duration: 140, // 2h 20m converted to 140 minutes
    rating: 4.5,
    category: 'Comedy',
    cast: ['Ajay Devgn', 'Parineeti Chopra', 'Tabu'],
    director: 'Rohit Shetty',
    releaseDate: '2017-10-20',
    posterUrl: 'https://image.tmdb.org/t/p/w500/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=8TDQ8e6vT4k',
    genres: ['Comedy', 'Horror'],
    reviews: [
      {
        id: 'rev-c3-1',
        userId: 'LaughterLover',
        rating: 4.6,
        comment: 'The cast is hilarious! I\'ve watched this movie multiple times, and I always find something new to laugh about. It\'s an absolute riot!',
        date: '2023-01-15'
      },
      {
        id: 'rev-c3-2',
        userId: 'Prankster',
        rating: 4.5,
        comment: 'Funny and entertaining. The slapstick comedy is top-notch, and the whole film is a fun ride. Definitely one of the best in the series.',
        date: '2023-01-16'
      }
    ]
  },
  {
    id: 'horror-1',
    title: 'The Conjuring',
    description: 'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.',
    language: 'English',
    duration: 112, // 1h 52m converted to 112 minutes
    rating: 4.7,
    category: 'Horror',
    cast: ['Vera Farmiga', 'Patrick Wilson'],
    director: 'James Wan',
    releaseDate: '2013-07-19',
    posterUrl: 'https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=k10ETbW2Qz4',
    genres: ['Horror', 'Thriller'],
    reviews: [
      {
        id: 'rev-h1-1',
        userId: 'ParanormalHunter',
        rating: 4.8,
        comment: 'The tension was unbearable! Every scene kept me on the edge of my seat. James Wan has crafted a truly chilling experience.',
        date: '2023-01-17'
      },
      {
        id: 'rev-h1-2',
        userId: 'GhostbusterX',
        rating: 4.7,
        comment: 'Scary, eerie, and beautifully directed. The Warrens\' investigation feels so real, and the haunting moments will stick with you for days.',
        date: '2023-01-18'
      }
    ]
  },
  {
    id: 'romance-1',
    title: 'The Notebook',
    description: 'A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.',
    language: 'English',
    duration: 123, // 2h 3m converted to 123 minutes
    rating: 4.8,
    category: 'Romance',
    cast: ['Ryan Gosling', 'Rachel McAdams'],
    director: 'Nick Cassavetes',
    releaseDate: '2004-06-25',
    posterUrl: 'https://image.tmdb.org/t/p/w500/rNzQyW4f8B8cQoqBmHj5UBFunxN.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=FC6fHMmCf8g',
    genres: ['Romance', 'Drama'],
    reviews: [
      {
        id: 'rev-r1-1',
        userId: 'LoveStoryFan',
        rating: 4.9,
        comment: 'A timeless love story that tugs at your heartstrings. The chemistry between Ryan Gosling and Rachel McAdams is magical.',
        date: '2023-01-19'
      },
      {
        id: 'rev-r1-2',
        userId: 'ForeverInLove',
        rating: 4.8,
        comment: 'The perfect romantic movie that makes you believe in love, destiny, and second chances. I cry every time I watch it.',
        date: '2023-01-20'
      }
    ]
  },
  // Drama Movies
  {
    id: 'drama-1',
    title: 'The Pursuit of Happyness',
    description: 'A struggling salesman takes custody of his son as he\'s poised to begin a life-changing professional career.',
    language: 'English',
    duration: 117, // 1h 57m converted to 117 minutes
    rating: 4.9,
    category: 'Drama',
    cast: ['Will Smith', 'Jaden Smith'],
    director: 'Gabriele Muccino',
    releaseDate: '2006-12-15',
    posterUrl: 'https://image.tmdb.org/t/p/w500/iMNp6gTeDBXbzjKRNYtorxZ76G2.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=azJZ8qhZb7Q',
    genres: ['Drama', 'Biography'],
    reviews: [
      {
        id: 'rev-d1-1',
        userId: 'RealLifeHero',
        rating: 5,
        comment: 'Incredibly inspiring! Will Smith\'s performance is outstanding, and the story will tug at your heartstrings. A must-watch for anyone who feels down.',
        date: '2023-01-21'
      },
      {
        id: 'rev-d1-2',
        userId: 'HopefulHeart',
        rating: 4.9,
        comment: 'An emotional rollercoaster, but an important story about persistence. A truly motivational film that makes you believe anything is possible.',
        date: '2023-01-22'
      }
    ]
  },
  {
    id: 'horror-2',
    title: 'Hereditary',
    description: 'A grieving family is haunted by tragic and disturbing occurrences.',
    language: 'English',
    duration: 127, // 2h 7m converted to 127 minutes
    rating: 4.7,
    category: 'Horror',
    cast: ['Toni Collette', 'Alex Wolff'],
    director: 'Ari Aster',
    releaseDate: '2018-06-08',
    posterUrl: 'https://image.tmdb.org/t/p/w500/lHV8HHlhwNup2VbpiACtlKzaGIQ.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=Z9BYQ0Uj3yw',
    genres: ['Horror', 'Drama', 'Mystery'],
    reviews: [
      {
        id: 'rev-h2-1',
        userId: 'DarkSoul',
        rating: 4.8,
        comment: 'Hereditary is terrifying on so many levels. The emotional and psychological horror will leave you disturbed long after the credits roll.',
        date: '2023-01-25'
      },
      {
        id: 'rev-h2-2',
        userId: 'ShockingTwist',
        rating: 4.7,
        comment: 'This movie shocked me at every turn. The pacing is slow, but the payoff is absolutely worth it. A masterclass in horror.',
        date: '2023-01-26'
      }
    ]
  },
  {
    id: 'romance-2',
    title: 'Dilwale Dulhania Le Jayenge',
    description: 'A young couple falls in love on a European vacation, but the woman\'s traditional father has other plans for her marriage.',
    language: 'Hindi',
    duration: 189, // 3h 9m converted to 189 minutes
    rating: 4.9,
    category: 'Romance',
    cast: ['Shah Rukh Khan', 'Kajol'],
    director: 'Aditya Chopra',
    releaseDate: '1995-10-20',
    posterUrl: 'https://image.tmdb.org/t/p/w500/2CAL2433ZeIihfX1Hb2139CX0pW.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=c25GKl5VNeY',
    genres: ['Romance', 'Drama', 'Comedy'],
    reviews: [
      {
        id: 'rev-r2-1',
        userId: 'BollywoodDreamer',
        rating: 5,
        comment: 'One of the greatest love stories ever told. DDLJ captures the beauty of love and family in a way that no other film has.',
        date: '2023-01-29'
      },
      {
        id: 'rev-r2-2',
        userId: 'SRKFan4Life',
        rating: 4.9,
        comment: 'A classic! The iconic moments, the romance, and the unforgettable songs make this the perfect romantic film.',
        date: '2023-01-30'
      }
    ]
  },
  {
    id: 'horror-3',
    title: 'Tumbbad',
    description: 'A mythological story about a goddess who created the entire universe. The plot revolves around the consequences when humans build a temple for her first-born.',
    language: 'Hindi',
    duration: 104, // 1h 44m converted to 104 minutes
    rating: 4.8,
    category: 'Horror',
    cast: ['Sohum Shah', 'Jyoti Malshe'],
    director: 'Rahi Anil Barve',
    releaseDate: '2018-10-12',
    posterUrl: 'https://image.tmdb.org/t/p/w500/AfliEgzWyXYGgqGXvB0UuOxAYgp.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=1xG8uG5xwQY',
    genres: ['Horror', 'Fantasy', 'Thriller'],
    reviews: [
      {
        id: 'rev-h3-1',
        userId: 'HorrorGuru',
        rating: 4.8,
        comment: 'The atmospheric tension in Tumbbad is unmatched. It\'s a slow-burn horror movie that builds up to something truly unique and disturbing.',
        date: '2023-01-31'
      },
      {
        id: 'rev-h3-2',
        userId: 'MysticDarkness',
        rating: 4.7,
        comment: 'A hidden gem in horror. The film\'s setting, story, and eerie visuals make for a compelling and haunting tale. Brilliant!',
        date: '2023-02-01'
      }
    ]
  },
  {
    id: 'horror-4',
    title: 'Annabelle Comes Home',
    description: 'While babysitting the daughter of Ed and Lorraine Warren, a teenager and her friend unknowingly awaken an evil spirit trapped in a doll.',
    language: 'English',
    duration: 106, // 1h 46m converted to 106 minutes
    rating: 4.5,
    category: 'Horror',
    cast: ['Mckenna Grace', 'Madison Iseman', 'Katie Sarife'],
    director: 'Gary Dauberman',
    releaseDate: '2019-06-26',
    posterUrl: 'https://image.tmdb.org/t/p/w500/qWsHMrbg9DsBY3bCMk9jyYCRVRs.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=KRighta8rYM',
    genres: ['Horror', 'Mystery', 'Thriller'],
    reviews: [
      {
        id: 'rev-h4-1',
        userId: 'CreepedOut',
        rating: 4.5,
        comment: 'While not as terrifying as the previous films in the Conjuring universe, this one still manages to send chills down your spine.',
        date: '2023-02-02'
      },
      {
        id: 'rev-h4-2',
        userId: 'HauntedHeart',
        rating: 4.4,
        comment: 'Annabelle\'s terror is back! This movie ties in perfectly with the Conjuring universe while maintaining a high level of fright.',
        date: '2023-02-03'
      }
    ]
  },
  {
    id: 'romance-3',
    title: 'Titanic',
    description: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
    language: 'English',
    duration: 194, // 3h 14m converted to 194 minutes
    rating: 4.8,
    category: 'Romance',
    cast: ['Leonardo DiCaprio', 'Kate Winslet'],
    director: 'James Cameron',
    releaseDate: '1997-12-19',
    posterUrl: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZjUB.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=2e-eXJ6HgkQ',
    genres: ['Romance', 'Drama'],
    reviews: [
      {
        id: 'rev-r3-1',
        userId: 'ShipLover',
        rating: 4.9,
        comment: 'A heart-wrenching tale of love and loss aboard the ill-fated Titanic. This movie has everything—romance, tragedy, and unforgettable performances.',
        date: '2023-02-04'
      },
      {
        id: 'rev-r3-2',
        userId: 'RoseAndJack',
        rating: 4.8,
        comment: 'The chemistry between Leo and Kate is mesmerizing. The movie makes you believe in love even in the face of disaster.',
        date: '2023-02-05'
      }
    ]
  },
  {
    id: 'romance-4',
    title: 'Sita Ramam',
    description: 'An orphaned soldier\'s life changes after he receives a letter from a girl named Sita. He meets her and love blossoms between them.',
    language: 'Telugu',
    duration: 163, // 2h 43m converted to 163 minutes
    rating: 4.7,
    category: 'Romance',
    cast: ['Dulquer Salmaan', 'Mrunal Thakur'],
    director: 'Hanu Raghavapudi',
    releaseDate: '2022-08-05',
    posterUrl: 'https://image.tmdb.org/t/p/w500/pWsD91G2R1Da3AKM3ymr3UoIfRb.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=Qz3Z2f9kZQk',
    genres: ['Romance', 'Drama'],
    reviews: [
      {
        id: 'rev-r4-1',
        userId: 'HeartfeltMovies',
        rating: 4.7,
        comment: 'A beautiful love story set during a war. The emotional depth and stunning visuals make this a romantic classic in the making.',
        date: '2023-02-06'
      },
      {
        id: 'rev-r4-2',
        userId: 'LoveThroughLetters',
        rating: 4.6,
        comment: 'An incredible journey of love through letters, beautifully executed. The story is both heartwarming and emotionally powerful.',
        date: '2023-02-07'
      }
    ]
  },
  {
    id: 'romance-5',
    title: 'La La Land',
    description: 'While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.',
    language: 'English',
    duration: 128, // 2h 8m converted to 128 minutes
    rating: 4.8,
    category: 'Romance',
    cast: ['Ryan Gosling', 'Emma Stone'],
    director: 'Damien Chazelle',
    releaseDate: '2016-12-09',
    posterUrl: 'https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEU8YmIo52R.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=0pdqf4P9MB8',
    genres: ['Romance', 'Drama', 'Musical'],
    reviews: [
      {
        id: 'rev-r5-1',
        userId: 'MusicalRomantic',
        rating: 4.8,
        comment: 'A visual and musical masterpiece. La La Land beautifully blends love, dreams, and sacrifices in an unforgettable way.',
        date: '2023-02-08'
      },
      {
        id: 'rev-r5-2',
        userId: 'DanceInTheRain',
        rating: 4.7,
        comment: 'A modern-day classic! The film\'s stunning visuals, performances, and music leave you with a sense of longing for that kind of love.',
        date: '2023-02-09'
      }
    ]
  },
  // Upcoming Movies
  {
    id: 'upcoming-1',
    title: 'Deadpool 3',
    description: 'The merc with a mouth returns in this highly anticipated third installment.',
    language: 'English',
    duration: 135, // 2h 15m converted to 135 minutes
    rating: 4.5,
    category: 'Action',
    cast: ['Ryan Reynolds', 'Hugh Jackman'],
    director: 'Shawn Levy',
    releaseDate: '2024-07-26',
    posterUrl: 'https://image.tmdb.org/t/p/w500/uCVeXHxWaRB9QoqBmHj5UBFunxN.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=',
    genres: ['Action', 'Comedy', 'Superhero'],
    reviews: []
  },
  {
    id: 'upcoming-2',
    title: 'Furiosa',
    description: 'A prequel to Mad Max: Fury Road, following the origins of Furiosa.',
    language: 'English',
    duration: 150, // 2h 30m converted to 150 minutes
    rating: 4.3,
    category: 'Action',
    cast: ['Anya Taylor-Joy', 'Chris Hemsworth'],
    director: 'George Miller',
    releaseDate: '2024-05-24',
    posterUrl: 'https://image.tmdb.org/t/p/w500/kZjFVDtXXxWiRqKxx1dOyHvp9I4.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    reviews: []
  },
  {
    id: 'upcoming-3',
    title: 'Joker: Folie à Deux',
    description: 'The sequel to 2019\'s Joker, featuring Joaquin Phoenix and Lady Gaga.',
    language: 'English',
    duration: 140, // 2h 20m converted to 140 minutes
    rating: 4.4,
    category: 'Drama',
    cast: ['Joaquin Phoenix', 'Lady Gaga'],
    director: 'Todd Phillips',
    releaseDate: '2024-10-04',
    posterUrl: 'https://image.tmdb.org/t/p/w500/bk7SJX4b4AwUyGmVmxRV1NtQkgu.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=',
    genres: ['Drama', 'Thriller', 'Crime'],
    reviews: []
  },
];

// Separate array for upcoming movies
export const upcomingMovies: Movie[] = [
  {
    id: 'upcoming-singham',
    title: 'Singham Again',
    description: 'The third installment of the Singham franchise. Singham embarks on a high-stakes mission to rescue his wife from a formidable antagonist.',
    language: 'Hindi',
    duration: 150, // 2h 30m converted to 150 minutes
    rating: 4.5,
    category: 'Action',
    cast: ['Ajay Devgn', 'Kareena Kapoor', 'Deepika Padukone', 'Ranveer Singh'],
    director: 'Rohit Shetty',
    releaseDate: '2024-12-12',
    posterUrl: 'https://image.tmdb.org/t/p/w500/1FRIsFSn5mDu5YZpqrBVGixvr.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=',
    genres: ['Action', 'Drama'],
    reviews: []
  },
  {
    id: 'upcoming-zero',
    title: 'Zero Se Restart',
    description: 'A documentary exploring the making of the critically acclaimed film 12th Fail, showcasing the challenges and triumphs behind its production.',
    language: 'Hindi',
    duration: 120, // 2h converted to 120 minutes
    rating: 4.0,
    category: 'Documentary',
    cast: ['Vikrant Massey', 'Vidhu Vinod Chopra'],
    director: 'Vidhu Vinod Chopra',
    releaseDate: '2024-12-13',
    posterUrl: 'https://example.com/zero-se-restart.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=',
    genres: ['Documentary'],
    reviews: []
  },
  {
    id: 'upcoming-despatch',
    title: 'Despatch',
    description: 'A print journalist struggles to stay relevant in the digital era, delving deep into the evolving media landscape.',
    language: 'Hindi',
    duration: 135, // 2h 15m converted to 135 minutes
    rating: 4.2,
    category: 'Thriller',
    cast: ['Manoj Bajpayee', 'Shahana Goswami'],
    director: 'Kanu Behl',
    releaseDate: '2024-12-13',
    posterUrl: 'https://example.com/despatch.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=',
    genres: ['Thriller', 'Drama'],
    reviews: []
  },
  {
    id: 'upcoming-irani',
    title: 'Irani Chai',
    description: 'A thriller about an Iranian woman who links various stories while searching for a hidden treasure.',
    language: 'Hindi',
    duration: 130, // 2h 10m converted to 130 minutes
    rating: 4.1,
    category: 'Thriller',
    cast: ['Zeishan Quadri', 'Anant Mahadevan'],
    director: 'Zeishan Quadri',
    releaseDate: '2024-12-14',
    posterUrl: 'https://example.com/irani-chai.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=',
    genres: ['Thriller', 'Drama'],
    reviews: []
  },
  {
    id: 'upcoming-badass',
    title: 'Badass RaviKumar',
    description: 'A spin-off from the Xpose franchise, following a fearless protagonist on daring missions.',
    language: 'Hindi',
    duration: 140, // 2h 20m converted to 140 minutes
    rating: 4.0,
    category: 'Action',
    cast: ['Himesh Reshammiya', 'Prabhu Deva'],
    director: 'Vipin Agnihotri',
    releaseDate: '2024-12-20',
    posterUrl: 'https://example.com/badass-ravikumar.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=',
    genres: ['Action', 'Thriller'],
    reviews: []
  },
  {
    id: 'upcoming-kraven',
    title: 'Kraven the Hunter',
    description: 'Sergei Kravinoff, a big game hunter, gains superhuman abilities to pursue the most dangerous prey.',
    language: 'English',
    duration: 135, // 2h 15m converted to 135 minutes
    rating: 4.3,
    category: 'Action',
    cast: ['Aaron Taylor-Johnson', 'Russell Crowe'],
    director: 'J.C. Chandor',
    releaseDate: '2024-12-13',
    posterUrl: 'https://example.com/kraven.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=',
    genres: ['Action', 'Adventure'],
    reviews: []
  },
  {
    id: 'upcoming-mufasa',
    title: 'Mufasa: The Lion King',
    description: 'A prequel to The Lion King, this film delves into the origins of Mufasa and his journey before the events of the original movie.',
    language: 'English',
    duration: 120, // 2h converted to 120 minutes
    rating: 4.4,
    category: 'Animation',
    cast: [],
    director: 'Barry Jenkins',
    releaseDate: '2024-12-20',
    posterUrl: 'https://example.com/mufasa.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=',
    genres: ['Animation', 'Adventure'],
    reviews: []
  },
  {
    id: 'upcoming-fighter',
    title: 'Fighter',
    description: 'A thrilling action film that follows top Indian Air Force pilots as they face intense combat situations.',
    language: 'Hindi',
    duration: 150, // 2h 30m converted to 150 minutes
    rating: 4.6,
    category: 'Action',
    cast: ['Hrithik Roshan', 'Deepika Padukone'],
    director: 'Siddharth Anand',
    releaseDate: '2024-12-20',
    posterUrl: 'https://example.com/fighter.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=',
    genres: ['Action', 'Drama'],
    reviews: []
  },
  {
    id: 'upcoming-vanvaas',
    title: 'Vanvaas',
    description: 'A poignant drama about a father battling dementia and the emotional family dynamics that unfold.',
    language: 'Hindi',
    duration: 135, // 2h 15m converted to 135 minutes
    rating: 4.2,
    category: 'Drama',
    cast: ['Nana Patekar', 'Khushboo'],
    director: 'Raghav Goyal',
    releaseDate: '2024-12-20',
    posterUrl: 'https://example.com/vanvaas.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=',
    genres: ['Drama'],
    reviews: []
  },
  {
    id: 'upcoming-welcome',
    title: 'Welcome to the Jungle',
    description: 'A fun-filled adventure comedy starring Bollywood\'s finest, set in a wild and unpredictable jungle environment.',
    language: 'Hindi',
    duration: 140, // 2h 20m converted to 140 minutes
    rating: 4.3,
    category: 'Comedy',
    cast: ['Akshay Kumar', 'Sanjay Dutt'],
    director: 'Anees Bazmee',
    releaseDate: '2024-12-20',
    posterUrl: 'https://image.tmdb.org/t/p/w500/9N1ky4nZ8P9DGvWWw7i19qXJfUB.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=',
    genres: ['Comedy', 'Adventure'],
    reviews: []
  }
];

// Helper function to get movie by ID
export const getMovieById = (movieId: string): Movie | undefined => {
  return movies.find((movie: Movie) => movie.id === movieId) || 
         upcomingMovies.find((movie: Movie) => movie.id === movieId);
};

// Helper function to get movies by category
export const getMoviesByCategory = (category: string): Movie[] => {
  return movies.filter((movie: Movie) => movie.category === category);
};

// Helper function to get all movies
const getAllMovies = (): Movie[] => {
  return [...movies, ...upcomingMovies];
};

// Helper function to get all categories
const getAllCategories = (): string[] => {
  return Array.from(new Set(movies.map(movie => movie.category)));
};

export const states: State[] = [
  {
    id: 'MH',
    name: 'Maharashtra',
    cities: [
      {
        id: 'MUM',
        name: 'Mumbai',
        cinemaHalls: [
          {
            id: 'PVR_MUMBAI_1',
            name: 'PVR Phoenix Mall',
            features: ['Dolby Atmos', 'IMAX'],
            movies: [
              {
                movieId: 'action-1',
                showTimes: ['10:00 AM', '2:00 PM', '6:00 PM', '10:00 PM'],
                price: {
                  standard: 150,
                  vip: 300,
                  premium: 450
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'KA',
    name: 'Karnataka',
    cities: [
      {
        id: 'BLR',
        name: 'Bangalore',
        cinemaHalls: [
          {
            id: 'INOX_BANGALORE_1',
            name: 'INOX Forum Mall',
            features: ['Dolby Atmos', '4DX'],
            movies: [
              {
                movieId: 'action-2',
                showTimes: ['11:00 AM', '3:00 PM', '7:00 PM', '11:00 PM'],
                price: {
                  standard: 180,
                  vip: 350,
                  premium: 500
                }
              }
            ]
          }
        ]
      }
    ]
  }
];

export { getAllMovies, getAllCategories };

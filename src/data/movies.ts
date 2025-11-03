// =============================
// 🎬 TMDB API (Películas)
// =============================
export interface Movie {
  id: number;
  title: string;
  year?: number;
  overview?: string;
  poster_path?: string;
  vote_average?: number;
  genres?: string[];
}

const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

export const favoriteMovies: Movie[] = [
  { id: 872585, title: 'Oppenheimer' },
  { id: 546554, title: 'Knives Out' },
  { id: 1233413, title: 'Sinners' }, // Puede no existir aún, es una película independiente de 2025
  { id: 157336, title: 'Interstellar' },
  { id: 10315, title: 'Fantastic Mr. Fox' },
  { id: 324857, title: 'Spider-Man: Into the Spider-Verse' },
  { id: 808, title: 'Shrek' },
  { id: 146233, title: 'Prisoners' },
  { id: 105, title: 'Back to the Future' },
  { id: 329, title: 'Jurassic Park' },
  { id: 673, title: 'Harry Potter and the Prisoner of Azkaban' },
  { id: 1949, title: 'Zodiac' },
  { id: 1054867, title: 'One Battle After Another' },
  { id: 850165, title: 'The Iron Claw' },
  { id: 194662, title: 'Birdman' },
  { id: 263115, title: 'Logan' },
  { id: 85350, title: 'Boyhood' },
  { id: 11619, title: 'Flushed Away' },
  { id: 13151, title: 'Scooby-Doo on Zombie Island' },
  { id: 414906, title: 'The Batman' },
  { id: 545611, title: 'Everything Everywhere All at Once' },
  { id: 244786, title: 'Whiplash' },
  { id: 945961, title: 'Alien Romulus' },
  { id: 1891, title: 'The Empire Strikes Back' },
  { id: 838240, title: 'Robot Dreams' }
];

// 🔹 Función para obtener detalles reales desde TMDB
export async function fetchMovieDetails(movieId: number, apiKey: string): Promise<Movie | null> {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`);
    const movie = await res.json();

    if (!movie) return null;

    return {
      id: movie.id,
      title: movie.title,
      year: movie.release_date ? parseInt(movie.release_date.split('-')[0]) : undefined,
      overview: movie.overview,
      poster_path: movie.poster_path ? `${TMDB_IMAGE_URL}${movie.poster_path}` : undefined,
      vote_average: movie.vote_average,
      genres: movie.genres?.map((g: any) => g.name)
    };
  } catch (error) {
    console.error(`Error al obtener película ${movieId}:`, error);
    return null;
  }
}

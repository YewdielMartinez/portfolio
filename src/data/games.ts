

// =============================
// 🎮 RAWG API (Videojuegos)
// =============================
export interface Game {
  id: number;
  name: string;
  released?: string;
  background_image?: string;
  rating?: number;
  genres?: string[];
}

export const favoriteGames: Game[] = [
  { id: 1003346, name: 'WWE 2K25' },
  { id: 774823, name: 'WWE 2K24' },
  { id: 22509, name: 'Minecraft' },
  { id: 496195, name: 'Grounded' },
  { id: 4200, name: "Marvel's Spider-Man" },
  { id: 13633, name: 'The Last of Us' },
  { id: 50738, name: 'WWE SmackDown vs. Raw 2011' },
  { id: 58175, name: 'Ghost of Tsushima' },
  { id: 290856, name: 'Pokemon Red' }
];

// 🔹 Función para obtener los detalles reales desde RAWG
export async function fetchGameDetails(gameId: number, apiKey: string): Promise<Game | null> {
  try {
    const res = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`);
    const game = await res.json();

    if (!game) return null;

    return {
      id: game.id,
      name: game.name,
      released: game.released,
      background_image: game.background_image,
      rating: game.rating,
      genres: game.genres?.map((g: any) => g.name)
    };
  } catch (error) {
    console.error(`Error al obtener juego ${gameId}:`, error);
    return null;
  }
}

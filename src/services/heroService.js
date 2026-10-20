import { HEROES_DC } from "../data/heroes";
import { calcularPoder } from "../utils/heroUtils";

const API_URL = "https://akabab.github.io/superhero-api/api/all.json";

function normalizarEstadistica(value) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

function transformarHeroe(apiHero, dcHero) {
  const powerstats = Object.fromEntries(
    Object.entries(apiHero.powerstats || {}).map(([key, value]) => [
      key,
      normalizarEstadistica(value)
    ])
  );

  return {
    id: dcHero.idApi,
    name: dcHero.nombre,
    type: dcHero.tipo,
    image: apiHero.images?.lg || apiHero.images?.md || "",
    powerstats,
    power: calcularPoder(powerstats),
    fullName: apiHero.biography?.fullName || dcHero.nombre,
    aliases: apiHero.biography?.aliases || [],
    publisher: apiHero.biography?.publisher || "Desconocido",
    alignment: apiHero.biography?.alignment || "Desconocida",
    placeOfBirth: apiHero.biography?.placeOfBirth || "Desconocido",
    firstAppearance: apiHero.biography?.firstAppearance || "Desconocida",
    occupation: apiHero.work?.occupation || "Desconocida",
    base: apiHero.work?.base || "Desconocida",
    height: apiHero.appearance?.height?.[1] || "Desconocida",
    weight: apiHero.appearance?.weight?.[1] || "Desconocido"
  };
}

export async function obtenerHeroes({ signal } = {}) {
  const response = await fetch(API_URL, { signal });

  if (!response.ok) {
    throw new Error(
      `No se pudieron cargar los personajes (HTTP ${response.status}).`
    );
  }

  const apiHeroes = await response.json();

  if (!Array.isArray(apiHeroes)) {
    throw new Error("La API ha devuelto un formato de datos inesperado.");
  }

  const heroesById = new Map(
    apiHeroes.map((hero) => [Number(hero.id), hero])
  );

  return HEROES_DC.map((dcHero) => {
    const apiHero = heroesById.get(dcHero.idApi);

    if (!apiHero) {
      return null;
    }

    return transformarHeroe(apiHero, dcHero);
  }).filter(Boolean);
}
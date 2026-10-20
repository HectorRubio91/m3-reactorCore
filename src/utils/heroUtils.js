const POWER_STATS = [
  "intelligence",
  "strength",
  "speed",
  "durability",
  "power",
  "combat"
];

export function calcularPoder(powerstats = {}) {
  const total = POWER_STATS.reduce((sum, stat) => {
    const value = Number(powerstats[stat]);
    return sum + (Number.isFinite(value) ? value : 0);
  }, 0);

  return Math.min(10, Math.max(1, Math.ceil(total / 60)));
}

export function filtrarHeroes(
  heroes,
  search = "",
  selectedType = "Todos"
) {
  const normalizedSearch = search.trim().toLocaleLowerCase("es");

  return heroes.filter((hero) => {
    const matchesName = hero.name
      .toLocaleLowerCase("es")
      .includes(normalizedSearch);

    const matchesType =
      selectedType === "Todos" || hero.type === selectedType;

    return matchesName && matchesType;
  });
}

export function ordenarHeroes(heroes, sortBy = "power-desc") {
  const sortedHeroes = [...heroes];

  switch (sortBy) {
    case "power-asc":
      return sortedHeroes.sort(
        (a, b) => a.power - b.power || a.name.localeCompare(b.name)
      );

    case "name-asc":
      return sortedHeroes.sort((a, b) =>
        a.name.localeCompare(b.name, "es")
      );

    case "name-desc":
      return sortedHeroes.sort((a, b) =>
        b.name.localeCompare(a.name, "es")
      );

    case "power-desc":
    default:
      return sortedHeroes.sort(
        (a, b) => b.power - a.power || a.name.localeCompare(b.name)
      );
  }
}

export function calcularResumen(heroes) {
  if (heroes.length === 0) {
    return {
      total: 0,
      averagePower: 0,
      strongestHero: null,
      dominantType: "N/A"
    };
  }

  const totalPower = heroes.reduce(
    (sum, hero) => sum + hero.power,
    0
  );

  const strongestHero = heroes.reduce((strongest, hero) => {
    return hero.power > strongest.power ? hero : strongest;
  }, heroes[0]);

  const typeCounts = heroes.reduce((counts, hero) => {
    const type = hero.type || "Sin categoría";
    counts[type] = (counts[type] || 0) + 1;
    return counts;
  }, {});

  const dominantType = Object.entries(typeCounts).sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "es")
  )[0][0];

  return {
    total: heroes.length,
    averagePower: Number((totalPower / heroes.length).toFixed(1)),
    strongestHero,
    dominantType
  };
}
export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};

// La méthode getMonth() retourne un index de 0 (janvier) à 11 (décembre),
// donc on ajoute 1 pour que janvier corresponde à 1, février à 2, etc.
export const getMonth = (date) => MONTHS[date.getMonth() + 1];

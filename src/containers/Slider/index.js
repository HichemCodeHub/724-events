import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Tri des événements par date décroissante, pour afficher les événements les plus récents en premier
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  useEffect(() => {
    // Utilisation de setInterval pour avancer les événements toutes les 5 secondes
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        // Si on est à la fin de la liste, on revient au début (index 0), sinon on passe à l'élément suivant
        prevIndex < (data.focus?.length || 0) - 1 ? prevIndex + 1 : 0
      );
    }, 5000); // Intervalle de 5000ms (5 secondes)

    // Nettoyage de l'intervalle à la fin du cycle ou lorsque le composant est démonté
    return () => {
      clearInterval(interval);
    };
  }, [data]); // Le hook est exécuté à chaque changement de 'data'

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title} // Utilisation du 'title' comme clé unique pour chaque événement
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((_, radioIdx) => (
            <input
              key={`radio-${byDateDesc[radioIdx].title}`} // Clé unique pour chaque radio, basée sur 'title'
              type="radio"
              name="radio-button"
              checked={index === radioIdx} // Coche le bouton radio correspondant à l'index actuel
              onChange={() => setIndex(radioIdx)} // Permet de changer l'index lorsque l'utilisateur clique sur un bouton radio
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(); // Le type d'événement sélectionné
  const [currentPage, setCurrentPage] = useState(1); // La page actuelle
  
  // Filtrage des événements selon le type sélectionné
  const filteredEvents = (
    (!type ? data?.events : data?.events.filter((event) => event.type.trim().toLowerCase() === type.trim().toLowerCase())) || []
  ).filter((event, index) => {
    // Pagination : affiche seulement les événements pour la page actuelle
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      return true;
    }
    return false;
  });

  const changeType = (evtType) => {
    setCurrentPage(1); // Réinitialiser à la première page lors du changement de type
    setType(evtType); // Mettre à jour le type d'événement sélectionné
  };

  // Calcul du nombre total de pages après filtrage
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1; // +1 pour s'assurer que la dernière page soit incluse

  // Créer une liste unique de types d'événements
  const typeList = new Set(data?.events.map((event) => event.type)); // Génère un Set pour éviter les doublons dans la liste des types

  return (
    <>
      {error && <div>An error occured</div>} {/* Afficher une erreur en cas de problème */}
      {data === null ? (
        "loading" // Afficher un message pendant le chargement des données
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)} // Liste des types d'événements
            onChange={(value) => (value ? changeType(value) : changeType(null))} // Change de type d'événement
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />} >
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)} // Ouvrir le modal au clic
                    imageSrc={event.cover} // L'image de l'événement
                    title={event.title} // Le titre de l'événement
                    date={new Date(event.date)} // La date de l'événement
                    label={event.type} // Le type de l'événement
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber)].map((_, n) => (
              <a key={`page-${n + 1}`} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1} {/* Affiche le numéro de la page */}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;





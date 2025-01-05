import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

// Simulation d'une API pour envoyer les données du formulaire avec un délai
const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);

  // Envoi du formulaire
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();  // Empêche le rechargement de la page
      setSending(true);      // Marque le début de l'envoi des données

      // Essaye de simuler l'appel API
      try {
        await mockContactApi();   // Appel simulé de l'API
        setSending(false);        // Remet à false l'état "sending" quand l'appel est terminé
        // Ici, on ne déclenche pas onSuccess() en cas de succès comme dans la version fonctionnelle de ton pote
      } catch (err) {
        setSending(false);        // Remet l'état "sending" à false en cas d'erreur
        onError(err);              // Appelle la fonction d'erreur (gérée en dehors du composant)
      }
    },
    [onSuccess, onError]  // Utilisation de onSuccess et onError via useCallback pour éviter les recréations inutiles
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null} // Fonction onChange vide (pas d'action ici)
            label="Personel / Entreprise"
            type="large"
            titleEmpty // Ce prop est utilisé pour afficher "Toutes" si titleEmpty est vrai
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"} {/* Affiche "En cours" si l'envoi est en cours, sinon "Envoyer" */}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}  // Type textarea pour permettre un texte plus long
          />
        </div>
      </div>
    </form>
  );
};

// Définition des types des props
Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,  // Valeur par défaut pour onError si non fournie
  onSuccess: () => null, // Valeur par défaut pour onSuccess si non fournie
}

export default Form;

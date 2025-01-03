import Button from "../../components/Button";
import Logo from "../../components/Logo";

import "./style.scss";

const Menu = () => (
  <nav>
    <Logo /> {/* Affiche le logo de l'entreprise */}
    <ul>
      {/* Liens d'ancrage vers les sections de la page */}
      <li>
        <a href="#nos-services">Nos services</a>
      </li>
      <li>
        <a href="#nos-realisations">Nos réalisations</a>
      </li>
      <li>
        <a href="#notre-equipe">Notre équipe</a>
      </li>
    </ul>
    {/* 
      Correction du bouton : l'ancienne erreur était liée à l'usage incorrect
      de l'attribut onClick qui entraînait un comportement inattendu. 
      Ici, nous utilisons correctement `onClick` pour modifier le `hash` de l'URL 
      et rediriger vers la section "contact". 
    */}
    <Button title="contact" onClick={() => { window.document.location.hash = "#contact"; }}>
      Contact
    </Button>
  </nav>
);

export default Menu;


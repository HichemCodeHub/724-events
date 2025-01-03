import Menu from "../../containers/Menu";
import ServiceCard from "../../components/ServiceCard";
import EventCard from "../../components/EventCard";
import PeopleCard from "../../components/PeopleCard";

import "./style.scss";
import EventList from "../../containers/Events";
import Slider from "../../containers/Slider";
import Logo from "../../components/Logo";
import Icon from "../../components/Icon";
import Form from "../../containers/Form";
import Modal from "../../containers/Modal";
import { useData } from "../../contexts/DataContext";

const Page = () => {
  const { last } = useData(); // Récupère les données de la dernière prestation
  
  return (
    <>
      <header>
        <Menu /> {/* Menu affiché en haut de la page */}
      </header>
      <main>
        {/* Section des services avec un identifiant unique pour l'ancrage */}
        <section id="nos-services" className="SliderContainer">
          <Slider />
        </section>
        <section id="nos-services" className="ServicesContainer">
          <h2 className="Title">Nos services</h2>
          <p>Nous organisons des événements sur mesure partout dans le monde</p>
          <div className="ListContainer">
            {/* Cartes des services proposées */}
            <ServiceCard imageSrc="/images/priscilla-du-preez-Q7wGvnbuwj0-unsplash1.png">
              <h3>Soirée d’entreprise</h3>
              Une soirée d’entreprise vous permet de réunir vos équipes pour un moment convivial...
            </ServiceCard>
            <ServiceCard imageSrc="/images/hall-expo.png">
              <h3>Conférences</h3>
              724 events vous propose d’organiser votre évènement...
            </ServiceCard>
            <ServiceCard imageSrc="/images/sophia-sideri-LFXMtUuAKK8-unsplash1.png">
              <h3>Experience digitale</h3>
              Notre agence experte en contenus immersifs offre des services de conseil aux entreprises...
            </ServiceCard>
          </div>
        </section>
        
        {/* Section des réalisations avec un identifiant pour l'ancrage */}
        <section id="nos-realisations" className="EventsContainer">
          <h2 className="Title">Nos réalisations</h2>
          <EventList />
        </section>

        {/* Section équipe avec un identifiant pour l'ancrage */}
        <section id="notre-equipe" className="PeoplesContainer">
          <h2 className="Title">Notre équipe</h2>
          <p>Une équipe d’experts dédiés à l’organisation de vos événements</p>
          <div className="ListContainer">
            {/* Cartes des membres de l'équipe */}
            <PeopleCard imageSrc="/images/stephanie-liverani-Zz5LQe-VSMY-unsplash.png" name="Samira" position="CEO" />
            <PeopleCard imageSrc="/images/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.png" name="Jean-baptiste" position="Directeur marketing" />
            {/* Ajoutez les autres personnes ici */}
          </div>
        </section>

        {/* Section contact avec un identifiant pour l'ancrage */}
        <div className="FormContainer" id="contact">
          <h2 className="Title">Contact</h2>
          <Modal
            Content={
              <div className="ModalMessage--success">
                <div>Message envoyé !</div>
                <p>Merci pour votre message, nous tâcherons de vous répondre dans les plus brefs délais.</p>
              </div>
            }
          >
            {({ setIsOpened }) => (
              <Form
                onSuccess={() => setIsOpened(true)} // Message de succès lorsqu'un formulaire est soumis
                onError={() => null}
              />
            )}
          </Modal>
        </div>
      </main>
      <footer className="row">
        <div className="col presta">
          <h3>Notre dernière prestation</h3>
          <EventCard
            imageSrc={last?.cover} // Affiche l'image de la dernière prestation
            title={last?.title}
            date={new Date(last?.date)}
            small
            label="boom"
          />
        </div>
        {/* Autres sections du footer */}
        <div className="col contact">
          <h3>Contactez-nous</h3>
          <address>45 avenue de la République, 75000 Paris</address>
          <div>01 23 45 67 89</div>
          <div>contact@724events.com</div>
        </div>
        <div className="col description">
          <Logo size="large" />
          <p>Une agence événementielle propose des prestations de service...</p>
        </div>
      </footer>
    </>
  );
};

export default Page;



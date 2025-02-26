import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Define translations
const resources = {
  en: {
    translation: {
      welcome: "Welcome to the Movie App",
      search: "Search movies...",
      popular: "Popular",
      topRated: "Top Rated",
      upcoming: "Upcoming",
      favorites: "Favorites",
      wishlist: "Wishlist",
      login: "Login",
      signup: "Sign Up",
      logout: "Logout",
      language: "Language",
      darkMode: "Dark Mode",
      writeReview: "Write a Review",
    },
  },
  es: {
    translation: {
      welcome: "Bienvenido a la aplicación de películas",
      search: "Buscar películas...",
      popular: "Popular",
      topRated: "Más valorados",
      upcoming: "Próximamente",
      favorites: "Favoritos",
      wishlist: "Lista de deseos",
      login: "Iniciar sesión",
      signup: "Registrarse",
      logout: "Cerrar sesión",
      language: "Idioma",
      darkMode: "Modo oscuro",
      writeReview: "Escribir una reseña",
    },
  },
  fr: {
    translation: {
      welcome: "Bienvenue sur l'application de films",
      search: "Rechercher des films...",
      popular: "Populaire",
      topRated: "Les mieux notés",
      upcoming: "À venir",
      favorites: "Favoris",
      wishlist: "Liste de souhaits",
      login: "Se connecter",
      signup: "S'inscrire",
      logout: "Se déconnecter",
      language: "Langue",
      darkMode: "Mode sombre",
      writeReview: "Écrire une critique",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;

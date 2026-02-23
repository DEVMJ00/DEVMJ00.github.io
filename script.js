function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}


//AJOUT DE LA DATE DU JOUR DANS LA NAVBAR
  // Crée un élément <p>
  const p = document.createElement('p');

  // Formate la date « jour mois année » en français
  const options = { weekday : 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const today   = new Date();
  const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(today);

  // Ajoute le texte dans le paragraphe
  p.textContent = `${formattedDate}`;

  // Insère le paragraphe dans la navbar
  const navbar = document.getElementById('date-navbar') || document.querySelector('footer');
  if (navbar) {
    navbar.appendChild(p);
  } else {
    // Si aucune navbar n’est trouvée, on l’ajoute à la fin du footer comme secours
    document.footer.appendChild(p);
  }

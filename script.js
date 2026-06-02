function trouver_categorie(categorie_id) {
    return categories.find(function(categorie) {
        return categorie.id === categorie_id;
    });
}

function trouver_ville(ville_id) {
    return villes.find(function(ville) {
        return ville.id === ville_id;
    });
}

function trouver_public(public_id) {
    return publics.find(function(public_item) {
        return public_item.id === public_id;
    });
}

function afficher_evenement_resume(evenement) {
    const liste_evenements = document.getElementById("liste-evenements");

    const categorie = trouver_categorie(evenement.categorie_id);
    const ville = trouver_ville(evenement.ville_id);

    const carte = document.createElement("article");
    carte.classList.add("carte-evenement");

    const lien_image = document.createElement("a");
    lien_image.href = "evenement.html?id=" + evenement.id;

    const image = document.createElement("img");
    image.classList.add("image-evenement");
    image.src = evenement.image;
    image.alt = evenement.titre;

    lien_image.appendChild(image);

    const titre = document.createElement("h3");
    titre.textContent = evenement.titre;

    const date = document.createElement("time");
    date.dateTime = evenement.date;
    date.textContent = evenement.date + " à " + evenement.heure;

    const lieu = document.createElement("p");
    lieu.textContent = evenement.lieu + ", " + ville.nom;

    const description = document.createElement("p");
    description.textContent = evenement.description_courte;

    const categorie_texte = document.createElement("p");
    categorie_texte.textContent = categorie.nom;

    const bouton_detail = document.createElement("a");
    bouton_detail.classList.add("bouton-detail");
    bouton_detail.href = "evenement.html?id=" + evenement.id;
    bouton_detail.textContent = "Voir les détails";

    carte.appendChild(lien_image);
    carte.appendChild(titre);
    carte.appendChild(date);
    carte.appendChild(lieu);
    carte.appendChild(description);
    carte.appendChild(categorie_texte);
    carte.appendChild(bouton_detail);

    liste_evenements.appendChild(carte);
}

function afficher_evenements(liste_evenements) {
    const conteneur = document.getElementById("liste-evenements");

    conteneur.innerHTML = "";

    liste_evenements.forEach(function(evenement) {
        afficher_evenement_resume(evenement);
    });
}

afficher_evenements(evenements);
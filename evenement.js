function trouver_evenement(id) {
    return evenements.find(function(evenement) {
        return evenement.id === id;
    });
}

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

function trouver_mot_cle(mot_cle_id) {
    return mots_cles.find(function(mot_cle) {
        return mot_cle.id === mot_cle_id;
    });
}

function afficher_mots_cles(evenement) {
    const liste_mots_cles = document.getElementById("liste-mots-cles");

    liste_mots_cles.innerHTML = "";

    evenement.mots_cles_ids.forEach(function(mot_cle_id) {
        const mot_cle = trouver_mot_cle(mot_cle_id);

        if (mot_cle) {
            const item = document.createElement("li");
            item.textContent = mot_cle.nom;

            liste_mots_cles.appendChild(item);
        }
    });
}

function afficher_details_evenement(evenement) {
    const details_evenement = document.getElementById("details-evenement");

    const categorie = trouver_categorie(evenement.categorie_id);
    const ville = trouver_ville(evenement.ville_id);
    const public_vise = trouver_public(evenement.public_id);

    details_evenement.innerHTML = "";

    details_evenement.innerHTML =
        "<p><strong>Date :</strong> <time datetime=\"" + evenement.date + "\">" + evenement.date + " à " + evenement.heure + "</time></p>" +
        "<p><strong>Lieu :</strong> " + evenement.lieu + "</p>" +
        "<p><strong>Adresse :</strong> " + evenement.adresse + "</p>" +
        "<p><strong>Ville :</strong> " + ville.nom + "</p>" +
        "<p><strong>Prix :</strong> " + evenement.prix + " $</p>" +
        "<p><strong>Catégorie :</strong> " + categorie.nom + "</p>" +
        "<p><strong>Public visé :</strong> " + public_vise.nom + "</p>";

    if (evenement.lien_externe !== "") {
        details_evenement.innerHTML +=
            "<p><strong>Lien externe :</strong> <a href=\"" + evenement.lien_externe + "\" target=\"_blank\">Site officiel</a></p>";
    }
}

function afficher_evenements_similaires(evenement) {
    const conteneur = document.getElementById("liste-evenements-similaires");

    conteneur.innerHTML = "";

    const evenements_similaires = evenements.filter(function(evenement_item) {
        return evenement_item.id !== evenement.id &&
            (
                evenement_item.categorie_id === evenement.categorie_id ||
                evenement_item.ville_id === evenement.ville_id
            );
    });

    evenements_similaires.forEach(function(evenement_similaire) {
        const carte = document.createElement("article");
        carte.classList.add("carte-evenement");

        const titre = document.createElement("h4");
        titre.textContent = evenement_similaire.titre;

        const description = document.createElement("p");
        description.textContent = evenement_similaire.description_courte;

        const bouton_detail = document.createElement("button");
        bouton_detail.classList.add("bouton-detail");
        bouton_detail.type = "button";
        bouton_detail.textContent = "Voir les détails";

        bouton_detail.addEventListener("click", function() {
            window.location.href = "evenement.php?id=" + evenement_similaire.id;
        });

        carte.appendChild(titre);
        carte.appendChild(description);
        carte.appendChild(bouton_detail);

        conteneur.appendChild(carte);
    });
}

function afficher_evenement(evenement) {
    const titre_evenement = document.getElementById("titre-evenement");
    const image_evenement = document.getElementById("image-evenement");
    const description_evenement = document.getElementById("description-evenement");

    document.title = evenement.titre;

    titre_evenement.textContent = evenement.titre;

    image_evenement.src = evenement.image;
    image_evenement.alt = evenement.titre;

    description_evenement.innerHTML = "";

    const paragraphe = document.createElement("p");
    paragraphe.textContent = evenement.description_longue;

    description_evenement.appendChild(paragraphe);

    afficher_details_evenement(evenement);
    afficher_mots_cles(evenement);
    afficher_evenements_similaires(evenement);
}

function charger_page_evenement() {
    const parametres = new URLSearchParams(window.location.search);
    const id = Number(parametres.get("id"));

    const evenement = trouver_evenement(id);

    if (evenement) {
        afficher_evenement(evenement);
    } else {
        const contenu = document.querySelector(".detail-evenement");

        contenu.innerHTML = "<h2>Événement introuvable</h2><p>Aucun événement ne correspond à cet identifiant.</p>";
    }
}

charger_page_evenement();
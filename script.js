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

    lien_image.addEventListener("click", function(event) {
        event.preventDefault();

        window.location.href = "evenement.html?id=" + evenement.id;
    });

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

    const bouton_detail = document.createElement("button");
    bouton_detail.classList.add("bouton-detail");
    bouton_detail.type = "button";
    bouton_detail.textContent = "Voir les détails";

    bouton_detail.addEventListener("click", function() {
        window.location.href = "evenement.html?id=" + evenement.id;
    });

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

function remplir_select(id_select, texte_defaut, liste_options) {
    const select = document.getElementById(id_select);

    select.innerHTML = "";

    const option_defaut = document.createElement("option");
    option_defaut.value = "";
    option_defaut.textContent = texte_defaut;

    select.appendChild(option_defaut);

    liste_options.forEach(function(option_item) {
        const option = document.createElement("option");

        option.value = option_item.id;
        option.textContent = option_item.nom;

        select.appendChild(option);
    });
}

function afficher_filtres() {
    remplir_select("categorie", "Toutes les catégories", categories);
    remplir_select("ville", "Toutes les villes", villes);
    remplir_select("public", "Tous les publics", publics);
}

function filtrer_evenements() {
    const categorie_selectionnee = document.getElementById("categorie").value;
    const ville_selectionnee = document.getElementById("ville").value;
    const public_selectionne = document.getElementById("public").value;
    const tri_selectionne = document.getElementById("tri").value;

    let evenements_filtres = evenements.slice();

    if (categorie_selectionnee !== "") {
        evenements_filtres = evenements_filtres.filter(function(evenement) {
            return evenement.categorie_id === Number(categorie_selectionnee);
        });
    }

    if (ville_selectionnee !== "") {
        evenements_filtres = evenements_filtres.filter(function(evenement) {
            return evenement.ville_id === Number(ville_selectionnee);
        });
    }

    if (public_selectionne !== "") {
        evenements_filtres = evenements_filtres.filter(function(evenement) {
            return evenement.public_id === Number(public_selectionne);
        });
    }

    if (tri_selectionne === "date") {
        evenements_filtres.sort(function(a, b) {
            return new Date(a.date) - new Date(b.date);
        });
    }

    if (tri_selectionne === "prix") {
        evenements_filtres.sort(function(a, b) {
            return a.prix - b.prix;
        });
    }

    afficher_evenements(evenements_filtres);
}

afficher_filtres();
afficher_evenements(evenements);

document.getElementById("categorie").addEventListener("change", filtrer_evenements);
document.getElementById("ville").addEventListener("change", filtrer_evenements);
document.getElementById("public").addEventListener("change", filtrer_evenements);
document.getElementById("tri").addEventListener("change", filtrer_evenements);
let evenement_en_modification_id = null;

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
    lien_image.href = "evenement.php?id=" + evenement.id;

    lien_image.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "evenement.php?id=" + evenement.id;
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
        window.location.href = "evenement.php?id=" + evenement.id;
    });

    carte.appendChild(lien_image);
    carte.appendChild(titre);
    carte.appendChild(date);
    carte.appendChild(lieu);
    carte.appendChild(description);
    carte.appendChild(categorie_texte);
    carte.appendChild(bouton_detail);

    if (typeof EST_ADMIN !== 'undefined' && EST_ADMIN) {

        const bouton_modifier = document.createElement("button");
        bouton_modifier.classList.add("bouton-detail");
        bouton_modifier.type = "button";
        bouton_modifier.textContent = "Modifier";

        bouton_modifier.addEventListener("click", function() {
            ouvrir_formulaire_modification(evenement.id);
        });

        const bouton_supprimer = document.createElement("button");
        bouton_supprimer.classList.add("bouton-detail");
        bouton_supprimer.type = "button";
        bouton_supprimer.textContent = "Supprimer";

        bouton_supprimer.addEventListener("click", function() {
            supprimer_evenement(evenement.id);
        });

        carte.appendChild(bouton_modifier);
        carte.appendChild(bouton_supprimer);
    }

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

function ouvrir_formulaire_ajout() {
    evenement_en_modification_id = null;

    document.getElementById("formulaire-ajout-evenement").reset();
    document.getElementById("bouton-enregistrer-evenement").textContent = "Enregistrer";

    document.querySelectorAll("input[name='mots-cles-ajout']").forEach(function(case_mot_cle) {
        case_mot_cle.checked = false;
    });

    document.getElementById("panneau-ajout-evenement").hidden = false;
}

function fermer_formulaire_ajout() {
    document.getElementById("panneau-ajout-evenement").hidden = true;
    document.getElementById("formulaire-ajout-evenement").reset();
    document.getElementById("bouton-enregistrer-evenement").textContent = "Enregistrer";

    document.querySelectorAll("input[name='mots-cles-ajout']").forEach(function(case_mot_cle) {
        case_mot_cle.checked = false;
    });

    evenement_en_modification_id = null;
}

function remplir_formulaire_ajout() {
    remplir_select("ville-ajout", "Choisir une ville", villes);
    remplir_select("categorie-ajout", "Choisir une catégorie", categories);
    remplir_select("public-ajout", "Choisir un public", publics);
}

function ajouter_evenement(event) {
    event.preventDefault();

    const titre = document.getElementById("titre-ajout").value.trim();
    const image = document.getElementById("image-ajout").value.trim();
    const description_courte = document.getElementById("description-courte-ajout").value.trim();
    const description_longue = document.getElementById("description-longue-ajout").value.trim();
    const date = document.getElementById("date-ajout").value;
    const heure = document.getElementById("heure-ajout").value;
    const lieu = document.getElementById("lieu-ajout").value.trim();
    const adresse = document.getElementById("adresse-ajout").value.trim();
    const ville_id = Number(document.getElementById("ville-ajout").value);
    const categorie_id = Number(document.getElementById("categorie-ajout").value);
    const public_id = Number(document.getElementById("public-ajout").value);
    const prix = Number(document.getElementById("prix-ajout").value);
    const lien_externe = document.getElementById("lien-ajout").value.trim();

    const mots_cles_ids = Array.from(document.querySelectorAll("input[name='mots-cles-ajout']:checked")).map(function(case_mot_cle) {
        return Number(case_mot_cle.value);
    });

    if (
        titre === "" ||
        image === "" ||
        description_courte === "" ||
        description_longue === "" ||
        date === "" ||
        heure === "" ||
        lieu === "" ||
        adresse === "" ||
        ville_id === 0 ||
        categorie_id === 0 ||
        public_id === 0 ||
        prix < 0 ||
        mots_cles_ids.length === 0
    ) {
        alert("Veuillez remplir correctement tous les champs obligatoires.");
        return;
    }

    if (evenement_en_modification_id !== null) {
        const evenement = evenements.find(function(evenement_item) {
            return evenement_item.id === evenement_en_modification_id;
        });

        if (evenement) {
            evenement.titre = titre;
            evenement.image = image;
            evenement.description_courte = description_courte;
            evenement.description_longue = description_longue;
            evenement.date = date;
            evenement.heure = heure;
            evenement.lieu = lieu;
            evenement.adresse = adresse;
            evenement.ville_id = ville_id;
            evenement.categorie_id = categorie_id;
            evenement.public_id = public_id;
            evenement.prix = prix;
            evenement.mots_cles_ids = mots_cles_ids;
            evenement.lien_externe = lien_externe;
        }
    } else {
        const nouvel_evenement = {
            id: Date.now(),
            titre: titre,
            image: image,
            description_courte: description_courte,
            description_longue: description_longue,
            date: date,
            heure: heure,
            lieu: lieu,
            adresse: adresse,
            ville_id: ville_id,
            categorie_id: categorie_id,
            public_id: public_id,
            prix: prix,
            mots_cles_ids: mots_cles_ids,
            lien_externe: lien_externe
        };

        evenements.push(nouvel_evenement);
    }

    fermer_formulaire_ajout();
    filtrer_evenements();
}

function ouvrir_formulaire_modification(id) {
    const evenement = evenements.find(function(evenement_item) {
        return evenement_item.id === id;
    });

    if (!evenement) {
        return;
    }

    evenement_en_modification_id = id;

    document.getElementById("panneau-ajout-evenement").hidden = false;
    document.getElementById("bouton-enregistrer-evenement").textContent = "Modifier";

    document.getElementById("titre-ajout").value = evenement.titre;
    document.getElementById("image-ajout").value = evenement.image;
    document.getElementById("description-courte-ajout").value = evenement.description_courte;
    document.getElementById("description-longue-ajout").value = evenement.description_longue;
    document.getElementById("date-ajout").value = evenement.date;
    document.getElementById("heure-ajout").value = evenement.heure;
    document.getElementById("lieu-ajout").value = evenement.lieu;
    document.getElementById("adresse-ajout").value = evenement.adresse;
    document.getElementById("ville-ajout").value = evenement.ville_id;
    document.getElementById("categorie-ajout").value = evenement.categorie_id;
    document.getElementById("public-ajout").value = evenement.public_id;
    document.getElementById("prix-ajout").value = evenement.prix;
    document.getElementById("lien-ajout").value = evenement.lien_externe;

    document.querySelectorAll("input[name='mots-cles-ajout']").forEach(function(case_mot_cle) {
        case_mot_cle.checked = evenement.mots_cles_ids.includes(Number(case_mot_cle.value));
    });
}

function supprimer_evenement(id) {
    const confirmation = confirm("Voulez-vous vraiment supprimer cet événement ?");

    if (!confirmation) {
        return;
    }

    const index = evenements.findIndex(function(evenement) {
        return evenement.id === id;
    });

    if (index !== -1) {
        evenements.splice(index, 1);
        filtrer_evenements();
    }
}

function remplir_mots_cles_formulaire() {
    const conteneur = document.getElementById("liste-mots-cles-ajout");

    if (!conteneur) {
        return;
    }

    conteneur.innerHTML = "";

    mots_cles.forEach(function(mot_cle) {
        const label = document.createElement("label");

        const case_mot_cle = document.createElement("input");
        case_mot_cle.type = "checkbox";
        case_mot_cle.name = "mots-cles-ajout";
        case_mot_cle.value = mot_cle.id;

        label.appendChild(case_mot_cle);
        label.appendChild(document.createTextNode(" " + mot_cle.nom));

        conteneur.appendChild(label);
    });
}

afficher_filtres();
afficher_evenements(evenements);
remplir_formulaire_ajout();
remplir_mots_cles_formulaire();

document.getElementById("categorie").addEventListener("change", filtrer_evenements);
document.getElementById("ville").addEventListener("change", filtrer_evenements);
document.getElementById("public").addEventListener("change", filtrer_evenements);
document.getElementById("tri").addEventListener("change", filtrer_evenements);

const bouton_ajouter = document.getElementById("bouton-ajouter-evenement");
if (bouton_ajouter) {
    bouton_ajouter.addEventListener("click", ouvrir_formulaire_ajout);
}

const bouton_annuler = document.getElementById("bouton-annuler-ajout");
if (bouton_annuler) {
    bouton_annuler.addEventListener("click", fermer_formulaire_ajout);
}

const formulaire_ajout = document.getElementById("formulaire-ajout-evenement");
if (formulaire_ajout) {
    formulaire_ajout.addEventListener("submit", ajouter_evenement);
}
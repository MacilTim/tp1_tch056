<?php require_once 'config.php'; ?>
<?php
$categories = obtenir_categories($pdo);
$villes     = obtenir_villes($pdo);
$publics    = obtenir_publics($pdo);
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sorties culturelles Montréal</title>

    <link rel="stylesheet" href="normalize.css">
    <link rel="stylesheet" href="style.css">

    <script src="data.js" defer></script>
    <script src="script.js" defer></script>
</head>

<body class="page-principale">

<header class="entete-site">
    <h1>Sorties culturelles Montréal</h1>
    <nav class="nav-utilisateur">
        <?php if (est_connecte()): ?>
            <span>Bonjour, <?= htmlspecialchars($_SESSION['prenom'] . ' ' . $_SESSION['nom']) ?></span>
            <a href="deconnexion.php" class="bouton-detail">Déconnexion</a>
        <?php else: ?>
            <a href="login.php" class="bouton-detail">Connexion</a>
        <?php endif; ?>
    </nav>
</header>

<nav class="zone-filtres">

    <form class="formulaire-filtres" id="formulaire-filtres">

        <section class="filtre">
            <h2>Catégories</h2>
            <label for="categorie">Choisir une catégorie :</label>
            <select id="categorie" name="categorie">
                <option value="">Toutes les catégories</option>
                <?php foreach ($categories as $cat): ?>
                    <option value="<?= $cat['id'] ?>"><?= htmlspecialchars($cat['nom']) ?></option>
                <?php endforeach; ?>
            </select>
        </section>

        <section class="filtre">
            <h2>Ville</h2>
            <label for="ville">Choisir une ville :</label>
            <select id="ville" name="ville">
                <option value="">Toutes les villes</option>
                <?php foreach ($villes as $v): ?>
                    <option value="<?= $v['id'] ?>"><?= htmlspecialchars($v['nom']) ?></option>
                <?php endforeach; ?>
            </select>
        </section>

        <section class="filtre">
            <h2>Public</h2>
            <label for="public">Choisir un public :</label>
            <select id="public" name="public">
                <option value="">Tous les publics</option>
                <?php foreach ($publics as $pub): ?>
                    <option value="<?= $pub['id'] ?>"><?= htmlspecialchars($pub['nom']) ?></option>
                <?php endforeach; ?>
            </select>
        </section>

        <section class="filtre">
            <h2>Tri</h2>
            <label for="tri">Trier les événements :</label>
            <select id="tri" name="tri">
                <option value="">Aucun tri</option>
                <option value="date">Date</option>
                <option value="prix">Prix</option>
            </select>
        </section>

    </form>

</nav>

<main class="contenu-principal">

    <section class="entete-contenu">

        <h2>Événements</h2>

        <?php if (est_admin()): ?>
            <button class="bouton-detail" id="bouton-ajouter-evenement" type="button">
                Ajouter un événement
            </button>
        <?php endif; ?>

    </section>

    <section class="liste-evenements" id="liste-evenements">
    </section>

    <?php if (est_admin()): ?>
    <section class="detail-evenement" id="panneau-ajout-evenement" hidden>

        <h2>Ajouter un événement</h2>

        <form id="formulaire-ajout-evenement">

            <section class="filtre">
                <label for="titre-ajout">Titre :</label>
                <input id="titre-ajout" type="text">
            </section>

            <section class="filtre">
                <label for="image-ajout">URL de l'image :</label>
                <input id="image-ajout" type="url">
            </section>

            <section class="filtre">
                <label for="description-courte-ajout">Description courte :</label>
                <textarea id="description-courte-ajout"></textarea>
            </section>

            <section class="filtre">
                <label for="description-longue-ajout">Description longue :</label>
                <textarea id="description-longue-ajout"></textarea>
            </section>

            <section class="filtre">
                <label for="date-ajout">Date :</label>
                <input id="date-ajout" type="date">
            </section>

            <section class="filtre">
                <label for="heure-ajout">Heure :</label>
                <input id="heure-ajout" type="time">
            </section>

            <section class="filtre">
                <label for="lieu-ajout">Lieu :</label>
                <input id="lieu-ajout" type="text">
            </section>

            <section class="filtre">
                <label for="adresse-ajout">Adresse :</label>
                <input id="adresse-ajout" type="text">
            </section>

            <section class="filtre">
                <label for="ville-ajout">Ville :</label>
                <select id="ville-ajout">
                    <option value="">Choisir une ville</option>
                    <?php foreach ($villes as $v): ?>
                        <option value="<?= $v['id'] ?>"><?= htmlspecialchars($v['nom']) ?></option>
                    <?php endforeach; ?>
                </select>
            </section>

            <section class="filtre">
                <label for="categorie-ajout">Catégorie :</label>
                <select id="categorie-ajout">
                    <option value="">Choisir une catégorie</option>
                    <?php foreach ($categories as $cat): ?>
                        <option value="<?= $cat['id'] ?>"><?= htmlspecialchars($cat['nom']) ?></option>
                    <?php endforeach; ?>
                </select>
            </section>

            <section class="filtre">
                <label for="public-ajout">Public :</label>
                <select id="public-ajout">
                    <option value="">Choisir un public</option>
                    <?php foreach ($publics as $pub): ?>
                        <option value="<?= $pub['id'] ?>"><?= htmlspecialchars($pub['nom']) ?></option>
                    <?php endforeach; ?>
                </select>
            </section>

            <section class="filtre">
                <h3>Mots-clés</h3>
                <div id="liste-mots-cles-ajout"></div>
            </section>

            <section class="filtre">
                <label for="prix-ajout">Prix :</label>
                <input id="prix-ajout" type="number" min="0">
            </section>

            <section class="filtre">
                <label for="lien-ajout">Lien externe optionnel :</label>
                <input id="lien-ajout" type="url">
            </section>

            <button class="bouton-detail" id="bouton-enregistrer-evenement" type="submit">
                Enregistrer
            </button>

            <button class="bouton-detail" id="bouton-annuler-ajout" type="button">
                Annuler
            </button>

        </form>

    </section>
    <?php endif; ?>

</main>

<footer class="pied-page">
    <p>Travail réalisé par : Patrick Sanjab et Macil Timeridjine</p>
</footer>
<script>const EST_ADMIN = <?= est_admin() ? 'true' : 'false' ?>;</script>
</body>
</html>
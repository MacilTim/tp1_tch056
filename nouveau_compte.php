<?php require_once 'config.php'; ?>
<?php

$erreurs = [];
$succes  = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $nom             = trim($_POST['nom'] ?? '');
    $prenom          = trim($_POST['prenom'] ?? '');
    $nom_utilisateur = trim($_POST['nom_utilisateur'] ?? '');
    $mot_de_passe    = $_POST['mot_de_passe'] ?? '';
    $mot_de_passe2   = $_POST['mot_de_passe2'] ?? '';

    if ($nom === '') {
        $erreurs[] = 'Le nom est obligatoire.';
    }

    if ($prenom === '') {
        $erreurs[] = 'Le prénom est obligatoire.';
    }

    if ($nom_utilisateur === '') {
        $erreurs[] = 'Le nom d\'utilisateur est obligatoire.';
    } else {
        $verif = $pdo->prepare("SELECT id FROM usagers WHERE nom_utilisateur = ?");
        $verif->execute([$nom_utilisateur]);
        if ($verif->fetch()) {
            $erreurs[] = 'Ce nom d\'utilisateur est déjà pris.';
        }
    }

    if (strlen($mot_de_passe) < 8) {
        $erreurs[] = 'Le mot de passe doit contenir au moins 8 caractères.';
    }

    if ($mot_de_passe !== $mot_de_passe2) {
        $erreurs[] = 'Les deux mots de passe ne correspondent pas.';
    }

    if (empty($erreurs)) {
        $hash    = password_hash($mot_de_passe, PASSWORD_DEFAULT);
        $requete = $pdo->prepare(
            "INSERT INTO usagers (nom, prenom, nom_utilisateur, mot_de_passe, type_usager)
             VALUES (?, ?, ?, ?, 'regulier')"
        );
        $requete->execute([$nom, $prenom, $nom_utilisateur, $hash]);

        $succes = true;
    }
}
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Créer un compte – Sorties culturelles Montréal</title>
    <link rel="stylesheet" href="normalize.css">
    <link rel="stylesheet" href="style.css">
</head>

<body class="page-principale">

<header class="entete-site">
    <h1>Sorties culturelles Montréal</h1>
</header>

<main class="contenu-principal">

    <section class="detail-evenement">

        <h2>Créer un compte</h2>

        <?php if ($succes): ?>
            <p class="message-succes">Compte créé avec succès ! <a href="login.php">Se connecter</a></p>
        <?php else: ?>

            <?php if (!empty($erreurs)): ?>
                <ul class="liste-erreurs">
                    <?php foreach ($erreurs as $erreur): ?>
                        <li class="message-erreur"><?= htmlspecialchars($erreur) ?></li>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>

            <form method="post" action="nouveau_compte.php">

                <section class="filtre">
                    <label for="nom">Nom :</label>
                    <input type="text" id="nom" name="nom"
                           value="<?= htmlspecialchars($_POST['nom'] ?? '') ?>">
                </section>

                <section class="filtre">
                    <label for="prenom">Prénom :</label>
                    <input type="text" id="prenom" name="prenom"
                           value="<?= htmlspecialchars($_POST['prenom'] ?? '') ?>">
                </section>

                <section class="filtre">
                    <label for="nom_utilisateur">Nom d'utilisateur :</label>
                    <input type="text" id="nom_utilisateur" name="nom_utilisateur"
                           value="<?= htmlspecialchars($_POST['nom_utilisateur'] ?? '') ?>">
                </section>

                <section class="filtre">
                    <label for="mot_de_passe">Mot de passe (8 caractères minimum) :</label>
                    <input type="password" id="mot_de_passe" name="mot_de_passe">
                </section>

                <section class="filtre">
                    <label for="mot_de_passe2">Confirmer le mot de passe :</label>
                    <input type="password" id="mot_de_passe2" name="mot_de_passe2">
                </section>

                <button class="bouton-detail" type="submit">Créer le compte</button>

            </form>

            <p style="margin-top: 20px;">
                Déjà un compte ? <a href="login.php">Se connecter</a>
            </p>

        <?php endif; ?>

    </section>

</main>

<footer class="pied-page">
    <p>Travail réalisé par : Patrick Sanjab et Macil Timeridjine</p>
</footer>

</body>
</html>
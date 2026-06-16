<?php require_once 'config.php'; ?>
<?php

$erreur = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $nom_utilisateur = trim($_POST['nom_utilisateur'] ?? '');
    $mot_de_passe    = $_POST['mot_de_passe'] ?? '';

    if ($nom_utilisateur === '' || $mot_de_passe === '') {
        $erreur = 'Veuillez remplir tous les champs.';
    } else {
        $requete = $pdo->prepare("SELECT * FROM usagers WHERE nom_utilisateur = ?");
        $requete->execute([$nom_utilisateur]);
        $usager = $requete->fetch(PDO::FETCH_ASSOC);

        if ($usager && password_verify($mot_de_passe, $usager['mot_de_passe'])) {
            $_SESSION['usager_id']    = $usager['id'];
            $_SESSION['nom']          = $usager['nom'];
            $_SESSION['prenom']       = $usager['prenom'];
            $_SESSION['type_usager']  = $usager['type_usager'];

            header('Location: index.php');
            exit;
        } else {
            $erreur = 'Nom d\'utilisateur ou mot de passe incorrect.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion – Sorties culturelles Montréal</title>
    <link rel="stylesheet" href="normalize.css">
    <link rel="stylesheet" href="style.css">
</head>

<body class="page-principale">

<header class="entete-site">
    <h1>Sorties culturelles Montréal</h1>
</header>

<main class="contenu-principal">

    <section class="detail-evenement">

        <h2>Connexion</h2>

        <?php if ($erreur !== ''): ?>
            <p class="message-erreur"><?= htmlspecialchars($erreur) ?></p>
        <?php endif; ?>

        <form method="post" action="login.php">

            <section class="filtre">
                <label for="nom_utilisateur">Nom d'utilisateur :</label>
                <input type="text" id="nom_utilisateur" name="nom_utilisateur"
                       value="<?= htmlspecialchars($_POST['nom_utilisateur'] ?? '') ?>">
            </section>

            <section class="filtre">
                <label for="mot_de_passe">Mot de passe :</label>
                <input type="password" id="mot_de_passe" name="mot_de_passe">
            </section>

            <button class="bouton-detail" type="submit">Se connecter</button>

        </form>

        <p style="margin-top: 20px;">
            Pas encore de compte ?
            <a href="nouveau_compte.php">Créer un compte</a>
        </p>

    </section>

</main>

<footer class="pied-page">
    <p>Travail réalisé par : Patrick Sanjab et Macil Timeridjine</p>
</footer>

</body>
</html>
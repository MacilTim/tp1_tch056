<?php

require_once 'config.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$methode = $_SERVER['REQUEST_METHOD'];

function reponse_json($donnees, int $code = 200): void {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($donnees);
    exit;
}

function lire_json(): array {
    $contenu = file_get_contents('php://input');
    $donnees = json_decode($contenu, true);

    if (!is_array($donnees)) {
        return [];
    }

    return $donnees;
}

function charger_mots_cles_evenement(PDO $pdo, int $evenement_id): array {
    $requete = $pdo->prepare("
        SELECT mot_cle_id
        FROM evenements_mots_cles
        WHERE evenement_id = ?
    ");

    $requete->execute([$evenement_id]);

    return array_map(
        'intval',
        array_column($requete->fetchAll(PDO::FETCH_ASSOC), 'mot_cle_id')
    );
}

function formater_evenement(PDO $pdo, array $ev): array {
    return [
        'id' => (int) $ev['id'],
        'titre' => $ev['titre'],
        'image' => $ev['image'],
        'description_courte' => $ev['description_courte'],
        'description_longue' => $ev['description_longue'],
        'date' => $ev['date'],
        'heure' => $ev['heure'],
        'lieu' => $ev['lieu'],
        'adresse' => $ev['adresse'],
        'ville_id' => (int) $ev['ville_id'],
        'categorie_id' => (int) $ev['categorie_id'],
        'public_id' => (int) $ev['public_id'],
        'prix' => (float) $ev['prix'],
        'mots_cles_ids' => charger_mots_cles_evenement($pdo, (int) $ev['id']),
        'lien_externe' => $ev['lien_externe'] ?? ''
    ];
}

if ($methode === 'GET' && ($uri === '/' || $uri === '/index.php')) {
    require 'index.php';
    exit;
}

if ($methode === 'GET' && $uri === '/evenement.php') {
    require 'evenement.php';
    exit;
}

if ($methode === 'GET' && $uri === '/login.php') {
    require 'login.php';
    exit;
}

if ($methode === 'GET' && $uri === '/nouveau_compte.php') {
    require 'nouveau_compte.php';
    exit;
}

if ($methode === 'GET' && $uri === '/api/evenements') {
    $conditions = [];
    $parametres = [];

    if (!empty($_GET['categorie'])) {
        $conditions[] = 'e.categorie_id = ?';
        $parametres[] = (int) $_GET['categorie'];
    }

    if (!empty($_GET['ville'])) {
        $conditions[] = 'e.ville_id = ?';
        $parametres[] = (int) $_GET['ville'];
    }

    if (!empty($_GET['public'])) {
        $conditions[] = 'e.public_id = ?';
        $parametres[] = (int) $_GET['public'];
    }

    $sql = "
        SELECT e.id,
               e.titre,
               e.image_url AS image,
               e.description_courte,
               e.description_longue,
               DATE(e.date_evenement) AS date,
               TIME_FORMAT(e.date_evenement, '%H:%i') AS heure,
               e.lieu,
               e.adresse,
               e.ville_id,
               e.categorie_id,
               e.public_id,
               e.prix,
               e.lien_externe
        FROM evenements e
    ";

    if (!empty($conditions)) {
        $sql .= " WHERE " . implode(" AND ", $conditions);
    }

    if (($_GET['tri'] ?? '') === 'prix') {
        $sql .= " ORDER BY e.prix";
    } else {
        $sql .= " ORDER BY e.date_evenement";
    }

    $requete = $pdo->prepare($sql);
    $requete->execute($parametres);

    $evenements = [];

    foreach ($requete->fetchAll(PDO::FETCH_ASSOC) as $ev) {
        $evenements[] = formater_evenement($pdo, $ev);
    }

    reponse_json($evenements);
}

if ($methode === 'GET' && preg_match('#^/api/evenements/([0-9]+)$#', $uri, $matches)) {
    $id = (int) $matches[1];

    $requete = $pdo->prepare("
        SELECT e.id,
               e.titre,
               e.image_url AS image,
               e.description_courte,
               e.description_longue,
               DATE(e.date_evenement) AS date,
               TIME_FORMAT(e.date_evenement, '%H:%i') AS heure,
               e.lieu,
               e.adresse,
               e.ville_id,
               e.categorie_id,
               e.public_id,
               e.prix,
               e.lien_externe
        FROM evenements e
        WHERE e.id = ?
    ");

    $requete->execute([$id]);
    $evenement = $requete->fetch(PDO::FETCH_ASSOC);

    if (!$evenement) {
        reponse_json(['erreur' => 'Événement introuvable.'], 404);
    }

    reponse_json(formater_evenement($pdo, $evenement));
}

if ($methode === 'GET' && preg_match('#^/api/evenements/([0-9]+)/similaires$#', $uri, $matches)) {
    $id = (int) $matches[1];

    $requete = $pdo->prepare("SELECT categorie_id, ville_id FROM evenements WHERE id = ?");
    $requete->execute([$id]);
    $evenement = $requete->fetch(PDO::FETCH_ASSOC);

    if (!$evenement) {
        reponse_json(['erreur' => 'Événement introuvable.'], 404);
    }

    $similaires = $pdo->prepare("
        SELECT e.id,
               e.titre,
               e.image_url AS image,
               e.description_courte,
               e.description_longue,
               DATE(e.date_evenement) AS date,
               TIME_FORMAT(e.date_evenement, '%H:%i') AS heure,
               e.lieu,
               e.adresse,
               e.ville_id,
               e.categorie_id,
               e.public_id,
               e.prix,
               e.lien_externe
        FROM evenements e
        WHERE e.id != ?
          AND (e.categorie_id = ? OR e.ville_id = ?)
        ORDER BY e.date_evenement
        LIMIT 4
    ");

    $similaires->execute([
        $id,
        $evenement['categorie_id'],
        $evenement['ville_id']
    ]);

    $resultat = [];

    foreach ($similaires->fetchAll(PDO::FETCH_ASSOC) as $ev) {
        $resultat[] = formater_evenement($pdo, $ev);
    }

    reponse_json($resultat);
}

function verifier_admin(): void {
    if (!est_connecte() || !est_admin()) {
        reponse_json(['erreur' => 'Permission refusée.'], 403);
    }
}

function valider_evenement(array $donnees): array {
    $erreurs = [];

    $champs_obligatoires = [
        'titre',
        'image',
        'description_courte',
        'description_longue',
        'date',
        'heure',
        'lieu',
        'adresse',
        'ville_id',
        'categorie_id',
        'public_id',
        'prix'
    ];

    foreach ($champs_obligatoires as $champ) {
        if (!isset($donnees[$champ]) || $donnees[$champ] === '') {
            $erreurs[] = "Le champ $champ est obligatoire.";
        }
    }

    if (!isset($donnees['mots_cles_ids']) || !is_array($donnees['mots_cles_ids']) || count($donnees['mots_cles_ids']) === 0) {
        $erreurs[] = "Au moins un mot-clé est obligatoire.";
    }

    if (isset($donnees['prix']) && (float) $donnees['prix'] < 0) {
        $erreurs[] = "Le prix ne peut pas être négatif.";
    }

    return $erreurs;
}

function enregistrer_mots_cles(PDO $pdo, int $evenement_id, array $mots_cles_ids): void {
    $suppression = $pdo->prepare("DELETE FROM evenements_mots_cles WHERE evenement_id = ?");
    $suppression->execute([$evenement_id]);

    $insertion = $pdo->prepare("
        INSERT INTO evenements_mots_cles (evenement_id, mot_cle_id)
        VALUES (?, ?)
    ");

    foreach ($mots_cles_ids as $mot_cle_id) {
        $insertion->execute([$evenement_id, (int) $mot_cle_id]);
    }
}

function obtenir_evenement_par_id(PDO $pdo, int $id): ?array {
    $requete = $pdo->prepare("
        SELECT e.id,
               e.titre,
               e.image_url AS image,
               e.description_courte,
               e.description_longue,
               DATE(e.date_evenement) AS date,
               TIME_FORMAT(e.date_evenement, '%H:%i') AS heure,
               e.lieu,
               e.adresse,
               e.ville_id,
               e.categorie_id,
               e.public_id,
               e.prix,
               e.lien_externe
        FROM evenements e
        WHERE e.id = ?
    ");

    $requete->execute([$id]);
    $evenement = $requete->fetch(PDO::FETCH_ASSOC);

    if (!$evenement) {
        return null;
    }

    return formater_evenement($pdo, $evenement);
}

if ($methode === 'POST' && $uri === '/api/evenements') {
    verifier_admin();

    $donnees = lire_json();
    $erreurs = valider_evenement($donnees);

    if (!empty($erreurs)) {
        reponse_json(['erreurs' => $erreurs], 422);
    }

    $date_evenement = $donnees['date'] . ' ' . $donnees['heure'] . ':00';

    $requete = $pdo->prepare("
        INSERT INTO evenements (
            titre,
            image_url,
            description_courte,
            description_longue,
            date_evenement,
            lieu,
            adresse,
            ville_id,
            categorie_id,
            public_id,
            prix,
            accessible,
            lien_externe
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, FALSE, ?)
    ");

    $requete->execute([
        $donnees['titre'],
        $donnees['image'],
        $donnees['description_courte'],
        $donnees['description_longue'],
        $date_evenement,
        $donnees['lieu'],
        $donnees['adresse'],
        (int) $donnees['ville_id'],
        (int) $donnees['categorie_id'],
        (int) $donnees['public_id'],
        (float) $donnees['prix'],
        $donnees['lien_externe'] ?? null
    ]);

    $nouvel_id = (int) $pdo->lastInsertId();

    enregistrer_mots_cles($pdo, $nouvel_id, $donnees['mots_cles_ids']);

    reponse_json(obtenir_evenement_par_id($pdo, $nouvel_id), 201);
}

if ($methode === 'PUT' && preg_match('#^/api/evenements/([0-9]+)$#', $uri, $matches)) {
    verifier_admin();

    $id = (int) $matches[1];

    if (!obtenir_evenement_par_id($pdo, $id)) {
        reponse_json(['erreur' => 'Événement introuvable.'], 404);
    }

    $donnees = lire_json();
    $erreurs = valider_evenement($donnees);

    if (!empty($erreurs)) {
        reponse_json(['erreurs' => $erreurs], 422);
    }

    $date_evenement = $donnees['date'] . ' ' . $donnees['heure'] . ':00';

    $requete = $pdo->prepare("
        UPDATE evenements
        SET titre = ?,
            image_url = ?,
            description_courte = ?,
            description_longue = ?,
            date_evenement = ?,
            lieu = ?,
            adresse = ?,
            ville_id = ?,
            categorie_id = ?,
            public_id = ?,
            prix = ?,
            lien_externe = ?
        WHERE id = ?
    ");

    $requete->execute([
        $donnees['titre'],
        $donnees['image'],
        $donnees['description_courte'],
        $donnees['description_longue'],
        $date_evenement,
        $donnees['lieu'],
        $donnees['adresse'],
        (int) $donnees['ville_id'],
        (int) $donnees['categorie_id'],
        (int) $donnees['public_id'],
        (float) $donnees['prix'],
        $donnees['lien_externe'] ?? null,
        $id
    ]);

    enregistrer_mots_cles($pdo, $id, $donnees['mots_cles_ids']);

    reponse_json(obtenir_evenement_par_id($pdo, $id));
}

if ($methode === 'DELETE' && preg_match('#^/api/evenements/([0-9]+)$#', $uri, $matches)) {
    verifier_admin();

    $id = (int) $matches[1];

    if (!obtenir_evenement_par_id($pdo, $id)) {
        reponse_json(['erreur' => 'Événement introuvable.'], 404);
    }

    $requete = $pdo->prepare("DELETE FROM evenements WHERE id = ?");
    $requete->execute([$id]);

    reponse_json(['message' => 'Événement supprimé.']);
}

reponse_json(['erreur' => 'Route introuvable.'], 404);
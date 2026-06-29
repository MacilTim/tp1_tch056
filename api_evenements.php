<?php
require_once 'config.php';

$requete = $pdo->query("
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
    ORDER BY e.date_evenement
");

$evenements = $requete->fetchAll(PDO::FETCH_ASSOC);

foreach ($evenements as &$ev) {
    $mots = $pdo->prepare("
        SELECT mot_cle_id
        FROM evenements_mots_cles
        WHERE evenement_id = ?
    ");

    $mots->execute([$ev['id']]);

    $ev['mots_cles_ids'] = array_map(
        'intval',
        array_column($mots->fetchAll(PDO::FETCH_ASSOC), 'mot_cle_id')
    );

    $ev['id'] = (int) $ev['id'];
    $ev['ville_id'] = (int) $ev['ville_id'];
    $ev['categorie_id'] = (int) $ev['categorie_id'];
    $ev['public_id'] = (int) $ev['public_id'];
    $ev['prix'] = (float) $ev['prix'];

    if ($ev['lien_externe'] === null) {
        $ev['lien_externe'] = "";
    }
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($evenements);
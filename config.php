<?php

session_start();

$hote    = 'db';
$bd_nom  = 'mydatabase';
$bd_user = 'user';
$bd_pass = 'password';

try {
    $pdo = new PDO(
        "mysql:host=$hote;dbname=$bd_nom;charset=utf8",
        $bd_user,
        $bd_pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    die(json_encode(['erreur' => 'Connexion à la base de données échouée : ' . $e->getMessage()]));
}

function obtenir_categories(PDO $pdo): array {
    $requete = $pdo->query("SELECT id, nom FROM categories ORDER BY nom");
    return $requete->fetchAll(PDO::FETCH_ASSOC);
}

function obtenir_villes(PDO $pdo): array {
    $requete = $pdo->query("SELECT id, nom FROM villes ORDER BY nom");
    return $requete->fetchAll(PDO::FETCH_ASSOC);
}

function obtenir_publics(PDO $pdo): array {
    $requete = $pdo->query("SELECT id, nom FROM publics ORDER BY nom");
    return $requete->fetchAll(PDO::FETCH_ASSOC);
}

function est_connecte(): bool {
    return isset($_SESSION['usager_id']);
}

function est_admin(): bool {
    return isset($_SESSION['type_usager']) && $_SESSION['type_usager'] === 'admin';
}
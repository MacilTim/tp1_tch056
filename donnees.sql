CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS villes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS publics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS mots_cles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS usagers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    nom_utilisateur VARCHAR(100) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    type_usager ENUM('regulier', 'admin') NOT NULL DEFAULT 'regulier'
);

CREATE TABLE IF NOT EXISTS evenements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    description_courte TEXT NOT NULL,
    description_longue TEXT NOT NULL,
    date_evenement DATETIME NOT NULL,
    lieu VARCHAR(255) NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    ville_id INT NOT NULL,
    categorie_id INT NOT NULL,
    public_id INT NOT NULL,
    prix DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    accessible BOOLEAN NOT NULL DEFAULT FALSE,
    lien_externe TEXT NULL,
    FOREIGN KEY (ville_id) REFERENCES villes(id),
    FOREIGN KEY (categorie_id) REFERENCES categories(id),
    FOREIGN KEY (public_id) REFERENCES publics(id)
);

CREATE TABLE IF NOT EXISTS evenements_mots_cles (
    evenement_id INT NOT NULL,
    mot_cle_id INT NOT NULL,
    PRIMARY KEY (evenement_id, mot_cle_id),
    FOREIGN KEY (evenement_id) REFERENCES evenements(id) ON DELETE CASCADE,
    FOREIGN KEY (mot_cle_id) REFERENCES mots_cles(id) ON DELETE CASCADE
);

INSERT INTO categories (nom) VALUES
                                 ('Concert'),
                                 ('Exposition'),
                                 ('Festival'),
                                 ('Théâtre'),
                                 ('Conférence'),
                                 ('Projection');

INSERT INTO villes (nom) VALUES
                             ('Montréal'),
                             ('Laval'),
                             ('Longueuil');

INSERT INTO publics (nom) VALUES
                              ('Tous les publics'),
                              ('Famille'),
                              ('Adultes'),
                              ('Enfants');

INSERT INTO mots_cles (nom) VALUES
                                ('Jazz'),
                                ('Musique'),
                                ('Concert'),
                                ('Festival'),
                                ('Montréal'),
                                ('Art'),
                                ('Cinéma'),
                                ('Famille'),
                                ('Humour'),
                                ('Science');

INSERT INTO evenements (titre, image_url, description_courte, description_longue, date_evenement, lieu, adresse, ville_id, categorie_id, public_id, prix, accessible, lien_externe) VALUES
                                                                                                                                                                                        ('Festival International de Jazz de Montréal', 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Festival_International_de_Jazz_de_Montr%C3%A9al_2.jpg', 'La 46e édition avec Diana Krall, Lionel Richie et Melody Gardot sur les scènes du Quartier des Spectacles.', 'Le Festival International de Jazz de Montréal est l\'un des plus grands festivals de jazz au monde. Chaque année, des milliers de visiteurs assistent à des concerts gratuits et payants au cœur du Quartier des Spectacles. L\'édition 2026 accueillera plusieurs artistes internationaux, dont Diana Krall, Lionel Richie et Melody Gardot.', '2026-06-25 20:00:00', 'Quartier des Spectacles', 'Place des Festivals, Montréal', 1, 3, 1, 0.00, FALSE, 'https://www.montrealjazzfest.com'),
                                                                                                                                                                                        ('Francos de Montréal', 'https://www.nouvelleshebdo.com/upload/26/evenements/2023/5/531346/Image1_888x600.jpg', 'Festival de musique francophone présentant des artistes québécois, canadiens et internationaux.', 'Les Francos de Montréal sont un festival majeur consacré à la musique francophone. L\'événement rassemble des artistes du Québec, du Canada et d\'ailleurs pour plusieurs spectacles au cœur de Montréal.', '2026-06-12 19:30:00', 'Quartier des Spectacles', 'Place des Festivals, Montréal', 1, 3, 1, 0.00, FALSE, NULL),
                                                                                                                                                                                        ('Juste pour rire Montréal', 'https://le-voyage-intuition.com/wp-content/uploads/2017/03/juste-pour-rire.jpg', 'Festival culturel consacré à l\'humour avec des spectacles en salle, des performances extérieures et des animations.', 'Juste pour rire Montréal est un festival culturel consacré à l\'humour. Il propose des spectacles en salle, des performances extérieures et des activités pour différents publics.', '2026-07-15 18:00:00', 'Centre-ville', 'Centre-ville, Montréal', 1, 3, 3, 25.00, TRUE, NULL),
                                                                                                                                                                                        ('Exposition au Musée des beaux-arts', 'https://d3d0lqu00lnqvz.cloudfront.net/media/media/3aba2370-a77d-4c09-985f-f9173037b949.jpg', 'Exposition artistique regroupant des œuvres modernes et contemporaines accessibles au grand public.', 'Cette exposition au Musée des beaux-arts de Montréal présente des œuvres modernes et contemporaines. Elle permet au public de découvrir différents artistes et mouvements artistiques.', '2026-05-30 10:00:00', 'Musée des beaux-arts', '1380 Rue Sherbrooke Ouest, Montréal', 1, 2, 1, 18.00, TRUE, NULL),
                                                                                                                                                                                        ('Pièce de théâtre à la Place des Arts', 'https://cdn.placedesarts.com/tranforms/_1007x1280_crop_center-center_none_ns/66715/Maison-symphonique.webp', 'Représentation théâtrale présentée dans une grande salle culturelle au cœur du centre-ville.', 'Cette pièce de théâtre est présentée à la Place des Arts, un lieu culturel important de Montréal. Elle offre une expérience scénique professionnelle dans une salle reconnue.', '2026-08-08 20:00:00', 'Place des Arts', '175 Rue Sainte-Catherine Ouest, Montréal', 1, 4, 3, 35.00, TRUE, NULL),
                                                                                                                                                                                        ('Projection spéciale au Cinéma Impérial', 'https://cloudfront-us-east-1.images.arcpublishing.com/bellmediainc/AAJ2HGGDAZDCZUHW4O3VCHZLTI.jpg', 'Projection d\'un film québécois suivie d\'une discussion avec des invités du milieu cinématographique.', 'Cette projection spéciale met en valeur le cinéma québécois. Après le film, une discussion avec des invités permet d\'échanger sur la création cinématographique.', '2026-09-10 19:00:00', 'Cinéma Impérial', '1430 Rue Bleury, Montréal', 1, 6, 3, 15.00, FALSE, NULL),
('Conférence à la Grande Bibliothèque', 'https://www.banq.qc.ca/sites/default/files/2022-10/bnq%20juin%2032.jpg', 'Conférence culturelle portant sur la littérature, les arts et l\'histoire de Montréal.', 'Cette conférence organisée à la Grande Bibliothèque aborde la littérature, les arts et l\'histoire de Montréal. Elle s\'adresse aux personnes intéressées par la culture et le patrimoine.', '2026-10-05 17:30:00', 'Grande Bibliothèque', '475 Boulevard de Maisonneuve Est, Montréal', 1, 5, 3, 0.00, TRUE, NULL),
                                                                                                                                                                                        ('Activité familiale au Cosmodôme', 'https://res.cloudinary.com/dqmiqekxl/image/upload/w_1200,h_630,c_auto,f_auto/photos_600_400/cosmodome_1', 'Activité éducative et interactive pour les familles autour de l\'espace, des sciences et de l\'exploration.', 'Le Cosmodôme propose une activité éducative et interactive autour de l\'espace. Les familles peuvent découvrir les sciences, les missions spatiales et l\'exploration de façon amusante.', '2026-07-22 13:00:00', 'Cosmodôme', '2150 Autoroute des Laurentides, Laval', 2, 5, 2, 20.00, TRUE, NULL),
                                                                                                                                                                                        ('Concert extérieur à Longueuil', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN7CIJJ5tyGwHuLoxgSSExtq-APoRqiBORmg&s', 'Concert en plein air réunissant des artistes locaux dans une ambiance conviviale et familiale.', 'Ce concert extérieur à Longueuil rassemble des artistes locaux dans un parc. L\'événement se déroule dans une ambiance conviviale et convient aux familles.', '2026-08-18 18:30:00', 'Parc Michel-Chartrand', '1895 Rue Adoncour, Longueuil', 3, 1, 2, 0.00, FALSE, NULL);

-- Mots-clés des événements
INSERT INTO evenements_mots_cles (evenement_id, mot_cle_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5),
(2, 2), (2, 3), (2, 4), (2, 5),
(3, 4), (3, 5), (3, 9),
(4, 5), (4, 6),
(5, 5), (5, 6),
(6, 5), (6, 7),
(7, 5), (7, 6),
(8, 8), (8, 10),
(9, 2), (9, 3), (9, 8);

-- Compte admin de test
-- Génère le hash dans un fichier PHP séparé (voir generer_admin.php), puis copie-colle la valeur ici.
-- Ou crée ton compte via nouveau_compte.php et change le type_usager à 'admin' directement dans la BD.
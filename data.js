const categories = [
    {
        id: 1,
        nom: "Concert"
    },
    {
        id: 2,
        nom: "Exposition"
    },
    {
        id: 3,
        nom: "Festival"
    },
    {
        id: 4,
        nom: "Théâtre"
    },
    {
        id: 5,
        nom: "Conférence"
    },
    {
        id: 6,
        nom: "Projection"
    }
];

const villes = [
    {
        id: 1,
        nom: "Montréal"
    },
    {
        id: 2,
        nom: "Laval"
    },
    {
        id: 3,
        nom: "Longueuil"
    }
];

const publics = [
    {
        id: 1,
        nom: "Tous les publics"
    },
    {
        id: 2,
        nom: "Famille"
    },
    {
        id: 3,
        nom: "Adultes"
    },
    {
        id: 4,
        nom: "Enfants"
    }
];

const mots_cles = [
    {
        id: 1,
        nom: "Jazz"
    },
    {
        id: 2,
        nom: "Musique"
    },
    {
        id: 3,
        nom: "Concert"
    },
    {
        id: 4,
        nom: "Festival"
    },
    {
        id: 5,
        nom: "Montréal"
    },
    {
        id: 6,
        nom: "Art"
    },
    {
        id: 7,
        nom: "Cinéma"
    },
    {
        id: 8,
        nom: "Famille"
    },
    {
        id: 9,
        nom: "Humour"
    },
    {
        id: 10,
        nom: "Science"
    }
];

const evenements = [
    {
        id: 1,
        titre: "Festival International de Jazz de Montréal",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Festival_International_de_Jazz_de_Montr%C3%A9al_2.jpg",
        description_courte: "La 46e édition avec Diana Krall, Lionel Richie et Melody Gardot sur les scènes du Quartier des Spectacles.",
        description_longue: "Le Festival International de Jazz de Montréal est l’un des plus grands festivals de jazz au monde. Chaque année, des milliers de visiteurs assistent à des concerts gratuits et payants au cœur du Quartier des Spectacles. L’édition 2026 accueillera plusieurs artistes internationaux, dont Diana Krall, Lionel Richie et Melody Gardot.",
        date: "2026-06-25",
        heure: "20:00",
        lieu: "Quartier des Spectacles",
        adresse: "Place des Festivals, Montréal",
        ville_id: 1,
        categorie_id: 3,
        public_id: 1,
        prix: 0,
        mots_cles_ids: [1, 2, 3, 4, 5],
        lien_externe: "https://www.montrealjazzfest.com"
    },
    {
        id: 2,
        titre: "Francos de Montréal",
        image: "https://www.nouvelleshebdo.com/upload/26/evenements/2023/5/531346/Image1_888x600.jpg",
        description_courte: "Festival de musique francophone présentant des artistes québécois, canadiens et internationaux.",
        description_longue: "Les Francos de Montréal sont un festival majeur consacré à la musique francophone. L’événement rassemble des artistes du Québec, du Canada et d’ailleurs pour plusieurs spectacles au cœur de Montréal.",
        date: "2026-06-12",
        heure: "19:30",
        lieu: "Quartier des Spectacles",
        adresse: "Place des Festivals, Montréal",
        ville_id: 1,
        categorie_id: 3,
        public_id: 1,
        prix: 0,
        mots_cles_ids: [2, 3, 4, 5],
        lien_externe: ""
    },
    {
        id: 3,
        titre: "Juste pour rire Montréal",
        image: "https://le-voyage-intuition.com/wp-content/uploads/2017/03/juste-pour-rire.jpg",
        description_courte: "Festival culturel consacré à l’humour avec des spectacles en salle, des performances extérieures et des animations.",
        description_longue: "Juste pour rire Montréal est un festival culturel consacré à l’humour. Il propose des spectacles en salle, des performances extérieures et des activités pour différents publics.",
        date: "2026-07-15",
        heure: "18:00",
        lieu: "Centre-ville",
        adresse: "Centre-ville, Montréal",
        ville_id: 1,
        categorie_id: 3,
        public_id: 3,
        prix: 25,
        mots_cles_ids: [4, 5, 9],
        lien_externe: ""
    },
    {
        id: 4,
        titre: "Exposition au Musée des beaux-arts",
        image: "https://d3d0lqu00lnqvz.cloudfront.net/media/media/3aba2370-a77d-4c09-985f-f9173037b949.jpg",
        description_courte: "Exposition artistique regroupant des œuvres modernes et contemporaines accessibles au grand public.",
        description_longue: "Cette exposition au Musée des beaux-arts de Montréal présente des œuvres modernes et contemporaines. Elle permet au public de découvrir différents artistes et mouvements artistiques.",
        date: "2026-05-30",
        heure: "10:00",
        lieu: "Musée des beaux-arts",
        adresse: "1380 Rue Sherbrooke Ouest, Montréal",
        ville_id: 1,
        categorie_id: 2,
        public_id: 1,
        prix: 18,
        mots_cles_ids: [5, 6],
        lien_externe: ""
    },
    {
        id: 5,
        titre: "Pièce de théâtre à la Place des Arts",
        image: "https://cdn.placedesarts.com/tranforms/_1007x1280_crop_center-center_none_ns/66715/Maison-symphonique.webp",
        description_courte: "Représentation théâtrale présentée dans une grande salle culturelle au cœur du centre-ville.",
        description_longue: "Cette pièce de théâtre est présentée à la Place des Arts, un lieu culturel important de Montréal. Elle offre une expérience scénique professionnelle dans une salle reconnue.",
        date: "2026-08-08",
        heure: "20:00",
        lieu: "Place des Arts",
        adresse: "175 Rue Sainte-Catherine Ouest, Montréal",
        ville_id: 1,
        categorie_id: 4,
        public_id: 3,
        prix: 35,
        mots_cles_ids: [5, 6],
        lien_externe: ""
    },
    {
        id: 6,
        titre: "Projection spéciale au Cinéma Impérial",
        image: "https://cloudfront-us-east-1.images.arcpublishing.com/bellmediainc/AAJ2HGGDAZDCZUHW4O3VCHZLTI.jpg",
        description_courte: "Projection d’un film québécois suivie d’une discussion avec des invités du milieu cinématographique.",
        description_longue: "Cette projection spéciale met en valeur le cinéma québécois. Après le film, une discussion avec des invités permet d’échanger sur la création cinématographique.",
        date: "2026-09-10",
        heure: "19:00",
        lieu: "Cinéma Impérial",
        adresse: "1430 Rue Bleury, Montréal",
        ville_id: 1,
        categorie_id: 6,
        public_id: 3,
        prix: 15,
        mots_cles_ids: [5, 7],
        lien_externe: ""
    },
    {
        id: 7,
        titre: "Conférence à la Grande Bibliothèque",
        image: "https://www.banq.qc.ca/sites/default/files/2022-10/bnq%20juin%2032.jpg",
        description_courte: "Conférence culturelle portant sur la littérature, les arts et l’histoire de Montréal.",
        description_longue: "Cette conférence organisée à la Grande Bibliothèque aborde la littérature, les arts et l’histoire de Montréal. Elle s’adresse aux personnes intéressées par la culture et le patrimoine.",
        date: "2026-10-05",
        heure: "17:30",
        lieu: "Grande Bibliothèque",
        adresse: "475 Boulevard de Maisonneuve Est, Montréal",
        ville_id: 1,
        categorie_id: 5,
        public_id: 3,
        prix: 0,
        mots_cles_ids: [5, 6],
        lien_externe: ""
    },
    {
        id: 8,
        titre: "Activité familiale au Cosmodôme",
        image: "https://res.cloudinary.com/dqmiqekxl/image/upload/w_1200,h_630,c_auto,f_auto/photos_600_400/cosmodome_1",
        description_courte: "Activité éducative et interactive pour les familles autour de l’espace, des sciences et de l’exploration.",
        description_longue: "Le Cosmodôme propose une activité éducative et interactive autour de l’espace. Les familles peuvent découvrir les sciences, les missions spatiales et l’exploration de façon amusante.",
        date: "2026-07-22",
        heure: "13:00",
        lieu: "Cosmodôme",
        adresse: "2150 Autoroute des Laurentides, Laval",
        ville_id: 2,
        categorie_id: 5,
        public_id: 2,
        prix: 20,
        mots_cles_ids: [8, 10],
        lien_externe: ""
    },
    {
        id: 9,
        titre: "Concert extérieur à Longueuil",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN7CIJJ5tyGwHuLoxgSSExtq-APoRqiBORmg&s",
        description_courte: "Concert en plein air réunissant des artistes locaux dans une ambiance conviviale et familiale.",
        description_longue: "Ce concert extérieur à Longueuil rassemble des artistes locaux dans un parc. L’événement se déroule dans une ambiance conviviale et convient aux familles.",
        date: "2026-08-18",
        heure: "18:30",
        lieu: "Parc Michel-Chartrand",
        adresse: "1895 Rue Adoncour, Longueuil",
        ville_id: 3,
        categorie_id: 1,
        public_id: 2,
        prix: 0,
        mots_cles_ids: [2, 3, 8],
        lien_externe: ""
    }
];
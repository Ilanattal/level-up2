let recetteSelectionnee = ""; // Variable pour stocker la recette sélectionnée

// Fonction pour sélectionner une recette
function selectRecette(nomRecette) {
    recetteSelectionnee = nomRecette;
    console.log("Recette sélectionnée:", recetteSelectionnee);
}

// Fonction pour déposer la recette sélectionnée dans la cellule du planning
function deposerRecette(cellule) {
    if (recetteSelectionnee) {
        // Vérifie si la cellule est déjà occupée
        if (cellule.innerHTML.trim() !== "") {
            alert("Cette case est déjà occupée !");
            return;
        }

        // Crée une image de la recette et une croix
        cellule.innerHTML = `
            <div class="recipe-container">
                <p>${recetteSelectionnee}</p>
                <span class="remove-recipe" onclick="retirerRecette(event)">❌</span>
            </div>
        `;
        console.log("Recette déposée dans la cellule:", recetteSelectionnee);
        recetteSelectionnee = ""; // Réinitialise la sélection après le dépôt
    } else {
        console.log("Aucune recette sélectionnée");
    }
}

// Fonction pour retirer une recette du planning
function retirerRecette(event) {
    const cellule = event.target.closest('td'); // Trouve la cellule parente
    cellule.innerHTML = ""; // Vide le contenu de la cellule
    console.log("Recette retirée de la cellule");
}

// Prix des ingrédients
const prixAliments = {
    "Poulet": 3.55, "Lentilles": 1.39, "Boeuf": 8.38, "Agneau": 1.0,
    "Saumon": 7.9, "Saumon fumé": 19.9, "Thon en boite": 3.23, "Poisson blanc": 1.0,
    "Aubergine": 0.6, "Haricots-vert": 1.3, "Courgette": 1.0, "Betterave": 1.2,
    "Epinard": 2.86, "Brocoli": 1.84, "Carotte": 1.44, "Tomate": 1.0,
    "Poivrons": 0.6, "Laitue": 0.6, "Chou": 0.4, "Asperge": 1.0,
    "Oignons": 0.6, "Fenouil": 1.0, "Patate douce": 0.6, "Riz": 1.0,
    "Blé": 0.8, "Quinoa": 3.0, "Pâtes": 1.0, "PDT": 0.4,
    "Couscous": 1.0, "Gnoochies": 1.58, "Pomme": 0.8, "Poire": 1.0,
    "Banane": 0.5, "Orange": 0.5, "Fraise": 3.14, "Raisin": 1.9,
    "Mangue": 1.3, "Ananas": 3.12, "Kiwi": 1.0, "Melon": 0.6,
    "Cerise": 4.16, "Pêche": 1.4, "Abricot": 1.0, "Framboise": 1.0,
    "Myrtille": 4.2, "Litchi": 3.8, "Avocat": 0.6, "Concombre": 0.8,
    "Crevettes": 10.0, "Champignons": 1.0, "Sauce barbecue": 2.0, 
    "Pates": 1.0, "Purée de tomates": 1.2, "Lait de coco": 1.7, "Tomate cerise" : 1.2,
    "Penne": 1.0, "Tofu": 3.9,
};

// Recettes prédéfinies
const recettesPredefinies = {
    "Gnoochies aux poulet": ["200 G Poulet", "150 G Gnoochies", "50 Ml Sauce barbecue"],
    "Pâtes bolognaise": ["125 G Boeuf", "70 G Pates", "100 G Carotte", "50 G Oignon", "200 G Purée de tomates"],
    "Penne aux poulet épinard": ["150 G Poulet", "80 G Epinard", "100 Ml Lait de coco"],
    "Penne aux boeuf et poivrons": ["120 G Boeuf", "70 G Penne", "100 G Poivrons"],
    "Gratin de PDT au saumon": ["150 G PDT", "100 G Saumon", "50 G Tofu"],
    "Bowl de riz au saumon": ["80 G Riz", "100 G Saumon", "50 G Avocat", "50 G Concombre", "50 G Carotte"],
    "Gnoochies aux poulet champignons": ["150 G Poulet", "100 G Champignons", "150 G Gnoochies"],
    "Gnoochies aux crevettes et épinard": ["150 G Gnoochies", "100 G Crevettes", "80 G Epinard", "100 Ml Lait de coco"],
    "Poêlée de bœuf haché, pomme de terre et poivrons": ["150 G Boeuf", "150 G PDT", "100 G Poivrons", "50 G Oignon"],
    "Riz sauté aux bœuf et légumes": ["100 G Riz", "120 G Boeuf", "50 G Carotte", "100 G Poivrons", "50 G Oignon"],
    "Penne aux poulet et légumes": ["100 G Penne", "150 G Poulet", "100 G Aubergine", "100 G Courgette", "100 G Tomate cerise"]
};

// Fonction pour générer la liste de courses
function genererListeCourses() {
    const courses = {}; // Objet pour stocker les ingrédients et quantités nécessaires

    // Parcourt chaque cellule du planning pour accumuler les ingrédients
    document.querySelectorAll("#planning td").forEach(cell => {
        const recetteNom = cell.querySelector('p') ? cell.querySelector('p').textContent.trim() : ''; // Vérifie le contenu de la cellule
        if (recetteNom && recettesPredefinies[recetteNom]) {
            recettesPredefinies[recetteNom].forEach(ingredient => {
                const [quantite, unit, ...nomArray] = ingredient.split(' ');
                const nomIngredient = nomArray.join(' ').trim();
                const quantiteNumerique = parseFloat(quantite);

                if (!courses[nomIngredient]) {
                    courses[nomIngredient] = { quantite: 0, unit: unit };
                }
                courses[nomIngredient].quantite += quantiteNumerique;
            });
        }
    });

    // Affichage de la liste de courses
    const coursesElement = document.getElementById('courses');
    coursesElement.innerHTML = ''; 
    let totalPrix = 0;

    for (const ingredient in courses) {
        const quantiteTotale = courses[ingredient].quantite;
        const prixPar100g = prixAliments[ingredient] || 0;

        // Calcul du prix
        const prixTotal = (quantiteTotale / 100) * prixPar100g;

        totalPrix += prixTotal;

        // Crée un élément de liste pour chaque ingrédient
        const li = document.createElement('li');
        li.textContent = `${ingredient}: ${quantiteTotale.toFixed(2)} ${courses[ingredient].unit} - Prix: ${prixTotal.toFixed(2)}₪`;
        coursesElement.appendChild(li);
    }

    // Affiche le coût total
    const totalElement = document.getElementById('total-cost');
    totalElement.textContent = `Coût total: ${totalPrix.toFixed(2)}₪`;
}

// Fonction pour afficher les recettes en fonction de la catégorie sélectionnée
function showRecettes(categorie) {
    // Masquer toutes les recettes
    document.querySelectorAll('.recette-card').forEach(card => {
        card.style.display = 'none';
    });

    // Afficher les recettes selon la catégorie sélectionnée
    if (categorie === 'platsPrincipaux') {
        document.querySelectorAll('#recettes-disponibles > .recette-card').forEach(card => {
            card.style.display = 'block'; // Affiche tous les plats principaux
        });
    } else if (categorie === 'snacksSucre') {
        document.querySelectorAll('#snacksSucre > .recette-card').forEach(card => {
            card.style.display = 'block'; // Affiche tous les snacks sucrés
        });
    }
}

function showTooltip(element) {
    const tooltip = element.querySelector('.tooltip');
    if (tooltip) {
        tooltip.style.display = 'block'; // Affiche la tooltip
    }
}

function hideTooltip(element) {
    const tooltip = element.querySelector('.tooltip');
    if (tooltip) {
        tooltip.style.display = 'none'; // Cache la tooltip
    }
}


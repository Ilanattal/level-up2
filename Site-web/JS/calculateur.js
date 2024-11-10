document.getElementById('calories-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les valeurs du formulaire
    const age = parseInt(document.getElementById('age').value);
    const sexe = document.getElementById('sexe').value;
    const poids = parseFloat(document.getElementById('poids').value);
    const taille = parseFloat(document.getElementById('taille').value);
    const activite = document.getElementById('activite').value;

    // Calculer le métabolisme de base (BMR)
    let bmr;
    if (sexe === 'homme') {
        bmr = 88.362 + (13.397 * poids) + (4.799 * taille) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * poids) + (3.098 * taille) - (4.330 * age);
    }

    // Ajuster le BMR en fonction du niveau d'activité
    let multiplier;
    switch (activite) {
        case 'sédentaire':
            multiplier = 1.2; // Peu ou pas d'exercice
            break;
        case 'légèrement actif':
            multiplier = 1.375; // Exercice léger/sport 1-3 jours/semaine
            break;
        case 'actif':
            multiplier = 1.55; // Exercice modéré/sport 3-5 jours/semaine
            break;
        case 'très actif':
            multiplier = 1.725; // Exercice intense/sport 6-7 jours/semaine
            break;
        default:
            multiplier = 1.2; // Valeur par défaut
    }

    // Calculer les calories nécessaires par jour
    const calories = Math.round(bmr * multiplier);

    // Afficher le résultat
    document.getElementById('calories').textContent = `${calories} calories`;
    document.getElementById('resultat').style.display = 'block'; // Afficher la section des résultats
});

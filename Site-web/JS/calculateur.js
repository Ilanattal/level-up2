function calculerCalories() {
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
            multiplier = 1.2;
            break;
        case 'légèrement actif':
            multiplier = 1.375;
            break;
        case 'actif':
            multiplier = 1.55;
            break;
        case 'très actif':
            multiplier = 1.725;
            break;
        default:
            multiplier = 1.2;
    }

    // Calculer les calories nécessaires par jour
    const calories = Math.round(bmr * multiplier);

    // Afficher le résultat
    document.getElementById('calories').textContent = `${calories} calories`;
    document.getElementById('resultat').style.display = 'block';
}

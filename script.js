
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("loginForm");
    const password = document.getElementById("password");
    const showPassword = document.getElementById("showPassword");

    // Afficher ou masquer le mot de passe
    if (showPassword && password) {
        showPassword.addEventListener("change", function () {
            password.type = this.checked ? "text" : "password";
        });
    }

    // Traitement du formulaire de démonstration
    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const username =
                document.getElementById("username").value.trim();

            if (!username) {
                return;
            }

            const results = JSON.parse(
                localStorage.getItem("simulationResults") || "[]"
            );

            results.push({
                username: username,
                date: new Date().toLocaleString("fr-CA")
            });

            localStorage.setItem(
                "simulationResults",
                JSON.stringify(results)
            );

            // Aller vers la page de remerciement
            window.location.href = "merci.html";

        });
    }

    // Afficher les résultats sur leur page indépendante
    const resultsList = document.getElementById("resultsList");

    if (resultsList) {

        const results = JSON.parse(
            localStorage.getItem("simulationResults") || "[]"
        );

        if (results.length === 0) {
            resultsList.textContent = "Aucun résultat disponible.";
        } else {

            results.forEach(function (result) {

                const item = document.createElement("li");

                item.textContent =
                    result.username + " — " + result.date;

                resultsList.appendChild(item);

            });
        }
    }

    // Effacer les résultats
    const clearButton = document.getElementById("clearResults");

    if (clearButton) {

        clearButton.addEventListener("click", function () {

            localStorage.removeItem("simulationResults");

            resultsList.textContent = "Aucun résultat disponible.";

        });
    }

});

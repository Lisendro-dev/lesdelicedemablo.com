let panier = JSON.parse(localStorage.getItem("panier")) || [];

// AJOUT AVEC QUANTITÉ
function addToCart(nom, prix) {
    let found = panier.find(item => item.nom === nom);

    if (found) {
        found.qte += 1;
    } else {
        panier.push({ nom, prix, qte: 1 });
    }

    saveCart();
}

// RETIRER UN PRODUIT
function removeItem(nom) {
    panier = panier.filter(item => item.nom !== nom);
    saveCart();
}

// SAUVEGARDE
function saveCart() {
    localStorage.setItem("panier", JSON.stringify(panier));
    updateCart();
}

// AFFICHAGE PANIER
function updateCart() {
    let total = 0;
    let html = "";

    panier.forEach(item => {
        let sousTotal = item.prix * item.qte;
        total += sousTotal;

        html += `
            <div>
                <b>${item.nom}</b><br>
                ${item.prix} FCFA x ${item.qte} = ${sousTotal} FCFA<br>

                <button onclick="addToCart('${item.nom}',${item.prix})">+</button>
                <button onclick="removeOne('${item.nom}')">-</button>
                <button onclick="removeItem('${item.nom}')">❌</button>
                <hr>
            </div>
        `;
    });

    if (document.getElementById("cartItems")) {
        document.getElementById("cartItems").innerHTML = html;
        document.getElementById("cartTotal").innerText = total;
    }
}

// DIMINUER QUANTITÉ
function removeOne(nom) {
    let item = panier.find(p => p.nom === nom);

    if (item) {
        item.qte -= 1;

        if (item.qte <= 0) {
            panier = panier.filter(p => p.nom !== nom);
        }
    }

    saveCart();
}

// VIDER PANIER
function clearCart() {
    panier = [];
    saveCart();
}

// COMMANDER WHATSAPP
function sendOrder() {
    let numero = "2250594879797";
    let message = "Commande Mablo Market:\n\n";
    let total = 0;

    panier.forEach(item => {
        let sousTotal = item.prix * item.qte;
        message += `- ${item.nom} x${item.qte} = ${sousTotal} FCFA\n`;
        total += sousTotal;
    });

    message += `\nTOTAL: ${total} FCFA`;

    window.open("https://wa.me/" + numero + "?text=" + encodeURIComponent(message), "_blank");
}

// INIT
updateCart();
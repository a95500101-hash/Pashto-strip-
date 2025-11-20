const API_BASE = "https://us-central1-YOUR_PROJECT.cloudfunctions.net/api"; // **دلته خپل functions URL واچوه**

const container = document.getElementById("products");
products.forEach(p => {
  const el = document.createElement("div");
  el.className = "card";
  el.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p>${p.price} USD</p>
    <button class="btn" onclick="buyProduct('${p.id}')">Buy</button>
  `;
  container.appendChild(el);
});

function findProductById(id){
  return products.find(x => x.id === id);
}

async function buyProduct(id){
  const prod = findProductById(id);
  if(!prod) return alert("Product not found");

  // پېغام د سرور لپاره
  const res = await fetch(`${API_BASE}/createCheckoutSession`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      items: [{ name: prod.name, price: prod.price, quantity: 1 }],
      success_url: window.location.origin + "/success.html",
      cancel_url: window.location.origin + "/cancel.html"
    })
  });

  const data = await res.json();
  if(data.url){
    window.location.href = data.url;
  } else {
    alert("Error creating checkout: " + (data.error || "unknown"));
  }
}

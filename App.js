const container = document.getElementById("products");

products.forEach(p => {
    container.innerHTML += `
        <div class="product-card">
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <p>${p.price} ډالر</p>
            <button onclick="window.location.href='${p.link}'">خریداری</button>
        </div>
    `;
});

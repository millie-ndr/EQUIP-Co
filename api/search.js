// Node.js Serverless Function
export default async function handler(req, res) {
  const q = (req.query.q || "").trim();
  if (!q) return res.status(400).json({ error: "query parameter q required" });

  // Demo-Preise (für MVP)
  const results = [
    { shop: "Shop A", price: 199.99, url: "https://example-shop-a.com" },
    { shop: "Shop B", price: 189.49, url: "https://example-shop-b.com" }
  ];

  // Sortiere nach Preis
  results.sort((a,b) => a.price - b.price);

  return res.status(200).json({ query: q, results });
}

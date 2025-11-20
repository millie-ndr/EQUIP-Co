import { useState } from "react";

export default function App() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function onSearch(e) {
    e.preventDefault();
    if (!q) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Preisvergleich MVP</h1>
      <form onSubmit={onSearch}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Produktname" />
        <button type="submit">Suchen</button>
      </form>

      {loading && <p>Suche…</p>}

      <ul>
        {results.map((r, i) => (
          <li key={i}>
            <strong>{r.shop}</strong>: {r.price} € — 
            <a href={r.url} target="_blank" rel="noreferrer">Zum Shop</a>
          </li>
        ))}
      </ul>
    </div>
  );
        }

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {loading && <p>Loading...</p>}
      {!loading && products.length === 0 && <p>No products yet</p>}

      <ul className="space-y-2">
        {products.map((p) => (
          <li
            key={p.id}
            className="p-3 border rounded hover:bg-gray-100 cursor-pointer"
          >
            <Link href={`/products/${p.id}`}>
              <div>
                {/* ⭐ แสดงรูปภาพสินค้า */}
                {p.image && (
                  <img
                    src={p.image}
                    alt="product"
                    className="w-32 h-32 object-cover rounded mb-2"
                  />
                )}

                <div className="font-bold">{p.title}</div>
                <div className="text-sm text-gray-600">{p.description}</div>
                <div className="text-sm text-green-700">฿{p.price}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

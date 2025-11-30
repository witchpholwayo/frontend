import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const [isOwner, setIsOwner] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:4000/api/products/${id}`, {
        headers: token ? { Authorization: "Bearer " + token } : {},
      });

      const data = await res.json();

      if (res.ok) {
        setProduct(data);
        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);

        try {
          if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            if (payload.id === data.user_id) setIsOwner(true);
          }
        } catch {}
      }

      setLoading(false);
    }

    fetchData();
  }, [id]);

  async function updateProduct() {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    if (image) formData.append("image", image);

    const res = await fetch(`http://localhost:4000/api/products/${id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      alert("Updated!");
      router.reload();
    } else {
      alert(data.message);
    }
  }

  async function deleteProduct() {
    if (!confirm("Delete this product?")) return;

    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:4000/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });

    if (res.ok) {
      alert("Deleted!");
      router.push("/");
    } else {
      const data = await res.json();
      alert(data.message);
    }
  }

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div className="p-6">

      {/* Back button */}
      <button
        onClick={() => router.push("/")}
        className="bg-gray-300 px-4 py-1 rounded mb-4"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-4">Product Detail</h1>

      {!editMode ? (
        <div className="border p-4 rounded max-w-xl">

          {product.image && (
            <img
              src={product.image}
              alt="product"
              className="w-64 h-64 object-cover rounded mb-4 border"
            />
          )}

          <p><strong>Title:</strong> {product.title}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> ฿{product.price}</p>
          <p><strong>Owner:</strong> User #{product.user_id}</p>
          <p><strong>Created At:</strong> {product.created_at}</p>

          {isOwner && (
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={deleteProduct}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-3">Edit Product</h2>

          <div className="flex flex-col gap-3 max-w-xl">
            <input
              className="border p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="border p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              className="border p-2"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              type="file"
              className="border p-2"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <div className="flex gap-3">
              <button
                onClick={updateProduct}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

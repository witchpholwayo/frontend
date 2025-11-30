import { useState } from "react";
import { useRouter } from "next/router";

export default function CreateProduct() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  async function handleCreate(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("price", price);
    if (image) form.append("image", image);

    const res = await fetch("http://localhost:4000/api/products", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: form,
    });

    if (res.ok) {
      alert("Product Created!");
      router.push("/");
    } else {
      alert("Error");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Product</h1>

      <form onSubmit={handleCreate} className="flex flex-col gap-3 max-w-md">
        <input
          className="border p-2"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Price"
          type="number"
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}

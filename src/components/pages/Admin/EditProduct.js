import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      setTitle(response.data.name);
      setPrice(response.data.harga);
      setPreview(response.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("price", price);

    try {
      await axios.patch(`http://localhost:5000/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/productlist");
    } catch (error) {
      console.log(error);
    }
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={updateProduct}>
            <div className="mb-3">
              <label className="form-label">Product Label</label>
              <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product Name" />
            </div>

            <div className="mb-3">
              <label className="form-label">Product Harga</label>
              <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Product Harga" />
            </div>

            <div className="mb-3">
              <label className="form-label">Image</label>
              <input type="file" className="form-control" onChange={loadImage} />
            </div>

            {preview && (
              <div className="mb-3">
                <img src={preview} alt="preview" className="img-thumbnail" />
              </div>
            )}

            <button type="submit" className="btn btn-success">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

import React, { useEffect, useState } from "react";
import NavbarLogin from "../../../../components/navbarLogin";
import SidebarAdmin from "../../../../components/sidebarAdmin/sidebarAdmin";
import axios from "axios";
import Swal from "sweetalert2";

const CreateProduct = () => {
  const adminId = localStorage.getItem("adminId");
  const [dataCategory, setDataCategory] = useState([]);
  const [data, setData] = useState({
    name: "",
    description: "",
    image: null,
    price: "",
    color: "",
    category: "",
    admin_id: adminId,
  });

  const handleCategoryChange = (e) => {
    const selectedCategoryID = e.target.value;
    setData({
      ...data,
      category: selectedCategoryID,
    });
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setData({
      ...data,
      image: selectedFile,
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", data.name);
    formDataToSend.append("description", data.description);
    formDataToSend.append("image", data.image);
    formDataToSend.append("price", data.price);
    formDataToSend.append("color", data.color);
    formDataToSend.append("category", data.category);
    formDataToSend.append("admin_id", data.admin_id);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/products`,
        formDataToSend
      );
      Swal.fire({
        icon: "success",
        title: "Product Created Successfully",
      });
      setData({
        name: "",
        description: "",
        image: null,
        price: "",
        color: "",
        category: "",
        admin_id: adminId,
      });
      setPreviewImage(null);
      console.log("Product Created Successfully", response);
    } catch (error) {
      console.error("Create Product Error:", error.response.data);
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        Swal.fire({
          icon: "error",
          title: "Format Error",
          text: errorMessage,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Create Product Error",
          text: "An error occurred during creating product. Please try again later.",
        });
      }
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/categories`)
      .then((response) => {
        setDataCategory(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <NavbarLogin />
      <main id="createProduct">
        <div style={{ display: "flex" }}>
          <SidebarAdmin />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "1245px",
              height: "1563px",
              backgroundColor: "#F5F5F5",
            }}
          >
            <div
              className="card"
              style={{ width: 850, height: 1300, backgroundColor: "white" }}
            >
              <div style={{ padding: 30 }}>
                <h5 className="font-weight-bold mb-3">Create Product</h5>
                <div style={{ width: 800, border: "1px solid" }}></div>
                <div className="container p-3">
                  <form>
                    <div
                      className="wrapImage"
                      style={{
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                      }}
                    >
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="preview"
                        />
                      ) : (
                        <div className="preview"></div>
                      )}
                      <div className="form-group">
                        <label htmlFor="fileInput" className="btn btnUpload">
                          Upload Image
                          <input
                            type="file"
                            id="fileInput"
                            className="form-control-file file"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            name="image"
                          />
                        </label>
                      </div>
                    </div>
                    <div
                      className="form-group"
                      style={{ display: "flex", flexWrap: "wrap" }}
                    >
                      <div className="form-group mr-3">
                        <label htmlFor="product" className="text-secondary">
                          Product
                        </label>
                        <input
                          type="text"
                          className="form-control input"
                          id="product"
                          placeholder="Enter product name"
                          name="name"
                          value={data.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="price" className="text-secondary">
                          Price
                        </label>
                        <input
                          type="text"
                          className="form-control input"
                          id="price"
                          placeholder="Enter price"
                          name="price"
                          value={data.price}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div
                      className="form-group"
                      style={{ display: "flex", flexWrap: "wrap" }}
                    >
                      <div className="form-group">
                        <label htmlFor="color" className="text-secondary">
                          Color
                        </label>
                        <input
                          type="text"
                          className="form-control input"
                          id="color"
                          placeholder="Enter color"
                          name="color"
                          value={data.color}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div
                      className="form-group"
                      style={{ display: "flex", flexWrap: "wrap" }}
                    ></div>

                    <div className="form-group">
                      <label htmlFor="category">Category</label>
                      <select
                        className="form-control input"
                        id="category"
                        name="category"
                        value={data.category}
                        onChange={handleCategoryChange}
                      >
                        {dataCategory.map((item) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="Description" className="text-secondary">
                        Description
                      </label>
                      <textarea
                        className="form-control description "
                        id="Description"
                        rows={4}
                        placeholder="Enter description"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn mt-4"
                      onClick={handleSubmit}
                      style={{
                        backgroundColor: "#11ABAA",
                        borderRadius: 25,
                        color: "white",
                        width: 200,
                        height: 48,
                      }}
                    >
                      <span className="font-weight-bold ">Create</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CreateProduct;

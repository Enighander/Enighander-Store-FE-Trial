import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import NavbarLogin from "../../../../components/navbarLogin";
import SidebarAdmin from "../../../../components/sidebarAdmin/sidebarAdmin";

const ProductList = () => {
  const adminId = localStorage.getItem("adminId");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/products/admin/${adminId}`
      )
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error Fetching data:", error);
      });
  }, [adminId]);

  const handleDelete = async (productId) => {
    const result = await Swal.fire({
      title: "Delete Product",
      text: "Are You Sure Want To Delete This Product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc3545",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_REACT_APP_API_URL}/products/${productId}`
        );
        setProducts(products.filter((item) => item.id !== productId));
        console.log("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <NavbarLogin />
      <div style={{ display: "flex" }}>
        <SidebarAdmin />
        <div
          id="myProduct"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "1245px",
            height: "1163px",
            backgroundColor: "#F5F5F5",
          }}
        >
          <div
            className="card"
            style={{ width: 850, height: 900, backgroundColor: "white" }}
          >
            <div style={{ padding: 30 }}>
              <h5 className="font-weight-bold">My product</h5>
              <ul className="nav nav-pills mt-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-home-tab"
                    data-toggle="pill"
                    data-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    All Items
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-profile-tab"
                    data-toggle="pill"
                    data-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    Sold out
                  </button>
                </li>
              </ul>
              <div
                style={{
                  width: 800,
                  border: "1px solid",
                  borderColor: "#D4D4D4",
                }}
              ></div>
              <div className="tab-content mt-4" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <div style={{ position: "relative" }}>
                    <input
                      style={{
                        width: 230,
                        color: "#D4D4D4",
                        borderColor: "#D4D4D4",
                        borderRadius: 25,
                        paddingLeft: 30,
                      }}
                      className="form-control search"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <i
                      className="bi bi-search iconSearch"
                      style={{
                        position: "absolute",
                        left: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#D4D4D4",
                      }}
                    />
                    <div className="" style={{ width: 800, height: 600 }}>
                      {currentProducts.map((item) => (
                        <div
                          className="card border mt-3 p-3"
                          style={{
                            width: 800,
                            height: 170,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                          key={item.id}
                        >
                          <img
                            className=" img-fluid mr-3"
                            src={item.image}
                            crossOrigin="anonymous"
                            alt="cloth"
                            style={{
                              width: "200px",
                              maxHeight: "136px",
                              objectFit: "cover",
                            }}
                          />
                          <div>
                            <h5>{item.name}</h5>
                            <h6 className="text-danger">
                              {" "}
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              }).format(item.price)}
                            </h6>
                          </div>
                          <div style={{ marginLeft: "auto" }}>
                            <button
                              className="btn bg-danger mr-3"
                              style={{
                                width: "100px",
                                height: 30,
                                color: "white",
                                padding: "2px",
                                margin: "2px",
                              }}
                              onClick={() => handleDelete(item.id)}
                            >
                              <i className="bi bi-trash">Delete</i>
                            </button>
                            <Link
                              to={`/profile/admin/update-product/${item.id}`}
                            >
                              <button
                                className="btn bg-warning mr-3"
                                style={{
                                  width: "100px",
                                  height: 30,
                                  color: "white",
                                  padding: "2px",
                                  margin: "2px",
                                }}
                              >
                                <i className="bi bi-pencil">Update</i>
                              </button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <Pagination>
                        {Array.from({
                          length: Math.ceil(products.length / productsPerPage),
                        }).map((_, index) => (
                          <Pagination.Item
                            key={index}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                            style={{ color: "#11ABAA" }}
                          >
                            {index + 1}
                          </Pagination.Item>
                        ))}
                      </Pagination>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  ></div>
                  <div
                    className="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;

import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Brand from "../../assets/Brand.jpg";
import "../../components/modalInvoice/modal-invoice.css";
import Swal from "sweetalert2";
import axios from "axios";

const ModalInvoice = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div id="Invoice">
        <button
          className="btn bg-warning mr-3"
          style={{
            color: "white",
          }}
          onClick={handleShow}
        >
          Invoice
        </button>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body style={{ height: "auto" }}>
            <div className="invoice-6">
              <section className="noise-parent">
                <div className="noise-icon" />
                <div className="noise-icon1" />
              </section>
              <section className="outer-frame">
                <div className="header-section">
                  <div className="invoice-details">
                    <div className="header">
                      <h1>Invoice</h1>
                      <div className="order-id">#ORDER ID</div>
                    </div>
                    <img
                      className="brand-icon"
                      loading="eager"
                      alt=""
                      src={Brand}
                    />
                  </div>
                  <div className="vector-pair">
                    <div className="date-frames">
                      <div className="recipient-data">
                        <div className="address-field">
                          <p>Issued</p>
                          <p>01 Aug, 2023</p>
                        </div>
                        <div className="footer-frame">
                          <p>Due</p>
                          <p>15 Aug, 2023</p>
                        </div>
                      </div>
                      <img
                        className="recipient-data-icon"
                        loading="eager"
                        alt=""
                        src="/vector-131.svg"
                      />
                      <div className="recipient-data1">
                        <div className="billed-to-parent">
                          <p>Billed to</p>
                          <div className="recipient-name-parent">
                            <p className="recipient-name">recipient_name</p>
                            <div className="address-city-postal-code-container">
                              <p>address, city</p>
                              <p>postal_code</p>
                              <p>phone</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <img
                        className="recipient-data-icon1"
                        loading="eager"
                        alt=""
                        src="/vector-131.svg"
                      />
                      <div className="itemsframe">
                        <div className="from-enigh-store-inc">
                          <p>From</p>
                          <p>Enigh Store, Inc</p>
                          <div className="jl-cendana-barat-container">
                            <p>
                              Jl. Cendana Barat no 10, Srondol Wetan, Banyumanik
                            </p>
                            <p>Kota Semarang, 50263,</p>
                            <p>085156793934</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <img
                      className="vector-pair-item"
                      loading="eager"
                      alt=""
                      src="/vector-27.svg"
                    />
                  </div>
                  <div className="subtotalframe">
                    <div className="qtylineframe">
                      <p>Items</p>
                      <div className="taxframe">
                        <p>Qty</p>
                        <p>Line total</p>
                      </div>
                    </div>
                    <img
                      className="desktopbuttons-icon"
                      loading="eager"
                      alt=""
                      src="/vector-27.svg"
                    />
                    <div className="productnameframes">
                      <div className="ge-force-r-t-xframes">
                        <div className="productnames">
                          <p>GeForce RTX™ 4070 Ti GAMING X TRIO 12G</p>
                          <p>12GB GDDR6X</p>
                        </div>
                        <div className="productnames1">
                          <p>GeForce RTX™ 4080 16GB GAMING X TRIO</p>
                          <p>16GB GDDR6X</p>
                        </div>
                      </div>
                      <div className="rpframes">
                        <div className="amountdueframe">
                          <p>1</p>
                          <div className="daystopayframe">
                            <p>{`Rp `}</p>
                            <p>10.000.000</p>
                          </div>
                        </div>
                        <div className="amountdueframe1">
                          <p>1</p>
                          <div className="rp-parent">
                            <p>{`Rp `}</p>
                            <p>15.000.000</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <img
                      className="home-icon"
                      loading="eager"
                      alt=""
                      src="/vector-27.svg"
                    />
                    <div className="qtylineframe1">
                      <p>Subtotal</p>
                      <div className="rp-group">
                        <p>{`Rp `}</p>
                        <p>25.000.000</p>
                      </div>
                    </div>
                    <img
                      className="cta-icon"
                      loading="eager"
                      alt=""
                      src="/vector-135.svg"
                    />
                    <div className="qtylineframe2">
                      <p>Tax (0%)</p>
                      <div className="parent">
                        <p>Rp</p>
                        <p>0.00</p>
                      </div>
                    </div>
                    <img
                      className="firrhome-icon"
                      loading="eager"
                      alt=""
                      src="/vector-135.svg"
                    />
                    <div className="qtylineframe3">
                      <p>Total</p>
                      <div className="rp-container">
                        <p>{`Rp `}</p>
                        <p>25.000.000</p>
                      </div>
                    </div>
                    <div className="due1">
                      <b>Amount due</b>
                      <div className="frame-div">
                        <b>{`Rp `}</b>
                        <b>25.000.000</b>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="invoice-footer">
                <div className="invoice-footer-inner">
                  <div className="thank-you-message-parent">
                    <div className="thank-you-message">
                      <p>Thank you for the business!</p>
                      <div className="payment-reminder">
                        <div className="icon">
                          <img className="icon1" alt="" src="/icon.svg" />
                        </div>
                        <p>
                          Please pay within 15 days of receiving this invoice.
                        </p>
                      </div>
                    </div>
                    <img className="frame-child" alt="" src="/vector-27.svg" />
                  </div>
                </div>
                <div className="firrbookmark-parent">
                  <p
                    className="firrbookmark-icon"
                    loading="eager"
                    alt=""
                    src="/vector-128.svg"
                  />
                  <p>Enighander-Store@email.com</p>
                </div>
              </section>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default ModalInvoice;

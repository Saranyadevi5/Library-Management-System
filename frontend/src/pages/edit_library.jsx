import React, { Fragment, useState } from "react";

const EditBooks = ({ book }) => {
    const [name, setName] = useState(book ? book.name : '');
    const [price, setPrice] = useState(book ? book.price : '');
    const [description, setDescription] = useState(book ? book.description : '');
    const [quantity, setQuantity] = useState(book ? book.quantity : '');

    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            const body = { name, price, description, quantity };
            const response = await fetch(
                `http://localhost:5000/products/${book ? book.product_id : ''}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }
            );

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-warning hover-button"
                data-toggle="modal"
                data-target={`#id${book ? book.product_id : ''}`}
            >
                Edit 
            </button>
            <div className="modal" id={`id${book ? book.product_id : ''}`}>
                <div className="modal-dialog">
                    <div className="modal-content bg-dark text-white">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit book Detail</h4>
                            <button
                                type="button"
                                className="close text-white"
                                data-dismiss="modal"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="modal-body">
                            <label>Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label>Price:</label>
                            <input
                                type="number"
                                className="form-control"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <label>Description:</label>
                            <textarea
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <label>Quantity:</label>
                            <input
                                type="number"
                                className="form-control"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-warning"
                                data-dismiss="modal"
                                onClick={(e) => updateProduct(e)}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditBooks;
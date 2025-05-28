import React, { useEffect, useState } from 'react';
import './Add.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import upload from '../../assets/files/upload.png';

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No image selected");
      return;
    }
    setImage(file);
    console.log("Selected image:", file);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
      toast.error('Please upload an image');
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);

    console.log("Submitting FormData:");
    for (let [key, val] of formData.entries()) {
      console.log(key, val);
    }

    try {
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success(response.data.message || 'Food added successfully');
        setData({
          name: '',
          description: '',
          price: '',
          category: '',
        });
        setImage(null);
      } else {
        toast.error(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : upload}
              alt="Upload"
              className="image-preview"
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            accept="image/*"
            onChange={onImageChange}
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder="Type here"
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            rows="5"
            placeholder="Write content here"
            required
          />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
              required
            >
              <option value="">Please select</option>
              <option value="Biryani">Biryani</option>
              <option value="Starter">Starter</option>
              <option value="Dessert">Dessert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cakes">Cakes</option>
              <option value="Chinese">Chinese</option>
              <option value="Pizza">Pizza</option>
              <option value="Mocktails">Mocktails</option>
              <option value="Icecream">Icecream</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              placeholder="₹20"
              required
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          ADD FOOD
        </button>
      </form>
    </div>
  );
};

export default Add;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'rc-slider'; 
import 'rc-slider/assets/index.css'; 
import './dummy.css';

function Dummy() {
  const [data, setData] = useState([]);
  const [sliderValue, setSliderValue] = useState([12, 1000]); // An array for two values

  const url = "https://dummyjson.com/products";

  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data.products);
    });
  }, []);

  const handleSliderChange = (newValues) => {
    setSliderValue(newValues);
  };

  const filteredProducts = 
  data.filter(item => parseInt(item.price) >= sliderValue[0] && parseInt(item.price) <= sliderValue[1]);

  return (
    <div className="App">
      <h1>Filtered Products List</h1>
      <div className='main'>
        <h4 className='text'>Min Price</h4>
      <Slider className='slider'
        range
        min={12}
        max={1000}
        step={1}
        value={sliderValue}
        onChange={handleSliderChange}
      />
      <h4 className='text'>Max Price</h4>
      </div>
     
      <p>Products Price Range: {sliderValue[0]} - {sliderValue[1]}</p>
      <table className="product-list">
      <thead>
          <tr >
          <th className="tablename">Name</th>
          <th className="tablebrands">Brand</th>
          <th className="tableimage">Image</th>
          <th className="tableprice">Price</th>
          <th className="tablediscountedprice"> Discounted %</th>
          <th className="tablerating">Rating</th>
          <th className="tablestocks">Stocks</th>
          <th className="tablecategory">Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((item, index) => (
            <tr key={index}>
            <td className="tablename" >{item.title}</td>
            <td className="tablebrands">{item.brand}</td>
            <td className="tableimage"><img className="tableimagee" src={item.thumbnail} alt=""/></td>
            <td className="tableprice">{item.price}</td>
            <td className="tablediscountedprice">{item.discountPercentage}</td>
            <td className="tablerating">{item.rating}</td>
            <td className="tablestocks">{item.stock}</td>
            <td className="tablecategory">{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dummy;

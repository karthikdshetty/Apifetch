import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import './DisplayData.css'


const url= "https://dummyjson.com/products"

function DisplayData() {
  const [content, setContent] = useState([]);
  const [sliderValue, setSliderValue] = useState(0);
  React.useEffect(() => {
    axios.get(url).then((response) => {
      setContent(response.data);
      console.log(response.data)
    });
  }, []);

  if (!content) return null;
  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  const filteredData = content.products.filter(item => item.value <= sliderValue);

  return (
    
    <div className="App">
        <h1>Data Display</h1>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        onChange={handleSliderChange}
      />
      <p>Slider Value: {sliderValue}</p>
      <ul>
        {filteredData.map(item => (
          <li key={item.id}>{item.content}</li>
        ))}
      </ul>
      <tbody  className="tablerow">
        <tr>
          <th className="tablename">Name</th>
          <th className="tablebrands">Brand</th>
          <th className="tableimage">Image</th>
          <th className="tableprice">Price</th>
          <th className="tablediscountedprice"> Discounted %</th>
          <th className="tablerating">Rating</th>
          <th className="tablestocks">Stocks</th>
          <th className="tablecategory">Category</th>
        </tr>
   
        {content.products?.length>0 && content.products.map((item, index) => (
          <tr  key={index}>
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
    </div>
  );
}

export default DisplayData;
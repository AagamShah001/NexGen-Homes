import React, { useEffect, useState } from 'react'
import "../../assets/css/addproperty.css";
import { IoIosArrowDown } from "react-icons/io";



export const AddProperty = () => {

  const [click, setclick] = useState(false);


  return (
    <div className='Addproperty-form'>

      <div className='Addproperty-section'>
        <input className="Addproperty-text" type="text" placeholder='Enter Property Name' />
        <button className='Addproperty-menu' onClick={() => setclick(!click)}>
          PropertyType: <IoIosArrowDown />
          <ol className={`Addproperty-dropdown ${click ? "" : "dclose"}`}>
            <li className='Addproperty-menu-item'>Flat</li>
            <li className='Addproperty-menu-item'>Home</li>
            <li className='Addproperty-menu-item'>villa</li>
          </ol>
        </button>
      </div>

      <div className='Addproperty-section'>
        <input type="text" className='Addproperty-text' placeholder='Enter Property Address' />
        <input type="number" className='Addproperty-text' placeholder='Entere Pincode' />
      </div>

      <div className='Addproperty-section'>
        <button className='Addproperty-menu' onClick={() => setclick(!click)}>
          State: <IoIosArrowDown />
          <ol className={`Addproperty-dropdown ${click ? "" : "dclose"}`}>
            <li className='Addproperty-menu-item'>Flat</li>
            <li className='Addproperty-menu-item'>Home</li>
            <li className='Addproperty-menu-item'>villa</li>
          </ol>
        </button>

        <button className='Addproperty-menu' onClick={() => setclick(!click)}>
          City: <IoIosArrowDown />
          <ol className={`Addproperty-dropdown ${click ? "" : "dclose"}`}>
            <li className='Addproperty-menu-item'>Flat</li>
            <li className='Addproperty-menu-item'>Home</li>
            <li className='Addproperty-menu-item'>villa</li>
          </ol>
        </button>

        <button className='Addproperty-menu' onClick={() => setclick(!click)}>
          Area: <IoIosArrowDown />
          <ol className={`Addproperty-dropdown ${click ? "" : "dclose"}`}>
            <li className='Addproperty-menu-item'>Flat</li>
            <li className='Addproperty-menu-item'>Home</li>
            <li className='Addproperty-menu-item'>villa</li>
          </ol>
        </button>
      </div>

      <div className='Addproperty-section'>
        <input type="text" className='Addproperty-text' placeholder='Enter Price' />
        <input type="date" className='Addproperty-text' placeholder='Enter year built' />
        <button className='Addproperty-menu' onClick={() => setclick(!click)}>
          Status: <IoIosArrowDown />
          <ol className={`Addproperty-dropdown ${click ? "" : "dclose"}`}>
            <li className='Addproperty-menu-item'>Flat</li>
            <li className='Addproperty-menu-item'>Home</li>
            <li className='Addproperty-menu-item'>villa</li>
          </ol>
        </button>
      </div>

      <div className='Addproperty-section'>
        <input type="number" className='Addproperty-text' placeholder='Enter bedrooms' />
        <input type="number" className='Addproperty-text' placeholder='Entere bathrooms' />
        <input type="number" className='Addproperty-text' placeholder='Entere Size(Sq ft)' />
        <button className='Addproperty-menu' onClick={() => setclick(!click)}>
          furnishingStatus: <IoIosArrowDown />
          <ol className={`Addproperty-dropdown ${click ? "" : "dclose"}`}>
            <li className='Addproperty-menu-item'>Flat</li>
            <li className='Addproperty-menu-item'>Home</li>
            <li className='Addproperty-menu-item'>villa</li>
          </ol>
        </button>
      </div>

      <div className='Addproperty-section'>
        <input type="text" className='Addproperty-description' placeholder='Enter Property description' />
        <button className='Addproperty-menu' onClick={() => setclick(!click)}>
          Amenities: <IoIosArrowDown />
          <ol className={`Addproperty-dropdown ${click ? "" : "dclose"}`}>
            <li className='Addproperty-menu-item'>Flat</li>
            <li className='Addproperty-menu-item'>Home</li>
            <li className='Addproperty-menu-item'>villa</li>
          </ol>
        </button>

        <button className='Addproperty-file'>
          <input type="file" accept="image/*" id="Addproperty-images" multiple />
        </button>
      </div>

    </div>
  )
}

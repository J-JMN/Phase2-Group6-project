import React, { useState } from 'react'
import { AddIcon } from '../components/icons';
import { InventoryTableList } from '../components/InventoryList';
import Button from 'react-bootstrap/Button';
import useFetch from '../hooks/useFetch';

function Inventory() {
  const [searchQuery,setsearchQuery]=useState('');
  const { data, loading, error } = useFetch('http://localhost:3000/inventory');
  if(loading)  {
    return <p>Loading...</p>
  }
  if(error)  {
    return <p>An Error Occured</p>
  }
  console.log(data)
  return (
    <div className='p-4'>
      <div className="d-flex flex-column flex-md-row justify-content-between my-2">
          <h1 className="custom-text-color-primary fw-bold">Inventory</h1>
          <div className="d-flex flex-column flex-md-row gap-2 align-items-center">
              <input type="search" placeholder='search items' className='form-control form-control-sm' value={searchQuery} onChange={(e)=>{setsearchQuery(e.target.value)}}/>
              <div className="d-flex flex-row gap-2 align-items-sm-start align-items-center">
                  <button className='btn btn-sm btn-primary custom-bg-secondary custom-text-color-primary fw-bold d-flex flex-row align-items-center gap-2' ><AddIcon/>Add</button>
              </div>
          </div>
      </div>
      {data !== null && (<InventoryTableList items={data}/>)}
    </div>
  )
}

export default Inventory;
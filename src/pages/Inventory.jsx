import React, { useState } from 'react'
import { AddIcon } from '../components/icons';
import { InventoryCardList, InventoryTableList } from '../components/InventoryList';
import Button from 'react-bootstrap/Button';
import useFetch from '../hooks/useFetch';

function Inventory() {
  const [searchQuery,setsearchQuery]=useState('');
  let { data, loading, error } = useFetch('http://localhost:3000/inventory');
  
  if(loading)  {
    return <p>Loading...</p>
  }
  if(error)  {
    return <p>An Error Occured</p>
  }
  data = data?.filter(item => item?.title.toLowerCase().includes(searchQuery?.toLowerCase()))
  console.log(data);
  return (
    <div className='p-4'>
      <div className="d-flex flex-column flex-md-row justify-content-between my-2">
          <h1 className="custom-text-color-primary fw-bold fs-4 fs-md-2">Inventory</h1>
          <div className="d-flex flex-row gap-2 align-items-center">
              <input type="search" placeholder='search items' className='form-control form-control-sm' value={searchQuery} onChange={(e)=>{setsearchQuery(e.target.value)}}/>
              <div className="d-flex flex-row gap-2 align-items-sm-start align-items-center">
                  <button className='btn btn-sm btn-primary custom-bg-secondary custom-text-color-primary fw-bold d-flex flex-row align-items-center gap-2' ><AddIcon/>Add</button>
              </div>
          </div>
      </div>
      {data !== null && (<InventoryTableList items={data}/>)} {/**Table view for large screens */}
      {data !== null && (<InventoryCardList items={data}/>)} {/**Card view for small screens */}
    </div>
  )
}

export default Inventory;
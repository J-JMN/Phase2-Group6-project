import React, { useState } from 'react'
import { AddIcon } from '../components/icons';
import { InventoryTableList } from '../components/InventoryList';

function Inventory() {
  const [searchQuery,setsearchQuery]=useState('');
  return (
    <div className='p-4'>
      <div className="d-flex flex-column flex-md-row justify-content-between my-2">
          <h1 className="custom-text-color-primary fw-bold">Inventory</h1>
          <div className="d-flex flex-column flex-md-row gap-2 align-items-center">
              <input type="search" placeholder='search items' className='form-control form-control-sm' value={searchQuery} onChange={(e)=>{setsearchQuery(e.target.value)}}/>
              <div className="d-flex flex-row gap-2 align-items-sm-start align-items-center">
                  <button className='btn btn-sm custom-bg-secondary custom-text-color-primary fw-bold d-flex flex-row align-items-center gap-2' ><AddIcon/>Add</button>
              </div>
          </div>
      </div>
      <InventoryTableList />
    </div>
  )
}

export default Inventory
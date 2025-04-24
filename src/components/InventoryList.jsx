import React from 'react'
import Table from 'react-bootstrap/Table';
export function InventoryTableList() {  
  return (
    <div className="d-none d-md-block ">
        <Table responsive rounded hover>
            <thead className="custom-bg-primary">
                <tr className="rounded py-2">
                    <th scope="col" style={{width: "20px"}}><input type="checkbox"/></th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody className='shadow-sm rounded'>
                <tr>
                     <td><input type="checkbox" class="row-checkbox"/></td>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <td key={index}>Table cell {index}</td>
                    ))}
                </tr>
                <tr>
                     <td><input type="checkbox" class="row-checkbox"/></td>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <td key={index}>Table cell {index}</td>
                    ))}
                </tr>
                <tr>
                     <td><input type="checkbox" class="row-checkbox"/></td>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <td key={index}>Table cell {index}</td>
                    ))}
                </tr>
            </tbody>
            <tfoot className='p-1'>
                <div className="d-flex align-items-center my-2 gap-2">
                    <button className="btn btn-sm custom-bg-secondary custom-text-color-primary fw-bold">prev</button>
                    <div className="d-flex flex-row "><span className="mx-1">1</span> of <span className="mx-1">1</span></div>
                    <button className="btn btn-sm custom-bg-secondary custom-text-color-primary fw-bold">next</button>
                </div>
            </tfoot>
        </Table>
    </div>
  )
}
export function InventoryCardList() {
    return(
        <div><p>Cards</p></div>
    )
}
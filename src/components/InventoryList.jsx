import React from 'react'
import Table from 'react-bootstrap/Table';
import { DeleteIcon, EditIcon } from './icons'
export function InventoryTableList({items}) { 
    console.log(items) 
    return (
        <div className="d-none d-md-block ">
            <Table striped bordered hover size="sm">
                <thead className="custom-bg-primary table-dark">
                    <tr className="rounded py-2">
                        <th scope="col" style={{width: "20px"}}><input type="checkbox"/></th>
                        <th scope="col">Title</th>
                        <th scope="col">Last bought at</th>
                        <th scope="col">Category</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody className='shadow-sm rounded'>
                    {items?.map((item)=>{
                        return(
                            <tr key={item.id}>
                                <td><input type="checkbox" className="row-checkbox"/></td>
                                <td>{item.title}</td>
                                <td>{item.priceList[item.priceList.length - 1].amount}</td>
                                <td>{item.category}</td>
                                <td><span className={`badge bg-${item.status? 'success' : 'warning' } p-1`}>{item.status? 'Active':'Disabled'}</span></td>
                                <td style={{width:'200px'}}>
                                    <div className='d-flex flex-row gap-2'>
                                        <button className='btn btn-sm btn-outline-dark gap-2 align-items-center'><EditIcon/>Manage</button>
                                        <button className='btn btn-sm btn-danger gap-2 align-items-center'><DeleteIcon/>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot className='p-1'>
                    <tr>
                        <td colSpan="6">
                            <div className="d-flex align-items-center my-2 gap-2">
                                <button className="btn btn-sm custom-bg-secondary custom-text-color-primary fw-bold">prev</button>
                                <div className="d-flex flex-row "><span className="mx-1">1</span> of <span className="mx-1">1</span></div>
                                <button className="btn btn-sm custom-bg-secondary custom-text-color-primary fw-bold">next</button>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </div>
    )
}
export function InventoryCardList({items}) {
    return(
        <div className="d-block d-sm-none">
            {items.map((item) => (
                <div className="card mb-3" key={item.id}>
                    <div className="card-body">
                        <div className='d-flex flex-row align-items-center jusctifu-content-between'>
                            <h2 className="card-title my-0 flex-fill">{item.title}</h2>
                            <span className={`badge bg-${item.status? 'success' : 'warning' } p-1 `}>{item.status? 'Active':'Disabled'}</span>
                        </div>
                        <p className="card-text my-0"><strong>Category:</strong>{item.category}</p>
                        <p className="card-text my-0"><strong>Last bought at:</strong> {item.priceList[item.priceList.length - 1].amount}</p>
                        <div className="d-flex flex-row gap-2 mt-2">
                            <button className='btn btn-sm btn-outline-dark gap-2 align-items-center'>
                                <EditIcon />Manage
                            </button>
                            <button className='btn btn-sm btn-danger gap-2 align-items-center'>
                                <DeleteIcon />Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
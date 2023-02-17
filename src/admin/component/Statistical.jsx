import React from 'react'

const Statistical = () => {
    return (
        <div className="row text-center">
            <div className="col-xl-3 col-md-6">
                <div className="card bg-primary text-white mb-4 ">
                    <div className="card-body">Number of products sold </div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                        <span className="small text-white stretched-link text-center" >54 products</span>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6">
                <div className="card bg-warning text-white mb-4">
                    <div className="card-body">Number of users</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                        <a className="small text-white stretched-link">22 users</a>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6">
                <div className="card bg-success text-white mb-4">
                    <div className="card-body">Order Success</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                        <a className="small text-white stretched-link" >12 orders</a>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6">
                <div className="card bg-danger text-white mb-4">
                    <div className="card-body">Order Fail</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                        <a className="small text-white stretched-link" href="#">2 orders</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Statistical
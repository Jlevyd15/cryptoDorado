import React from 'react';

const Table = () => {
  return (
    <div className="container-fluid">
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card-header"><h4>Your crypto performance</h4></div>
            <div className="card">
              <div className="card-block">
                <table className="table">
                  <tbody>
                    <tr><td className="no-border"><h5>Net Worth</h5></td><td className="no-border">$18,090.00</td></tr>
                    <tr><td><h5>Earnings</h5></td><td>$5,690.00</td></tr>
                    <tr><td><h5>Return</h5></td><td>+20%</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table;

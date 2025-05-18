import React from "react";
import { Table } from "react-bootstrap";

export default function DataTable({ title, data }) {
  return (
    <div className="mb-4">
      <h5 className="text-center">{title}</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {Object.values(row).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

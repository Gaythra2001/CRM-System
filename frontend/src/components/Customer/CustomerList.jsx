import React from "react";

const CustomerList = ({ customers }) => {
  if (!customers || customers.length === 0) {
    return <p className="text-sm text-gray-600">No customers yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2 text-left">Name</th>
            <th className="px-3 py-2 text-left">Email</th>
            <th className="px-3 py-2 text-left">Phone</th>
            <th className="px-3 py-2 text-left">Status</th>
            <th className="px-3 py-2 text-left">Owner</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {customers.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="px-3 py-2">{c.name}</td>
              <td className="px-3 py-2">{c.email || "-"}</td>
              <td className="px-3 py-2">{c.phone || "-"}</td>
              <td className="px-3 py-2">
                <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">{c.status}</span>
              </td>
              <td className="px-3 py-2">{c.owner_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;

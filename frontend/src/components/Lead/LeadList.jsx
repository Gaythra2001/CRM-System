import React from "react";

const statusColors = {
  new: "bg-yellow-100 text-yellow-800",
  contacted: "bg-blue-100 text-blue-800",
  qualified: "bg-green-100 text-green-800",
  lost: "bg-gray-200 text-gray-700",
};

const LeadList = ({ leads, onChangeStatus, onConvert }) => {
  if (!leads || leads.length === 0) {
    return <p className="text-sm text-gray-600">No leads yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2 text-left">Name</th>
            <th className="px-3 py-2 text-left">Status</th>
            <th className="px-3 py-2 text-left">Value</th>
            <th className="px-3 py-2 text-left">Owner</th>
            <th className="px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50">
              <td className="px-3 py-2">{lead.name}</td>
              <td className="px-3 py-2">
                <span className={`px-2 py-1 rounded-full text-xs ${statusColors[lead.status] || "bg-gray-100"}`}>
                  {lead.status}
                </span>
              </td>
              <td className="px-3 py-2">{lead.value ? `$${lead.value}` : "-"}</td>
              <td className="px-3 py-2">{lead.owner_id}</td>
              <td className="px-3 py-2 space-x-2">
                <select
                  value={lead.status}
                  onChange={(e) => onChangeStatus(lead.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="lost">Lost</option>
                </select>
                <button
                  onClick={() => onConvert(lead.id)}
                  className="bg-indigo-600 text-white px-3 py-1 rounded"
                  disabled={!!lead.converted_customer_id}
                >
                  {lead.converted_customer_id ? "Converted" : "Convert"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadList;

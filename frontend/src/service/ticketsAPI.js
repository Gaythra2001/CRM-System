import axios from "axios";

const baseURL = "http://localhost:5000/api/v1/tickets";

// get all tickets
export const fetchTickets = async (token) => {
  const res = await axios.get(baseURL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// add 
export const saveTicket = async (token, ticketData) => {
  try {
    // Add new ticket
    const res = await axios.post(baseURL, ticketData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};


// update ticket
export const updateTicket = async (token, ticketId, ticketData) => {
console.log(ticketData)
  try {
    const res = await axios.put(
      `${baseURL}/${ticketId}`,
      ticketData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("Error updating ticket:", error);
  }
};


// update ticket status
export const updateTicketStatus = async (token, ticketId, status) => {
  try {
    const res = await axios.put(
      `${baseURL}/status/${ticketId}`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error updating ticket status:", error);
  }
};

// delete a ticket
export const deleteTicket = async (token, ticketId) => {
  try {
    await axios.delete(`${baseURL}/${ticketId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error deleting ticket:", error);
  }
};

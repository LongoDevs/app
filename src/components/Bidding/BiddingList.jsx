import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BiddingList = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = async () => {
    try {
      const response = await axios.get('/api/bidding'); // Replace with your API endpoint
      setBids(response.data);
    } catch (error) {
      console.error("Error fetching bids:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Bidding List</h2>

      {loading ? (
        <p>Loading bids...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border">Bid ID</th>
              <th className="py-2 px-4 border">User</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Service</th>
              <th className="py-2 px-4 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid) => (
              <tr key={bid.id}>
                <td className="py-2 px-4 border">{bid.id}</td>
                <td className="py-2 px-4 border">{bid.user_name}</td>
                <td className="py-2 px-4 border">R{bid.amount}</td>
                <td className="py-2 px-4 border">{bid.service_name}</td>
                <td className="py-2 px-4 border">{new Date(bid.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BiddingList;


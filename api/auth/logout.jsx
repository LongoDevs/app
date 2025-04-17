export default function handler(req, res) {
    if (req.method === "POST") {
      res.status(200).json({ message: "Logged out" });
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  }
  

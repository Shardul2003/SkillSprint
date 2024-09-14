export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await fetch('http://localhost:5000/api/gptresult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: req.body.input,
      });
      console.log("request: ", req.body.input); // check request
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
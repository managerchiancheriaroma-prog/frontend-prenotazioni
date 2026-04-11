export default async function handler(req, res) {

  const GAS_URL = https://script.google.com/macros/s/AKfycbz77a6AravVc6Mp70yBsk4CC6qbrn3KS8hTEE1JUR9dojrqqtj4717rw8vmkxZzWRvr/exec

  try {

    const body = typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;

    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const text = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(text);

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}

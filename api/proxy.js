export default async function handler(req, res) {

  const GAS_URL = "https://script.google.com/macros/s/AKfycbz77a6AravVc6Mp70yBsk4CC6qbrn3KS8hTEE1JUR9dojrqqtj4717rw8vmkxZzWRvr/exec";

  try {

    const body = req.body;

    console.log("BODY ARRIVATO:", body);

    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const text = await response.text();

    console.log("RISPOSTA GAS:", text);

    let data;

    try {
      data = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({
        success: false,
        errore: "Risposta non JSON",
        raw: text
      });
    }

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({
      success: false,
      errore: err.toString()
    });
  }
}

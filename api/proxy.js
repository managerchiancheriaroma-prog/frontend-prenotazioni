export default async function handler(req, res) {

  const GAS_URL = "https://script.google.com/macros/s/AKfycbz77a6AravVc6Mp70yBsk4CC6qbrn3KS8hTEE1JUR9dojrqqtj4717rw8vmkxZzWRvr/exec";

  try {

    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();

    // 🔥 DEBUG (IMPORTANTISSIMO)
    console.log("RISPOSTA GAS:", text);

    // prova a convertirlo in JSON
    let data;

    try {
      data = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({
        success: false,
        errore: "Risposta non JSON dal server",
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

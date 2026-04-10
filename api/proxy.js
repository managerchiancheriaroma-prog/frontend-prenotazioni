export default async function handler(req, res) {

  const GAS_URL = "https://script.google.com/macros/s/AKfycbywImmUw3zHHUiQoZ2DTOm-PpoQnn6-3Samb0leiIudmrmi4ngQcuhuPThchfoluIre/exec";

  try {

    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(data);

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
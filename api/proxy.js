export default async function handler(req, res) {

  const GAS_URL = "https://script.google.com/macros/s/AKfycbyTFA5JUa-9EinYEBxEnDUZwVkliRehsRPll-TL0-7nm652YwUEE2VLbcHwOOF6UIx4/exec";

  try {

    // 🔥 FIX VERO: leggiamo il body RAW
    let body = "";

    await new Promise((resolve) => {
      req.on("data", chunk => {
        body += chunk;
      });
      req.on("end", resolve);
    });

    console.log("RAW BODY:", body);

    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: body // 🔥 passiamo RAW senza toccarlo
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

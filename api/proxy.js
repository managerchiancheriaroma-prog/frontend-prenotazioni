export default async function handler(req, res) {

  const GAS_URL = "https://script.google.com/macros/s/AKfycbwOwFdAYlQn61BOHN3wBVxInrVHd0vNgOvK04hKrMCZlubMmXsec-ZqNIn4YjRzyE-K/exec";

  console.log("GAS CHIAMATO:", GAS_URL);

  try {

    // Leggiamo il body RAW
    let body = "";

    await new Promise((resolve) => {
      req.on("data", chunk => {
        body += chunk;
      });

      req.on("end", resolve);
    });

    console.log("BODY INVIATO A GAS:", body);


let response = await fetch(GAS_URL, {
  method: "POST",
  redirect: "manual",
  headers: {
    "Content-Type": "application/json"
  },
  body: body
});

console.log("PRIMA RISPOSTA:", response.status);

if (response.status === 302) {

  const redirectUrl = response.headers.get("location");

  console.log("REDIRECT GOOGLE:", redirectUrl);

  response = await fetch(redirectUrl, {
    method: "GET",
    redirect: "follow"
  });

}

console.log("STATUS FINALE:", response.status);

const text = await response.text();

console.log("URL FINALE:", response.url);
console.log("HEADERS:", Object.fromEntries(response.headers.entries()));


    console.log("RISPOSTA GREZZA GAS:", text);


    let data;

    try {

      data = JSON.parse(text);

    } catch (e) {

      console.error("ERRORE PARSE JSON:", e);

      return res.status(500).json({

        success: false,

        errore: "Risposta non JSON",

        raw: text

      });

    }


    return res.status(200).json(data);


  } catch (err) {


    console.error("ERRORE PROXY:", err);


    return res.status(500).json({

      success: false,

      errore: err.toString()

    });

  }

}

import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

const fullName = "suryansh_singh";
const dob = "20012003";
const email = "suryansh2426.be22@chitkara.edu.in";
const rollNumber = "2210992426";

app.use(cors());
app.use(express.json());

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res
        .status(400)
        .json({ is_success: false, message: "Invalid input" });
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    const allAlphaChars = [];

    let sum = 0;

    data.forEach((item) => {
      const str = String(item);

      if (/^\d+$/.test(str)) {
        const num = parseInt(str, 10);
        sum += num;
        (num % 2 === 0 ? even_numbers : odd_numbers).push(str);
      } else if (/^[a-zA-Z]+$/.test(str)) {
        alphabets.push(str.toUpperCase());
        allAlphaChars.push(...str);
      } else {
        special_characters.push(str);
      }
    });

    const concat_string = allAlphaChars
      .reverse()
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    res.status(200).json({
      is_success: true,
      user_id: `${fullName.toLowerCase()}_${dob}`,
      email,
      roll_number: rollNumber,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (err) {
    res.status(500).json({
      is_success: false,
      message: "Something went wrong",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

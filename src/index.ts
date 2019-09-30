import { Request, Response } from "express";
import Express from "express";
import kuromoji from "kuromoji";
import cors from "cors";

const app = Express();
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  const query = req.query.q;
  kuromoji.builder({ dicPath: `${__dirname}/dict` }).build((err, tokenizer) => {
    if (err) {
      console.log(err);
    } else {
      const tokens = tokenizer.tokenize(query);
      const nouns = new Map<string, number>();
      tokens.forEach(token => {
        const word = token.surface_form;
        if (
          token.pos === "名詞" &&
          !word.match(/[^ぁ-んァ-ンーa-zA-Z0-9一-龠０-９\-\r]+/u)
        ) {
          const count = nouns.get(word);
          nouns.set(word, count ? count + 1 : 1);
        }
      });
      return res.json(
        [...nouns.entries()].map(noun => {
          return { word: noun[0], count: noun[1] };
        })
      );
    }
    return res.json({ error: "fail" });
  });
});

export default app;

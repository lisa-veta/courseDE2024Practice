import { Button } from "#shared/ui/Button/index.js";
import { Switch } from "#shared/ui/Switch/index";

const IndexPage = () => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Home Page</title>
    </head>
    <body>
      <header>
        <h1>Welcome to the Home Page</h1>
      </header>
      <main>
        <p>Hello world!</p>
        ${Button({ text: "HI!" })}
        ${Switch({})}
      </main>
    </body>
  </html>
`;

export default IndexPage;

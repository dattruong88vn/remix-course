import { Link } from "@remix-run/react";

import homeStyles from "../styles/home.css";

export default function Index() {
  return (
    <main id="content">
      <h1>Hello Dat Cho Dien</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque itaque
        eaque fugit tenetur! Veritatis ullam magnam ea aliquid provident quod
        corporis quibusdam quis vel veniam, quam, facilis tempore animi vero?
      </p>
      <p id="cta">
        <Link to="/notes">Try Now!</Link>
      </p>
    </main>
  );
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: homeStyles,
    },
  ];
}

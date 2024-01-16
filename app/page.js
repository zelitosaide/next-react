import Header from "./header";
import { Tweet } from "react-tweet";

export default function Page() {
  return (
    <section>
      <Header>
        <h1>Zelito</h1>
      </Header>
      <p>This is my amazing site.</p>
      <Tweet id="1739841006420332826" />
    </section>
  );
}
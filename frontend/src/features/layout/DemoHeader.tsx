"use server";

export async function DemoHeader() {
  console.log("im on the server");
  return <div>DemoHeader</div>;
}

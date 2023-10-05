import Application from "../src/app";
import { before, after } from "mocha";
const infra = Application.instance();

before(async () => {
  console.log("Initialize test");
  await infra.start();
  await wait(1000);
  console.log("Set-up done");
})

after(() => {
  console.log("Server shut down");
})

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

global.TestCache = {}

export const setTestData = (value: any, key: string) => {
  global.TestCache[key]= value;
}

export const getTestData = (key: string): any => {
  return global.TestCache[key];
}
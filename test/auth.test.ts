import { AuthServices } from "./AuthServices";

async function testAuth() {
  const authServices = new AuthServices();
  const signInOutput = await authServices.login("Batman", "Batman13579!");
  console.log(signInOutput);
  const idToken = await authServices.getIdToken();
  console.log(idToken);
}

testAuth();

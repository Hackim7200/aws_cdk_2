import { handler } from "../src/services/movies/handler";

// handler(
//   {
//     httpMethod: "POST",
//     body: JSON.stringify({
//       title: "Guardians of the Galaxy",
//       year: "2014",
//     }),
//   } as any,
//   {} as any
// );


handler({ 
  httpMethod: "GET" 

} as any, {} as any);
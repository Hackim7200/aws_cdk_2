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

handler(
  {
    httpMethod: "GET",
    queryStringParameters: {
      id: "ad2e3dfb-bfef-48d7-8db4-6f4cd8c006ea",
    },
  } as any,
  {} as any
);

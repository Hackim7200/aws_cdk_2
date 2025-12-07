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

// handler(
//   {
//     httpMethod: "GET",
//     // queryStringParameters: {
//     //   id: "ad2e3dfb-bfef-48d7-8db4-6f4cd8c006ea",
//     // },
//   } as any,
//   {} as any
// );

// handler(
//   {
//     httpMethod: "GET",
//      queryStringParameters: {
//        id: "ad2e3dfb-bfef-48d7-8db4-6f4cd8c006ea",
//     // },
//   } as any,
//   {} as any
// );

handler(
  {
    httpMethod: "PUT",
    queryStringParameters: {
      id: "1c998ea9-c7da-459f-a711-f486cbb8bf65",
    },
    body: JSON.stringify({
      title: "dublin updated",
    }),
  } as any,
  {} as any
);

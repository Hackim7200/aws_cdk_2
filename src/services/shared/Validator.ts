import { MovieEntry } from "../models/Model";

// this file handles expected errors and throws a understanble error message

export class MissingFieldsError extends Error {
  constructor(missingFields: string) {
    super(`Value for ${missingFields} is required`);

    //concatinating the message with the value that is missing
  }
}
// retuns the value that missing in the object
export function validateAsMovieEntry(arg: any) {
  //   if ((arg as MovieEntry).photoUrl === undefined) { // this is optional field so we are not throwing an error for it
  //     throw new MissingFieldsError("photoUrl");
  //   }
  if ((arg as MovieEntry).year === undefined) {
    throw new MissingFieldsError("year");
  }
  if ((arg as MovieEntry).title === undefined) {
    throw new MissingFieldsError("title");
  }
  if ((arg as MovieEntry).id === undefined) {
    throw new MissingFieldsError("id");
  }
}

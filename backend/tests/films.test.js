const expect = require("chai").expect;
const Films = require("../models/filmsModel");

describe("Films test", () => {
  // 1

  it("should correctly add new film with {title: 'string', year: '1000', formatId: '3', authors: 'tprokysh'}", async () => {
    const result = await Films.addFilm({
      title: "string",
      year: "1000",
      formatId: "3",
      authors: "tprokysh"
    });

    expect(result).to.equal("success");
  });

  // 2

  it("shouldn't add new film with {title: 'string', year: '1000', formatId: '4', authors: 'tprokysh'}", async () => {
    const result = await Films.addFilm({
      title: "string",
      year: "1000",
      formatId: "4",
      authors: "tprokysh"
    });

    expect(result).to.equal("error");
  });

  // 3

  it("should return error if id doesn't exist, for example id = 3123213", async () => {
    const result = await Films.deleteFilm(3123213);

    expect(result).to.equal("error");
  });

  // 4

  it("should return one film where film id == request id, for example id = 1450", async () => {
    const result = await Films.getFilmInfo("1450");

    expect(typeof result).to.equal(typeof {});
  });

  // 5

  it("should return undefined, if film id != request id, for example id = 3123213", async () => {
    const result = await Films.getFilmInfo("3123213");

    expect(result).to.equal(undefined);
  });
});

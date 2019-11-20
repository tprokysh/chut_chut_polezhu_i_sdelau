const expect = require("chai").expect;
const Films = require("../models/filmsModel");

describe("Films test", () => {
  // 1

  it("should correctly add new film with {title: 'string', year: '1850', formatId: '3', authors: 'tprokysh'}", async () => {
    const result = await Films.addFilm({
      title: "string1sdasdsasdsdasdsaasddasdas321dsddasdsad",
      year: "1850",
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
    const result = await Films.getFilmInfo("1307");

    expect(typeof result).to.equal(typeof {});
  });

  // 5

  it("should return undefined, if film id != request id, for example id = 3123213", async () => {
    const result = await Films.getFilmInfo("3123213");

    expect(result).to.equal(undefined);
  });

  it("should return error, if film title length > 128 char's", async () => {
    const result = await Films.addFilm({
      title:
        "sdasdasdaskdasdjkasdjasdjkasdjaksdjklasjdklasjdkajsdkjaskfjkasfjaskfjasjdashdjkhaskjdhkjasdhjashdjashdkjhasdjhasdkjhasdhasdkjasdhkjashdkjashdkjashdkjashdjashdkjashdj",
      year: "1000",
      formatId: "3",
      authors: "tprokysh"
    });

    expect(result).to.equal("error");
  });

  it("should return error, if film year < 1850, for example year = 1000", async () => {
    const result = await Films.addFilm({
      title: "teststring",
      year: "1000",
      formatId: "3",
      authors: "tprokysh"
    });

    expect(result).to.equal("error");
  });

  it("should return error, if film year > 2025, for example year = 2999", async () => {
    const result = await Films.addFilm({
      title: "teststring1",
      year: "2999",
      formatId: "3",
      authors: "tprokysh"
    });

    expect(result).to.equal("error");
  });

  it("should return error, if film actors length > 255", async () => {
    const result = await Films.addFilm({
      title: "teststring2",
      year: "1999",
      formatId: "3",
      authors:
        "tprokyshdkasldklkasdlkasldkaskdlasldklasdkl;askd;lkasd;lkasd;lkasd;lkas;ldkas;ldk;laskd;lkasd;lkasd;lkas;ldklas;dkl;askd;laskdl;askd;lkasd;lkasd;lkasd;lkas;ldk;lasdk;lasdk;lasdk;lasdkl;askdlaskdl;aksdl;kasdlkasdlkasdlkas;ldkasldklas;dklas;dkl;askdl;askdlkasdlaksdl;aksdlkasd;lkasldk"
    });

    expect(result).to.equal("error");
  });

  it("should return error, if film actors length > 255", async () => {
    const result = await Films.addFilm({
      title: "teststring3",
      year: "1850",
      formatId: "3",
      authors:
        "tprokyshdkasldklkasdlkasldkaskdlasldklasdkl;askd;lkasd;lkasd;lkasd;lkas;ldkas;ldk;laskd;lkasd;lkasd;lkas;ldklas;dkl;askd;laskdl;askd;lkasd;lkasd;lkasd;lkas;ldk;lasdk;lasdk;lasdk;lasdkl;askdlaskdl;aksdl;kasdlkasdlkasdlkas;ldkasldklas;dklas;dkl;askdl;askdlkasdlaksdl;aksdlkasd;lkasldk"
    });

    expect(result).to.equal("error");
  });

  it("should return error, if film actors contains numbers", async () => {
    const result = await Films.addFilm({
      title: "teststring4",
      year: "1870",
      formatId: "3",
      authors: "123test123"
    });

    expect(result).to.equal("error");
  });
});

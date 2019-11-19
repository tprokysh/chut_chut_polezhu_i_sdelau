parseTxt = (data) => {
  const dist = [];

  data = data.toString().split("\n\n");

  data.forEach((item) => {
    const obj = {};
    obj.title = item.split("\n")[0];
    if (!obj.title) return;
    obj.title = obj.title.split(": ")[1];
    obj.year = item.split("\n")[1];
    if (!obj.year) return;
    obj.year = obj.year.split(": ")[1];
    obj.year = +obj.year;
    obj.formatId = item.split("\n")[2];
    if (!obj.formatId) return;
    obj.formatId = obj.formatId.split(": ")[1];
    if (obj.formatId === "VHS") obj.formatId = 1;
    else if (obj.formatId === "DVD") obj.formatId = 2;
    else if (obj.formatId === "Blu-Ray") obj.formatId = 3;
    else return;
    obj.authors = item.split("\n")[3];
    if (!obj.authors) return;
    obj.authors = obj.authors.split(": ")[1];
    dist.push(obj);
  });

  const uniqueDist = dist.filter((item, index) => {
    return (
      index ===
      dist.findIndex((obj) => {
        return JSON.stringify(obj.title) === JSON.stringify(item.title);
      })
    );
  });

  return uniqueDist;
};

module.exports = parseTxt;

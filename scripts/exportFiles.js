// Export Players in a CSV file

const players = [
  {
    license: "623116",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "MOGLIA",
    lastname: "Rodolphe",
    points: {
      classement: "17",
      officiels: "1720.5",
      start: "1729",
      monthlyProgression: "-11.0",
      allProgression: "-8.5",
    },
  },
  {
    license: "626664",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "PRUDHOMME",
    lastname: "Sebastien",
    points: {
      classement: "16",
      officiels: "1697",
      start: "1687",
      monthlyProgression: "+6.0",
      allProgression: "+10.0",
    },
  },
  {
    license: "6230073",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "PONTOIS",
    lastname: "Yannick",
    points: {
      classement: "16",
      officiels: "1688",
      start: "1645",
      monthlyProgression: "+16.5",
      allProgression: "+43.0",
    },
  },
  {
    license: "621886",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "DECLERCQ",
    lastname: "Ludovic",
    points: {
      classement: "15",
      officiels: "1597.8",
      start: "1599",
      monthlyProgression: "+10.0",
      allProgression: "-1.2",
    },
  },
  {
    license: "624453",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "BODHUIN",
    lastname: "Cyril",
    points: {
      classement: "14",
      officiels: "1404",
      start: "1427",
      monthlyProgression: "-15.5",
      allProgression: "-23.0",
    },
  },
  {
    license: "62912",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "HUMEZ",
    lastname: "David",
    points: {
      classement: "14",
      officiels: "1369",
      start: "1412",
      monthlyProgression: "0.0",
      allProgression: "-43.0",
    },
  },
  {
    license: "627626",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "NORMAND",
    lastname: "Pascal",
    points: {
      classement: "12",
      officiels: "1267.5",
      start: "1275",
      monthlyProgression: "-13.0",
      allProgression: "-7.5",
    },
  },
  {
    license: "6220317",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "BASTIEN",
    lastname: "Corentin",
    points: {
      classement: "12",
      officiels: "1283",
      start: "1267",
      monthlyProgression: "+3.0",
      allProgression: "+16.0",
    },
  },
  {
    license: "6210346",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "MATHON",
    lastname: "Geoffrey",
    points: {
      classement: "11",
      officiels: "1142",
      start: "1142",
      monthlyProgression: "0.0",
      allProgression: "0.0",
    },
  },
  {
    license: "6226894",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "RACZYNSKI",
    lastname: "Axell",
    points: {
      classement: "10",
      officiels: "992.5",
      start: "1001",
      monthlyProgression: "-15.5",
      allProgression: "-8.5",
    },
  },
  {
    license: "625497",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "PRUDHOMME",
    lastname: "Nicolas",
    points: {
      classement: "9",
      officiels: "1025",
      start: "992",
      monthlyProgression: "+9.5",
      allProgression: "+33.0",
    },
  },
  {
    license: "626816",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "POULAIN",
    lastname: "Jean-francois",
    points: {
      classement: "9",
      officiels: "951",
      start: "956",
      monthlyProgression: "-5.0",
      allProgression: "-5.0",
    },
  },
  {
    license: "6233650",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "DEVILLE",
    lastname: "Fabien",
    points: {
      classement: "9",
      officiels: "949",
      start: "951",
      monthlyProgression: "-8.0",
      allProgression: "-2.0",
    },
  },
  {
    license: "6226208",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "ROHRBACHER",
    lastname: "Philippe",
    points: {
      classement: "9",
      officiels: "912",
      start: "933",
      monthlyProgression: "-21.0",
      allProgression: "-21.0",
    },
  },
  {
    license: "6228139",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "BOUCHEZ",
    lastname: "Mickael",
    points: {
      classement: "9",
      officiels: "978",
      start: "930",
      monthlyProgression: "+7.5",
      allProgression: "+48.0",
    },
  },
  {
    license: "6226880",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "BOUTTE",
    lastname: "Philippe",
    points: {
      classement: "8",
      officiels: "883.5",
      start: "865",
      monthlyProgression: "+27.5",
      allProgression: "+18.5",
    },
  },
  {
    license: "6225643",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "CAMUS",
    lastname: "Benjamin",
    points: {
      classement: "8",
      officiels: "890",
      start: "855",
      monthlyProgression: "-12.0",
      allProgression: "+35.0",
    },
  },
  {
    license: "627628",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "KUY",
    lastname: "Cedric",
    points: {
      classement: "8",
      officiels: "816.5",
      start: "821",
      monthlyProgression: "-4.5",
      allProgression: "-4.5",
    },
  },
  {
    license: "6231264",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "DARCHEVILLE",
    lastname: "Nicolas",
    points: {
      classement: "8",
      officiels: "896.5",
      start: "810",
      monthlyProgression: "+27.5",
      allProgression: "+86.5",
    },
  },
  {
    license: "6224265",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "ROGOZINSKI",
    lastname: "Jean-Francois",
    points: {
      classement: "7",
      officiels: "828.5",
      start: "791",
      monthlyProgression: "+12.0",
      allProgression: "+37.5",
    },
  },
  {
    license: "623799",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "GRZESKOWIAK",
    lastname: "David",
    points: {
      classement: "6",
      officiels: "670",
      start: "669",
      monthlyProgression: "-14.5",
      allProgression: "+1.0",
    },
  },
  {
    license: "6215007",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "RACZYNSKI",
    lastname: "Frederic",
    points: {
      classement: "6",
      officiels: "652.5",
      start: "660",
      monthlyProgression: "-13.5",
      allProgression: "-7.5",
    },
  },
  {
    license: "6221219",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "MICHEL",
    lastname: "Didier",
    points: {
      classement: "6",
      officiels: "610.5",
      start: "621",
      monthlyProgression: "-7.5",
      allProgression: "-10.5",
    },
  },
  {
    license: "6238064",
    clubId: "07620040",
    clubName: "LOOS EN GOHELLE TT",
    firstname: "BOUCHEZ",
    lastname: "Lucas",
    points: {
      classement: "5",
      officiels: "500",
      start: "500",
      monthlyProgression: "0.0",
      allProgression: "0.0",
    },
  },
];

const fs = require("fs");
const XLSX = require("xlsx");

const createExcel = (players, sort) => {
  if (!sort) sort = "default";

  if (sort === "default") {
    players.sort((a, b) => {
      return b.points.classement - a.points.classement;
    });
  } else if (sort === "points") {
    players.sort((a, b) => {
      return b.points.officiels - a.points.officiels;
    });
  } else if (sort === "progression") {
    players.sort((a, b) => {
      return b.points.allProgression - a.points.allProgression;
    });
  } else if (sort === "monthlyProgression") {
    players.sort((a, b) => {
      return b.points.monthlyProgression - a.points.monthlyProgression;
    });
  } else if (sort === "start") {
    players.sort((a, b) => {
      return b.points.start - a.points.start;
    });
  } else if (sort === "name") {
    players.sort((a, b) => {
      return a.firstname.localeCompare(b.firstname);
    });
  }

  let data = [["Nom", "Prénom", "Classement", "Points Début Saison", "Points Fin Saison", "Progression Total"]];

  players.forEach((player) => {
    data.push([player.firstname, player.lastname, player.points.classement, player.points.start, player.points.officiels, player.points.allProgression]);
  });

  const wscols = [{ wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  ws["!cols"] = wscols;
  XLSX.utils.book_append_sheet(wb, ws, "Players");

  const wbout = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  fs.writeFileSync("players.xlsx", wbout, function (err) {
    if (err) {
      console.log(err.message || err);
    }
  });
};

createExcel(players, "progression");

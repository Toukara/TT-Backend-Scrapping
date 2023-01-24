const { time } = require("console");
const fs = require("fs");
const XLSX = require("xlsx");

const { models } = require("../database");
const { Club } = models;

const createExcel = async (id, sort) => {
  const club = await Club.findOne({ where: { id } });

  const timestamp = Date.now();

  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  if (!club) return null;

  const players = club.players;

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
  //   XLSX.utils.book_append_sheet(wb, ws, "Players");

  //   const wbout = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  //   fs.writeFileSync("players.xlsx", wbout, function (err) {
  //     if (err) {
  //       console.log(err.message || err);
  //     }
  //   });

  XLSX.utils.book_append_sheet(wb, ws, "Players");

  const wbout = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  fs.writeFileSync(`${club.name}-${formattedDate}.xlsx`, wbout, function (err) {
    if (err) {
      console.log(err.message || err);
    }
  });
};

module.exports = {
  excelFiles: createExcel,
};

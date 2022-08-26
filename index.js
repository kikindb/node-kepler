const { parse } = require("csv-parse");
const fs = require("fs");

const habitablePlanets = [];

const MIN_HABITABLE_INSOL = 0.36;
const MAX_HABITABLE_INSOL = 1.11;

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > MIN_HABITABLE_INSOL &&
    planet["koi_insol"] < MAX_HABITABLE_INSOL &&
    planet["koi_prad"] < 1.6
  );
}

fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on("error", (error) => {
    console.error(error);
  })
  .on("end", () => {
    console.log(habitablePlanets.map((planet) => planet["kepler_name"]));
    console.log(`${results.length} habitable planets`);
    console.log("done");
  });

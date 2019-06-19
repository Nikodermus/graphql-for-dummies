const space = " ";
const fill = "#";
const size = 9;
for (let i = 1; i <= size; i++) {
  console.log(`${space.repeat(size - i)}${fill.repeat(i)}`);
}

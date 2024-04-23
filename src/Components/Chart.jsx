import { BarChart } from "@mui/x-charts";
const Chart = ({ children, otherPets, people }) => {
  return (
    <BarChart
      xAxis={[
        {
          scaleType: "band",
          data: ["with Children", "with Dogs", "with Strangers"],
          label: "Friendliness Level",
        },
      ]}
      series={[
        {
          data: [children, otherPets, people],
        },
      ]}
      width={400}
      height={300}
    />
  );
};

export default Chart;

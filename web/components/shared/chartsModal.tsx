import ThemedModal from "./themed/themedModal";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { BarChart, DonutChart, LineChart } from "@tremor/react";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

type TChart = {
  chartType: "bar" | "line" | "donut";
  data: any;
};

const ChartsModal = (props: ModalProps) => {
  const { open, setOpen } = props;
  const [prompt, setPrompt] = useState<string>();

  const [chartData, setChartData] = useState<TChart>({
    chartType: "bar",
    data: null,
  });

  async function handleSubmit() {
    const res = await fetch("/api/genui/chartData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Helicone-Auth": process.env.HELICONE_LOCAL_KEY || "",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    const data = await res.json();
    if (data.error) return console.error(data.error);

    console.log(data.data);

    setChartData({
      chartType: data.data.chartType as "bar" | "line" | "donut",
      data: data.data.data,
    });
  }

  return (
    <ThemedModal open={open} setOpen={setOpen}>
      <div className="flex flex-col space-y-4 w-[450px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-row gap-2"
        >
          <input
            type="text"
            value={prompt}
            placeholder="Top users this month..."
            onChange={(e) => setPrompt(e.target.value)}
            className="w-10/12 border border-gray-300 rounded-md p-2"
          />

          <button
            type="button"
            onClick={() => handleSubmit()}
            className="w-max text-white rounded-md p-2 bg-blue-500 border-2 border-blue-500 hover:border-blue-700 transition-colors ease-in-out duration-300"
          >
            Generate
          </button>
        </form>

        {!chartData && (
          <div className="pb-4">
            <p className="text-gray-400 font-semibold">
              You might be interested in...
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <button
                onClick={() => {
                  setPrompt("Top users this month");
                  handleSubmit();
                }}
                className="flex gap-1 w-max rounded-md p-1 hover:ring-1 hover:bg-gray-100 ring-blue-500 transition-all ease-in-out duration-300"
              >
                <SparklesIcon className="h-5 w-5" />
                Top users this month
              </button>

              <button
                onClick={() => {
                  setPrompt("Top models this month");
                  handleSubmit();
                }}
                className="flex gap-1 w-max rounded-md p-1 hover:ring-1 hover:bg-gray-100 ring-blue-500 transition-all ease-in-out duration-300"
              >
                <SparklesIcon className="h-5 w-5" />
                Top models this month
              </button>

              <button
                onClick={() => {
                  setPrompt("Best week this quarter");
                  handleSubmit();
                }}
                className="flex gap-1 w-max rounded-md p-1 hover:ring-1 hover:bg-gray-100 ring-blue-500 transition-all ease-in-out duration-300"
              >
                <SparklesIcon className="h-5 w-5" />
                Best week this quarter
              </button>
            </div>
          </div>
        )}

        {chartData && (
          <div className="pb-4">
            {chartData.chartType === "bar" && (
              <BarChart
                data={chartData.data}
                index="name"
                categories={["value"]}
                colors={["blue"]}
                valueFormatter={dataFormatter}
                yAxisWidth={48}
                onValueChange={(v) => console.log(v)}
              />
            )}
            {chartData.chartType === "donut" && (
              <DonutChart
                data={chartData.data}
                variant="donut"
                valueFormatter={dataFormatter}
                onValueChange={(v) => console.log(v)}
              />
            )}
            {chartData.chartType === "line" && (
              <LineChart
                className="h-80"
                data={chartData.data}
                index="date"
                categories={[
                  ...new Set(
                    chartData.data.flatMap((elem) =>
                      Object.keys(elem).filter((x) => x != "date")
                    )
                  ),
                ]}
                colors={["indigo", "rose"]}
                valueFormatter={dataFormatter}
                yAxisWidth={60}
                onValueChange={(v) => console.log(v)}
              />
            )}
          </div>
        )}
      </div>
    </ThemedModal>
  );
};

export default ChartsModal;

const barChartData = [
  {
    name: "Amphibians",
    value: 2488,
  },
  {
    name: "Birds",
    value: 1445,
  },
  {
    name: "Crustaceans",
    value: 743,
  },
  {
    name: "Ferns",
    value: 281,
  },
  {
    name: "Arachnids",
    value: 251,
  },
  {
    name: "Corals",
    value: 232,
  },
  {
    name: "Algae",
    value: 98,
  },
];

const donutChartData = [
  {
    name: "Noche Holding AG",
    value: 9800,
  },
  {
    name: "Rain Drop AG",
    value: 4567,
  },
  {
    name: "Push Rail AG",
    value: 3908,
  },
  {
    name: "Flow Steal AG",
    value: 2400,
  },
  {
    name: "Tiny Loop Inc.",
    value: 2174,
  },
  {
    name: "Anton Resorts Holding",
    value: 1398,
  },
];

const lineChartData = [
  {
    date: "Jan 22",
    SolarPanels: 2890,
    Inverters: 2338,
  },
  {
    date: "Feb 22",
    SolarPanels: 2756,
    Inverters: 2103,
  },
  {
    date: "Mar 22",
    SolarPanels: 3322,
    Inverters: 2194,
  },
  {
    date: "Apr 22",
    SolarPanels: 3470,
    Inverters: 2108,
  },
  {
    date: "May 22",
    SolarPanels: 3475,
    Inverters: 1812,
  },
  {
    date: "Jun 22",
    SolarPanels: 3129,
    Inverters: 1726,
  },
  {
    date: "Jul 22",
    SolarPanels: 3490,
    Inverters: 1982,
  },
  {
    date: "Aug 22",
    SolarPanels: 2903,
    Inverters: 2012,
  },
  {
    date: "Sep 22",
    SolarPanels: 2643,
    Inverters: 2342,
  },
  {
    date: "Oct 22",
    SolarPanels: 2837,
    Inverters: 2473,
  },
  {
    date: "Nov 22",
    SolarPanels: 2954,
    Inverters: 3848,
  },
  {
    date: "Dec 22",
    SolarPanels: 3239,
    Inverters: 3736,
  },
];

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

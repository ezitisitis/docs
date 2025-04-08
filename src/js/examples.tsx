function read(path: string): string {
  return require(`!!raw-loader?esModule=false!./${path}`)
}

export const EXAMPLE_RESPONSE_META = read("apiv2-examples/response-meta.json")

const EXAMPLES = [
  {
    id: "example-aggregate",
    title: "Simple aggregate query",
    query: read("apiv2-examples/aggregate-query.json"),
    exampleResponse: read("apiv2-examples/aggregate-response.json"),
  },
  {
    id: "example-custom-date-range",
    title: "Custom date range",
    query: read("apiv2-examples/custom-date-range-query.json"),
    exampleResponse: read("apiv2-examples/custom-date-range-response.json"),
  },
  {
    id: "example-country-and-city",
    title: "Country and city analysis",
    query: read("apiv2-examples/country-and-city-query.json"),
    exampleResponse: read("apiv2-examples/country-and-city-response.json"),
  },
  {
    id: "example-utm",
    title: "UTM medium, source analysis",
    query: read("apiv2-examples/utm-query.json"),
    exampleResponse: read("apiv2-examples/utm-response.json"),
  },
  {
    id: "example-filtering",
    title: "Filtering by page and country",
    query: read("apiv2-examples/filtering-basics-query.json"),
    exampleResponse: read("apiv2-examples/filtering-basics-response.json"),
  },
  {
    id: "example-filtering-case-insensitive",
    title: "Case insensitive filtering",
    query: read("apiv2-examples/filtering-case-insensitive-query.json"),
    exampleResponse: read("apiv2-examples/filtering-case-insensitive-response.json"),
  },
  {
    id: "example-timeseries",
    title: "Timeseries query",
    query: read("apiv2-examples/timeseries-query.json"),
    exampleResponse: read("apiv2-examples/timeseries-response.json"),
  },
  {
    id: "example-time-labels",
    title: "Timeseries query hourly, with labels",
    query: read("apiv2-examples/time-labels-query.json"),
    exampleResponse: read("apiv2-examples/time-labels-response.json"),
  },
  {
    id: "example-custom-properties",
    title: "Using custom properties",
    query: read("apiv2-examples/custom-properties-query.json"),
    exampleResponse: read("apiv2-examples/custom-properties-response.json"),
  },
  {
    id: "example-pagination",
    title: "Pagination for UTM sources",
    query: read("apiv2-examples/pagination-query.json"),
    exampleResponse: read("apiv2-examples/pagination-response.json")
  },
  {
    id: "example-imports",
    title: "Including imported data",
    query: read("apiv2-examples/imports-query.json"),
    exampleResponse: read("apiv2-examples/imports-response.json"),
  },
  {
    id: "example-imports-warning",
    title: "Including imported data failed",
    query: read("apiv2-examples/imports-bad-filter-query.json"),
    exampleResponse: read("apiv2-examples/imports-bad-filter-response.json"),
  },
  {
    id: "example-revenue-metrics",
    title: "Revenue metrics",
    query: read("apiv2-examples/revenue-metrics-query.json"),
    exampleResponse: read("apiv2-examples/revenue-metrics-response.json"),
  },
  {
    id: "example-revenue-warning",
    title: "Revenue metrics could not be calculated",
    query: read("apiv2-examples/revenue-warning-query.json"),
    exampleResponse: read("apiv2-examples/revenue-warning-response.json"),
  },
  {
    id: "example-filtering-by-segment",
    title: "Filtering by segment",
    query: read("apiv2-examples/filtering-by-segment-query.json"),
    exampleResponse: read("apiv2-examples/filtering-by-segment-response.json"),
  },
  {
    id: "example-behavioral-filters",
    title: "Behavioral filters",
    query: read("apiv2-examples/behavioral-filters-query.json"),
    exampleResponse: read("apiv2-examples/behavioral-filters-response.json"),
  }

]

export function getExampleCode(field: "query" | "exampleResponse", id: string, selectedSite: string | null): string {
  const examples = EXAMPLES.filter((example) => example.id === id)
  let exampleCode = examples[0][field]

  if (selectedSite) {
    exampleCode = exampleCode.replace("dummy.site", selectedSite)
  }

  return exampleCode
}

export default EXAMPLES

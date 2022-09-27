let baseUrl = "http://localhost:8000" || process.env.REACT_APP_API_BASE_URL;
let baseEntrypoint = "api" || process.env.REACT_APP_BASE_ENTRYPOINT;
let version = "v1" || process.env.REACT_APP_API_VERSION;
let endpoint = "";
export function search({ query }) {
  return fetch(`${baseUrl}/${baseEntrypoint}/${version}/${endpoint}?${query}`, {
    method: "GET",
  });
}

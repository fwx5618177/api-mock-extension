export const setupInterceptors = () => {
  const originalFetch = window.fetch;

  window.fetch = async (input, init) => {
    const response = await originalFetch(input, init);
    const data = await response.clone().json();

    const modifiedData = { ...data, modified: true };

    return new Response(JSON.stringify(modifiedData), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  };
};

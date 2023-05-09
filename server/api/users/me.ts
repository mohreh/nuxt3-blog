export default defineEventHandler((event) => {
  if (event.context.auth) {
    return {
      ok: true,
      data: event.context.auth,
    };
  }

  return {
    ok: false,
    message: `you're not logged in`,
  };
});

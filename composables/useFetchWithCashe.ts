import { StorageSerializers } from "@vueuse/core";
import { NuxtError } from "nuxt/app";

export const useFetchWithCache = async <T>(
  url: string,
  onErr = (error: NuxtError): void => {
    throw createError({
      ...error,
    });
  },
) => {
  const cached = useSessionStorage<T>(url, null, {
    serializer: StorageSerializers.object,
  });

  if (!cached.value) {
    const { data, error } = await useFetch<T>(url, {
      headers: useRequestHeaders(["cookie"]),
    });

    if (error.value) {
      onErr(error.value as NuxtError);
    }

    cached.value = data.value as T;
  } else {
    console.log(`Geting value from cache for ${url}`);
  }

  return cached;
};

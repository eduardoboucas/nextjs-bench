"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null);
  const [url, setUrl] = useState("");

  const onInputChange = useCallback(() => {
    if (!formRef.current) {
      return;
    }

    const middleware = (
      formRef.current.elements.namedItem("middleware") as HTMLSelectElement
    ).value;
    const dataCache = (
      formRef.current.elements.namedItem("data-cache") as HTMLSelectElement
    ).value;
    const slug = (
      formRef.current.elements.namedItem("slug") as HTMLSelectElement
    ).value;
    const cacheableResponse = (
      formRef.current.elements.namedItem(
        "cacheable-response"
      ) as HTMLSelectElement
    ).value;

    const newUrl = new URL(window.location.href);
    newUrl.pathname = `/${middleware}/${dataCache}/${
      slug === "reusable" ? "shared_slug" : Date.now()
    }/${cacheableResponse}`;

    setUrl(newUrl.href);
  }, []);

  useEffect(() => {
    onInputChange();
  }, []);

  return (
    <form ref={formRef} onSubmit={onInputChange}>
      <fieldset>
        <legend>Generate test URL</legend>
        <label htmlFor="middleware">Middleware</label>
        <select name="middleware" id="middleware" onChange={onInputChange}>
          <option value="with-middleware">With Middleware</option>
          <option value="no-middleware">No Middleware</option>
        </select>
        <br />
        <label htmlFor="data-cache">Data cache</label>
        <select name="data-cache" id="data-cache" onChange={onInputChange}>
          <option value="no-data-cache">Not using data cache</option>
          <option value="single-data-cache-use">
            Using shared data cache entry
          </option>
        </select>
        <br />
        <label htmlFor="slug">Slug</label>
        <select name="slug" id="slug" onChange={onInputChange}>
          <option value="reusable">
            Reusable (likely not first time someone will hit this route)
          </option>
          <option value="fresh">
            Unique (generate unique timestamp based slug so likely it will be
            first time this route was used)
          </option>
        </select>
        <br />
        <label htmlFor="cacheable-response">Response caching</label>
        <select
          name="cacheable-response"
          id="cacheable-response"
          onChange={onInputChange}
        >
          <option value="cacheable-response">
            Response is cacheable for 1 hour
          </option>
          <option value="on-demand-response">Response is not cacheable</option>
        </select>
        <br />
        <br />
        <label htmlFor="url">Generated url</label>{" "}
        <a href={url}>
          <code>{url}</code>
        </a>
      </fieldset>
    </form>
  );
}

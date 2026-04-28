// Next.js provide another convention that we can create is loading.js/loading.jsx
// it will auto render when the component is loading/fetching

import Spinner from "@/app/_components/Spinner";

// it will work for all sub routes, no matter how deep the page that is laoding
export default function Laoding() {
  return <Spinner />;
}

/*
  extra note (behind the sence):
    - this loading file is actually activates streaming
    - Next.js will use renderToReadableStream in order to power this
    - this feature needs JavaScript to be enable in browser
    - straming cannot work if the browser unable the JavaScript
*/

// build an API endpoint for affiliates that can get data about a cabin based on an ID passed as a parameter
// this technique no longer useful in Next.js (we can use Server Action feature in Next.js to achieve it)

import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

// Response: https://developer.mozilla.org/en-US/docs/Web/API/Response

export async function GET(request, { params }) {
  // const myParams = await params;

  // console.log(request);
  // console.log(myParams);

  const { cabinId } = await params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}

import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
    const token = process.env.NEXT_API_TOKEN;
    const movies = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(await movies.data);
  } catch (error) {
    console.log("[BILLBOARD_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

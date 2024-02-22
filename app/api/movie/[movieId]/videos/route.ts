import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { movieId: string } }
) {
  try {
    const url = `https://api.themoviedb.org/3/movie/${params.movieId}/videos?language=en-US`;
    const token = process.env.NEXT_API_TOKEN;
    const movies = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(await movies.json());
  } catch (error) {
    console.log("[BILLBOARD_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// export async function GET(
//   req: Request,
//   { params }: { params: { storeId: string } }
// ) {
//   try {
//     if (!params.storeId) {
//       return new NextResponse("Store id is required", { status: 400 });
//     }

//     const billboards = await prismadb.billboard.findMany({
//       where: {
//         storeId: params.storeId,
//       },
//     });

//     return NextResponse.json(billboards);
//   } catch (error) {
//     console.log("[BILLBOARDS_GET]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }

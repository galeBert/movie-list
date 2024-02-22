import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { movieId: string } }
) {
  try {
    const url = `https://api.themoviedb.org/3/movie/${params.movieId}?language=en-US`;
    const token = process.env.NEXT_API_TOKEN;
    const movies = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // const movies = await axios.get(url, {
    //   headers: {
    //     Authorization:
    //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWI2MjhjZDk2N2E0NDU4N2JmMzBmOGU5ODIwMDMxYyIsInN1YiI6IjY1ZDYxNjExZWQyYWMyMDE3YzM1MTNmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nOdlI9ZkrpzdM_3Rqj6QtabbKra3AAnWOUAUNgCRoao",
    //   },
    // });
    // console.log(await movies.json());

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

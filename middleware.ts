import { NextRequest, NextResponse } from "next/server";
import getSession from "./app/libs/session";

interface Routes {
  [key: string]: boolean;
}

const publicUrl: Routes = {
  "/auth": true,
  "/auth/create-account": true,
  "/auth/login": true,
  "/auth/sms": true,
  "/home": true,
};

export default async function middleware(request: NextRequest) {
  const session = await getSession();
  const pathName = request.nextUrl.pathname;
  const exist = publicUrl[pathName];

  if (!session.id) {
    if (!exist) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }
  //로그인 상태에서는 인증 페이지를 갈 수 없어야한다.
  else {
    if (exist) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

import { NextResponse } from 'next/server';

const loggedInRoutes = ['/dashboard'];
const loggedOutRoutes = ['/login'];

export async function middleware(request) {
  const token = request.cookies.get('token');

  if (token === undefined) {
    if (loggedInRoutes.some((path) => request.nextUrl.pathname.startsWith(path))) {
      const signinUrl = new URL('/login', request.url);
      return NextResponse.redirect(signinUrl.toString());
    }
  } else {
    if (loggedOutRoutes.some((path) => request.nextUrl.pathname.startsWith(path))) {
      const signinUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(signinUrl.toString());
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login/:path*']
}

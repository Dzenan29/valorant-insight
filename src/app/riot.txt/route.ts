import {NextResponse} from "next/server";
// Set RIOT_VERIFICATION_TOKEN only when Riot provides the exact value.
export const dynamic="force-dynamic";
export function GET(){const token=process.env.RIOT_VERIFICATION_TOKEN;if(!token){return new NextResponse("Riot verification has not been configured.",{status:404,headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"no-store"}})}return new NextResponse(token,{status:200,headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"no-store"}})}

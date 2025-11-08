import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req : NextRequest){
    const { video_id } = await req.json();
    const response = await axios.post("http://127.0.0.1:8000/generate_mcq",{
        video_id : video_id
    })
    console.log("the response is ,,,",response.data);
    return NextResponse.json(response.data);
}
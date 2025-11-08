"use client"
import Link from "next/link"
export default function({courseId , itemCount, videoId , createEntry} : any){
    return (
            <Link href={`/courses/${courseId}/${itemCount}/${videoId}`} onClick={createEntry}>Go to course</Link>
    )
}
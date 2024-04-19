"use client";

import Writing from "@/app/apps/writing/writing";

export default function WritingDetail({params}){
  return <Writing topicIdProp={params?.topicId}/>
}
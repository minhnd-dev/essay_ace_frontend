"use client";

import Writing from "@/app/apps/writing/writing";

interface WritingDetailParams {
  topicId: number;
}

export default function WritingDetail({params} : {params: WritingDetailParams}){
  return <Writing topicIdProp={params?.topicId}/>
}
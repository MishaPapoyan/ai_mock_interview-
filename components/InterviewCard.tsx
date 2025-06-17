import React from 'react'
import dayjs from 'dayjs'
import Image from "next/image";
import {getRandomInterviewCover} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import DisplayTechIcons from "@/components/DisplayTechIcons";


function InterviewCard({userId, role, type, techstack, createdAt, interviewId}: InterviewCardProps) {
    const feedback = null as Feedback | null;
    const normalizedType = /mix/gi.test(type) ? "Mixed" : type
    const formatedDay = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM, D, YYYY');
    return (
        <div className='card-border w-[360px] max-sm:w-full min-h-96 '>
            <div className='card-interview'>
                <div>
                    <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600'>
                        <p className='badge-text'> {normalizedType} </p>
                    </div>
                    <Image
                        src={getRandomInterviewCover()}
                        alt="cover-image"
                        width={90}
                        height={90}
                        className="rounded-full object-fit size-[90px]"
                    />
                    <h3 className='mt-5 capitalize'>
                        {role} interview
                    </h3>
                    <div className='flex flex-row gap-5 mt-3'>
                        <div className='flex flex-row gap-2'>
                            <Image src='/calendar.svg' alt='calendar' width={22} height={22}/>
                            <p>{formatedDay}</p>
                        </div>
                        <div className='flex flex-row gap-2 items-center'>
                            <Image src='/star.svg' alt='star' width={22} height={22}/>
                            <p>{feedback?.totalScore || '---'} / 100</p>
                        </div>
                    </div>
                    <p className='line-clamp-2 mt-5'>
                        {feedback?.finalAssessment || "you haven't taken the interview yet. Take to improve your skills."}
                    </p>
                </div>
                <div className="flex flex-row justify-between">
                    <DisplayTechIcons techStack={techstack}/>
                    <Button>
                        <Link href={feedback ? `/interview/${interviewId}/feedback` : `/interview/${interviewId}`}/>
                        {feedback ? 'Check Feedback' : 'view'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default InterviewCard


/*
!!!
question for ChatGPT, whats the difference between those 2 and why some of fields doesn'r included
// interface InterviewCardProps {
//     id: string;
//     userId: string;
//     role: string;
//     type: string;
//     techstack: string[];
//     level: string;
//     questions: string[];
//     finalized: boolean;
//     createdAt: string;
// }

// interface Interview {
//     id: string;
//     role: string;
//     level: string;
//     questions: string[];
//     techstack: string[];
//     createdAt: string;
//     userId: string;
//     type: string;
//     finalized: boolean;
// }

*/
